/**
 * Multiple producer - Single customer to download file from specified remote
 * server, this program based py-ssh connection and pthread
 * Copyright(c) 2015 MyCapital
 * Author: Colin   Time: 2015-11-16
 */
#include <Python.h>
#include <stdio.h>
#include <pthread.h>
#include <stdlib.h>

#define NAME_LEN    128   // length of all string
#define CMD_UPLOAD  0     // cmd for upload
#define CMD_INIT    1     // cmd for init the ssh connection
#define SUCCESS     1     // success flag
#define FAIL        0     // fail flag
#define UNKNOWN    -1     // initial flag for py call

static const int repository_size  = 100;
static const int items_to_produce = 10;

typedef struct
{
    char host[NAME_LEN];
    char path_file[NAME_LEN];
    char user[NAME_LEN];
} remote_file_t;

typedef struct
{
    char path_file[NAME_LEN];
} local_file_t;

typedef struct
{
    char host[NAME_LEN];
    char port[NAME_LEN];
    char user[NAME_LEN];
    char password[NAME_LEN];
} ssh_conn_params_t;

typedef struct
{
    int type;                    // CMD_UPLOAD or CMD_INIT
    volatile int ret_msg;        // return message        
    remote_file_t *rf;
    local_file_t *lf;
    ssh_conn_params_t *sshp;
} ssh_rlf_msg_t;                 // all message in a type


typedef struct
{
    ssh_rlf_msg_t params_buffer[repository_size];
    int read_position;
    int write_position;
    int item_counter;
    pthread_mutex_t mtx;
    pthread_mutex_t item_counter_mtx;
    pthread_cond_t repo_not_full;
    pthread_cond_t repo_not_empty;
} task_repository;

static task_repository tr;

static int
check_rf_params(remote_file_t *rf)
{
    if (rf->host == NULL || rf->path_file == NULL ||
        rf->path_file == NULL) {
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
    if (!check_lf_params(lf) || !check_rf_params(rf)) {
        return FAIL;
    }
    // write the task to buffer if it could
    pthread_mutex_lock(&tr.mtx);
    // buffer is full (preparing for process) then wait here
    while (tr.write_position + 1 % repository_size == tr.read_position) {
        pthread_cond_wait(&tr.repo_not_full, &tr.mtx);
    }
    (tr.params_buffer)[tr.write_position].type = CMD_UPLOAD;
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
    if (!check_ssh_conn_params(ssh)) {
        return FAIL;
    }
    pthread_mutex_lock(&tr.mtx);
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
start_upload_thread(void *pVoid)
{
    // initial the py environment
    PyObject *pName, *pModule, *pDict, *pFunc_upload, *pFunc_init;
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
        pFunc_upload = PyDict_GetItemString(pDict, "upload_file");
        if (pFunc_upload == NULL || !PyCallable_Check(pFunc_upload))
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
        if (type == CMD_UPLOAD) {
            // parse the arguments
            remote_file_t *rf = ((tr.params_buffer)[tr.read_position]).rf;
            local_file_t *lf = ((tr.params_buffer)[tr.read_position]).lf;
            pArgs = PyTuple_New(4);
            //  string presented as a raw byte string
            PyObject *host = PyString_FromString(rf->host);
            PyObject *user = PyString_FromString(rf->user);
            PyObject *r_path_file = PyString_FromString(rf->path_file);
            PyObject *l_path_file = PyString_FromString(lf->path_file);
            if (host==NULL || user==NULL || r_path_file == NULL || l_path_file==NULL) {
                error_flag = 1;
                pthread_mutex_unlock(&tr.mtx);
                break;
            }
            PyTuple_SetItem(pArgs, 0, host);
            PyTuple_SetItem(pArgs, 1, user);
            PyTuple_SetItem(pArgs, 2, r_path_file);
            PyTuple_SetItem(pArgs, 3, l_path_file);
            pRet = PyObject_CallObject(pFunc_upload, pArgs);
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
main()
{
    pthread_t tid;
    remote_file_t rf;
    snprintf(rf.host, NAME_LEN, "192.168.1.21");
    snprintf(rf.path_file, NAME_LEN, "/home/rss/repository/RSS.git");
    snprintf(rf.user, NAME_LEN, "rss");
    local_file_t lf;
    snprintf(lf.path_file, NAME_LEN, "/home/rss/workspace/RSS.git");
    pthread_create(&tid, NULL, start_upload_thread, NULL);
    pthread_detach(tid);
    ssh_conn_params_t sshp;
    snprintf(sshp.host, NAME_LEN, "192.168.1.21");
    snprintf(sshp.port, NAME_LEN, "22");
    snprintf(sshp.user, NAME_LEN, "rss");
    snprintf(sshp.password, NAME_LEN, "123456");

    sleep(1);
    printf("init connection return = %d\n", init_ssh_connection(&sshp));
    printf("1 the calculation= %d\n", download_file(&rf, &lf));
    return 0;
}