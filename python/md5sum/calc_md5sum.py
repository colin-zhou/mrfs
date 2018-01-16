#!/bin/python


import hashlib
from functools import partial



def md5sum_check(filename):
    m = hashlib.md5()
    with open(filename, "r") as f:
        for buf in iter(partial(f.read, 128), b''):
            m.update(buf)
    return m.hexdigist()
