#include <pthread.h>
#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <json/json.h>
#include "download.h"




static int
redis_cmd_get_download_task(const Json::Value &data, pydownload_tasks_t &dl_tasks)
{
        int i;
        // TODO: change the s_size with NAME_LEN
        int const s_size = 256;
        if (!data.isMember("ip") || !data.isMember("dlfs")) {
                printf("redis cmd get download list:one field missed:%s",
                        data.asCString());
                return -1;
        }
        const Json::Value hostip = data["ip"];
        const Json::Value dlfs = data["dlfs"];
        Json::Value tsk;
        ssh_conn_params_t *ssh_params = &(dl_tasks.ssh_params);
        
        // TODO: set ssh info
        snprintf(ssh_params->host, s_size, "%s", hostip.asCString());
        snprintf(ssh_params->user, s_size, "rss");
        snprintf(ssh_params->password, s_size, "123456");
        snprintf(ssh_params->port, s_size, "22");
        download_task_t tmp_task;
        for (i = 0; i < (int)dlfs.size(); i++) {
                tsk = dlfs[i];
                if(!tsk.isMember("task_id") || !tsk.isMember("remote_file") ||
                        !tsk.isMember("local_file")) {
                        printf("task %s missed parameters", tsk.asCString());
                        continue;
                }
                tmp_task.task_id = tsk["task_id"].asInt();
                snprintf(tmp_task.local_file, s_size, "%s", tsk["local_file"].asCString());
                snprintf(tmp_task.remote_file, s_size, "%s", tsk["remote_file"].asCString());
                dl_tasks.task_buffer.push_back(tmp_task);
        }
        if (dl_tasks.task_buffer.size() == 0) {
                return -1;
        }
        return 0;
}

static int
redis_cmd_download(const Json::Value &data)
{
        // parse the redisContext and get the ip, remote_file, and local_file
        pydownload_tasks_t pydl_task;
        int ret;
        ret = redis_cmd_get_download_task(data, pydl_task);
        if (ret < 0) {
                return -1;
        }
        ret = download_tasks_pycall(&pydl_task);
        if (ret < 0) {
                return -1;
        }
        return 0;
}

int
main()
{
    /**
     * json format:
     *       "ip" : "xxx.xxx.xxx.xxx"
     *       "dlfs": [{
     *                   "task_id":xx
     *                   "remote_file":"xxxx"
     *                   "local_file":"xxx"
     *               },{
     *                   "task_id":xx
     *                   "remote_file":"xxxx"
     *                   "local_file":"xxxx"
     *               }]
     */
    
    Json::Value params, list_item;
    params["ip"] = "192.168.1.21";
    list_item["task_id"] = 1;
    list_item["remote_file"] = "/home/rss/dump.rdb";
    list_item["local_file"] = "/home/rss/dump.rdb";
    params["dlfs"].append(list_item);
    list_item["task_id"] = 2;
    list_item["remote_file"] = "/home/rss/download.txt";
    list_item["local_file"] = "/home/rss/download.txt";
    params["dlfs"].append(list_item);
    redis_cmd_download(params);

    return 0;
}
