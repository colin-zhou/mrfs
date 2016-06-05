#!/bin/python
# -*- coding:utf-8 -*-
# echo $HOST | xargs python test.py

import sys

if len(sys.argv) > 1:
    print sys.argv[1]
else:
    print "no params"
