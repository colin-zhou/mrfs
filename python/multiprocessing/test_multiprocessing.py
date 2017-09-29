#!/bin/python3.5

import time
import multiprocessing


def func(x):
    return [x] * 10


def work(task, resu):
    while True:
        if not task.empty():
            tsk = task.get()
            ret = func(tsk) 
            resu.put(ret)
        else: 
            time.sleep(0.1)


task = multiprocessing.Queue()
resu = multiprocessing.Queue()

ppool = multiprocessing.Pool(10, work, (task, resu))

for i in range(100):
    task.put(i) 

result_list = []

def pull_resu(resu):
    while len(result_list) != 100:
        if not resu.empty():
            result_list.append(resu.get()) 
    print(result_list)

pull_resu(resu)
