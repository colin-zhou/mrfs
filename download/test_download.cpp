#include <stdio.h>
#include "download.h"

int
main()
{
    pydownload_tasks_t task;
    snprintf(task.ssh_params.host, NAME_LEN, "192.168.1.21");
    snprintf(task.ssh_params.user, NAME_LEN, "rss");
    snprintf(task.ssh_params.password, NAME_LEN, "123456");
    snprintf(task.ssh_params.port, NAME_LEN, "22");
    download_task_t t1, t2;
    t1.task_id = 1;
    t2.task_id = 2;
    snprintf(t1.local_file, NAME_LEN, "/home/rss/dump.rdb");
    snprintf(t1.remote_file, NAME_LEN,"/home/rss/dump.rdb");

    snprintf(t2.local_file, NAME_LEN, "/home/rss/download.txt");
    snprintf(t2.remote_file, NAME_LEN,"/home/rss/download.txt");

    task.task_buffer.push_back(t1);
    task.task_buffer.push_back(t2);
    
    download_tasks_pycall(&task);

    return 0;
}
