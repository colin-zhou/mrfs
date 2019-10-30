#include <unistd.h>
#include <stdio.h>
#include <string.h>
#include <fcntl.h>
#include <netdb.h>
#include <netinet/in.h>
#include <sys/socket.h>
#include <sys/types.h>
#include <sys/time.h>
#include <stdlib.h>
#include <iostream>
#include <errno.h>
#include <mxml.h>

#include "web_api.h"

#define N_BACKLOG 64
#define MAXFDS 128
#define MAX_HDL_CNT 10
#define MAX_MSG_SIZE 4096
#define WEB_SOCK_TIMEOUT 500

using std::cout;
using std::endl;
using std::cerr;

/**
 * msg contain three parts type, length, body
 * body is of xml format.
 */

typedef struct {
        int type;
        int size;
        char m[0];
} recv_fmt_t;

typedef union {
        char msg[MAX_MSG_SIZE + sizeof(recv_fmt_t)];
        recv_fmt_t data;
} recv_t;

typedef struct {
        int epollfd;
        int listenfd;
        struct epoll_event accept_event;
        struct epoll_event events[MAXFDS];
        std::unordered_map < int, recv_t > msg_ctx_map;
} web_connect_t;

web_connect_t conn;
web_api_hdl_t hdl_arr[MAX_HDL_CNT];

static void perror_die(const char *msg)
{
        perror(msg);
        exit(EXIT_FAILURE);
}

static void drop_connection(int fd)
{
        if (epoll_ctl(conn.epollfd, EPOLL_CTL_DEL, fd, NULL) < 0) {
                perror_die("epoll_ctl del");
        }
        auto iter = conn.msg_ctx_map.find(fd);
        if (iter != conn.msg_ctx_map.end()) {
                conn.msg_ctx_map.erase(iter);
        }
        // try to close the socket
        close(fd);
        cout << "fd " << fd << " already disconnected" << endl;
}

static void send_or_timeout(int fd, void *buf, int size, int timeout)
{
        int sendbytes = 0;
        int idx = 0;
        if (size == 0)
                return;
        struct timeval start, end;
        gettimeofday(&start, NULL);
        while (1) {
                sendbytes = send(fd, (void *)((uint8_t *)buf + idx), size - idx, 0);
                if (-1 == sendbytes) {
                        // connection lost
                        drop_connection(fd);
                } else if (0 == sendbytes) {
                        if (errno == EAGAIN || errno == EWOULDBLOCK) {
                                // wait for next operation
                                cout << "not valid" << endl;
                                continue;
                        } else {
                                // drop this connection now
                                drop_connection(fd);
                        }
                } else {
                        idx += sendbytes;
                }
                if (size - idx == 0) {
                        break;
                }
                gettimeofday(&end, NULL);
                if ((end.tv_sec - start.tv_sec) * 1000 + (end.tv_usec - end.tv_usec) / 1000 >= timeout) {
                        // timeout and drop the connection
                        drop_connection(fd);
                        return;
                }
        }
}

static int recv_or_timeout(int fd, void *buf, int size, int timeout)
{
        int recvbytes = 0;
        int idx = 0;
        if (size == 0)
                return 0;
        struct timeval start, end;
        gettimeofday(&start, NULL);
        while (1) {
                recvbytes = recv(fd, (void *)((uint8_t *)buf + idx), size - idx, 0);
                cout << fd << " recv size " << recvbytes << " prepare size " << size - idx << endl;
                if (-1 == recvbytes) {
                        // connection lost
                        drop_connection(fd);
                        return -1;
                } else if (0 == recvbytes) {
                        if (errno == EAGAIN || errno == EWOULDBLOCK) {
                                // wait next recv
                                cout << "not valid" << endl;
                                continue;
                        } else {
                                // drop the connection
                                drop_connection(fd);
                                return -1;
                        }
                } else {
                        idx += recvbytes;
                }
                if (size - idx == 0) {
                        // finished
                        break;
                }
                gettimeofday(&end, NULL);
                if ((end.tv_sec - start.tv_sec) * 1000 + (end.tv_usec - end.tv_usec) / 1000 >= timeout) {
                        // timeout and drop the connection
                        drop_connection(fd);
                        return -1;
                }
        }
        return 0;
}

