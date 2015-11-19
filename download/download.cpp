#include <Python.h>
#include <stdio.h>
#include <pthread.h>
#include <stdlib.h>
#include <exception>
#include <stdexcept>
#include "download.h"

static task_ret_map task_ret_pool;

static void *
download_thread(void *p_tasks);

void print_map() {
    for (ret_map_iter it=task_ret_pool.begin(); it != task_ret_pool.end(); ++it){
        printf("%d %d %s\n", it->first, it->second.ret_flag, it->second.err_msg);
    }
}

int
download_tasks_pycall(pydownload_tasks_t *p_tasks)
{
    pthread_t dl_thread;
    pthread_create(&dl_thread, NULL, download_thread, p_tasks);
    pthread_join(dl_thread, NULL);
    print_map();
    return 0;
}

static void *
download_thread(void *p_tasks)
{
    pydownload_tasks_t *rp_tasks = (pydownload_tasks_t *)p_tasks;
    // is it necessary to copy the task structure
    pydownload_tasks_t thread_tasks = *rp_tasks;
    // initial the py environment
    PyObject *pName, *pModule, *pDict, *pFunc_download;
    PyObject *pRet;
    try {
        Py_Initialize();
        if (!Py_IsInitialized()) {
            throw std::runtime_error("Py environment initial error");
        }
        PyRun_SimpleString("import sys");
        PyRun_SimpleString(PY_FILE_PATH_CMD);         // append the py file path
        pName = PyString_FromString(PY_MODULE_NAME);  // convert to module name object
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
        ssh_conn_params_t *sshp = &thread_tasks.ssh_params;
        // initial pArgs(ssh_cfg)
        PyObject *pyc_args = PyTuple_New(2);    // parameters for python download
        PyObject *pssh_cfg = PyTuple_New(4);
        PyTuple_SetItem(pyc_args, 0, pssh_cfg);
        PyObject *host = PyString_FromString(sshp->host);
        PyObject *user = PyString_FromString(sshp->user);
        PyObject *password = PyString_FromString(sshp->password);
        PyObject *port = PyInt_FromLong(atoi(sshp->port));
        if (host == NULL || user == NULL || password == NULL || port == NULL) {
            throw std::runtime_error("ssh arguments initial failed");
        }
        PyTuple_SetItem(pssh_cfg, 0, host);
        PyTuple_SetItem(pssh_cfg, 1, user);
        PyTuple_SetItem(pssh_cfg, 2, password);
        PyTuple_SetItem(pssh_cfg, 3, port);
        // initial pArgs(task_list)
        int tsize = thread_tasks.task_buffer.size();
        int i, j, taskid, ret;
        char *err_msg;
        download_ret_t dr_ret;                  // down return mesg structure
        PyObject *ptask_list = PyList_New(tsize);
        PyTuple_SetItem(pyc_args, 1, ptask_list);
        for (i = 0; i < tsize; i++) {
            PyObject *ptask_item = PyTuple_New(3);
            PyObject *download_id = PyInt_FromLong((thread_tasks.task_buffer[i]).task_id);
            PyObject *r_path_file = PyString_FromString((thread_tasks.task_buffer[i]).remote_file);
            PyObject *l_path_file = PyString_FromString((thread_tasks.task_buffer[i]).local_file);
            if (r_path_file == NULL || l_path_file == NULL || download_id == NULL) {
                throw std::runtime_error("download task arguments initial failed");
            }
            PyTuple_SetItem(ptask_item, 0, download_id);
            PyTuple_SetItem(ptask_item, 1, r_path_file);
            PyTuple_SetItem(ptask_item, 2, l_path_file);
            PyList_SetItem(ptask_list, i, ptask_item);
        }
        pRet = PyObject_CallObject(pFunc_download, pyc_args);
        if (pRet == NULL) {
            throw std::runtime_error("pycall failed");
        }
        if (PyDict_Size(pRet) != tsize) {
            throw std::runtime_error("input task size not equal with output size");
        }
        PyObject *pret_keys_list = PyDict_Keys(pRet);
        for (i = 0; i < tsize; i++) {
            PyObject *pkey_item = PyList_GetItem(pret_keys_list, i);
            PyObject *pvalue_tuple = PyDict_GetItem(pRet, pkey_item);
            PyObject *pret_flag = PyTuple_GetItem(pvalue_tuple, 0);
            PyObject *perr_msg = PyTuple_GetItem(pvalue_tuple, 1);
            taskid = PyInt_AsLong(pkey_item);
            ret = PyInt_AsLong(pret_flag);
            err_msg = PyString_AsString(perr_msg);
            dr_ret.ret_flag = ret;
            j = 0;
            // copy the error msg
            while ((dr_ret.err_msg[j] = err_msg[j]) != '\0') {
                if (j == NAME_LEN) {
                    dr_ret.err_msg[j-1] = '\0';
                    break;
                }
                j++;
            }
            task_ret_pool[taskid] = dr_ret;
        }
    } catch(std::exception& e) {
        int tsize = thread_tasks.task_buffer.size();
        int i, j, ttask_id;
        const char *err_msg = e.what();
        download_ret_t dr_ret;
        for (i = 0; i < tsize; i++) {
            ttask_id = thread_tasks.task_buffer[i].task_id;
            dr_ret.ret_flag = -1;
            j = 0;
            while ((dr_ret.err_msg[j] = err_msg[j]) != '\0') {
                if (j == NAME_LEN) {
                    dr_ret.err_msg[j-1] = '\0';
                    break;
                }
                j++;
            }
            task_ret_pool[ttask_id] = dr_ret;
        }
    }
    if (pModule) {
        Py_DECREF(pModule);
    }
    if (pName) {
        Py_DECREF(pName);
    }
    Py_Finalize();
    pthread_exit(NULL);
}
