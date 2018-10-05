#!/usr/bin/env python

"""
replace all the number in a string
"""

import re
import string

def remove_num_method1(in_str: str) -> str:
    """based on re module"""
    if not hasattr(remove_num_method1, "_cache_re"):
        cache_re = re.compile(r'\d')
        remove_num_method1._cache_re = cache_re
    return re.sub(remove_num_method1._cache_re, '', in_str)


def remove_num_method2(in_str: str) -> str:
    """based on translate"""
    return in_str.translate(str.maketrans('','', string.digits))


def remove_num_method3(in_str: str) -> str:
    """based on replace method"""
    return "".join(c for c in in_str if not c.isdigit())


if __name__ == "__main__":
    in_str = "123abc124|abc123"
    for func in [
        remove_num_method1,
        remove_num_method2,
        remove_num_method3,
    ]:
        print(func(in_str))
