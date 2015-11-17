#include <Python.h>
#include <stdio.h>
#include <pthread.h>
#include <unistd.h>
#include <stdlib.h>
#include "download.h"

static task_repository tr;
static pthread_t dl_thread;

static int
check_rf_params(remote_file_t *rf)
{
    if (rf->host == NULL || rf->path_file == NULL) {
            fprintf(stderr, "remote file params error\n");
            return FAIL;
        }
    return SUCCESS;
}

static int
check_lf_params(local_file_t *lf)
{
    if (lf->path_file == NULL) {
        fprintf(stderr, "local file params error\n");
        return FAIL;
    }
    return SUCCESS;
}

static int
check_ssh_conn_params(ssh_conn_params_t *ssh)
{
    if(ssh->host == NULL || ssh->port == NULL ||
        ssh->user == NULL || ssh->password == NULL) {
        fprintf(stderr, "ssh connection parameters error\n");
        return FAIL;
    }
    return SUCCESS;
}

int
download_file(remote_file_t *rf, local_file_t *lf)
{
    int ret = FAIL;
    int cpos;
    // check the parameters
    if (!check_lf_params(lf) || !check_rf_params(rf)) {
        return FAIL;
    }
    // check the dl_thread
    if (pthread_kill(dl_thread, 0) == ESRCH) {
        fprintf(stderr, "Download thread is not alive\n");
        return FAIL;
    }
    // write the task to buffer if it could
    pthread_mutex_lock(&tr.mtx);
    // buffer is full (preparing for process) then wait here
    while (tr.write_position + 1 % repository_size == tr.read_position) {
        pthread_cond_wait(&tr.repo_not_full, &tr.mtx);
    }
    (tr.params_buffer)[tr.write_position].type = CMD_DOWNLOAD;
    (tr.params_buffer)[tr.write_position].rf = rf;
    (tr.params_buffer)[tr.write_position].lf = lf;
    (tr.params_buffer)[tr.write_position].sshp = NULL;
    (tr.params_buffer)[tr.write_position].ret_msg = UNKNOWN;
    cpos = tr.write_position;
    (tr.write_position)++;
    if (tr.write_position == repository_size) {
        tr.write_position = 0;
    }
    // inform the process thread to process it
    pthread_cond_signal(&tr.repo_not_empty);
    pthread_mutex_unlock(&tr.mtx);
    // wait until the task is finished
    // TODO: need to improve this
    while(1) {
        if (tr.params_buffer[cpos].ret_msg != UNKNOWN) {
            ret = tr.params_buffer[cpos].ret_msg;
            break;
        }
    }
    return ret;
}

int
init_ssh_connection(ssh_conn_params_t *ssh)
{
    int ret = FAIL;
    int cpos;
    // check the parameters
    if (!check_ssh_conn_params(ssh)) {
        return FAIL;
    }
    // check the dl_thread
    if (pthread_kill(dl_thread, 0) == ESRCH) {
        fprintf(stderr, "Download thread is not alive\n");
        return FAIL;
    }
    pthread_mutex_lock(&tr.mtx);
    // buffer is full (preparing for process) then wait here
    while (tr.write_position + 1 % repository_size == tr.read_position) {
        pthread_cond_wait(&tr.repo_not_full, &tr.mtx);
    }
    tr.params_buffer[tr.write_position].type = CMD_INIT;
    tr.params_buffer[tr.write_position].rf = NULL;
    tr.params_buffer[tr.write_position].lf = NULL;
    tr.params_buffer[tr.write_position].sshp = ssh;
    tr.params_buffer[tr.write_position].ret_msg = UNKNOWN;
    cpos = tr.write_position;
    (tr.write_position)++;
    if (tr.write_position == repository_size) {
        tr.write_position = 0;
    }
    // inform the process thread to process it
    pthread_cond_signal(&tr.repo_not_empty);
    pthread_mutex_unlock(&tr.mtx);
    // TODO: need to improve this
    while(1) {
        if (tr.params_buffer[cpos].ret_msg != UNKNOWN) {
            ret = tr.params_buffer[cpos].ret_msg;
            break;
        }
    }
    return ret;
}

