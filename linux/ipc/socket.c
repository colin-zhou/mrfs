#include <pthread.h>
#include <netinet/in.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <unistd.h>
#include <arpa/inet.h>

static char *message;

void * recv_data(void *input)
{
    printf("recv data\n");
    int serverfd, connfd;
    struct sockaddr_in serveraddr;
    serverfd = socket(AF_INET, SOCK_STREAM, 0);
    bzero(&serveraddr, sizeof(serveraddr));
    serveraddr.sin_family = AF_INET;
    serveraddr.sin_addr.s_addr = htonl(INADDR_ANY);
    serveraddr.sin_port = htons(10001);
    bind(serverfd, (struct sockaddr *)&serveraddr, sizeof(serveraddr));
    listen(serverfd, 10);
    char buf[1024];
    int len;
    for(;;) {
        printf("wait\n");
        connfd = accept(serverfd, (struct sockaddr*) NULL, NULL);
        len = recv(connfd, buf, 100, MSG_WAITALL); 
        printf("recv data now %d\n", len);
        printf("msg %s, size %d\n", (char *) buf, len);
        break;
    }
    close(connfd);
    close(serverfd);
    printf("send \n");
    return NULL;
}

void * send_data(void *input)
{
    printf("send data\n");
    int clientfd;
    struct sockaddr_in clientaddr;
    clientfd = socket(AF_INET, SOCK_STREAM,0);
    bzero(&clientaddr, sizeof(clientaddr));
    clientaddr.sin_port = htons(10001);
    clientaddr.sin_family = AF_INET;
    clientaddr.sin_addr.s_addr = inet_addr("127.0.0.1");

    printf("into send\n");
    if (connect(clientfd, (struct sockaddr *)&clientaddr, sizeof(clientaddr)) < 0) {
        perror("connect failed\n");
        exit(1);
    }
    int len;
    len = send(clientfd, (void *)message, strlen(message), 0);
    if (len <= 0) {
        perror("send none data");
        exit(1);
    }
    printf("send data success \n");
    close(clientfd);
    return NULL;
}

int main(int argc, char *argv[])
{
    if (argc == 2) {
        message = argv[1];
    } else {
        printf("you should provide one arguments\n");
        exit(1);
    }
    int ret;
    pthread_t tid1, tid2;
    ret = pthread_create(&tid2, NULL, recv_data, NULL);
    if (ret != 0) {
        printf("create thread failed recv\n");
    }
    ret = pthread_create(&tid1, NULL, send_data, NULL);
    if (ret != 0) {
        printf("create thread failed send\n");
    }
    pthread_join(tid1, NULL);
    pthread_join(tid2, NULL);
    pthread_exit(0);
}
