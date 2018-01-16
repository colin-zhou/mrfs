#!/usr/bin/env python3.5
# -*- coding: utf-8 -*-

import os
import time
import atexit
from functools import wraps


def Singleton(cls):
    instances = {}
    def _singleton(*args, **kw):
        if cls not in instances:
            instances[cls] = cls(*args, **kw)
        return instances[cls]
    return _singleton


@Singleton
class ProfileHandler(object):
    def __init__(self):
        self.time_record = {}
        atexit.register(self.cleanup)

    def record(self, func_name, time_consumption):
        x = self.time_record.setdefault(func_name, {})
        ct = x.get('time', 0)
        x['time'] = ct + time_consumption
        nt = x.get('count', 0)
        x['count'] = nt + 1

    def format(self):
        title = "Time Consumption List :\n\n"
        body = "{:<40}{:>20}{:>20}\n".format('function_name', 'call_cnt', ' total_time(ms)')
        total_time = 0
        for key, item in self.time_record.items():
            body += "{:<40}{:>20d}{:>20f} ms\n".format(key, item['count'], item['time'] * 1000)
            total_time += item['time']
        body += "\nTotal time consumption: {0:.6} ms\n".format(total_time * 1000)
        return title + body

    def cleanup(self):
        abs_file = os.path.abspath(__file__)
        fat_dir = os.path.dirname(os.path.dirname(abs_file))
        pfile = os.path.join(fat_dir, "logs/profile.log")
        pdir = os.path.dirname(pfile)
        if not os.path.exists(pdir):
            os.makedirs(pdir)
        write_data = self.format()
        with open(pfile, "w") as f:
            f.write(write_data)


def sw_fn_timer(cond):
    def non_decorator(function):
        return function

    def fn_timer(function):
        @wraps(function)
        def function_timer(*args, **kwargs):
            t0 = time.time()
            result = function(*args, **kwargs)
            t1 = time.time()
            ProfileHandler().record(function.__name__, t1-t0)
            return result
        return function_timer
    return non_decorator if not cond else fn_timer


@sw_fn_timer(True)
def my_test():
    import time
    time.sleep(1)


def convert_epoch_stamp(trade_date, day_night, cur_time):
    # TODO: calendar date
    if day_night == 1:
        cur_day = trade_date - 1
    else:
        cur_day = trade_date
    # convert cur_time to kdb_stamp
    year = cur_day // 10000
    month = cur_day // 100 % 100
    day = cur_day % 100
    if cur_time < 30000000:
        cur_time += 240000000
    milisec = cur_time % 1000
    hour = cur_time // 10000000
    minute = cur_time // 100000 % 100
    second = cur_time // 1000 % 100
    t = (year, month, day, hour, minute, second, 0, 0, 0)
    secs = time.mktime(t)
    return int(milisec* 1e3 + secs * 1e6)


if __name__ == "__main__":
    my_test()
