# -*- coding: utf-8 -*-

import os
import time
import math
import numpy as np
import signal
import psutil
import functools
from concurrent.futures import ProcessPoolExecutor

NUM_WORKER = 4
process_pool = ProcessPoolExecutor(max_workers=NUM_WORKER)


def kill_child(parent_id, sig=signal.SIGTERM):
    try:
        parent = psutil.Process(parent_id)
    except psutil.NoSuchProcess:
        return
    children = parent.children(recursive=True)
    for process in children:
        process.send_signal(sig)


def signal_hdl(signum, frame):
    print("multiprocess prepare exit!!!!!", signum, frame)
    kill_child(os.getpid())
    exit(0)


def chunks(l, n):
    for i in range(0, len(l), n):
        yield l[i:i + n]


signal.signal(signal.SIGINT, signal_hdl)
signal.signal(signal.SIGTERM, signal_hdl)


def test(arr):
    return np.sum(arr)


def test_function():
    results = []
    jobs = []
    simu_cnt = 1000000
    chunk_size = math.ceil(simu_cnt / float(NUM_WORKER))
    for slice_task in chunks(range(simu_cnt), chunk_size):
        fut = process_pool.submit(test, slice_task)
        jobs.append(fut)
    for fut in jobs:
        results.append(fut.result())
    return np.sum(results)


if __name__ == "__main__":
    t1 = time.perf_counter()
    ret = test_function()
    print(time.perf_counter() - t1, "seconds", ret)
    print("the results is", ret)
