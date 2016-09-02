#!/usr/bin/env python
# -*-codind: utf-8-*-

'''
read from kdb, format to specified kind of data
colin<zhouchaolin@yeah.net>
'''
from qpython import qconnection
import json


def format_data(in_dat):
    ret = []
    for line in in_dat:
        temp = {}
        temp_1 = []
        # mili-seconds (epoch unix time)
        temp['time'] = int(line[0]) / 1000000 + 946684800000
        temp['open'] = int(line[10])
        temp['high'] = int(line[11])
        temp['low'] = int(line[12])
        temp['volumn'] = int(line[13])
        temp['bp1'] = float(line[23])
        temp['bv1'] = int(line[24])
        temp['ap1'] = float(line[25])
        temp['av1'] = int(line[26])
        temp['close'] = int(temp['bp1'])
        temp_1.append(temp['time'])
        temp_1.append(temp['open'])
        temp_1.append(temp['high'])
        temp_1.append(temp['low'])
        temp_1.append(temp['close'])
        ret.append(temp_1)
    return ret


def read_latest_data():
    q = qconnection.QConnection(host='192.168.1.180', port=9002,
                                username='superuser1', password='password',
                                timeout=3)
    q.open()
    data = q.sync('select from myctpquote where sym=`rb1610')
    return format_data(data)


if __name__ == '__main__':
    data_obj = read_latest_data()
    data = json.dumps(data_obj, indent=2)
    with open("out_new.json", "w") as f:
        f.write(data)
    print "task finished"
