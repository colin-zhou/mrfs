#include "client_sock.h"

socket_client::socket_client() :
        _efd(-1),
        _ep_thd(0),
        _stop(0)
{
        bzero(ev_func,sizeof(ev_func));
}

socket_client::~socket_client()
{
}

int socket_client::start(void)
{
        int ret = 0;
        if(pthread_create(&_ep_thd, NULL,
                          &socket_client::event_handler, this) != 0) {
                ret  = -1;
        }
        pthread_detach(_ep_thd);
        return ret;
}

void socket_client::stop(void)
{
        _stop = 1;	/* Not thread-safe. */
        /* TODO:Disconnect all clients. */
        //	disconnect();
}

int socket_client::set_sockopt(int fd ,int opt, int value)
{
        int ret = 0;
        switch(opt) {
                case SOCK_OPT_KEEPALIVE:
                        ret = setsockopt(fd, SOL_SOCKET, SO_KEEPALIVE,
                                         &value, sizeof(value));
                        break;
                case SOCK_OPT_LINGER: {
                        struct linger lo;
                        if(value & SO_LINGER_ON) {
                                lo.l_onoff = 1;
                                lo.l_linger = value & ~SO_LINGER_ON;
                        } else {
                                lo.l_onoff = 0;
                                lo.l_linger = 0;
                        }
                        ret = setsockopt(fd, SOL_SOCKET, SO_LINGER,
                                         &lo, sizeof(lo));
                }
                break;
                case SOCK_OPT_RECVBUF:
                        ret = setsockopt(fd, SOL_SOCKET, SO_RCVBUF,
                                         &value, sizeof(value));
                        break;
                case SOCK_OPT_SNDBUF:
                        ret = setsockopt(fd, SOL_SOCKET, SO_SNDBUF,
                                         &value, sizeof(value));
                        break;
                case SOCK_OPT_REUSE:
                        ret = setsockopt(fd, SOL_SOCKET, SO_REUSEADDR,
                                         &value, sizeof(value));
                        break;
                case SOCK_OPT_TCPNODELAY:
                        ret = setsockopt(fd, IPPROTO_TCP, TCP_NODELAY,
                                         &value, sizeof(value));
                        break;
                default:
                        break;
        }
        return ret;
}
/* @brief Check asynchrouious connection state.
 * @ret 0  Sucessfully connected.
 * @ret <0 Failed.
 *
 * */
int
socket_client::async_connect_check(int fd, int *remain, int max_tries)
{
        if(!remain) {
                return -1;
        }
        while(1) {
                struct timeval tv;
                tv.tv_sec = 1;
                tv.tv_usec = 0;
                fd_set wset;
                FD_ZERO(&wset);
                FD_SET(fd, &wset);
                int val = select(fd+1, NULL, &wset, NULL, &tv);
                if(val == 0) {
                        /* Timeout, will be checked again. */
                        if((max_tries>0) && (++(*remain)> max_tries)) {
                                return -1;
                        }
                        continue;
                } else if(val == -1) {
                        log_error("socket connect error:%d", errno);
                        return -1;
                } else  if(FD_ISSET(fd, &wset)) {
                        int status;
                        socklen_t status_len = sizeof(status);
                        if((getsockopt(fd, SOL_SOCKET, SO_ERROR,
                                       &status, &status_len) == 0) &&
                           (status == 0)) {
                                log_info("socket connect success.");
                                return 0;
                        }
                }
        }
        return 0;
}

/*
 * @param dest_ip : destination IP address  eg. "192.168.1.1"
 * @param dest_port:  destination Port
 * @param  tries: re-connect times,
 * 		<=0: try infinite times.
 * 		>0: try definite times.
 * @ret  -1: Error
 * 	 >0: socket file descriptor.
 */
