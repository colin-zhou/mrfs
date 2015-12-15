#include "client_sock.h"

/* ignore the SIGPIPE signal */
void
init_client_socket()
{
	struct sigaction sig;
	bzero(&(sig), sizeof(sig));
	sig.sa_handler = SIG_IGN;
	sigaction(SIGPIPE, &sig, NULL);
}

/* initial the efd e_thd, stop and event_funcs */
sock_client::sock_client():_efd(-1),_e_thd(-1),_stop(0)
{
	bzero(&(ev_func), sizeof(ev_func));
}

/* do nothing */
sock_client::~sock_client()
{

}

/* create a thread run the event_handler */
int
sock_client::start(void)
{
	int ret = 0;
	if (pthread_create(&_e_thd, NULL, &sock_client::event_handler, this)) {
		ret = -1;
	}
	pthread_detach(_e_thd);
	return ret;
}

/* enable the stop sig */
void
sock_client::stop(void)
{
	_stop = 1;
}

/**
 * SO_KEEPALIVE: Enable sending of keep-alive messages on connection-oriented sockets.  Expects an integer boolean flag.
 * This means that you will be able to check your connected socket (also known as TCP sockets), and determine whether 
 * the connection is still up and running or if it has broken.
 * SO_LINGER:     struct linger {
                      int l_onoff;
                      int l_linger;
                  };
 * 
 * SO_RCVBUFF: Sets receive buffer size. This option takes an int value.
 * SO_SNDBUFF: Sets send buffer size. This option takes an int value.
 * SO_REUSEADDR: Specifies that the rules used in validating addresses supplied to bind() should allow reuse of local 
 * addresses, if this is supported by the protocol. This option takes an int value. This is a Boolean option.
 * SO_NODELAY: by default TCP uses Nagle's algorithm to collect small outgoing packets to send all at once. This can have 
 * a detrimental effect on latency.
 */
int sock_client::set_sock_opt(int fd, int opt, int value)
{
	int ret = 0;
	switch(opt) {
		case SOCK_OPT_KEEPALIVE:
			ret = setsockopt(fd, SOL_SOCKET, SO_KEEPALIVE, &value, sizeof(value));
			break;
		case SOCK_OPT_LINGER:
			struct linger so;
			if (value & SO_LINGER_ON) {
				lo.l_onoff = 1;
				lo.l_linger = value & ~SO_LINGER_ON;
			} else {
				lo.l_onoff = 0;
				lo.l_linger = 0;
			}
			ret = setsockopt(fd, SOL_SOCKET, SO_LINGER, &lo, sizeof(lo));
			break;
		case SOCK_OPT_RECVBUFF:
			ret = setsockopt(fd, SOL_SOCKET, SO_RECVBUFF, &value, sizeof(value));
			break;
		case SOCK_OPT_SNDBUFF:
			ret = setsockopt(fd, SOL_SOCKET, SO_SNDBUFF, &value, sizeof(value));
			break;
		case SOCK_OPT_REUSE:
			ret = setsockopt(fd, SOL_SOCKET, SO_REUSEADDR, &value, sizeof(value));
			break;
		case SOCK_OPT_TCPNODELAY:
			ret = setsockopt(fd, IPPROTO_TCP, TCP_NODELAY, &value, sizeof(value));
			break;
	}
	return ret;
}
/**
 * select allow a program to monitor multiple file descriptitors, waiting until one or more of the file 
 * descriptors becomes "ready" for some class of I/O operation(e.g., input possible). A file descriptor is
 * considered ready if it is possible to perform a corresponding I/O operation
 * available for reading, available for writing.
 * the timeout argument specifies the interval that select() should block waiting for a file descriptor to
 * become ready. the call will block until either:
 * 	a file descriptor becomes ready;
 * 	the call is interrupted by a signal handler; or
 * 	the timeout expires.
 * 	
 */
