extern "C" {
#include "rss_task_mgr.h"
}
#include <string.h>
#include <logger.h>
#include "mocktrading.h"
#include "rss_res_serializer.h"
#define DEBUG
// #include "trader_agent_data.h"
// #include "redis_cnt.h"

static cfg_pro_mgr s_cfg_pro_mgr;
static int init_ok = 0;
static char agent_ip_host[NAME_MAX];
static std::string trader_path;

#ifdef DEBUG
void
print_mgr_tsk(rss_usr_task *tsk)
{
    printf("uid = %d \n", tsk->usr_id);
    printf("trade_pct = %lf \n", tsk->trade_pct);
    printf("st_cnt = %d \n", tsk->st_cnt);
    printf("rank = %d \n", tsk->rank);
    printf("item = %s \n", tsk->item);
    printf("begin = %s \n", tsk->beg_date);
    printf("end = %s \n", tsk->end_date);
}
#endif

mgr_task_msg_t *
cfg_pro_mgr::find_mgr_tskmsg(int task_id)
{
    auto iter = mgr_msg_map.find(task_id);
    if (iter == mgr_msg_map.end()) {
        return NULL;
    } else {
        return iter->second;
    }
}

const std::string *
cfg_pro_mgr::find_trader_cfg(int task_id)
{
    auto iter = trader_cfg_map.find(task_id);
    if (iter == trader_cfg_map.end()) {
        return NULL;
    } else {
        pthread_mutex_lock(&var_mutex);
        std::string *t_str = new std::string((iter->second)->toStyledString());
        pthread_mutex_unlock(&var_mutex);
        return t_str;
    }
}

void
cfg_pro_mgr::add_mgr_tskmsg(int task_id, mgr_task_msg_t *msg)
{
    pthread_mutex_lock(&var_mutex);
    mgr_msg_map[task_id] = msg;
    pthread_mutex_unlock(&var_mutex);
}

void
cfg_pro_mgr::add_trader_cfg(int task_id, Json::Value *data)
{
    pthread_mutex_lock(&var_mutex);
    trader_cfg_map[task_id] = data;
    pthread_mutex_unlock(&var_mutex);
}

void
cfg_pro_mgr::del_mgr_tskmsg(int task_id)
{
    auto iter = mgr_msg_map.find(task_id);
    if (iter != mgr_msg_map.end()) {
        mgr_task_msg_t *t = iter->second;
        pthread_mutex_lock(&var_mutex);
        delete(t);
        mgr_msg_map.erase(iter);
        pthread_mutex_unlock(&var_mutex);
    }
}

void
cfg_pro_mgr::del_trader_cfg(int task_id)
{
    auto iter = trader_cfg_map.find(task_id);
    if (iter != trader_cfg_map.end()) {
        Json::Value *t = iter->second;
        pthread_mutex_lock(&var_mutex);
        delete(t);
        trader_cfg_map.erase(iter);
        pthread_mutex_unlock(&var_mutex);
    }
}

cfg_pro_mgr::cfg_pro_mgr()
{
    pthread_mutex_init(&var_mutex, NULL);
}

cfg_pro_mgr::~cfg_pro_mgr()
{
    for(auto iter = trader_cfg_map.begin(); iter != trader_cfg_map.end(); iter++) {
        Json::Value *tt = iter->second;
        delete(tt);
    }
    for(auto iter = mgr_msg_map.begin(); iter != mgr_msg_map.end(); iter++) {
        mgr_task_msg_t *tm = iter->second;
        delete(tm);
    }
    pthread_mutex_destroy(&var_mutex);
}

/**
 * write the resp_buff msg
 */
static int
pro_onedaytsk_res(char *filename, char *resp_buff, int buff_size)
{
    if (filename == NULL || resp_buff == NULL) {
        return -1;
    }
    struct res_serializer* serialize = NULL;
    serialize = res_slzr_create(filename);
    if (NULL == serialize) {
        log_error("res_slzr_create failed");
        return -1;
    } else {
        int ret = res_slzr_get_profile(serialize, resp_buff, buff_size);
        if (-1 == ret) {
            log_error("res_slzr_get_profile occured error");
        }
        res_slzr_destroy(serialize);
        return ret;
    }
}

