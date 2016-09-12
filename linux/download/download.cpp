#include "headers.h"
#include "download.h"
#include "redis_cnt.h"
#include "config.h"
#include <pthread.h>


static download_param_t download_param;
static int finished_task = 0;          // statistic finished download task

 /**
  * cmd format(json)
  * {
  *         "type": 102,
  *         "seq": 1,
  *         "data": {
  *                 "remote_files":["/home/rss/1.so", "/home/rss/2.so"],
  *                 "local_files":["/home/rss/1.so", "/home/rss/2.so"]
  *         }
  * }
  * scfg format(json)
  * {
  *         "host": "xxx",
  *         "port": 22,
  *         "user": "rss",
  *         "password": "123456"
  * }
  * py_download_ret format(json string)
  * {
  *         "type": 102,
  *         "seq": 1,
  *         "return": -1,
  *         "data": {
  *                 "remote_file":[xxx, xxx],
  *                 "msg":[xxx, xxx],
  *         }
  * }
  */

static bool
download_proc(std::string &download_task, std::string &cfg)
{
        log_trace("Enter the proc");
        if (download_task == "" || cfg == "") {
            log_error("Download task parameters error!");
            return false;
        }

        bool ret = false;

        PyObject *dl_param = Py_BuildValue("(ss)", cfg.c_str(),download_task.c_str());
        if(dl_param == NULL) {
                log_error("Download_proc argument build return null");
                return false;
        }
        
        PyObject *sys = NULL, *path = NULL, *py_dl_func = NULL,
                 *py_module = NULL, *py_ret = NULL;

        const char *err_msg = NULL;
        do {
                if(!Py_IsInitialized()) {
                        err_msg = "Py environment initial error";
                        break;
                }

                /* Setup Python runtime enviroments. */
                char pymod_path[NAME_MAX];
                bzero(pymod_path, sizeof(pymod_path));
                get_agent_pymod_path(pymod_path, sizeof(pymod_path), "pymod");
                sys = PyImport_ImportModule("sys");         //new reference
                path = PyObject_GetAttrString(sys, "path"); // new reference
                
                int app_ret = PyList_Append(path, PyString_FromString(pymod_path));
                if (app_ret != 0) {
                        err_msg = "Py path append failed";
                        break;
                }

                /* Load target Python module. */
                py_module = PyImport_ImportModule("remote_file_operation");//new reference
                if(!py_module) {
                        err_msg = "Py import module failed";
                        break;
                }

                /* Search for main entry. */
                py_dl_func = PyObject_GetAttrString(py_module, "main");//new reference
                if(!py_dl_func || !PyCallable_Check(py_dl_func)) {
                        err_msg = "Py main function is not executable";
                        break;
                }

                /* Execute and get return args. */
                log_info("Go into the pydownload");
                py_ret = PyObject_CallObject(py_dl_func, dl_param);//new reference
                if(!py_ret) {
                        err_msg = "Py download execute error";
                        break;
                }
                log_info("Get out of the pydownload");

                /* Parse the return and upload to redis */
                if (PyString_CheckExact(py_ret)) {
                        Json::Reader reader;
                        Json::Value root;
                        /* borrowed pointer */
                        char *s = PyString_AsString(py_ret);
                        if(reader.parse(s, root)) {
                                log_trace("seq=%d, %s\n", root["seq"].asInt(), root.toStyledString().c_str());
                                redis_upload_rsp(root);
                                ret = true;
                        } else {
                                err_msg = "Py download return invalid json";
                                break;
                        }
                } else {
                        err_msg = "Py download return error type";
                        break;
                }
        } while(0);

        Py_XDECREF(sys);
        Py_XDECREF(path);
        Py_XDECREF(py_module);
        Py_XDECREF(py_dl_func);
        Py_XDECREF(py_ret);
        Py_XDECREF(dl_param);

        log_trace("One download thread execution finished!!!");

        if(err_msg) {
                log_error(err_msg);
        }
        return ret;
}


static void *
listen_dltask_list(void *args)
{
        (void) args;
        int cnt = 0;
        log_info("come into download thread");
        while(1) {
            if (download_param.cached_dltask.task_list.size() != 0) {
                
                pthread_mutex_lock(&download_param.cached_dltask.lock);
                std::string task_str = download_param.cached_dltask.task_list.front();
                pthread_mutex_unlock(&download_param.cached_dltask.lock);

                bool dl_success = download_proc(task_str, download_param.sftp_conf);
                // download task really finished
                if (dl_success) {
                    pthread_mutex_lock(&download_param.cached_dltask.lock);
                    download_param.cached_dltask.task_list.pop_front();
                    pthread_mutex_unlock(&download_param.cached_dltask.lock);
                    ++finished_task;
                } else {
                    log_error("download tsk failed it will retry later");
                    nano_sleep(0,2e8);  // sleep 0.2 seconds
                }
                log_trace("finished tsk = %d, cached download task cnt = %d", 
                           finished_task, download_param.cached_dltask.task_list.size());
            } else {
                nano_sleep(0,2e8);      // sleep 0.2 seconds
            }
        }
        return NULL;
}

static int
start_download_worker_thread()
{
    pthread_t thread_id;
    int ret = pthread_create(&thread_id, NULL, listen_dltask_list, NULL);
    if (ret != 0) {
        return ret;
    }
    ret = pthread_detach(thread_id);
    if (ret != 0) {
        return ret;
    }
    return 0;
}

static void 
init_sftp_conf()
{
        data_connection_config_t file_server_cfg;
        get_file_server_cfg(file_server_cfg.ip, sizeof(file_server_cfg.ip),
                            &(file_server_cfg.port),file_server_cfg.login_auth, 
                            sizeof(file_server_cfg.login_auth));
        
        Json::Value sftp_conf;
        
        sftp_conf["host"] = file_server_cfg.ip;
        sftp_conf["port"] = file_server_cfg.port;
        sftp_conf["user"] = file_server_cfg.login_auth;
        sftp_conf["password"] = "";
        
        download_param.sftp_conf = sftp_conf.toStyledString();
}

int
start_download_tasks(redisContext *c, const Json::Value &download_cmd)
{
        (void) c;
        if (download_cmd.isNull()) {
            log_error("download task error!");
            return -1;
        }
        log_trace("download cmd come, seq = %d", download_cmd["seq"].asInt());

        std::string dl_cmd = download_cmd.toStyledString();
        pthread_mutex_lock(&download_param.cached_dltask.lock);
        download_param.cached_dltask.task_list.push_back(dl_cmd);
        pthread_mutex_unlock(&download_param.cached_dltask.lock);

        return 0;
}

int
init_download_var()
{
        Py_Initialize();
        if(!Py_IsInitialized()) {
            log_error("download module init python env failed!");
            return -1;
        }

        int ret = pthread_mutex_init(&download_param.cached_dltask.lock, NULL);
        if (ret != 0) {
            log_error("download module init lock failed");
        }

        init_sftp_conf();
        ret = start_download_worker_thread();
        if (ret != 0) {
            log_error("download module init worker thread failed!");
            return -1;
        }
        return 0;
}


/*
 * TODO: 
 * 1) thread pool can be used to reduce new thread creating overhead. (finished)
 * 2) Pass json string directly to python module. (finished)
 *
 * */
