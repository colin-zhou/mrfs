#!/usr/bin/env python


import sys
import redis
import json


rds = redis.Redis(host='127.0.0.1', port=6379)

def usage():
    print("python %s {send,recv}" % __file__)
    sys.exit(0)


def send_task():
    task = {"key": "values"}
    rds.rpush('a:rss:cmd', json.dumps(task))
    print("task: %s" % task)


def recv_resu():
    resu = rds.rpop('a:rss:rsp')
    print("recv: %s" % resu)


if __name__ == "__main__":
    if len(sys.argv) != 2:
        usage()
    if sys.argv[1] == "send":
        send_task()
    elif sys.argv[1] == "recv":
        recv_resu()
    else:
        usage()
