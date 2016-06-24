#!/bin/python
# -*- coding:utf-8 -*-

import re
import datetime

def convert_to_24hour(hour, minute, am_pm):
    print hour, minute, am_pm
    if am_pm.strip() == "pm" and hour < 12:
        hour += 12
    if am_pm.strip() == "am" and hour == 12:
        hour -= 12
    return datetime.time(hour, minute)

def alert_time_to_list(str_time):
    time_re = re.compile(r'^(0[1-9]|1[0-2]):([0-5]\d)([apAP][mM])$')
    time_list = str_time.split(',')
    ret_list = []
    for item_time in time_list:
        time_s_e = item_time.split('-')
        if not time_s_e or len(time_s_e) != 2:
            continue
        time_obj = {}
        start = time_re.match(time_s_e[0])
        end = time_re.match(time_s_e[1])
        print "start:", time_s_e[0], "end:", time_s_e[1]
        if start and end:
            print "runtest", start.group(), start.group(2), start.group(3), start.group(1)
            time_obj["start"] = convert_to_24hour(int(start.group(1)),
                                                  int(start.group(2)),
                                                  start.group(3))
            time_obj["end"] = convert_to_24hour(int(end.group(1)),
                                                int(end.group(2)),
                                                end.group(3))
        ret_list.append(time_obj)
    return ret_list

def in_alert_time(all_data, host):
    if host not in all_data:
        return True
    now = datetime.datetime.now()
    now_time = datetime.time(now.hour, now.minute)
    time_list = alert_time_to_list(all_data[host]["alert_time"])
    for ran_item in time_list:
        print now_time, ran_item
        if now_time <= ran_item["end"] and now_time >= ran_item["start"]:
            return True
    return False


if __name__ == "__main__":
    data = {"test":{"alert_time":"08:00am-10:00am,10:10am-11:00am,01:00pm-03:30pm,08:00pm-9:20pm"}}
    print in_alert_time(data,"test")
