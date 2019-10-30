# -*- coding: utf-8 -*-

import time
from functools import partial
import numpy as np
from multiprocessing import Pool, Array, Value

# about 128MB
data_size = 6710886

# shared memory
size = Value('i', 1)
data = Array('i', data_size, lock=False)


def haha(s=size, d=data):
    s = time.time()
    time.sleep(1)
    con = time.time() - s
    print("haha", con)
    return 0
    # return np.sum(d[:size.value])


def run():
    p = Pool(4)
    res = []
    size.value = data_size
    data[:data_size] = np.arange(data_size)
    start = time.time()
    for i in range(4):
        ret = p.apply_async(haha)
        res.append(ret)
    p.close()
    p.join()
    for r in res:
        r.get()
    print("total", time.time() - start)


def keke(x):
    s = time.time()
    time.sleep(1)
    con = time.time() - s
    print("keke", con)
    return 0
    # return np.sum(x)


def run1():
    res = []
    p = Pool(4)
    a = np.arange(data_size)
    # start = time.time()
    start = time.time()
    for i in range(8):
        ret = p.apply_async(haha, args=(a,))
        res.append(ret)
    p.close()
    p.join()
    for r in res:
        r.get()
    print("total", time.time() - start)


if __name__ == "__main__":
    run()
    run1()
