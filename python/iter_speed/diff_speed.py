# -*- coding: utf-8 -*-


from time import time


def abc():
    start = time()
    x = list(range(10))
    for idx, h in enumerate(x):
        pass
    end = time()
    print(end - start)


def xyz():
    start = time()
    x = list(range(10))
    i = 0
    for _ in x:
        i+= 1
    end = time()
    print(end - start)


def range0():
    iter_d = range(1000000)
    start = time()
    for i in iter_d:
        range(0)
    end = time()
    print((end - start)/1000000)


def substract_each_tick():
    start = time()
    x = 0
    for i in range(10000000):
        x -= 1;
    end = time()
    print(end - start) 


def func():
    pass


def bulk_call():
    start = time()
    for i in range(10000000):
        func()
    end = time()
    print(end - start)

if __name__ == "__main__":
    abc()
    xyz()
    range0()
    substract_each_tick()
    bulk_call()
