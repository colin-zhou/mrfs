#include <stdio.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <sys/un.h>
#define UNIX_DOMAIN "/tmp/unix.domain"

int main(void)
{
    socklen_t clt_addr_len;
    int listen_fd;
    int com_fd;
    int ret;
    int i;
    static char recv_buf[1024];
    int len;
    struct sockaddr_un clt_addr;
    struct sockaddr_un srv_addr;
    listen_fd = socket(PF_LOCAL, SOCK_STREAM, 0);
    if (listen_fd < 0) {
        perror("cannot create communication socket");
        return 1;
    }

    // set server addr_param
    srv_addr.sun_family = AF_LOCAL;
    strncpy(srv_addr.sun_path, UNIX_DOMAIN, sizeof(srv_addr.sun_path) - 1);
    unlink(UNIX_DOMAIN);
    ret = bind(listen_fd, (struct sockaddr*)&srv_addr, sizeof(srv_addr));
    if (ret < 0)
    {
        perror("cannot bind server socket");
        close(listen_fd);
        unlink(UNIX_DOMAIN);
        return 1;
    }
    len = sizeof(clt_addr);
    com_fd = accept(listen_fd, (struct sockaddr*)&clt_addr, &len);
    if (com_fd < 0) {
        perror("cannot accept client connect request");
        close(listen_fd);
        unlink(UNIX_DOMAIN);
        return 1;
     }
     printf("\n========info======\n");
     for (i = 0; i < 4; i++) {
        memset(recv_buf, 0, 1024);
        int num = read(com_fd, recv_buf, sizeof(recv_buf));
        printf("Message from client(%d)) : %s\n", num, recv_buf);
     }
     close(com_fd);
     close(listen_fd);
     unlink(UNIX_DOMAIN);
     return 0;
}
       
