#pragma once
#include "headers.h"
#define PY_DOWNLOAD_MODULE_NAME  "remote_file_operation"

typedef struct {
	pthread_mutex_t lock;
	std::list<std::string> task_list; 
} cached_download_task_t;

typedef struct {
	std::string sftp_conf;
	cached_download_task_t cached_dltask; 
} download_param_t;

int
start_download_tasks(redisContext *c, const Json::Value &download_cmd);

int
init_download_var();
