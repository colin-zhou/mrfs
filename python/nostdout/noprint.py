#!/bin/python3.5


import os
import sys
from contextlib import contextmanager


@contextmanager
def silence_stdout():
    new_target = open(os.devnull, "w")
    old_target, sys.stdout = sys.stdout, new_target
    try:
        yield new_target
    finally:
        sys.stdout = old_target


with silence_stdout():
    print("will not print")


print("this will print")