static int
pro_onedaytsk_res(int scale, int start, int end, char *filename, char *resp_buff, int buff_size)
{
    if (filename == NULL || resp_buff == NULL) {
        return -1;
    }
    struct res_serializer* serialize = NULL;
    serialize = res_slzr_create(filename);
    if (NULL == serialize) {
        log_error("res_slzr_create failed");
        return -1;
    } else {
        int ret = res_slzr_get_detail(serialize, scale, start, end, resp_buff, buff_size);
        if (-1 == ret) {
            log_error("res_slzr_get_profile occured error");
        }
        res_slzr_destroy(serialize);
        return ret;
    }
}

/**
 * config handler(mainly cfg the trader before the mock trading)
 */
static int
on_task_config(struct rss_oneday_task* tsk)
{
    int ret = 0;
    const std::string *cfg_str = s_cfg_pro_mgr.find_trader_cfg(tsk->usr_id);
    if(cfg_str == NULL) {
        log_error("Find task_id = %d error!");
        return -1;
    }
    // TODO: need to improve
    // ret = update_trader_conf(trader_path, *cfg_str);
    delete(cfg_str);
    return ret;
}

/**
 * fetch handler(mainly fetch the mock trading result from specified buffer)
 * this return msg is useless
 */
static int
on_task_finish(struct rss_oneday_task* tsk)
{
    char old_fn[NAME_MAX];
    char new_fn[NAME_MAX];
    mgr_task_msg_t *tmsg = s_cfg_pro_mgr.find_mgr_tskmsg(tsk->usr_id);
    if (tmsg != NULL) {
        // snprintf(old_fn, NAME_MAX, "%s/%s%s", tmsg->userpath, tsk->contr, "__rss.dat");
        snprintf(old_fn, NAME_MAX, "%s/%s", tmsg->user_path, "rss.detail.dat");
        snprintf(new_fn, NAME_MAX, "%s.%d.%d.%s", old_fn, tmsg->task_type, tsk->usr_id, tsk->date);
        int ret = rename(old_fn, new_fn);
        if(ret == 0) {
            char *resp_buff = new char[eMinBuff];
            if (resp_buff != NULL) {
                ret = -1;
                // tsk on this day failed
                if (!tsk->task_status) {
                    ret = pro_onedaytsk_res(new_fn, resp_buff, eMinBuff);
                }
                if (ret != -1) {
                    Json::Value ret_msg;
                    ret_msg["user"] = tmsg->user;
                    ret_msg["taskid"] = tsk->usr_id;
                    ret_msg["type"] = tmsg->task_type;
                    ret_msg["msg"] = resp_buff;
                    // redis_upload_rsp(tmsg->cmd_type, 0, tmsg->cmd_seq, agent_ip_host, ret_msg);
                    printf("%s \n", ret_msg.toStyledString().c_str());
                    int oneday_tsk_cnt = tmsg->mock_day_cnt;
                    if (tsk->task_sn + 1 >= oneday_tsk_cnt) {
                        ret_msg["msg"] = "";
                        // redis_upload_rsp(tmsg->cmd_type, 1, tmsg->cmd_seq, agent_ip_host, ret_msg);
                    }
                }
                // date range task finished
                if (tsk->task_sn + 1 >= tmsg->mock_day_cnt) {
                    s_cfg_pro_mgr.del_trader_cfg(tsk->usr_id);
                    s_cfg_pro_mgr.del_mgr_tskmsg(tsk->usr_id);
                }
                delete resp_buff;
            } else {
                log_error("on_task_finish new buffer failed");
            }
        } else {
            log_error("on_task_finish rename [%s] error= %s", new_fn, strerror(errno));
        }
    } else {
        log_error("on_task_finish can't find taskid = %d", tsk->usr_id);
    }
    return 0;
}

/**
 * convert json value(task) to rss_usr_task type
 */
