#!/usr/bin/env python

"""
delete the number backend of string
"""

import re


def truncate_backend_num1(in_str):
    if isinstance(in_str, bytes):
        return in_str.decode('utf-8').rstrip('0123456789').encode('utf-8')
    return in_str.rstrip('0123456789')


def truncate_backend_num2(in_str):
    if not hasattr(truncate_backend_num2, "_cache_re"):
        cache_re = re.compile(r'[0-9]*$')
        setattr(truncate_backend_num2, "_cache_re", cache_re)
    return re.sub(truncate_backend_num2._cache_re, '', in_str)


if __name__ == "__main__":
    in_str = 'rb1801'
    for res in [
        truncate_backend_num1,
        truncate_backend_num2,
        # truncate_backend_num3(),
    ]:
        print(res(in_str))

