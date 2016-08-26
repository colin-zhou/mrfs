#!/bin/python
#-*- coding: utf=8 =*-

"""
authorize all the servers in roster
this script is based on 
"""

import sys
import os
import 

roster_path = '/etc/salt/roster'

def usage():
    print "au_server user@host"
    sys.exit(-1)

def read_roster():
    

if __name__ == "__main__":
    if len(sys.argv) != 2:
        usage()
