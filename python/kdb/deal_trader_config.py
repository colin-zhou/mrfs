#!/usr/bin/python
# -*- coding:utf-8 -*-

#for test
import sys
sys.path.append("../")
sys.path.append("../../")

import json
import time
import xmltodict
import datetime
from commdefs.log import MYLogger
from commdefs.kdb_query import KdbQuery
from commdefs.redis_base import RedisConnector
Log = MYLogger('info', 'trader_config.log')

# sync all data to remote server
class TradeConfigHandler(object):
    class AGENT_CMD:
        CONFIG_UPLOAD_TO_KDB      = 6
        CONFIG_DOWNLOAD_TO_SERVER = 7

    def __init__(self, data_obj):
        self.data_obj    = data_obj
        self.rds         = RedisConnector.reuse()
        self.kdb_wdb     = KdbQuery('192.168.3.10', 9001, 'superuser1', 'password')
        self.kdb_rdb     = KdbQuery('192.168.3.10', 9002, 'superuser1', 'password')
        # self.day_night   = True if trader_path.find("night") else False
        self.quotes      = None
        self.vpn_ip      = None
        self.trader_path = None

    def agent_operation(self, cmd_type):
        data = {'data': { "trader": [self.trader_path] },
                'type': cmd_type,
                'seq': 1 }
        redis_key = "a:oss:cmd:%s" % self.vpn_ip
        self.rds.rpush(redis_key, json.dumps(data))

    def wait_redis_notify(self):
        redis_key = "a:oss:trdcfg:%s" % self.vpn_ip
        try:
            wait_cnt = 0
            while True:
                if wait_cnt == 10:
                    return False
                if self.rds.llen(redis_key) > 0:
                    ret = self.rds.lpop(redis_key)
                    print json.loads(ret)
                    if int(json.loads(ret)["return"]) == 0:
                        print "load success"
                        return True
                    else:
                        return False
                wait_cnt += 1
                time.sleep(0.1)
        except:
            return False

    def fetch_trader_cfg(self):
        self.agent_operation(self.AGENT_CMD.CONFIG_UPLOAD_TO_KDB)
        # wait redis notify data(1s is enough)
        if not self.wait_redis_notify():
            return False
        # read data from kdb
        host = self.vpn_ip.split('(')[0]
        # print "host", host
        cmd = "select from TradeConfig where host=`%s,ref_conf_path like \"%s*\","\
              "time=(max;time) fby conf_path" % (host, self.trader_path)
        # print "cmd", cmd
        self.kdb_ret = self.kdb_rdb.sync_query(cmd)
        return self.kdb_ret[0][11]

    def get_quote_source(self, check_dict):
        try:
            ret = []
            if isinstance(check_dict['MyExchange']['quote']['source'], list):
                for item in check_dict['MyExchange']['quote']['source']:
                    ret.append(item['@category'])
            else:
                ret = [check_dict['MyExchange']['quote']['source']['@category']]
        except Exception as e:
            Log.debug("mycapital config error. %s" % str(e))
        return ret

    def generate_order_vol_limit(self, template, contracts):
        try:
            if len(contracts) == 1:
                template_temp = dict(template)
                template_temp["@symbol"] = contracts[0]
                return template_temp
            ret = []
            for contract in contracts:
                template_temp = dict(template)
                template_temp["@symbol"] = contract
                ret.append(template_temp)
            return ret
        except Exception as e:
            Log.debug("generate_order_vol_limit error. %s" % str(e))

    def generate_tca_source(self, template, accounts):
        try:
            if len(accounts) == 1:
                # {'model_id': [74L, 77L, 80L], 'filename': u'my_trader_test4.xml'}
                account_data = accounts.values()[0]
                template_temp = {}
                template_temp["@name"] = account_data["filename"].split(".")[0]
                template_temp["@config"] = account_data["filename"]
                template_temp["@models"] = ",".join(str(it) for it in account_data["model_id"])
                return template_temp
            ret = []
            for account in accounts:
                template_temp = {}
                template_temp["@name"] = accounts[account]["filename"].split(".")[0]
                template_temp["@config"] = accounts[account]["filename"]
                template_temp["@models"] = ",".join(str(it) for it in accounts[account]["model_id"])
                ret.append(template_temp)
            return ret
        except Exception as e:
            Log.debug("generate_tca_source error. %s" % str(e))

    def check_special_strategy(self, strategy_name):
        if len(self.quotes) != 2:
            return False
        real_st_name = strategy_name.split("_")[0]
        return real_st_name in ["hi50", "hi55", "hi50a", "hi55a", "hi9"]

    def generate_symbol(self, template, symbols, model_id, category=False):
        try:
            # 'symbol': [{'volume': 5L, 'name': u't100'}]}
            if len(symbols) == 1:
                template_temp = dict(template)
                template_temp["@name"] = symbols[0]["name"]
                template_temp["@max_pos"] = str(symbols[0]["volume"])
                template_temp["@symbol_log_id"] = str(model_id)
                if category:
                    template_temp["@category"] = ",".join(str(it) for it in self.quotes)
                return template_temp
            ret = []
            for symbol in symbols:
                template_temp = dict(template)
                template_temp["@name"] = symbol["name"]
                template_temp["@max_pos"] = str(symbol["volume"])
                template_temp["@symbol_log_id"] = str(model_id)
                if category:
                    template_temp["@category"] = ",".join(str(it) for it in self.quotes)
                ret.append(template_temp)
            return ret
        except Exception as e:
            import traceback
            traceback.print_exc()
            Log.debug("generate_symbol error. %s" % str(e))

    def generate_strategy(self, template, sym_template, strategies):
        try:
            if len(strategies) == 1:
                template_temp = dict(template)
                strategy_name = strategies.keys()[0]
                strategy_data = strategies.values()[0]
                template_temp["@id"] = strategy_data["model_id"]
                template_temp["@model_file"] = strategy_name
                category = False
                if self.check_special_strategy(strategy_name):
                    category = True
                template_temp["symbol"] = self.generate_symbol(sym_template,
                                                               strategy_data["symbol"],
                                                               template_temp["@id"],
                                                               category)
                return template_temp
            ret = []
            for strategy in strategies:
                strategy_name = strategy
                strategy_data = strategies[strategy]
                template_temp = dict(template)
                template_temp["@id"] = strategies[strategy]["model_id"]
                template_temp["@model_file"] = strategy_name
                category = False
                if self.check_special_strategy(strategy_name):
                    category = True
                template_temp["symbol"] = self.generate_symbol(sym_template,
                                                               strategy_data["symbol"],
                                                               template_temp["@id"],
                                                               category)
                ret.append(template_temp)
            return ret
        except Exception as e:
            import traceback
            traceback.print_exc()
            Log.debug("generate_strategy error. %s" % str(e))

    def get_templates(self, data):
        try:
            templates = {}
            if isinstance(data["MyExchange"]["OrderVolLimit"]["Item"], list):
                templates["item"] = dict(data["MyExchange"]["OrderVolLimit"]["Item"][0])
            else:
                templates["item"] = dict(data["MyExchange"]["OrderVolLimit"]["Item"])
            if isinstance(data["MyExchange"]["tca"]["source"], list):
                templates["tca"] = dict(data["MyExchange"]["tca"]["source"][0])
            else:
                templates["tca"] = dict(data["MyExchange"]["tca"]["source"])
            if isinstance(data["MyExchange"]["strategies"]["strategy"], list):
                templates["strategy"] = dict(data["MyExchange"]["strategies"]["strategy"][0])
                if isinstance(data["MyExchange"]["strategies"]["strategy"][0]["symbol"], list):
                    templates["symbol"] = dict(data["MyExchange"]["strategies"]["strategy"][0]["symbol"][0])
                else:
                    templates["symbol"] = dict(data["MyExchange"]["strategies"]["strategy"][0]["symbol"])
            else:
                templates["strategy"] = dict(data["MyExchange"]["strategies"]["strategy"])
                if isinstance(data["MyExchange"]["strategies"]["strategy"]["symbol"], list):
                    templates["symbol"] = dict(data["MyExchange"]["strategies"]["strategy"]["symbol"][0])
                else:
                    templates["symbol"] = dict(data["MyExchange"]["strategies"]["strategy"]["symbol"])
            templates["strategy"]["symbol"] = None
            return templates
        except Exception as e:
            Log.debug("get_templates error. %s", str(e))

    def generate_trader_cfg(self, my_capital):
        format_my_capital = my_capital.replace("'", '"')
        fdict = json.loads(format_my_capital)
        self.quotes = self.get_quote_source(fdict)
        # print self.quotes
        templates = self.get_templates(fdict)
        # print json.dumps(templates, indent=2)
        contract = self.data_obj[self.vpn_ip][self.trader_path]["contract"]
        item_node = self.generate_order_vol_limit(templates["item"], contract)
        # print json.dumps(item_node, indent=2)
        account = self.data_obj[self.vpn_ip][self.trader_path]["account"]
        tca_node = self.generate_tca_source(templates["tca"], account)
        # print json.dumps(tca_node, indent=2)
        strategies = self.data_obj[self.vpn_ip][self.trader_path]["strategy"]
        strategy_node = self.generate_strategy(templates["strategy"], templates["symbol"], strategies)

        fdict["MyExchange"]["OrderVolLimit"]["Item"] = item_node
        fdict["MyExchange"]["tca"]["source"] = tca_node
        fdict["MyExchange"]["strategies"]["strategy"] = strategy_node

        # print json.dumps(fdict, indent=2)
        print xmltodict.unparse(fdict, pretty=True)
        return json.dumps(fdict).replace('"', "'")

    def kdb_write_check(self, now):
        host = self.vpn_ip.split('(')[0]
        # print "host", host
        cmd = "select from TradeConfig where host=`%s,ref_conf_path like \"%s*\","\
              "time=(max;time) fby conf_path" % (host, self.trader_path)
        kdb_ret = self.kdb_rdb.sync_query(cmd)
        secs = datetime.timedelta(hours=now.hour,minutes=now.minute,seconds=now.second).total_seconds()
        print "read time is :", kdb_ret[0][3], secs, kdb_ret[0][3]/1000 == secs
        return kdb_ret[0][3] == secs * 1000

    def provide_trader_cfg(self, ou_capital):
        # write the data to kdb, if it success notify the agent to read
        import time
        time.sleep(0.5)
        now = datetime.datetime.now() + datetime.timedelta(minutes=1)
        cmd = ".u.upd[`TradeConfig; (`%s; %s; %s; %sh; %sh; `%s; \"%s\"; %sh; \"%s\"; \"%s\"; \"%s\")]" % \
               (self.kdb_ret[0][1], now.strftime("%Y.%m.%d"), now.strftime("%H:%M:%S.000"),
                self.kdb_ret[0][4], self.kdb_ret[0][5], self.kdb_ret[0][6], self.kdb_ret[0][7],
                self.kdb_ret[0][8], self.kdb_ret[0][9], self.kdb_ret[0][10], ou_capital)
        print "output: ", cmd
        self.kdb_wdb.sync_query(cmd)  # ret value can't check the insert operation
        if not self.kdb_write_check(now):
            Log.error("kdb write check error. time not equal")
            return False
        self.agent_operation(self.AGENT_CMD.CONFIG_DOWNLOAD_TO_SERVER)
        if not self.wait_redis_notify():
            Log.error("data not transfer to server")
            return False
        return True

    def scan_traders(self):
        try:
            for vpn_ip in self.data_obj:
                for trader_path in self.data_obj[vpn_ip]:
                    # my_capital is json string
                    self.vpn_ip = vpn_ip
                    self.trader_path = trader_path
                    my_capital = self.fetch_trader_cfg()
                    if not my_capital:
                        Log.error("item process error %s" % self.data_obj[self.vpn_ip][self.trader_path])
                        return False
                    ou_capital = self.generate_trader_cfg(my_capital)
                    if not self.provide_trader_cfg(ou_capital):
                        Log.error("item process error %s" % self.data_obj[self.vpn_ip][self.trader_path])
                        return False
            return True
        except Exception as e:
            import traceback
            traceback.print_exc()
            Log.error("scan traders error. %s" % str(e))
            return False

