#define NAME_LEN = 128
#define CMD_UPLOAD = 0
#define CMD_INIT = 1
#define SUCCESS = 1
#define FAIL = 0

typedef struct
{
    char host[NAME_LEN];
    char path[NAME_LEN];
    char file[NAME_LEN];
} remote_file_t;

typedef struct 
{
    char path[NAME_LEN];
    char file[NAME_LEN];
} local_file_t;

typedef struct
{
    char host[NAME_LEN];
    char port[NAME_LEN];
    char user[NAME_LEN];
    char password[NAME_LEN];
} ssh_conn_params_t;

static int
check_rf_params(remote_file_t *rf)
{
    if (rf->host == NULL || rf->path == NULL ||
        rf->file == NULL) {
            printf(stderr, "remote file params error\n");
            return FAIL;
        }
    return SUCCESS;
}

static int
check_lf_params(local_file_t *lf)
{
    if (rf->path == NULL || rf->file == NULL) {
        printf(stderr, "local file params error\n");
        return FAIL;
    }
    return SUCCESS;
}

static int
check_ssh_conn_params(ssh_conn_params_t *ssh)
{
    if(ssh->host == NULL || ssh->port == NULL ||
        ssh->user == NULL || ssh->password == NULL) {
        printf(stderr, "ssh connection parameters error\n");
        return FAIL;
    }
    return SUCCESS;
}

int
download_file(remote_file_t *rf, local_file_t *lf)
{
    if (!check_lf_params(lf) || !check_rf_params(rf)) {
        return FAIL;
    }
    // trigger a signal to inform callback to process
}

int
init_ssh_connection(ssh_conn_params_t *ssh)
{
    if (!check_ssh_conn_params(ssh)) {
        return FAIL;
    }
    // trigger a signal to inform callback to process
}