static int
parse_tsk_args(const Json::Value &data, struct rss_usr_task *tsk, mgr_task_msg_t *mgr_tsk)
{

    Json::Value c,t;
    if (!data.isMember("data") || !data.isObject() ||
            !data["data"].isMember("task") || !data["data"].isMember("config")) {
        log_error("json value data miss field: %s", t.toStyledString().c_str());
        return -1;
    } else {
        t = data["data"]["task"];
        c = data["data"]["config"];
    }

    if (!(t.isObject()) || !(t.isMember("strategy_cnt"))||
            !(t.isMember("ratio")) || !(t.isMember("taskid")) ||
            !(t.isMember("product")) || !(t.isMember("date_start")) ||
            !(t.isMember("date_end")) || !(t.isMember("quote_seq")) ||
            !(t.isMember("user")) || !(t.isMember("type"))) {
        log_error("json value task miss field: %s", t.toStyledString().c_str());
        printf("%s", t.toStyledString().c_str());
        return -1;
    }
    if (!c.isObject() || !c.isMember("user") ||
            !c["user"].isObject() || !c["user"].isMember("home")) {
        log_error("json value config miss filed %s", t.toStyledString().c_str());
        return -1;
    }
    /* for mgr_tsk */
    mgr_tsk->task_type = t["type"].asInt();
    strncpy(mgr_tsk->user, t["user"].asCString(), NAME_MAX - 1);
    strncpy(mgr_tsk->user_path, c["user"]["home"].asCString(), NAME_MAX - 1);
    /* for tsk */
    tsk->usr_id = t["taskid"].asInt();
    tsk->trade_pct = t["ratio"].asDouble();
    tsk->st_cnt = t["strategy_cnt"].asInt();
    tsk->rank = t["quote_seq"].asInt();
    strncpy(tsk->item, t["product"].asCString(), sizeof(tsk->item) - 1);
    strncpy(tsk->beg_date, t["date_start"].asCString(), sizeof(tsk->beg_date) - 1);
    strncpy(tsk->end_date, t["date_end"].asCString(), sizeof(tsk->end_date) - 1);
    return 0;
}

int
init_mock_trading(const char* quote_file, const char* trader_ip, int trader_port)
{
    if (init_ok) {
        log_error("mock_trading has been finshed");
        return 0;
    }
    struct task_mgr_cfg task_cfg;
    strncpy(task_cfg.trader_ip, trader_ip, sizeof(task_cfg.trader_ip) - 1);
    strncpy(task_cfg.quote_map_file, quote_file, sizeof(task_cfg.quote_map_file) - 1);

    // get_agent_key(agent_ip_host, sizeof(agent_ip_host));
    task_cfg.trader_port = trader_port;
    task_cfg.task_cfg_fn = on_task_config;
    task_cfg.task_done_fn = on_task_finish;

    init_ok = task_mgr_init( &task_cfg );
    if (!init_ok) {
        log_error("mock trading initial error");
        return -1;
    }
    return 0;
}


int
start_mock_trading(redisContext *c, const Json::Value &data)
{
    (void) c;
#ifdef DEBUG
    init_ok = 1;
#endif
    if (!init_ok) {
        log_error("mock_trading not initial");
        return -1;
    }
    int pro_flag = -1;
    int cmd_type = -1;
    int cmd_seq = -1;
    if (data.isMember("type") && data.isMember("seq")) {
        cmd_type = data["type"].asInt();
        cmd_seq = data["seq"].asInt();
    }
    if (cmd_type != -1 && cmd_seq != -1 && data.isMember("data") &&
            data["data"].isObject() && data["data"].isMember("task")
            && data["data"].isMember("config")) {

        Json::Value json_task = data["data"]["task"];
        struct rss_usr_task tsk;
        mgr_task_msg_t *p_msg = new mgr_task_msg_t;
        parse_tsk_args(data, &tsk, p_msg);
        p_msg->cmd_type = cmd_type;
        p_msg->cmd_seq = cmd_seq;
        Json::Value *p_data = new Json::Value(data["data"]["config"]);
        s_cfg_pro_mgr.add_trader_cfg(tsk.usr_id, p_data);
        s_cfg_pro_mgr.add_mgr_tskmsg(tsk.usr_id, p_msg);
        // int ret = add_task(&tsk, &(p_msg->mock_task_id), &(p_msg->mock_day_cnt));
        print_mgr_tsk(&tsk);
        int ret = 0;
        /* add task failed */
        Json::Value ret_msg;
        if(ret < 0) {
            ret_msg["msg"] = "task not start";
            s_cfg_pro_mgr.del_mgr_tskmsg(tsk.usr_id);
            s_cfg_pro_mgr.del_trader_cfg(tsk.usr_id);
        } else {
            ret_msg["msg"] = "task start";
            pro_flag = 0;
        }
        ret_msg["user"] = p_msg->user;
        ret_msg["type"] = p_msg->task_type;
        ret_msg["taskid"] = tsk.usr_id;
        // redis_upload_rsp(p_msg->cmd_type, pro_flag, p_msg->cmd_seq, agent_ip_host, ret_msg);
        printf("test output:\n type = %d ret = %d seq = %d \
			\n msg: %s\n", p_msg->cmd_type, pro_flag, p_msg->cmd_seq, ret_msg.toStyledString().c_str());
    } else {
        log_error("start task json format error");
    }
    return pro_flag;
}


/**
 * input format string:
 * "data": {"user":"rss-1", "type":1, "taskid":101}
 * return format json:
 * "data": {"user":"rss-1", "type":1, "taskid":1001,"msg":"content"}
 */
