/**
 * Multiple producer - Single customer to download file from specified remote
 * server, this program based python-ssh connection and pthread
 * Copyright(c) 2015 MyCapital
 * Author: Colin   Time: 2015-11-16
 */

#include <pthread.h>

#define NAME_LEN      128   // length of all string
#define CMD_DOWNLOAD  0     // cmd for upload
#define CMD_INIT      1     // cmd for init the ssh connection
#define SUCCESS       1     // success flag
#define FAIL          0     // fail flag
#define UNKNOWN       -1    // initial flag for py call

static const int repository_size  = 100;

typedef struct
{
    char host[NAME_LEN];
    char path_file[NAME_LEN];
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
    volatile int ret_msg;        // the return message
    remote_file_t *rf;
    local_file_t *lf;
    ssh_conn_params_t *sshp;
} ssh_rlf_msg_t;                 // all message in a type


typedef struct
{
    ssh_rlf_msg_t params_buffer[repository_size];
    int read_position;
    int write_position;
    pthread_mutex_t mtx;
    pthread_mutex_t item_counter_mtx;
    pthread_cond_t repo_not_full;
    pthread_cond_t repo_not_empty;
} task_repository;

int
download_file(remote_file_t *rf, local_file_t *lf);

int
init_ssh_connection(ssh_conn_params_t *ssh);

int
start_download_thread();