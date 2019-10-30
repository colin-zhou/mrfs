#include <sys/epoll.h>
#include <unordered_map>

typedef int (*web_api_hdl_t)(int type, int size, void *msg);

int test_hdl(int type, int size, void *msg);
void web_api_init();
void web_api_run();
void web_api_register_hdl(int type, web_api_hdl_t hdl);
