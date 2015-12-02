/**
 * Mock trading module for rss-agent
 * 
 * Copyright(c) 2007-2015, by MY Capital Inc.
 */

#include "business.h"

/**
 * initial the logger, trader scheduler
 */
int
mock_trading_init(const char *quote_file, const char *delta_file,
	      const char *logfile, const char *trader_path,
	      int log_level = 4)
{
	const char *trader_ip = "127.0.0.1";
	int trader_port = 65530;

	//init log 20MB , 40 shift
	logger_init(log_level, log_file);
	logger_set(20 * 1024 * 1024, 40);

	LOG_DEBUG("Param:logfile=[%s:%d], trader=[%s:%d]", 
			log_file, log_level, trader_ip, trader_port);
	ret = InitManager(quote_file, delta_file, trader_path, trader_ip, trader_port);
	if(ret < 0) {
		LOG_ERROR("InitManager error! ret = %d", ret);
		return -1;
	}
	return 0;
}

/**
 * destroy the logger and the trader scheduler
 */
void
mock_trading_exit()
{
	DestroyManager();
	logger_destroy();
}



/**
 * use the specified strategy or strategies mock trading with the 
 * specified history (specified time span) quote data
 */
int
mock_trading_task(Json::Value &data)
{
	int nRet = 0;
	char task_id[MinLen] = "";
	char detail[MaxLen] =  "";

	TaskUnit * unit = new TaskUnit();
	strncpy(task_id, data["task_id"], MinLen-1);
	unit->task_id = atoi(task_id);
	strncpy(unit->user_name, data["user_name"], MaxLen-1);
	strncpy(unit->date_begin, data["date_begin"], MinLen-1);
	strncpy(unit->date_end, data["date_end"], MinLen-1);
	strncpy(unit->item_name, data["item"], MinLen-1);
	strncpy(unit->exchange, data["exchange"], MinLen-1);
	strncpy(unit->rank, data["rank"], MinLen-1);
	strncpy(unit->ratio, data["trade_ratio"], MinLen-1);
	strncpy(unit->task_type, data["type"], MinLen-1);
	strncpy(unit->user_dir, data["remote_dir"], PathLen-1);
	strncpy(detail, data["result_detail"], MaxLen-1);
	snprintf(unit->result_file, PathLen, "%s/%s", unit->user_dir, detail);

	LOG_DEBUG("Param = %d, %s, %s, %s",unit->task_id, unit->user_name,
		  unit->date_begin, unit->item_name);

	Json::Value strategies = data["strategys"];
	if(!strategies.isArray()) {
		LOG_ERROR("Get strategy list error");
		goto FAIL_ITEM;
	}
	unit->lib_count = strategies.size();
	for(int i = 0; i < unit->lib_count; ++i)
	{
		Json::Value strategy = strategies[i];
		if(!strategy.isObject()){
			LOG_ERROR("Get strategy item error. index=[%d]", i);
			goto FAIL_ITEM;
		}
		Strategy *strat = new Strategy();
		strncpy(strat->name, strategy["name"], MaxLen-1);
		strncpy(strat->max_pos, strategy["max_pos"], MinLen-1);
		strncpy(strat->file_type, strategy["file_type"], MinLen-1);
		strncpy(strat->order_limit, strategy["order_limit"], MinLen-1);
		strncpy(strat->cancel_limit, strategy["cancel_limit"], MinLen-1);
		snprintf(strat->uniq_name, MaxLen, "%s:%s",  unit->user_name, strate->name);
		if(strcmp(unit->task_type, "analysis") == 0) {
			strcpy(strat->item, strategy["item"], MinLen-1);
			snprintf(strat->file_path, PathLen, "%s/%s/%s", unit->user_dir, strate->item, strate->name);
		} else {
			snprintf(strat->file_path, PathLen, "%s/%s", unit->user_dir, strate->name);
		}
		LOG_DEBUG("lib_name=%s, max_pos=%s", strat->name, strate->max_pos);
		unit->setStrategy(strat);
	}
	if(!unit->isMatch()){
		LOG_ERROR("Get Strategys count not matching");
		goto FAIL_ITEM;
	}
	if(StartManager(unit) == 0){
		nRet = 1;
	}
FAIL_ITEM:
	if(!nRet){
		unit->delStrategy();
		delete unit;
		return -1;
	}
	return 0;
}

/**
 * write back the mock trading result to redis, this function called by task finish
 * handler.
 */
int
mock_trading_task_response(int task_id, char *user_name, char *state, char *brief)
{
	// assemble the ret_msg
	Json::Value root;
	root["TASK_ID"] = task_id;
	root["USER"] = user_name;
	root["HOSTIP"] = "192.168.1.1";
	root["STATE"] = state;
	root["BRIEF"] = brief;
	Json::FastWriter writer;
	const char *ret_msg = writer.write(root).c_str();
	// TODO: 
	// write redis back
}

/**
 * read the details of the trading result
 */
int
mock_trading_read_detail(Json::Value &data)
{
	char tmp_scale[PathLen];
	char tmp_start[PathLen];
	char tmp_end[PathLen];

	ReportDetail *detail = new ReportDetail();
	strncpy(tmp_scale, data["scale"], PathLen-1);
	detail->scale = atoi(tmp_scale);
	
	strncpy(tmp_start, data["start"], PathLen-1);
	detail->start = atoi(tmp_start);

	strncpy(tmp_end, data["end"], PathLen-1);
	detail->end = atoi(tmp_end);
	
	strncpy(detail->file_name, data["file_name"], PathLen-1);
	strncpy(detail->type, data["type"], MinLen-1);
	if(detail->ParserDetail()) {
		// TODO:
		// write detail->resp_buff to redis
	} else {
		delete detail;
		return -1;
	}
	return 0;
}