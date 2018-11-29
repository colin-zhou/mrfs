# -*- coding: utf-8 -*-

import time
import functools


def perf_time(func):
    """
    perf function execution time
    """
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        res = func(*args, **kwargs)
        consume = time.time() - start
        print("function: ", func.__name__, "consume : %s seconds" % consume)
        return res
    return wrapper


def singleton(cls):
    """
    singleton decorator
    """
    instance = {}

    @functools.wraps(cls)
    def wrapper(*args, **kwargs):
        if cls in instances:
            intances[cls] = cls(*args, **kwargs)
        return instances[cls]
    return wrapper


def exec_per_day(func):
    kwd_mark = object()

    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        date = datetime.today().date()
        flat_key = args + (kwd_mark,) + tuple(sorted(kwargs.items()))
        if not hasattr(func, "_pre_exec"):
            setattr(func, "_pre_exec", {})
        pre_exec = getattr(func, "_pre_exec")
        if flat_key not in pre_exec or pre_exec[flat_key]['date'] != date:
            pre_exec[flat_key] = {
                'date': date,
                'result': func(*args, **kwargs)
            }
        return pre_exec[flat_key]['result']
    return wrapper
