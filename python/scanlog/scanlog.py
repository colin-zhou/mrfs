#! /bin/python
# -*- coding: utf-8 -*-

import sys
import re

def usage():
    print "usage: python scanlog.py log_file_name"
    sys.exit(-1)

def get_serial_no(row_data):
    tr = re.findall(r'serial_no: (.*?);', line)
    if tr:
        return tr[0]
    return None

if len(sys.argv) != 2:
    usage()

filename = sys.argv[1]

# 2016-06-15 14:41:33.900214 - [PlaceOrder] serial_no: 100000000000001; stock_code: cu1609; limit_price: 3240.0000; direction: 0; open_close: 0; speculator: 0; volume: 1; order_kind: 0; order_type: 0; account_no: 001761;
# 2016-06-15 14:41:34.551838 - [OrderRespond] serial_no: 100000000000001; error_no: 0; entrust_no: 0; entrust_status: a; account_no: 001761;
# 2016-06-15 14:41:34.552010 - [OrderReturn] serial_no: 100000000000001; stock_code: cu1609; limit_price: 0.0000; direction: 0; open_close: 0; speculator: 1; volume: 1; entrust_no: 1; entrust_status: a; volume_remain: 1; account_no: 001761;
# 2016-06-15 14:41:34.552141 - [OrderReturn] serial_no: 100000000000001; stock_code: cu1609; limit_price: 0.0000; direction: 0; open_close: 0; speculator: 1; volume: 1; entrust_no: 1; entrust_status: c; volume_remain: 0; account_no: 001761;
# 2016-06-15 14:41:34.552276 - [TradeReturn] serial_no: 100000000000001; entrust_no: 1; business_volume: 1; business_price: 3240.0000; business_no: 0; stock_code: cu1609; direction: 0; open_close: 0; account_no: 001761;
order_list = {}
print "key->[order_cnt, resp_cnt, rtn_cnt, trade_cnt]"
line_cnt = 0
order_cnt_total, resp_cnt_total, rtn_cnt_total, trade_cnt_total = 0,0,0,0
with open(filename) as f:
    for line in f:
        line_cnt += 1
        serial_no = get_serial_no(line)
        if not serial_no:
            print "line doesn't include serial_no", line
        elif line.find("[PlaceOrder]") != -1:
            # it is place order
            if serial_no in order_list:
                order_list[serial_no][0] += 1
            else:
                order_list[serial_no] = [1, 0, 0, 0]
        elif line.find("[OrderRespond]") != -1:
            # it is order resp
            if serial_no in order_list:
                order_list[serial_no][1] += 1
            else:
                order_list[serial_no] = [0, 1, 0, 0]
        elif line.find("[OrderReturn]") != -1:
            # it is order rtn
            if serial_no in order_list:
                order_list[serial_no][2] += 1
            else:
                order_list[serial_no] = [0, 0, 1, 0]
        elif line.find("[TradeReturn]") != -1:
            # it is trade rtn
            if serial_no in order_list:
                order_list[serial_no][3] += 1
            else:
                order_list[serail_no] = [0, 0, 0, 1]
        else:
            print line

print "total lines: ",line_cnt
print "total serial_no:", len(order_list)

for serial_no in order_list:
    order_cnt_total += order_list[serial_no][0]
    resp_cnt_total += order_list[serial_no][1]
    rtn_cnt_total += order_list[serial_no][2]
    trade_cnt_total += order_list[serial_no][3]
    if order_list[serial_no] != [1, 1, 2, 1]:
        print "the error serial_no and cnt is ", serial_no, order_list[serial_no]

print "total placeorder", order_cnt_total
print "total orderrespond", resp_cnt_total
print "total orderreturn", rtn_cnt_total
print "total tradereturn", trade_cnt_total