int sock_client::async_connect_check(int fd, int *remain, int trytime)
{
	if (!remain) {
		return -1;
	}
	while(1) {
		struct timeval tv;
		tv.tv_sec = 1;
		tv.tv_usec = 1;
		fd_set wset;
		FD_ZERO(&wset);
		FD_SET(fd, &wset);
		int val = select(fd+1, NULL, &wset, NULL, &tv);
		// timeout
		if (val == 0) {
			if (trytime > 0 && ++(*remain) > trytime) {
				return -1;
			}
			continue;
		} else if(val == -1) {
			log_error("socket connect error %d", errno);
			return -1;
		} else if(FD_ISSET(fd, &wset)) {
			int status;
			socklen_t status_len = sizeof(status);
			if((getsockopt(fd, SOL_SOCKET, SO_ERROR, &status, &status_len) == 0) &&
				status == 0) {
				log_info("socket connect success");
				return 0;
			}
		}
	}
}

int sock_client::connect(const char *dest_ip, unsigned short dest_port, int trytime)
{
	int ret = -1;
	/**
	 * AF_INET: ipv4 internet protocols
	 * SOCK_STREAM: provides sequenced, reliable, two-way, connection-based tyte streams. an out-of-band data transmission mechanism may
	 * be supported.
	 * the protocol specifies a particular protocol to be used with the socket. normally only a single protocol exists to support a particular
	 * socket type within a given protocol family, in whitch case protocol can be specified as 0. 
	 */
	int fd = socket(AF_INET, SOCK_STREAM, 0);
	if (fd <= 0) {
		return -1;
	}
	set_fd_nonblock(fd);
	set_sock_opt(fd, SOCK_OPT_REUSE, SO_REUSE_ON);
	set_sock_opt(fd, SOCK_OPT_LINGER, SO_LINGER_ON);
	struct sockaddr_in addr;
	bzero((char *)&addr, sizeof(addr));
	addr.sin_family = AF_INET;
	inet_aton(dest_ip, &addr.sin_addr);
	addr.sin_port = htons(dest_port);
	int count = 0;
	while(1) {
		// global function, not local namespace
		/**
		 * connects the socket refered bo by the file descriptor sockfd to the address specified by addr. the addrlen argument
		 * specifies the size of addr. the format of the address in addr is determined by the address space of the socket sockfd
		 * if the connection or binding succeeds, zero is returned. on error, -1 is returned, and errno is set appropriately
		 */
                if(::connect(fd, (const struct sockaddr *)&addr, sizeof(addr)) == 0)	{
                        ret =0;
                        break;
                } else {
                        if(errno == EINPROGRESS) {
                                ret = async_connect_check(fd, &count, tries);
                                break;
                        } else if(errno == EISCONN) {
				ret = 0;
				break;
			}
                        /* Re-try(connect) in case of other errors occur,
                         * until a limited re-try times has reached.
                         */
                        if((tries >0) && (++count > tries)) {
                                ret = -1;
                                break;
                        }
                }
                sleep(1);
        } /* End of while(1).*/
        if(ret >= 0) {
                socket_conection_conf_t cnt;
                bzero(&cnt,sizeof(cnt));
                cnt.fd = fd;
                strncpy(cnt.target_addr, dest_ip, sizeof(cnt.target_addr));
                cnt.target_port = cnt.target_port;
                clients_conf.push_back(cnt);
                ep_add_fd(fd);
                return fd;
        }
        return -1;
}

int sock_client::re_connect(int fd, int trytime)
{
	int i;
        socket_conection_conf_t reconnect_conf;
        bzero(&reconnect_conf, sizeof(reconnect_conf));
        for(i=0; i< (int)clients_conf.size(); ++i) {
                if(fd == clients_conf[i].fd) {
                        reconnect_conf = clients_conf[i];
                        break;
                }
        }
        disconnect(fd);
        return this->connect(reconnect_conf.target_addr,
                             reconnect_conf.target_port, tries);
}

