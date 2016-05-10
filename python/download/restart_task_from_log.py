# -*- coding: utf-8 -*-

import redis
import json
import sys


redis_config = {
        "host": "192.168.3.10",
        "port": 6379,
        "db": 0
    }

task_num = 0
total_task = []
download = []

def usage():
    print "python restart_task_from_log.py N [N >= 0 && N <= 200]"
    sys.exit(0)

def param_check():
    if len(sys.argv) != 2:
        usage()
    else:
        try:
            global task_num
            task_num = int(sys.argv[1])
            if task_num < 0 or task_num > 200:
                usage()            
        except Exception as e:
            usage()

def get_start_task():
  with open("bss-agent.log") as f:
    start = False
    end = False
    tmp_str = ""
    for line in f:
      if end:
        t_task = tmp_str[1:]
        try:
          real_task = json.loads(t_task)
          total_task.append(t_task)
        except:
          pass
        start = False
        end = False
      if line.find("start the task") != -1:
        start = True
        tmp_str = ""
        continue
      if start and line == "}\n":
        tmp_str += line
        end = True
      if start and not end:
        tmp_str += line

def stop_all_task():
  data = {'type': 102,
          'seq': 1,
          'data': {
            'user': '14',
            'type': 2,
            'taskid': [1, 2, 3]
          }
        }

def start_task():

    redis_key1 = "a:rss:cmd:192.168.1.16(debian)"
    redis_key2 = "a:rss:cmd:192.168.3.10(debian-rss)"
    print "%s task to write to redis: %s %s, %s" % (task_num, redis_config["host"],
            redis_key1, redis_key2)

    mconn = redis.client.StrictRedis(**redis_config)
    mconn.delete(redis_key1)
    mconn.delete(redis_key2)

    for idx in range(len(total_task)):
        if idx >= task_num:
            print "task restart has finished"
            break
        the_obj = json.loads(total_task[idx])
        the_obj["data"]["task"]["date_start"] = 20160201
        real_task = json.dumps(the_obj)
        mconn.rpush(redis_key1, real_task)
        mconn.rpush(redis_key2, real_task)


if __name__ == "__main__":
    param_check()
    get_start_task()
    start_task()
