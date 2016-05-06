# -*- coding: utf-8 -*-

from remote_file_operation import main
import json
import os
import re

def read_task():
   

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
