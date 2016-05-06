# -*- coding: utf-8 -*-

from remote_file_operation import main
import json
import os
import re

task_cmd1={
   "data" : {
      "task" : {
         "all_trd_ratio" : 1,
         "date_end" : 20160429,
         "date_start" : 20160415,
         "day_night" : 0,
         "delete_path" : "~/agent_download/2/30500",
         "exchange" : "G",
         "fee_mode" : 1,
         "next_tick_trd_radio" : 0.69999999999999996,
         "product" : "T",
         "quote_seq" : 1,
         "simu_fee" : 0.000212,
         "strategy" : [
            {
               "cfg" : "~/agent_download/2/30500/0_166b22891e8570252bc77bae5fbe3a59b34da793458b259d39bcd9582b7c8dd3",
               "file" : "~/agent_download/2/30500/0_5a8869e8ba40dccd4edcd4f6f33c2429296a83a72d9b6c508c6f5b9a6215e85b",
               "max_pos" : 1,
               "name" : "hi51"
            }
         ],
         "strategy_cnt" : 1,
         "taskid" : 30500,
         "tick_size" : 0.0050000000000000001,
         "trade_unit" : 10000,
         "trd_ratio" : 1,
         "type" : 2,
         "user" : "14"
      }
   },
   "seq" : 36064,
   "type" : 100
}
task_cmd2={
   "data" : {
      "task" : {
         "all_trd_ratio" : 1,
         "date_end" : 20160429,
         "date_start" : 20160415,
         "day_night" : 0,
         "delete_path" : "~/agent_download/2/30501",
         "exchange" : "G",
         "fee_mode" : 1,
         "next_tick_trd_radio" : 0.69999999999999996,
         "product" : "T",
         "quote_seq" : 1,
         "simu_fee" : 0.000212,
         "strategy" : [
            {
               "cfg" : "~/agent_download/2/30501/0_166b22891e8570252bc77bae5fbe3a59b34da793458b259d39bcd9582b7c8dd3",
               "file" : "~/agent_download/2/30501/0_9ec572af2d72c87c4a37efd4b17399dc2a32ae1583e8d7511d8ab4263f515c60",
               "max_pos" : 1,
               "name" : "hi52"
            }
         ],
         "strategy_cnt" : 1,
         "taskid" : 30501,
         "tick_size" : 0.0050000000000000001,
         "trade_unit" : 10000,
         "trd_ratio" : 1,
         "type" : 2,
         "user" : "14"
      }
   },
   "seq" : 36065,
   "type" : 100
}

task_cmd3={
   "data" : {
      "task" : {
         "all_trd_ratio" : 1,
         "date_end" : 20160429,
         "date_start" : 20160415,
         "day_night" : 0,
         "delete_path" : "~/agent_download/2/30502",
         "exchange" : "G",
         "fee_mode" : 1,
         "next_tick_trd_radio" : 0.69999999999999996,
         "product" : "T",
         "quote_seq" : 1,
         "simu_fee" : 0.000212,
         "strategy" : [
            {
               "cfg" : "~/agent_download/2/30502/0_166b22891e8570252bc77bae5fbe3a59b34da793458b259d39bcd9582b7c8dd3",
               "file" : "~/agent_download/2/30502/0_32195a96ed32a8cab368d6b8b07eb5f6757355be063c021c0424d5808b769b4c",
               "max_pos" : 1,
               "name" : "hi86"
            }
         ],
         "strategy_cnt" : 1,
         "taskid" : 30502,
         "tick_size" : 0.0050000000000000001,
         "trade_unit" : 10000,
         "trd_ratio" : 1,
         "type" : 2,
         "user" : "14"
      }
   },
   "seq" : 36066,
   "type" : 100
}
task_cmd4={
   "data" : {
      "task" : {
         "all_trd_ratio" : 1,
         "date_end" : 20160429,
         "date_start" : 20160415,
         "day_night" : 0,
         "delete_path" : "~/agent_download/2/30503",
         "exchange" : "G",
         "fee_mode" : 1,
         "next_tick_trd_radio" : 0.69999999999999996,
         "product" : "TF",
         "quote_seq" : 1,
         "simu_fee" : 0.00042400000000000001,
         "strategy" : [
            {
               "cfg" : "~/agent_download/2/30503/0_166b22891e8570252bc77bae5fbe3a59b34da793458b259d39bcd9582b7c8dd3",
               "file" : "~/agent_download/2/30503/0_401425632f31a3c59d676a941581a3bf5f636a0f0b0cb13e97fef9c916b3063e",
               "max_pos" : 1,
               "name" : "hi52"
            }
         ],
         "strategy_cnt" : 1,
         "taskid" : 30503,
         "tick_size" : 0.0050000000000000001,
         "trade_unit" : 10000,
         "trd_ratio" : 1,
         "type" : 2,
         "user" : "14"
      }
   },
   "seq" : 36067,
   "type" : 100
}
task_cmd5={
   "data" : {
      "task" : {
         "all_trd_ratio" : 1,
         "date_end" : 20160429,
         "date_start" : 20160415,
         "day_night" : 0,
         "delete_path" : "~/agent_download/2/30558",
         "exchange" : "C",
         "fee_mode" : 1,
         "next_tick_trd_radio" : 0.5,
         "product" : "ZZTA",
         "quote_seq" : 1,
         "simu_fee" : 0.3528,
         "strategy" : [
            {
               "cfg" : "~/agent_download/2/30558/0_166b22891e8570252bc77bae5fbe3a59b34da793458b259d39bcd9582b7c8dd3",
               "file" : "~/agent_download/2/30558/0_2bc7828092993f32ab84ed375474fc7d6d89f91678ca1d0c840edd4ec4072096",
               "max_pos" : 30,
               "name" : "hi52"
            }
         ],
         "strategy_cnt" : 1,
         "taskid" : 30558,
         "tick_size" : 2,
         "trade_unit" : 5,
         "trd_ratio" : 1,
         "type" : 2,
         "user" : "14"
      }
   },
   "seq" : 36122,
   "type" : 100
}

def test_task():
    import redis
    redis_config = {
        "host": "192.168.3.10",
        "port": 6379,
        "db": 0
    }
    reids_key = "a:rss:cmd:192.168.1.16(debian)"

    mconn = redis.client.StrictRedis(**redis_config)
    # for i in range(1,600):
    #    exec_st = """mconn.rpush(reids_key, json.dumps(mytesttask.task_cmd%s))""" % i
    mconn.rpush(reids_key, json.dumps(task_cmd1))
    mconn.rpush(reids_key, json.dumps(task_cmd2))
    mconn.rpush(reids_key, json.dumps(task_cmd3))
    mconn.rpush(reids_key, json.dumps(task_cmd4))
    mconn.rpush(reids_key, json.dumps(task_cmd5))


if __name__ == "__main__":
    test_task()
