#include "server_sock.h"

socket_server::socket_server() :
    _efd(-1),
    _ep_thd(0)
{
    bzero(ev_func, sizeof(ev_func));
}

socket_server::~socket_server()
{
}

int socket_server::start(void)
{
    int ret = 0;
    if(pthread_create(&_ep_thd, NULL,
                      &socket_server::event_handler, this) != 0)
    {
        ret = -1;
    }
    pthread_detach(_ep_thd);
    return ret;
}

void socket_server::stop(void)
{
    _stop = 1;
}

int socket_server::set_sockopt(int fd, int opt, int value)
{
    int ret = 0;
    switch(opt) {
        case SOCK_OPT_KEEPALIVE:
            ret = setsockopt(fd, SOL_SOCKET, SO_KEEPALIVE,
                             &value, sizeof(value));
            break;
        case SOCK_OPT_LINGER: 
            struct linger lo;
            if(value & SO_LINGER_ON) {
                lo.l_onoff = 1;
                lo.l_linger = value & ~SO_LINGER_ON;
            } else {
                lo.l_onoff = 0;
                lo.l_linger = 0;
            } ret = setsockopt(fd, SOL_SOCKET, SO_LINGER,
                             &lo, sizeof(lo));
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
            ret = setsockopt(fd, IPPROTO_TCP, TCP_NODEALY,
                             &value, sizeof(value));
            break;
        default:
            break;
    }
    return ret;
}

void socket_server::event_register(int event, event_func_t func)
{
        if(event >= EVT_NUM) {
                ASSERT(0);
                log_error("Unsupported event type:%d\n", event);
                return;
        }
        ev_func[event] = func;
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

void *socket_server::event_handler(void *arg)
{       
        struct sockaddr_un local;
        struct sockaddr_un remote;
        int serverfd = socket(AF_UNIX, SOCK_STREAM | SOCK_NONBLOCK, 0);
        if (serverfd < 0) {
            log_error("socket call failed: %s", strerror(errno));
            return NULL;
        }
        socket_server *sock = (socket_client *)arg;
        if (sock == NULL) {
            log_error("event_handler argument shouldn't been null");
            return NULL;
        }
        bzero(&local, sizeof(local));
        local.sun_family = AF_UNIX;
        strcpy(local.sun_path, SOCK_PATH);
        unlink(local.sun_path);
        len = strlen(local.sun_path) + sizeof(local.sun_family); 
        if (bind(serverfd, (struct sockaddr*)&local, len) < 0) {
            log_error("bind serverfd to local failed: %s", strerror(errno));
            close(serverfd);
            return NULL;
        }
        if (listen(serverfd, MAX_LISTEN_CLIENT) < 0) {
            log_error("listen serverfd error: %s", strerror(errno)); 
            return NULL;
        }
        int efd = epoll_create1(EPOLL_CLOEXEC);
        if (efd == -1) {
            log_error("epoll_create1 error: %s", strerror(errno));
            return NULL;
        }
        sock->_efd = efd;
        if (ep_add_fd(serverfd) != 0) {
            log_error("ep_add_fd serverfd error: %s", strerror(errno));
            return NULL;
        }

        struct epoll_event events[MAX_LISTEN_CLIENT];
        int nfds, ret;
        while (1) {
            nfds = epoll_pwait(efd, events, MAX_LISTEN_CLIENT, -1);
            if (nfds < 0) {
                if (errno == EINTER) {
                    continue;
                }
                // TODO: recreate the socketfd
                log_trace("[ERROR] epoll wait: %s", strerror(errno));
            }
            for (int i = 0; i < nfds; i++) {
                // client connect response event
                if(events[i].data.ptr == &serverfd) {
                    int connfd;
                    if(events[i].events & EPOLLHUP || events[i].events & EPOLLERR) {
                       /*
                        * EPOLLHUP and EPOLLERR are always monitored.
                        */
                        log_error("serverfd error: %s", strerror(errno));
                        close(serverfd);
                        // TODO: recreate the socketfd
                        continue;
                    }
                    /*
                     * New client connection is available. Call accept.
                     * Make connection socket non blocking.
                     */
                    len = sizeof(remote);
                    connfd = accept(serverfd, (struct sockaddr*)&remote, &len);

                    if (-1 == connfd) {
                        log_error("epoll accept failed.%s", strerror(errno));
                    } else {
                        log_trace("epoll accept success");
                        set_fd_nonblock(connfd);
                        ep_add_fd(connfd);
                    }
                // client send response event 
                } else {
                    if(events[i].events & EPOLLHUP || events[i].events & EPOLLERR) {
                        event_t *ev = (event_t *) events[i].data.ptr;
                        log_trace("closing connection socket: %d", ev->fd);
                        close(ev->fd);
                    } else if(EPOLLIN == events[i].events) {
                        event_t* ev = (event_t *) events[i].data.ptr;
                        ev->event = EPOLLIN;
                        ev_func[socket_server::EVT_READ](ev);
                    }
                   /* 
                    else if(EPOLLOUT == events[i].events) {
                       event_t* ev = (event_t*) events[i].data.ptr;
                       ev->event = EPOLLOUT;
                    }
                   */
                }
            }
            if (_stop) {
                break;
            }
        }
        close(efd);
        sock->_efd = -1;
        return NULL;
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
