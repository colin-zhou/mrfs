# -*- coding: utf-8 -*-

import redis
import json

total_task = []
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

def test_task():
    redis_config = {
        "host": "192.168.3.10",
        "port": 6379,
        "db": 0
    }
    reids_key = "a:rss:cmd:192.168.1.16(debian)"

    mconn = redis.client.StrictRedis(**redis_config)
    for idx in range(len(total_task)):
      mconn.rpush(reids_key, total_task[idx])

if __name__ == "__main__":
    test_task()