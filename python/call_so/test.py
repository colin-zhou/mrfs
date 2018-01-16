#!/usr/bin/env python
# -*- coding: utf-8 -*-

import struct
from ctypes import *

cur = cdll.LoadLibrary("./a.so")


class EmxArray(Structure):
    """ creates a struct to match emxArray_real_T """

    _fields_ = [('abc', c_int),
                ('x',   c_char * 20)]


    
def init_str(buf, data, size):
    memmove(buf, data, size)


libc = CDLL("libc.so.6")
e = EmxArray(10, "hello world")
libc.printf("initial data: abc = %d, x = %s\n", e.abc, e.x)


@CFUNCTYPE(None, POINTER(EmxArray))
def py_func(data):
    libc.printf("python api: abc = %d, x = %s\n", data.contents.abc, data.contents.x)


cur.wrap_function(py_func, byref(e))
