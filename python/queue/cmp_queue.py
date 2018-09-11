# -*- coding: utf-8 -*-


import time
import json
from collections import deque


def list_operation(size):
    list_data = [1] * 4320
    prepared_data = [10] * 4320
    start = time.time()
    for item in prepared_data:
        if len(list_data) == size:
            list_data.pop(0)
        list_data.append(item)
    end = time.time()
    print("list simulation consumption", end - start)


def queue_operation(size):
    queue_data = deque([1] * 4320)
    prepared_data = [10] * 4320
    start = time.time()
    for item in prepared_data:
        if len(queue_data) == size:
            queue_data.popleft()
        queue_data.append(item)
    end = time.time()
    print("deque simulation consumption", end - start)
    start = time.time()
    list(queue_data)
    end = time.time()
    print("the convert time consumption", (end - start) * 100)



if __name__ == "__main__":
    queue_operation(4320)
    list_operation(4320)
