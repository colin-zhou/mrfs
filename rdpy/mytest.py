#! /usr/bin/python
# -*- coding:utf-8 -*-

from connect import mytest

address= ['192.168.0.111']
user=['admin','test', 'colin']
passwd=['admin','201583', 'zhou']

for add in address:
    for ur in user:
        for pwd in passwd:
            try:
                print "test ------------"
                res = mytest(add, '3389', ur, pwd)
            except Exception:
                res = {"connected": False}
            print res