int socket_client::connect(const char *dest_ip, unsigned short dest_port,
                           int tries)
{
        int ret= -1;
        int fd = socket(AF_INET, SOCK_STREAM, 0);
        if(fd <= 0) {
                return -1;
        }
        set_fd_nonblock(fd);
        set_sockopt(fd,SOCK_OPT_REUSE, SO_REUSE_ON);
        set_sockopt(fd,SOCK_OPT_LINGER, SO_LINGER_ON);
        //set_sockopt(fd, SOCK_OPT_TCPNODELAY, 1);
        struct sockaddr_in addr;
        bzero((char *)&addr, sizeof(addr));
        addr.sin_family = AF_INET;
        inet_aton(dest_ip, &addr.sin_addr);
        addr.sin_port = htons(dest_port);
        int count = 0;
        while(1) {
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
        if(ret >=0) {
                socket_conection_conf_t cnt;
                bzero(&cnt,sizeof(cnt));
                cnt.fd =fd;
                strncpy(cnt.target_addr, dest_ip, sizeof(cnt.target_addr));
                cnt.target_port = cnt.target_port;
                clients_conf.push_back(cnt);
                ep_add_fd(fd);
                return fd;
        }
        return -1;
}

int socket_client::re_connect(int fd, int tries)
{
        /* Find previous connection data. */
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
        close(fd);
        for(int i=0; i<(int)clients_conf.size(); ++i) {
                if(fd == clients_conf[i].fd) {
                        clients_conf.erase(clients_conf.begin()+i);
                        break;
                }
        }
        return 0;
}
int set_fd_nonblock(int fd)
{
        int flags;
        flags = fcntl(fd, F_GETFL, 0);
        if(flags == -1) {
                return FAILURE;
        }
        if(!(flags & O_NONBLOCK)) {
                flags |= O_NONBLOCK;
                if(fcntl(fd, F_SETFL, flags) == -1) {
                        return FAILURE;
                }
        }
        return SUCCESS;
}
int set_fd_block(int fd)
{
        int flags;
        flags = fcntl(fd, F_GETFL, 0);
        if(flags == -1) {
                return FAILURE;
        }
        if((flags & O_NONBLOCK)) {
                flags ^= O_NONBLOCK;
                if(fcntl(fd, F_SETFL, flags) == -1) {
                        return FAILURE;
                }
        }
        return SUCCESS;
}
void socket_client::event_register(int event, event_func_t func)
{
        if(event >= EVT_NUM) {
                ASSERT(0);
                log_error("Unsupported event type:%d\n", event);
                return;
        }
        ev_func[event] = func;
}
int socket_client::write_with_blocking(int fd, char *buff, size_t size)
{
        int len = 0, written;
        if(buff == NULL || size == 0) {
                return 0;
        }
        do {
                written = ::send(fd, buff, size - len, 0);
                if(written >= 0) {
                        len += written;
                        buff +=written;
                } else if(written == -1) {
                        if(errno  == EAGAIN || errno == EINTR) {
                                usleep(1);
                                continue;
                        }
                        /* In case of EPIPE, len will return 0. */
                        return len;
                }
        } while(len < (int)size);
        return len;
}
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
void *socket_client::event_handler(void *arg)
{
        socket_client *sock = (socket_client *)arg;
        if(sock == NULL) {
                return NULL;
        }
        int efd = epoll_create1(EPOLL_CLOEXEC);
        if(efd == -1) {
                return NULL;
        }
        sock->_efd = efd;
        //sock->ep_add_fd();
        struct epoll_event events[MAX_LISTEN_CLIENT];
        int nfds,ret;
        while(1) {
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
        return (ioctl(fd, FIONREAD, &size) != 0);
}
/**  TODO:
 * 1) disconnect  all clients when _stop==1 in ep_thread.
 * 2) writing with socket outside epoll_wait thread is not thread-safe.
 * 3) re-connect while server quit.
 *
 * NOTE: socket_client should be create statically.
 *   otherwise socket_client instance will be destructed while waiting on epoll.
 */