static void *
download_thread(void *pVoid)
{
    // initial the py environment
    PyObject *pName, *pModule, *pDict, *pFunc_download, *pFunc_init;
    PyObject *pArgs, *pRet;
    int error_flag = 0;
    do {
        Py_Initialize();
        if (!Py_IsInitialized()) {
            error_flag = 1;
            break;
        }
        PyRun_SimpleString("import sys");
        PyRun_SimpleString("sys.path.append('./')");
        pName = PyString_FromString("remote_file_operation");
        if (pName == NULL) {
            error_flag = 1;
            break;
        }
        pModule = PyImport_Import(pName);
        if (pModule == NULL) 
        {
            error_flag = 1;
            break;
        }
        pDict = PyModule_GetDict(pModule);
        if (pDict == NULL) {
            error_flag = 1;
            break;
        }
        pFunc_download = PyDict_GetItemString(pDict, "download_file");
        if (pFunc_download == NULL || !PyCallable_Check(pFunc_download))
        {
            error_flag = 1;
            break;
        }
        pFunc_init = PyDict_GetItemString(pDict, "conn_server");
        if (pFunc_init == NULL || !PyCallable_Check(pFunc_init))
        {
            error_flag = 1;
            break;
        }
    } while(0);
    if (error_flag) {
        goto PY_ERROR;
    }
    // initial the tr message
    tr.read_position = 0;
    tr.write_position = 0;
    // main loop wait for signal to process the tasks
    while (1)
    {
        int ret, type;
        pthread_mutex_lock(&tr.mtx);
        // wait till the buffer is not empty
        while (tr.write_position == tr.read_position) {
            pthread_cond_wait(&tr.repo_not_empty, &tr.mtx);
        }
        type = (tr.params_buffer)[tr.read_position].type;
        printf("the type is %d\n", type);
        // consume the resource according the type msg and
        // write back the process result
        if (type == CMD_DOWNLOAD) {
            // parse the arguments
            remote_file_t *rf = ((tr.params_buffer)[tr.read_position]).rf;
            local_file_t *lf = ((tr.params_buffer)[tr.read_position]).lf;
            pArgs = PyTuple_New(3);
            //  string presented as a raw byte string
            PyObject *host = PyString_FromString(rf->host);
            PyObject *r_path_file = PyString_FromString(rf->path_file);
            PyObject *l_path_file = PyString_FromString(lf->path_file);
            if (host==NULL || r_path_file == NULL || l_path_file==NULL) {
                error_flag = 1;
                pthread_mutex_unlock(&tr.mtx);
                break;
            }
            PyTuple_SetItem(pArgs, 0, host);
            PyTuple_SetItem(pArgs, 1, r_path_file);
            PyTuple_SetItem(pArgs, 2, l_path_file);
            pRet = PyObject_CallObject(pFunc_download, pArgs);
            if (pArgs != NULL)
            {
                Py_DECREF(pArgs);
            }
            if (pRet == NULL)
            {
                error_flag = 1;
                pthread_mutex_unlock(&tr.mtx);
                break;
            }
            ret = PyInt_AsLong(pRet);
        } else {
            ssh_conn_params_t *sshp = ((tr.params_buffer)[tr.read_position]).sshp;
            pArgs = PyTuple_New(4);
            PyObject *host = PyString_FromString(sshp->host);
            PyObject *user = PyString_FromString(sshp->user);
            PyObject *password = PyString_FromString(sshp->password);
            PyObject *port = PyInt_FromLong(atoi(sshp->port));
            PyTuple_SetItem(pArgs, 0, host);
            PyTuple_SetItem(pArgs, 1, user);
            PyTuple_SetItem(pArgs, 2, password);
            PyTuple_SetItem(pArgs, 3, port);
            pRet = PyObject_CallObject(pFunc_init, pArgs);
            if (pArgs != NULL)
            {
                Py_DECREF(pArgs);
            }
            if (pRet == NULL)
            {
                error_flag = 1;
                break;
            }
            ret = PyInt_AsLong(pRet);
        }
        printf("ret = %d\n", ret);
        (tr.params_buffer)[tr.read_position].ret_msg = ret;
        (tr.read_position)++;
        if (tr.read_position >= repository_size) {
            tr.read_position = 0;
        }
        pthread_cond_broadcast(&tr.repo_not_full);
        pthread_mutex_unlock(&tr.mtx);
    }
    // free the py environment
PY_ERROR:
    printf("the value of error_flag = %d\n", error_flag);
    if (pModule) {
        Py_DECREF(pModule);
    }
    if (pName) {
        Py_DECREF(pName);
    }
    if (error_flag == 1) {
        PyErr_Print();
    }
    Py_Finalize();
    fprintf(stderr, "Child thread in C finished. \n");
    pthread_exit(NULL);
}

int
start_download_thread()
{
        pthread_create(&dl_thread, NULL, download_thread, NULL);
        pthread_detach(dl_thread);
        sleep(1);
        return 0;
}
