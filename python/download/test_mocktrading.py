# -*- coding: utf-8 -*-

from remote_file_operation import main
import json
import os
import re

task_cmd1 = {
   "data": {
      "task": {
         "all_trd_ratio" : 1,
         "date_end" : 20160429,
         "date_start" : 20160201,
         "day_night" : 0,
         "delete_path" : "~/agent_download/2/30500",
         "exchange" : "A",
         "fee_mode" : 1,
         "next_tick_trd_radio" : 0.300000,
         "product" : "shni",
         "quote_seq" : 1,
         "simu_fee" : 0.000212,
         "strategy" : [
            {
               "cfg" : "/home/dev/agent_download/2/41699/0_166b22891e8570252bc77bae5fbe3a59b34da793458b259d39bcd9582b7c8dd3",
               "file" : "/home/dev/agent_download/2/41699/0_87d66d705fbf53f91a4539254ff5c2d276a4dea92dc995499d14a05bfecae39f",
               "max_pos" : 30,
               "name" : "hi27"
            },
            {
               "cfg" : "/home/dev/agent_download/2/41699/1_166b22891e8570252bc77bae5fbe3a59b34da793458b259d39bcd9582b7c8dd3",
               "file" : "/home/dev/agent_download/2/41699/1_205f6e882420eb3a5f586cdda0acd49ebe69bc2936c1ce8a703f82e51d26f8a1",
               "max_pos" : 30,
               "name" : "hi51"
            },
            {
               "cfg" : "/home/dev/agent_download/2/41699/2_166b22891e8570252bc77bae5fbe3a59b34da793458b259d39bcd9582b7c8dd3",
               "file" : "/home/dev/agent_download/2/41699/2_ec53239685d269dc93b729f716d0aef42dea36cc2fbe1735489eb6e35202aa3f",
               "max_pos" : 30,
               "name" : "hi51a"
            },
            {
               "cfg" : "/home/dev/agent_download/2/41699/3_166b22891e8570252bc77bae5fbe3a59b34da793458b259d39bcd9582b7c8dd3",
               "file" : "/home/dev/agent_download/2/41699/3_0a58d13f48daebf3438b1907e743eae628dc2e10810a49438f769aa78ece7a7c",
               "max_pos" : 30,
               "name" : "hi52"
            },
            {
               "cfg" : "/home/dev/agent_download/2/41699/4_166b22891e8570252bc77bae5fbe3a59b34da793458b259d39bcd9582b7c8dd3",
               "file" : "/home/dev/agent_download/2/41699/4_b953e86d441aee519072abe7149d3065af3300e36d9db08f5ed70071aa58d8bd",
               "max_pos" : 30,
               "name" : "hi52a"
            },
            {
               "cfg" : "/home/dev/agent_download/2/41699/5_166b22891e8570252bc77bae5fbe3a59b34da793458b259d39bcd9582b7c8dd3",
               "file" : "/home/dev/agent_download/2/41699/5_045b4e89fabc47a6ce01c7b04b3a66d30e53012a9060bab147ec2bce204bcedb",
               "max_pos" : 30,
               "name" : "hi55"
            },
            {
               "cfg" : "/home/dev/agent_download/2/41699/6_166b22891e8570252bc77bae5fbe3a59b34da793458b259d39bcd9582b7c8dd3",
               "file" : "/home/dev/agent_download/2/41699/6_d4a48e02d9b2e841f9cd5e9909fc9d1e9c9c0583e53f3c37e6c2e2c352847328",
               "max_pos" : 30,
               "name" : "hi55a"
            },
            {
               "cfg" : "/home/dev/agent_download/2/41699/7_166b22891e8570252bc77bae5fbe3a59b34da793458b259d39bcd9582b7c8dd3",
               "file" : "/home/dev/agent_download/2/41699/7_915bcfc5630fbfd5c5cc9edb8ebb93b3066081a5101a9a40fc83413812b0eb0c",
               "max_pos" : 30,
               "name" : "hi75"
            },
            {
               "cfg" : "/home/dev/agent_download/2/41699/8_166b22891e8570252bc77bae5fbe3a59b34da793458b259d39bcd9582b7c8dd3",
               "file" : "/home/dev/agent_download/2/41699/8_343712a7b7c821ab3a8818f9f556620484d9871a407683fc52e9078514216b10",
               "max_pos" : 30,
               "name" : "hi76"
            },
            {
               "cfg" : "/home/dev/agent_download/2/41699/9_166b22891e8570252bc77bae5fbe3a59b34da793458b259d39bcd9582b7c8dd3",
               "file" : "/home/dev/agent_download/2/41699/9_c5f8500a0d1c7f2b717c9159b6e2bb67d48c64557d777de45cd49dc54ae4f496",
               "max_pos" : 30,
               "name" : "hi82"
            },
            {
               "cfg" : "/home/dev/agent_download/2/41699/10_166b22891e8570252bc77bae5fbe3a59b34da793458b259d39bcd9582b7c8dd3",
               "file" : "/home/dev/agent_download/2/41699/10_28fbb28ecb54d2ef961e7a8ee1abf2fbce281c00f055749d5df105d9c044bd00",
               "max_pos" : 30,
               "name" : "hi85"
            },
         ],
         "strategy_cnt" : 11,
         "taskid" : 30500,
         "tick_size" : 0.0050000000000000001,
         "trade_unit" : 10000,
         "trd_ratio" : 1.000000,
         "type" : 2,
         "user" : "14"
      }
   },
   "seq" : 36064,
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

if __name__ == "__main__":
    test_task()
