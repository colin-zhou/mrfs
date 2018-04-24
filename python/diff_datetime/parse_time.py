#!/usr/bin/evn python


import time
from datetime import datetime



def method1(i_date):
    d = datetime.strptime(str(i_date), '%Y%m%d')
    return d.strftime('%Y.%m.%d')


def method2(i_date):
    year = i_date / 10000
    month = i_date / 100 % 100
    day = i_date % 100
    return "%d.%d.%d" % (year, month, day)
    



start = time.time()
method1(20180310)
end = time.time()
t1 = end - start
print(t1)

start = time.time()
method2(20180310)
end = time.time()
t2 = end - start
print(t2)



print(t2 / t1)

