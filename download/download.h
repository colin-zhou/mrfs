/*
 * sftp download module for RSS-Agent.
 *
 * Copyright(c) 2007-2015, by MY Capital Inc.
 */

#include <pthread.h>
#include <vector>
#include <map>

#define NAME_LEN 256

static const char PY_FILE_PATH_CMD[NAME_LEN] = "sys.path.append('./')";
static const char PY_MODULE_NAME[NAME_LEN] = "remote_file_operation";

typedef struct
{
    int task_id;
    char local_file[NAME_LEN];
    char remote_file[NAME_LEN];
} download_task_t;

typedef struct
{
    char host[NAME_LEN];
    char port[NAME_LEN];
    char user[NAME_LEN];
    char password[NAME_LEN];
} ssh_conn_params_t;

typedef struct
{
    ssh_conn_params_t ssh_params;
    std::vector<download_task_t> task_buffer;
} pydownload_tasks_t;

typedef struct
{
    int ret_flag;
    char err_msg[NAME_LEN];
} download_ret_t;

typedef std::map<int, download_ret_t> task_ret_map;           // task_id vs the return msg
typedef std::map<int, download_ret_t>::iterator ret_map_iter; // for traverse the ret_map

/**
 * create a thread and detach it, and in the thread embeded a python script to deal 
 * with download 
 */
int
download_tasks_pycall(pydownload_tasks_t *p_tasks);

// for print the ret_msg map
void print_map();
