#include <pthread.h>
#include <sys/epool.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <sys/ioctl.h>
#include <netinet/in.h>


enum {MAX_LISTEN_CLIENT=5};
#define ADDR_LEN 64

struct socket_cfg_t {
	int fd;
	char src_addr[ADDR_LEN];
	uint16_t src_port;
	char des_addr[ADDR_LEN];
	uint16_t des_port;
	uint8_t protocol;
};

int set_sock_block(int fd);
int set_sock_nonblock(int fd);

class sock_client {
public:
	typedef int (*event_func_t)(void *args);
	enum {
		EVT_WRITE = 0,
		EVT_READ,
		EVT_DISCON,
		EVT_ERROR,
		EVT_NUM
	};
	sock_client();
	~sock_client();
public:
	void event_register(int event, event_func_t func);
	int connect(const char *dest_ip, unsigned short dest_port, int try_time);
	int re_connect(int fd, int try_time);
	int dis_connect(int fd);

	int start(void);
	int stop(void);

	static int block_write(int fd, char *buff, int buff_size);
	int set_sock_opt(int fd, int opt, int value);
	int get_sock_opt(int fd, int opt, int *optvalue) const;

	int is_disconnect(int fd) const;
private:
	static int async_connect_check(int fd) const;
	int ep_add_fd(int fd);
	int rm_add_fd(int fd);
protected:
	static void *event_handler(void *argv);
private:
	int _efd;
	pthread_t _e_thd;
	int _stop;
	unsigned _optval;

	std::vector<struct socket_cfg_t> client_cfgs;
	event_func_t ev_func[EVT_NUM];
};

void
init_socket_client();
