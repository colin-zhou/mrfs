#include <Python.h>
#include <stdio.h>
#include <pthread.h>
#include <unistd.h>
#include <stdlib.h>
#include <sys/types.h>
#include <sys/ipc.h>
#include <sys/sem.h>
#include <errno.h>
#include "download.h"

static task_repository tr;
static pthread_t dl_thread;
static int c_sem_key = sem_key_start;
static int dl_thread_status = FAIL;

static int
create_semid()
{
    int sem_id;
    do {
        sem_id = semget((key_t)c_sem_key, 1, 0666 | IPC_CREAT);
        c_sem_key += 1;
        if (c_sem_key == MAX_SEM) {
            c_sem_key = sem_key_start;
        }
    } while (sem_id == -1);
    return sem_id;
}

static int 
set_semvalue(int sem_id)
{
    union semun sem_union;
    sem_union.val = 0;
    if (semctl(sem_id, 0, SETVAL, sem_union) == -1) {
        fprintf(stderr, "set semvalue error %s\n", strerror(errno));
        return FAIL;
    }
    return SUCCESS;
}

static int
del_semvalue(int sem_id)
{
    printf("free the semaphore sem_id = %d \n", sem_id);
    union semun sem_union;
    if (semctl(sem_id, 0, IPC_RMID, sem_union) == -1) {
        fprintf(stderr, "del semvalue error %s\n", strerror(errno));
        return FAIL;
    }
    return SUCCESS;
}

static int
semaphore_p(int sem_id)
{
    printf("p operation %d\n", sem_id);
    struct sembuf sem_b;
    sem_b.sem_num = 0;
    sem_b.sem_op = -1;
    sem_b.sem_flg = SEM_UNDO;
    if (semop(sem_id, &sem_b, 1) == -1) {
        fprintf(stderr, "semaphore p operation error %s\n", strerror(errno));
        return FAIL;
    }
    return SUCCESS;
}

static int
semaphore_v(int sem_id)
{
    printf("v operation %d\n", sem_id);
    struct sembuf sem_b;
    sem_b.sem_num = 0;
    sem_b.sem_op = 1;
    sem_b.sem_flg = SEM_UNDO;
    if (semop(sem_id, &sem_b, 1) == -1) {
        fprintf(stderr, "semaphore v operation error %d %s\n", sem_id, strerror(errno));
        return FAIL;
    }
    return SUCCESS;
}

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

static void
pthread_cleanup_func(void *args)
{
    dl_thread_status = FAIL;
}

int
download_file(remote_file_t *rf, local_file_t *lf)
{
    int ret = FAIL;
    int cpos, sem_id;
    // check the parameters
    if (!check_lf_params(lf) || !check_rf_params(rf)) {
        return FAIL;
    }
    // check the dl_thread
    if (dl_thread_status == FAIL) {
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
    sem_id = create_semid();
    (tr.params_buffer)[tr.write_position].sem_id = sem_id;
    cpos = tr.write_position;
    (tr.write_position)++;
    if (tr.write_position == repository_size) {
        tr.write_position = 0;
    }
    // inform the process thread to process it
    pthread_cond_signal(&tr.repo_not_empty);
    pthread_mutex_unlock(&tr.mtx);
    // wait until the task is finished
    printf("sem_id = %d ---- %d\n",sem_id, c_sem_key);
    if (set_semvalue(sem_id) == SUCCESS &&
        semaphore_p(sem_id) == SUCCESS) {
        ret = (tr.params_buffer)[cpos].ret_msg;
        del_semvalue(sem_id);
    } else {
        while(1) {
            if (tr.params_buffer[cpos].ret_msg != UNKNOWN) {
                ret = tr.params_buffer[cpos].ret_msg;
                break;
            }
        }
    }
    return ret;
}

int
init_ssh_connection(ssh_conn_params_t *ssh)
{
    int ret = FAIL;
    int cpos, sem_id;
    // check the parameters
    if (!check_ssh_conn_params(ssh)) {
        return FAIL;
    }
    // check the dl_thread
    if (dl_thread_status == FAIL) {
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
    sem_id = create_semid();
    (tr.params_buffer)[tr.write_position].sem_id = sem_id;
    cpos = tr.write_position;
    (tr.write_position)++;
    if (tr.write_position == repository_size) {
        tr.write_position = 0;
    }
    // inform the process thread to process it
    pthread_cond_signal(&tr.repo_not_empty);
    pthread_mutex_unlock(&tr.mtx);
    printf("sem_id = %d ---- %d\n",sem_id, c_sem_key);
    // semaphore method to wait process ret
    if (set_semvalue(sem_id) == SUCCESS &&
        semaphore_p(sem_id) == SUCCESS) {
        ret = (tr.params_buffer)[cpos].ret_msg;
        del_semvalue(sem_id);
    } else {
        while(1) {
            if (tr.params_buffer[cpos].ret_msg != UNKNOWN) {
                ret = tr.params_buffer[cpos].ret_msg;
                break;
            }
        }
    }
}
// TODO:
// 1. #include improve
// 3. thread alive check

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
    dl_thread_status = SUCCESS;
    // main loop wait for signal to process the tasks
    while (1)
    {
        int ret, type, sem_id;
        pthread_mutex_lock(&tr.mtx);
        // wait till the buffer is not empty
        while (tr.write_position == tr.read_position) {
            pthread_cond_wait(&tr.repo_not_empty, &tr.mtx);
        }
        type = (tr.params_buffer)[tr.read_position].type;
        // consume the resource according the type msg and
        // write back the process result
        if (type == CMD_DOWNLOAD) {
            // parse the arguments
            remote_file_t *rf = ((tr.params_buffer)[tr.read_position]).rf;
            local_file_t *lf = ((tr.params_buffer)[tr.read_position]).lf;
            sem_id = ((tr.params_buffer)[tr.read_position]).sem_id;
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
            sem_id = ((tr.params_buffer)[tr.read_position]).sem_id;
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
        if (semaphore_v(sem_id) == FAIL) {
            break;
        }
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
    dl_thread_status = FAIL;
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
