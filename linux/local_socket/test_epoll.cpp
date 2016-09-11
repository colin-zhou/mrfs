#include <stdio.h>
#include <sys/epoll.h>

#include "server_sock.h"
#include "trader_protocol.h"

int handler(void *arg)
{
    event_t *ev = (event_t *)arg;
    bss_alert_t ret;
    int n = read(arg->data.fd, ret, sizeof(ret)); 
    if (n < 0) {
        perror("read");
        return -1;
    }
    printf("pid = %d\n", ret.pid);
    printf("type = %d\n", ret.type);
    printf("errcode = %d\n", ret.errcode);
    printf("extra_info = %s\n", ret.extra_info);
    return 0;
}

int main()
{
    socket_server ss;
    ss.event_register(0, handler);
    ss.start();
    while(1) {
        sleep(10);
    }
    return 0;    
}