int
stop_mock_trading(redisContext *c, const Json::Value &data)
{
    (void) c;
#ifdef DEBUG
    init_ok = 1;
#endif
    if (!init_ok) {
        log_error("mock_trading not initial");
        return -1;
    }
    int pro_flag = -1;
    int cmd_type = -1;
    int cmd_seq = -1;
    if (data.isMember("type") && data.isMember("seq")) {
        cmd_type = data["type"].asInt();
        cmd_seq = data["seq"].asInt();
    }
    if (cmd_type != -1 && cmd_seq != -1 &&
            data.isMember("data") && data["data"].isObject()) {
        
        Json::Value json_data = data["data"];
        int task_type = json_data["type"].asInt();
        int task_id = json_data["taskid"].asInt();
        char user[NAME_MAX];
        strncpy(user, json_data["user"].asCString(), NAME_MAX - 1);

        mgr_task_msg_t *p_msg = s_cfg_pro_mgr.find_mgr_tskmsg(task_id);
        if (p_msg != NULL) {
            int ret = del_task(p_msg->mock_task_id);
            if (ret == 0) {
                pro_flag = 1;
            }
        }
        Json::Value ret_msg;
        ret_msg["user"] = user;
        ret_msg["type"] = task_type;
        ret_msg["taskid"] = task_id;
        if (pro_flag == 1 ) {
            ret_msg["msg"] = "del task failed";
        } else {
            ret_msg["msg"] = "del task failed";
        }
        // redis_upload_rsp(cmd_type, pro_flag, cmd_seq, agent_ip_host, ret_msg);
        printf("type= %d, seq = %d, type= %d, id = %d, user = %s ret = %d\n", cmd_type, cmd_seq, task_type\
               ,task_id, user, pro_flag);
        printf("ret_msg = %s", ret_msg.toStyledString().c_str());
    } else {
        log_error("stop task data error");
    }
    return pro_flag;
}

/**
 * input format string:
 * "data": {"user":"rss-1", "type":1, "taskid":101}
 * return format json:
 * "data": {"user":"rss-1", "type":1, "taskid":1001, "msg":"content"}
 */
int
read_mock_trading(redisContext *c, const Json::Value &data)
{
    (void) c;
    int pro_flag = -1;
    Json::Value ret_msg;
    int cmd_type = -1;
    int cmd_seq = -1;
    if (data.isMember("type") && data.isMember("seq")) {
        cmd_type = data["type"].asInt();
        cmd_seq = data["seq"].asInt();
    }
    if (cmd_type != -1 && cmd_seq != -1 &&
            data.isMember("data") && data["data"].isObject()) {
        
        Json::Value json_data = data["data"];
        int scale = json_data["scale"].asInt();
        int start = json_data["start"].asInt();
        int end = json_data["end"].asInt();
        int task_type = json_data["type"].asInt();
        int task_id = json_data["taskid"].asInt();
        // char view[NAME_MAX];
        char date[NAME_MAX];
        char user[NAME_MAX];
        char file_name[NAME_MAX];

        strncpy(date, json_data["date"].asCString(), NAME_MAX-1);
        strncpy(user, json_data["user"].asCString(), NAME_MAX-1);
        snprintf(file_name, NAME_MAX, "%s.%d.%d.%s", "rss.detail.dat", task_type, task_id, date);
#ifdef DEBUG
        snprintf(file_name, NAME_MAX, "./IF1412_rss.dat");
#endif
        char *resp_buff = new char[eMaxBuff];
        int ret = pro_onedaytsk_res(scale, start, end, file_name, resp_buff, eMinBuff);
        ret_msg["user"] = user;
        ret_msg["type"] = task_type;
        ret_msg["taskid"] = task_id;
        if (ret == -1) {
            ret_msg["msg"] = "read detail failed";
        } else {
            ret_msg["msg"] = resp_buff;
            pro_flag = 1;
        }
#ifdef DEBUG
        printf("type= %d, seq = %d, type= %d, id = %d, user = %s ret = %d\n", cmd_type, cmd_seq, task_type\
               ,task_id, user, pro_flag);
        printf("ret_msg = %s", ret_msg.toStyledString().c_str());
#else
        redis_upload_rsp(cmd_type, pro_flag, cmd_seq, agent_ip_host, ret_msg);
#endif
        if (resp_buff != NULL) {
            delete resp_buff;
        }
    } else {
        log_error("read detail data error");
    }
    return pro_flag;
}