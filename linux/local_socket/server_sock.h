#pragma once
#include "headers.h"
#include <sys/epoll.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <linux/tcp.h>
#include <unistd.h>
#include <fcntl.h>
#include <pthread.h>
#include <arpa/inet.h>
#include <sys/ioctl.h>
#include <signal.h>
#include <errno.h>
#include <strings.h>
#include <stdio.h>
#include <iostream>
#include <string.h>

enum {MAX_LISTEN_CLIENT = 5};

#if !defined(FAILURE)
#define FAILURE (-1)
#endif

#if !defined(SUCCESS)
#define SUCCESS (0)
#endif

enum {
	SOCK_OPT_KEEPALIVE = 0x01,
	SOCK_OPT_LINGER = 0x02,
	SOCK_OPT_RECVBUF = 0x04,
	SOCK_OPT_SNDBUF = 0x08,
	SOCK_OPT_REUSE = 0x10,
	SOCK_OPT_TCPNODELAY = 0x20,
};

#define SO_KEEPALIVE_ON		0x01
#define SO_REUSE_ON	    	0x01
#define SO_TCPNODELAY_ON	0x01
#define SO_LINGER_ON		0x80000000

#if !defined(ADDR_LEN)
#define ADDR_LEN (64)
#endif

int set_fd_nonblock(int fd);
int set_fd_block(int fd);

class socket_server
{
public:
    typedef int (*event_func_t)(void *arg);
    enum {
        EVT_READ = 0,
        EVT_NUM
    }
    socket_server();
    ~socket_server();

public:
    void event_register(int event, event_func_t func);
    int get_sockopt(int fd, int opt, int *optval) const;
    int start(void);
    int stop(void);
    int set_sockopt(int fd, int opt, int value);

private:
    int _efd; // epoll fd
    pthread_t _ep_thd;
    event_func_t ev_func[EVT_NUM];
    unsigned int _optval;
};
