#include <Python.h>
#include <stdio.h>
#include <pthread.h>
#include <exception>
#include <stdexcept>
#include "download.h"

static task_ret_map task_ret_pool;
static pthread_mutex_t retmtx = PTHREAD_MUTEX_INITIALIZER;

/**
 * test function
 */
void print_map() {
    for (ret_map_iter it=task_ret_pool.begin(); it != task_ret_pool.end(); ++it){
        printf("%d %d %s\n", it->first, it->second.ret_flag, it->second.err_msg);
    }
}

/**
 * abstract the parameters in sshp, and initial the PyObject
 */
static void
init_ssh_params(PyObject *pssh_cfg, ssh_conn_params_t &sshp)
{
    PyObject *host = PyString_FromString(sshp.host);
    PyObject *user = PyString_FromString(sshp.user);
    PyObject *password = PyString_FromString(sshp.password);
    PyObject *port = PyInt_FromLong(atoi(sshp.port));
    if (host == NULL || user == NULL || password == NULL || port == NULL) {
        throw std::runtime_error("ssh arguments initial failed");
    }
    PyTuple_SetItem(pssh_cfg, 0, host);
    PyTuple_SetItem(pssh_cfg, 1, user);
    PyTuple_SetItem(pssh_cfg, 2, password);
    PyTuple_SetItem(pssh_cfg, 3, port);
}

/**
 * abstract the parameters in task_buffer, and initial the PyObject
 */
static void
init_task_params(PyObject *ptask_list, std::vector<download_task_t> &task_buffer)
{
    int tsize = task_buffer.size();
    for (int i = 0; i < tsize; i++) {
        PyObject *ptask_item = PyTuple_New(3);
        PyObject *download_id = PyInt_FromLong((task_buffer[i]).task_id);
        PyObject *r_path_file = PyString_FromString((task_buffer[i]).remote_file);
        PyObject *l_path_file = PyString_FromString((task_buffer[i]).local_file);
        if (r_path_file == NULL || l_path_file == NULL || download_id == NULL) {
            throw std::runtime_error("download task arguments initial failed");
        }
        PyTuple_SetItem(ptask_item, 0, download_id);
        PyTuple_SetItem(ptask_item, 1, r_path_file);
        PyTuple_SetItem(ptask_item, 2, l_path_file);
        PyList_SetItem(ptask_list, i, ptask_item);
    }
}

/**
 * parse the return PyObject and store the result into task_ret_pool
 */
static void
dump_ret_msg(PyObject *pRet)
{
    if ( pRet == NULL) {
        throw std::runtime_error("pycall failed");
    }
    char *ret_err_msg;
    int rsize = PyDict_Size(pRet);
    int taskid;
    download_ret_t dr_ret;                  // down return mesg structure 
    PyObject *pret_keys_list = PyDict_Keys(pRet);
    pthread_mutex_lock(&retmtx);
    for (int i = 0; i < rsize; i++) {
        PyObject *pkey_item = PyList_GetItem(pret_keys_list, i);
        PyObject *pvalue_tuple = PyDict_GetItem(pRet, pkey_item);
        PyObject *pret_flag = PyTuple_GetItem(pvalue_tuple, 0);
        PyObject *perr_msg = PyTuple_GetItem(pvalue_tuple, 1);
        taskid = PyInt_AsLong(pkey_item);
        dr_ret.ret_flag = PyInt_AsLong(pret_flag);
        ret_err_msg = PyString_AsString(perr_msg);
        strncpy(dr_ret.err_msg, ret_err_msg, NAME_LEN);
        task_ret_pool[taskid] = dr_ret;
    }
    pthread_mutex_unlock(&retmtx);
}

/**
 * duplicate the pydownload_tasks_t
 */
static pydownload_tasks_t *
download_task_dup(pydownload_tasks_t *o_tasks)
{
    pydownload_tasks_t *ret_tasks = new pydownload_tasks_t;
    if (ret_tasks == NULL) {
        return NULL;
    }
    ret_tasks->ssh_params = o_tasks->ssh_params;
    int tsize = o_tasks->task_buffer.size();
    for (int i = 0; i < tsize; i++) {
        ret_tasks->task_buffer.push_back(o_tasks->task_buffer[i]);
    }
    return ret_tasks;
}

static void *
download_thread(void *p_tasks)
{
    if (p_tasks == NULL) {
        return NULL;
    }
    pydownload_tasks_t *thread_tasks = (pydownload_tasks_t *)p_tasks;
    // initial the py environment
    PyObject *pName, *pModule, *pDict, *pFunc_download;
    int tsize = thread_tasks->task_buffer.size();
    int Py_Init_OK;
    try {
        Py_Initialize();
        Py_Init_OK = Py_IsInitialized();
        if (!Py_Init_OK) {
            throw std::runtime_error("Py environment initial error");
        }
        PyRun_SimpleString(PY_IMPORT_SYS_MODULE_CMD);
        PyRun_SimpleString(PY_APD_DOWNLOAD_PATH_CMD);          // append the py file path
        pName = PyString_FromString(PY_DOWNLOAD_MODULE_NAME);  // convert to module name object
        pModule = PyImport_Import(pName);
        if (pModule == NULL) {
            throw std::runtime_error("Py import module failed");
        }
        pDict = PyModule_GetDict(pModule);
        if (pDict == NULL) {
            throw std::runtime_error("Py module get dict failed");
        }
        pFunc_download = PyDict_GetItemString(pDict, "download_file");
        if (pFunc_download == NULL || !PyCallable_Check(pFunc_download)) {
            throw std::runtime_error("Py can't reach the download function");
        }
        // call a py file to deal those tasks
        PyObject *pyc_args = PyTuple_New(2);    // parameters for python download
        PyObject *pssh_cfg = PyTuple_New(4);
        PyObject *ptask_list = PyList_New(tsize);
        init_ssh_params(pssh_cfg, thread_tasks->ssh_params);
        PyTuple_SetItem(pyc_args, 0, pssh_cfg);
        init_task_params(ptask_list, thread_tasks->task_buffer);
        PyTuple_SetItem(pyc_args, 1, ptask_list);
        PyObject *pRet = PyObject_CallObject(pFunc_download, pyc_args);
        dump_ret_msg(pRet);
    } catch(std::exception& e) {
        const char *err_msg = e.what();
        int taskid;
        download_ret_t dr_ret;
        for (int i = 0; i < tsize; i++) {
            taskid = thread_tasks->task_buffer[i].task_id;
            dr_ret.ret_flag = -1;
            strncpy(dr_ret.err_msg, err_msg, NAME_LEN);
            task_ret_pool[taskid] = dr_ret;
        }
    }
    // TODO: comment this sentence
    print_map();
    if (Py_Init_OK) {
        Py_Finalize();
    }
    delete(thread_tasks);
    pthread_exit(NULL);
}


int
download_tasks_pycall(pydownload_tasks_t *p_tasks)
{
    // copy a pydownload_tasks_t
    pydownload_tasks_t *t_p_tasks = download_task_dup(p_tasks);
    if (t_p_tasks == NULL) {
        return -1;
    }
    pthread_t dl_thread;
    pthread_create(&dl_thread, NULL, download_thread, t_p_tasks);
    pthread_join(dl_thread, NULL);
    // pthread_detach(dl_thread);
    return 0;
}