int socket_client::disconnect(int fd)
{
        if(fd <0) {
                return -1;
        }
        ep_rm_fd(fd);
        /**
         * close a file descriptor, so that it no longer refers to any file and may be reused. any record locks held on 
         * the file it was associated with, and owned by the process, are removed(regardless of the file descriptor that was
         * used to obtain the lock)
         */
        close(fd);
        for(int i=0; i<(int)clients_conf.size(); ++i) {
                if(fd == clients_conf[i].fd) {
                        clients_conf.erase(clients_conf.begin()+i);
                        break;
                }
        }
        return 0;
}

/*set fd nonblock */
int set_fd_nonblock(int fd)
{
        int flags;
        // get the file access mode and the file status flags
        flags = fcntl(fd, F_GETFL, 0);
        // on error, -1 is returned, and errno is set appropriately.
        if(flags == -1) {
                return -1;
        }
        if(!(flags & O_NONBLOCK)) {
                flags |= O_NONBLOCK;
                // add n_nonblock into flags
                if(fcntl(fd, F_SETFL, flags) == -1) {
                        return -1;
                }
        }
        return 0;
}

int set_fd_block(int fd)
{
        int flags;
        flags = fcntl(fd, F_GETFL, 0);
        if(flags == -1) {
                return -1;
        }
        if((flags & O_NONBLOCK)) {
        	// remove n_nonblock in the flags
                flags ^= O_NONBLOCK;
                if(fcntl(fd, F_SETFL, flags) == -1) {
                        return -1;
                }
        }
        return 0;
}
/**
 * bind the function to ev_func
 */
void socket_client::event_register(int event, event_func_t func)
{
        if(event >= EVT_NUM) {
                ASSERT(0);
                log_error("Unsupported event type:%d\n", event);
                return;
        }
        ev_func[event] = func;
}

/**
 * either success or not this function returns the characters send
 */
int socket_client::write_with_blocking(int fd, char *buff, size_t size)
{
        int len = 0, written;
        if(buff == NULL || size == 0) {
                return 0;
        }
        do {
        	// the send call may be used only when the socket is in a connected state (so that the intended recipient is known).
        	// the only difference between send and write is the presence flags.
        	// on success, these calls return the number of bytes send. on error, -1 is returned and errno is set appropriately.
                written = ::send(fd, buff, size - len, 0);
                if(written >= 0) {
                        len += written;
                        buff +=written;
                } else if(written == -1) {
                        if(errno  == EAGAIN || errno == EINTR) {
                                usleep(1);
                                continue;
                        }
                        return len;
                }
        } while(len < (int)size);
        return len;
}

/**
 * EPOLLIN:   The associated file is available for read(2) operations.
 * EPOLLET:   Sets the Edge Triggered behavior for the associated file
	      descriptor.  The default behavior for epoll is Level
	      Triggered.  See epoll(7) for more detailed information about
	      Edge and Level Triggered event distribution architectures.
 * EPOLLRDHUP: Hang up happened on the associated file descriptor.
              epoll_wait(2) will always wait for this event; it is not
              necessary to set it in events.  Note that when reading from a
              channel such as a pipe or a stream socket, this event merely
              indicates that the peer closed its end of the channel.
              Subsequent reads from the channel will return 0 (end of file)
              only after all outstanding data in the channel has been
              consumed.
 * EPOLLHUP:  Stream socket peer closed connection, or shut down writing
              half of connection.  (This flag is especially useful for
              writing simple code to detect peer shutdown when using Edge
              Triggered monitoring.) 
 * EPOLLERR:  Error condition happened on the associated file descriptor.
              epoll_wait(2) will always wait for this event; it is not
              necessary to set it in events.
 * 
 */