static void proc_msg(int fd, recv_t * rd)
{
        char success[] = "ok";
        char failed[] = "failed";
        int ret = 0;
        // cout << "the msg type is " << rd->data.type << endl;
        // cout << "the msg size is " << rd->data.size << endl;
        if (rd && rd->data.size != 0 && rd->data.size < MAX_MSG_SIZE) {
                int type = rd->data.type;
                if (type >= 0 && type < MAX_HDL_CNT && hdl_arr[type]) {
                        ret = hdl_arr[type] (type, rd->data.size, (void *) rd->data.m);
                        if (ret == 0) {
                                // send back ok
                                send_or_timeout(fd, success, sizeof(success), WEB_SOCK_TIMEOUT);
                        } else {
                                // send back error
                                send_or_timeout(fd, failed, sizeof(failed), WEB_SOCK_TIMEOUT);
                        }
                }
        }
}

static std::string get_string_value(mxml_node_t *node, const std::string &sub_node_name)
{
        const char *v = NULL;
        mxml_node_t *sub_node = mxmlFindPath(node, sub_node_name.c_str());
        if (sub_node == NULL)
        {
                //printf("can't get node <%s>\n", sub_node_name.c_str());
                return "";
        }
        if ((v = mxmlGetOpaque(sub_node)) == NULL)
        {
                //printf("empty in node <%s>\n", sub_node_name.c_str());
                return "";
        }
        return v;
}

static void listen_inet_socket(int portnum)
{
        int sockfd = socket(AF_INET, SOCK_STREAM, 0);
        if (sockfd < 0) {
                perror_die("ERROR opening socket");
        }
        // This helps avoid spurious EADDRINUSE when the previous instance of this server died.
        int opt = 1;
        if (setsockopt(sockfd, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(opt)) <
            0) {
                perror_die("setsockopt");
        }

        struct sockaddr_in serv_addr;
        memset(&serv_addr, 0, sizeof(serv_addr));
        serv_addr.sin_family = AF_INET;
        serv_addr.sin_addr.s_addr = INADDR_ANY;
        serv_addr.sin_port = htons(portnum);

        if (bind(sockfd, (struct sockaddr *) &serv_addr, sizeof(serv_addr)) <
            0) {
                perror_die("ERROR on binding");
        }

        if (listen(sockfd, N_BACKLOG) < 0) {
                perror_die("ERROR on listen");
        }
        conn.listenfd = sockfd;
}

static void on_peer_ready_recv(int sockfd)
{
        auto iter = conn.msg_ctx_map.find(sockfd);
        if (iter == conn.msg_ctx_map.end()) {
                recv_t m = {0};
                conn.msg_ctx_map[sockfd] = m;
        }
        auto &msg = conn.msg_ctx_map[sockfd];
        memset(&msg, 0, sizeof(recv_t));
        int ret = 0;
        ret = recv_or_timeout(sockfd, (void *)&msg, sizeof(recv_fmt_t), WEB_SOCK_TIMEOUT);
        if (ret != 0) {
                //  assure this connection not work now
                return;
        } 
        ret = recv_or_timeout(sockfd, (void *)((uint8_t *)&msg + sizeof(recv_fmt_t)), msg.data.size, WEB_SOCK_TIMEOUT);
        if (ret != 0) {
                // assure this connection not work now
                return;
        }
        proc_msg(sockfd, &msg);
}

static void report_peer_connected(const struct sockaddr_in *sa, socklen_t salen)
{
        char hostbuf[NI_MAXHOST];
        char portbuf[NI_MAXSERV];
        if (getnameinfo
            ((struct sockaddr *) sa, salen, hostbuf, NI_MAXHOST, portbuf,
             NI_MAXSERV, 0) == 0) {
                printf("peer (%s, %s) connected\n", hostbuf, portbuf);
        } else {
                printf("peer (unknonwn) connected\n");
        }
}

static void make_socket_non_blocking(int sockfd)
{
        int flags = fcntl(sockfd, F_GETFL, 0);
        if (flags == -1) {
                perror_die("fcntl F_GETFL");
        }

        if (fcntl(sockfd, F_SETFL, flags | O_NONBLOCK) == -1) {
                perror_die("fcntl F_SETFL O_NONBLOCK");
        }
}

