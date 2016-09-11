#pragma  once
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


enum {MAX_LISTEN_CLIENT=5};

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
#define SO_REUSE_ON		0x01
#define SO_TCPNODELAY_ON	0x01
#define SO_LINGER_ON		0x80000000

#if !defined(ADDR_LEN)
#define ADDR_LEN (64)
#endif

typedef struct {
	int fd;			/* Socket file descriptor. */
	char src_addr[ADDR_LEN];
	uint16_t src_port;
	char target_addr[ADDR_LEN];
	uint16_t target_port;
	uint8_t protocol;	/* TCP/UDP. */
} socket_conection_conf_t;


int set_fd_nonblock(int fd);
int set_fd_block(int fd);
class socket_client
{
public:
	typedef int (*event_func_t)(void *arg);
	enum {
		EVT_WRITE = 0,
		EVT_READ,
		EVT_ERROR,
		EVT_DISCON,
		EVT_NUM
	};
	socket_client();
	~socket_client();

public:
	void event_register(int event, event_func_t func);
	int connect(const char *dest_ip, unsigned short dest_port, int tries);
	int re_connect(int fd, int tries);
	int disconnect(int fd);
	/* actions */
	int start(void);
	void stop(void);
	//void run(void);
	static int write_with_blocking(int fd, char *buff, size_t size);
	/* Options */
	int set_sockopt(int fd, int opt, int value);
	int get_sockopt(int fd, int opt, int *optval) const;

	int is_disconnected(int fd)const;
private:
        static int async_connect_check(int fd, int *remain, int max_tries);
	int  ep_add_fd(int f);
	int  ep_rm_fd(int f);

protected:
	static void *event_handler(void *argv);

private:
	int _efd;// epoll fd
	pthread_t _ep_thd;
	/* TODO: Vector can be change to HASH. */
	std::vector<socket_conection_conf_t> clients_conf;
	event_func_t ev_func[EVT_NUM];
	/*
	//int _fd; //client socket fd
	unsigned int _sip;
	unsigned int _dip;
	unsigned short _sport;
	unsigned short _dport;
	short _proto;
	*/
	int _stop;
	unsigned int _optval;
	//void *user_data;
};

void 
print_hex(const char *buff ,size_t buff_len);