int  socket_client::ep_add_fd(int f)
{
        if(_efd <0 || f <0) {
                return -1;
        }
        struct epoll_event ev;
        bzero(&ev,sizeof(ev));
        ev.events = EPOLLIN | EPOLLET | EPOLLRDHUP | EPOLLHUP | EPOLLERR;
        ev.data.fd = f;
        if(epoll_ctl(_efd, EPOLL_CTL_ADD, f, &ev) == -1) {
                return -1;
        }
        return 0;
}
/**
 * int epoll_ctl(int epfd, int op, int fd, struct epoll_event *event)
 * 
 * this system call performs control operations on the epoll instance referred to by the
 * file descriptor epfd. it requests that the operation op be performed for the target file despriptor,fd
 * typedef union epoll_data {
 * 	void *ptr;
 * 	int fd;
 * 	uint32_t u32;
 * 	uint64_t u64;
 * }epoll_data_t;
 * 
 * struct epoll_event {
 * uint32_t events;
 * epoll_data_t data;
 * };
 */
int  socket_client::ep_rm_fd(int f)
{
        if(_efd <0 || f <0) {
                return -1;
        }
        struct epoll_event ev;
        ev.events = EPOLLIN | EPOLLET | EPOLLRDHUP | EPOLLHUP | EPOLLERR;
        ev.data.fd =f;
        if(epoll_ctl(_efd, EPOLL_CTL_DEL, f, &ev) == -1) {
                return -1;
        }
        return 0;
}

/**
 * the argument is socket_client entity
 * 
 */
void *socket_client::event_handler(void *arg)
{
        socket_client *sock = (socket_client *)arg;
        if(sock == NULL) {
                return NULL;
        }
        /**
         * It marks the file descriptor so that it will be close()d automatically when the process or any children it fork()s calls one of the exec*() 
         * family of functions. This is useful to keep from leaking your file descriptors to random programs run by e.g. system().
         */
        int efd = epoll_create1(EPOLL_CLOEXEC);
        if(efd == -1) {
                return NULL;
        }
        sock->_efd = efd;
        //sock->ep_add_fd();
        struct epoll_event events[MAX_LISTEN_CLIENT];
        int nfds,ret;
        while(1) {
        	// wait for events on the epoll instance referred to by the file descriptor epfd. the memory area pointed to by events will contain
        	// the events that will be available for the caller.
                nfds = epoll_wait(efd, events, MAX_LISTEN_CLIENT, -1);
                if(nfds == -1) {
                        if(errno == EINTR) {
                                continue;
                        }
                        log_trace("[ERROR] epoll wait:%s\n", strerror(errno));
                }
                int i;
                event_func_t func;
                for(i = 0; i < nfds; i++) {
                        if(!(events[i].events & EPOLLIN)) {
                        	// error happened
                                if(events[i].events & EPOLLERR) {
                                        if((func = sock->ev_func[socket_client::EVT_ERROR])!=0) {
                                                func(&events[i].data.fd);
                                        }
                                } else if(events[i].events & (EPOLLHUP|EPOLLRDHUP)) {
                                        int discnt_fd= events[i].data.fd;
                                        log_debug("[DEBUG] HUP\n");
                                        if((func = sock->ev_func[socket_client::EVT_DISCON])!=0) {
                                                func(&discnt_fd);
                                        }
                                        if(sock->_stop) {
                                                break;
                                        }
                                        //auto reconnect
                                        sock->re_connect(discnt_fd,10);
                                }
                        } else if(events[i].events & EPOLLIN) {
                                if((func = sock->ev_func[socket_client::EVT_READ])!=0) {
                                        ret = func(&events[i].data.fd);
                                        /* TODO:
                                         *  More error conditions can be added.
                                         */
                                        if(ret == -ECONNRESET) {
                                                log_debug("[DEBUG] ECONNRESET \n");
                                                sock->re_connect(events[i].data.fd,10);
                                        }
                                }
                        }
                }
                if(sock->_stop !=0) {
                        break;
                }
        }
        close(efd);
        sock->_efd=-1;
        return NULL;
}
int socket_client::is_disconnected(int fd)const
{
        long size;
        // Get the number of bytes in the input buffer.
        // there is some data in the input buffer
        return (ioctl(fd, FIONREAD, &size) != 0);
}