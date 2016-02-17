#pragma once
#include <pthread.h>
#include <json/json.h>
#include <hiredis/hiredis.h>
#include <map>

#define NAME_MAX 256


enum {
    eBuffSize = 1024,
    eMinBuff = 8 * eBuffSize,
    eMaxBuff = eBuffSize * eBuffSize
};

/* data for on_cfg_handler and on_finish_handler */
typedef struct {
    int cmd_type;
    int cmd_seq;
    int task_type;
    int mock_task_id;                                                /* identification in schedule program */
    int mock_day_cnt;                                                /* days of the mock result */
    char user_path[NAME_MAX];
    char user[NAME_MAX];
} mgr_task_msg_t;


/**
 * manger the trader cfg and task process message
 */
class cfg_pro_mgr {
private:
    pthread_mutex_t var_mutex;
    std::map<int, Json::Value *> trader_cfg_map;  		    /* task_id vs cfg used by cfg_handler */
    std::map<int, mgr_task_msg_t *> mgr_msg_map;                /* task_id vs mgr_task_msg_t used by  */
public:
    /* fetch the mgr task msg specified id*/
    mgr_task_msg_t *find_mgr_tskmsg(int task_id);
    /* fetch the trader cfg string */
    const std::string *find_trader_cfg(int task_id);

    void add_mgr_tskmsg(int task_id, mgr_task_msg_t *msg);
    void del_mgr_tskmsg(int task_id);

    void add_trader_cfg(int task_id, Json::Value *data);
    void del_trader_cfg(int task_id);

    cfg_pro_mgr();
    ~cfg_pro_mgr();
};

/**
 * initial the mock trading process
 */
int
init_mock_trading(const char* quote_file, const char* trader_ip, int trader_port);

/**
 * start a mock trading task()
 */
int
start_mock_trading(redisContext *r, const Json::Value &data);

/**
 * stop a mock trading task
 */
int
stop_mock_trading(redisContext *r, const Json::Value &data);

/**
 * read a detail of a mock trading task
 */
int
read_mock_trading(redisContext *r, const Json::Value &data);