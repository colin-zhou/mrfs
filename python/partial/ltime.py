# -*- coding: utf-8 -*-

import pytz
import datetime
import functools


local_tz = pytz.timezone('Asia/Shanghai')
local_time = functools.partial(datetime.datetime.now, local_tz)


if __name__ == "__main__":
    timenow = local_time()
    print(timenow)
