#!/usr/bin/env python

import time
import numpy as np


def method1(data):
    for i,_ in enumerate(data):
        pass


def method2(data):
    size = len(data)
    for i in range(size):
        pass


def method3(data):
    # i = 0
    for x in data:
        # i += 1
        pass


if __name__ == "__main__":
    data = np.zeros(shape=1000000, dtype=([('abc', 'i4'),
                                           ('efg', 'i4')]))

    start = time.time()
    method1(data)
    end = time.time()
    print("method1", end - start)

    start = time.time()
    method2(data)
    end = time.time()
    print("method2", end - start)


    start = time.time()
    method3(data)
    end = time.time()
    print("method3", end - start)
