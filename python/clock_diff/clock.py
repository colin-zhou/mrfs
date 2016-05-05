# -*- coding:utf-8 -*-

import time
import datetime
import threading

import sys
sys.path.append("../../")
# sys.path.append("")

from utils import Log
import config as cfg
from commdefs.utils import Singleton
from commdefs.redis_set import MessageSet
from commdefs.redis_hashmap import MessageHashMap


@Singleton
class ScanServerClock(threading.Thread):
    """scan server clock interval to check the delay time"""
    # default scan cycle is 0.2 second
    def __init__(self):
        super(self.__class__, self).__init__()
        # sync clock while restart or in the midnight
        try:
            self.base_time_diff = datetime.timedelta(0)
            self.base_host = cfg.BASE_TIME_SERVER
            self.pre_snapshot = {}
            self.adjust_day = None

            self.clock_diff = {}
            self.clock_diff[self.base_host] = datetime.timedelta(0)

            self.redis_host_set = MessageSet(cfg.AGENT_OSS_HOSTS)
            self.redis_hash_map = MessageHashMap(cfg.AGENT_OSS_CLOCK)

            self.running = True
            self.cycle = cfg.CLOCK_QUERY_SYCLE
        except:
            Log.error('error happened')

    def get_clock_diff(self, host=None):
        if not host:
            return self.clock_diff
        if host in self.clock_diff:
            return self.clock_diff[host]
        return None

    def adjust_basediff(self, unix_timestamp):
        local_basetime = datetime.datetime.fromtimestamp(float(unix_timestamp) / 1000)
        now = datetime.datetime.now()
        self.base_time_diff = local_basetime - now

    def clock_updated(self, host, timestamp):
        if host in self.pre_snapshot and self.pre_snapshot[host] == timestamp:
            return False
        self.pre_snapshot[host] = timestamp
        return True

    def calc_clock_diff(self, local_time, host_time):
        relative_time = local_time + self.base_time_diff
        return relative_time - host_time

    def scan_server_clock(self):
        scan_time = datetime.datetime.now()
        hosts = self.redis_host_set.get_msg()
        for host in hosts:
            host_clock = self.redis_hash_map.get_msg(host)
            # host_clock not exist
            if not host_clock:
                self.clock_diff[host] = None
            # adjust time once a day
            elif host == self.base_host:
                if self.ajust_day != scan_time.day:
                    if self.clock_updated(host, host_clock):
                        self.adjust_day = scan_time.day
                        self.adjust_basediff(host_clock)
            # one check-server clock updated
            elif self.clock_updated(host, host_clock):
                host_clock = datetime.datetime.fromtimestamp(float(host_clock) / 1000)
                self.clock_diff[host] = self.calc_clock_diff(scan_time,
                                                             host_clock)
        # clear host not in redis-hosts or redis-clock
        to_del_host = []
        for exist_host in self.clock_diff:
            if exist_host not in hosts:
                to_del_host.append(exist_host)

    def stop(self):
        self.running = False

    def run(self):
        while self.running:
            self.scan_server_clock()
            time.sleep(self.cycle)


def convert_timedelta_to_int(sometime):
    if isinstance(sometime, datetime.timedelta):
       return sometime.total_seconds() * 1000
    return None



if __name__ == "__main__":
    print "start thread"
    x = ScanServerClock()
    x.start()
    while True:
        time.sleep(5)
        print datetime.datetime.now()
        m = x.get_clock_diff()
        for key,value in m.items():
            print key,":",convert_timedelta_to_int(value)
