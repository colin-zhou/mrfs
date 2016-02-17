#include <pthread.h>
#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <unistd.h>
#include "download.h"

void * print_thread(void *p)
{
    while(1) {
        sleep(1);
        printf("print loop\n");
    }
    pthread_exit(NULL);
}
int
main()
{
    start_download_thread();
    remote_file_t rf;
    snprintf(rf.host, NAME_LEN, "192.168.1.21");
    snprintf(rf.path_file, NAME_LEN, "/home/rss/Public/text.txt");
    local_file_t lf;
    snprintf(lf.path_file, NAME_LEN, "/home/rss/workspace/text.t");
    ssh_conn_params_t sshp;
    snprintf(sshp.host, NAME_LEN, "192.168.1.21");
    snprintf(sshp.port, NAME_LEN, "22");
    snprintf(sshp.user, NAME_LEN, "rss");
    snprintf(sshp.password, NAME_LEN, "123456");
    printf("0 init conn ret = %d\n", init_ssh_connection(&sshp));
    printf("1 download ret = %d\n", download_file(&rf, &lf));
    lf.path_file[strlen(lf.path_file)-1] = 'a';
    printf("2 download ret = %d\n", download_file(&rf, &lf));
    lf.path_file[strlen(lf.path_file)-1] = 'b';
    printf("3 download ret = %d\n", download_file(&rf, &lf));
    lf.path_file[strlen(lf.path_file)-1] = 'c';
    printf("4 download ret = %d\n", download_file(&rf, &lf));
    return 0;
}