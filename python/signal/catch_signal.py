#!/bin/python

import os
import sys
import signal


def sig_handler(signum, frame):
    print "sigfault"
    sys.exit(-1)

signal.signal(signal.SIGSEGV, sig_handler)

os.kill(os.getpid(), signal.SIGSEGV)

while True:
    pass
