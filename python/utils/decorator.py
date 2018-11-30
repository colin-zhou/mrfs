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


def perf_time_b(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        res = func(*args, **kwargs)
        consume = time.perf_counter() - start
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

def debug(func):
    """Print the function signature and return value"""
    @functools.wraps(func)
    def wrapper_debug(*args, **kwargs):
        args_repr = [repr(a) for a in args]
        kwargs_repr = [f"{k}={v!r}" for k, v in kwargs.items()]
        signature = ", ".join(args_repr + kwargs_repr)
        print(f"Calling {func.__name__}({signature})")
        value = func(*args, **kwargs)
        print(f"{func.__name__!r} returned {value!r}")
        return value


def count_calls(func):
    """
    count the call number of function
    """
    @functools.wraps(func)
    def wrapper_count_calls(*args, **kwargs):
        wrapper_count_calls.num_calls += 1
        print(f"Call {wrapper_count_calls.num_calls} of {func.__name__!r}")
        return func(*args, **kwargs)
    wrapper_count_calls.num_calls = 0
    return wrapper_count_calls


def singleton_b(cls):
    """Make a class a Singleton class (only one instance)"""
    @functools.wraps(cls)
    def wrapper_singleton(*args, **kwargs):
        if not wrapper_singleton.instance:
            wrapper_singleton.instance = cls(*args, **kwargs)
        return wrapper_singleton.instance
    wrapper_singleton.instance = None
    return wrapper_singleton


def cache(func):
    """Keep a cache of previous function calls"""
    @functools.wraps(func)
    def wrapper_cache(*args, **kwargs):
        cache_key = args + tuple(kwargs.items())
        if cache_key not in wrapper_cache.cache:
            wrapper_cache.cache[cache_key] = func(*args, **kwargs)
        return wrapper_cache.cache[cache_key]
    wrapper_cache.cache = dict()
    return wrapper_cache

