# -*- coding: utf-8 -*-

import time
import functools


def perf_print(f):
    @functools.wraps(f)
    def wrapper(*args, **kwargs):
        start = time.time()
        res = f(*args, **kwargs)
        end = time.time()
        print("function %s consumption %s seconds" % (f.__name__, end - start))
        return res
    return wrapper


@perf_print
def test():
    time.sleep(1.0)


if __name__ == "__main__":
    test()