void web_api_run()
{
        // wait 100ms if no ready 
        while (1) {
                int nready = epoll_wait(conn.epollfd, conn.events, MAXFDS, 100);
                for (int i = 0; i < nready; i++) {
                        if (conn.events[i].events & EPOLLERR)
                                break;
                        if (conn.events[i].data.fd == conn.listenfd) {
                                // new connection
                                struct sockaddr_in peer_addr;
                                socklen_t peer_addr_len = sizeof(peer_addr);
                                int new_sock = accept(conn.listenfd,
                                                      (struct sockaddr *) &peer_addr,
                                                      &peer_addr_len);
                                if (new_sock < 0) {
                                        if (errno == EAGAIN || errno == EWOULDBLOCK) {
                                                printf("accept returned EAGAIN or EWOULDBLOCK\n");
                                        } else {
                                                perror_die("web api accept");
                                        }
                                } else {
                                        make_socket_non_blocking(new_sock);
                                        report_peer_connected(&peer_addr, peer_addr_len);
                                        struct epoll_event e = { 0 };
                                        e.data.fd = new_sock;
                                        e.events |= EPOLLIN;
                                        e.events |= EPOLLOUT;
                                        if (epoll_ctl(conn.epollfd, EPOLL_CTL_ADD, new_sock, &e) <
                                            0) {
                                                perror_die("epoll_ctl add");
                                        }
                                }
                        } else {
                                // peer is ready 
                                if (conn.events[i].events & EPOLLIN) {
                                        // ready for reading
                                        // cout << "event trigger " << conn.events[i].data.fd << endl;
                                        on_peer_ready_recv(conn.events[i].data.fd);
                                } else if (conn.events[i].events & EPOLLOUT) {
                                        // read for writing
                                }
                        }
                }
        }
}

#define PRINT_XML_KEY(key) \
        cout << #key " " << get_string_value(root, #key) << endl

int test_hdl(int type, int size, void *msg)
{
        // print latest data
        char *tmp = (char *)msg;
        try
        {
                tmp[size] = '\0';
                mxml_node_t *tree, *root;
                cout << tmp << endl;
                tree = mxmlLoadString(NULL, tmp, MXML_OPAQUE_CALLBACK);
                root = mxmlFindElement(tree, tree, "root", NULL, NULL, MXML_DESCEND);
                if (root) {
                        PRINT_XML_KEY(max_order_cnt);
                        PRINT_XML_KEY(max_order_amount);
                        PRINT_XML_KEY(szsz_freq);
                        PRINT_XML_KEY(sse_freq);
                        PRINT_XML_KEY(cancel_ratio_pct);
                        PRINT_XML_KEY(cancel_limit_baseline);
                        PRINT_XML_KEY(error_ratio_pct);
                        PRINT_XML_KEY(error_limit_baseline);
                        PRINT_XML_KEY(trade_ratio_pct);
                        PRINT_XML_KEY(trade_limit_baseline);
                        PRINT_XML_KEY(whitelist_addr);
                } else {
                        cout << "root is null" << endl;
                }
                return 0;
        }
        catch (std::exception &ex)
        {
                cerr << "parse xml failed" << endl;
                return -1;
        }
}

void web_api_init()
{
        listen_inet_socket(9090);
        conn.epollfd = epoll_create1(0);
        if (conn.epollfd < 0) {
                perror_die("web api epoll_create1");
        }
        if (!conn.events) {
                perror_die("web api epoll_event memory error");
        }
        conn.accept_event.data.fd = conn.listenfd;
        conn.accept_event.events = EPOLLIN;
        if (epoll_ctl
            (conn.epollfd, EPOLL_CTL_ADD, conn.listenfd,
             &conn.accept_event) < 0) {
                perror_die("web api epoll_ctl listen port");
        }
}

void web_api_register_hdl(int type, web_api_hdl_t f)
{
        if (type < 0 || type >= MAX_HDL_CNT) {
                cerr << "web api hdl type not valid " << type << endl;
                return;
        }
        if (f && !hdl_arr[type]) {
                hdl_arr[type] = f;
        } else {
                cerr << "web api hdl type " << type << " already registered" <<
                        endl;
        }
}

