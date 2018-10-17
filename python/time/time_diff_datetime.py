# -*- coding: utf-8 -*-

"""
This shows that time module format date is quick than the datetime did
"""

import time
from datetime import datetime
from myperf import perf_print


def time_format():
    seconds = time.time()
    the_time = time.localtime(seconds)
    time.strftime("%Y.%m.%d", the_time)

def datetime_format():
    today = datetime.today()
    today.strftime("%Y.%m.%d")


@perf_print
def testcase1():
    for i in range(1000):
        time_format()


@perf_print
def testcase2():
    for i in range(1000):
        datetime_format()


if __name__ == "__main__":
    testcase1()
    testcase2()
