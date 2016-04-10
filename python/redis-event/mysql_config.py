#!/usr/bin/python
# -*-coding:utf-8-*-

"""
Sync fetch the config from mysql, subsrcibe a redis key, while event happened
then sync the specified msg
Copyright(c) 2007-2016, by MY Capital Inc.
"""

config = {
    'host': 'localhost',
    'port': 6379,
    'db': 0,
}

import redis
import threading
from operation.models import MonitorThresholdCfg


class threshold_cfg_mgr(object):
    """
    cash current threshold config in msyql, automatically update while mysql
    update those data
    """
    class conn_type:
        redis = 1<<1
        mysql = 1<<2

    def __init__(self, redis_conn, obj_fields):
        # init mysql, redis connection
        self.data = object()
        self.redis_conn = redis_conn
        self.obj_fields = obj_fields

    def get_obj(self):
        return self.data

    def fetch_cfg_obj(self, iphost):
        # fetch the specified iphost's cfg
        if iphost and iphost in self.data:
            return self.data[iphost]
        return None

    def mysql_to_local(self):
        all_entries = MonitorThresholdCfg.objects.all()
        for row in all_entries:
            if row.iphost:
                self.data[row.iphost] = row

    def subsribe(self, channel):
        # subsribe specified channel 




    
    

def my_publish(channel, message):
    r = redis.client.StrictRedis(**config)
    r.publish(channel, message)
	

def callback():
    r = redis.client.StrictRedis(**config)
    sub = r.pubsub()
    sub.subscribe('threshold_config')
    while True:
        for m in sub.listen():
            print m    

def redis_subscript():
    t = threading.Thread(target=callback)
    t.setDaemon(True)
    t.start()


if __name__ == "__main__":
    my_publish('threshold_config', "123")
    redis_subscript()
    my_publish('threshold_config','OK')
    while True:
        import time
        import datetime
        time.sleep(1)
        print datetime.datetime
           