if __name__ == "__main__":
    test_obj = {
        u'192.168.3.76(localhost.localdomain)': {
                u'/home/colin/Workspace':
                {
                    'account': {
                                u'1234322': {'model_id': [74L, 77L, 80L], 'filename': u'my_trader_test4.xml'},
                                u'1234323': {'model_id': [75L, 78L], 'filename': u'my_trader_test5.xml'},
                                u'1234321': {'model_id': [73L, 76L, 79L], 'filename': u'my_trader_test3.xml'}
                                },
                    'contract': [u't100'],
                    'strategy': {
                         u'hi75_t_day': {'model_id': 76L, 'symbol': [{'volume': 1L, 'name': u't100'}]},
                         u'hi73_t_day': {'model_id': 74L, 'symbol': [{'volume': 1L, 'name': u't100'}]},
                         u'hi5a_t_day': {'model_id': 77L, 'symbol': [{'volume': 10L, 'name': u't100'}]},
                         u'hi74_t_day': {'model_id': 75L, 'symbol': [{'volume': 1L, 'name': u't100'}]},
                         u'hi52_t_day': {'model_id': 73L, 'symbol': [{'volume': 1L, 'name': u't100'}]},
                         u'hi50_t_day': {'model_id': 78L, 'symbol': [{'volume': 5L, 'name': u't100'}]},
                         u'hi76_t_day': {'model_id': 79L, 'symbol': [{'volume': 1L, 'name': u't100'}]},
                         u'hi86_t_day': {'model_id': 80L, 'symbol': [{'volume': 3L, 'name': u't100'}]},
                    }
                }
            }
        }
    my_test = TradeConfigHandler(test_obj)
    my_test.scan_traders()
