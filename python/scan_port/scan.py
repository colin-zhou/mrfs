#!/usr/bin/env python

import os
import time
import signal
import subprocess
from subprocess import Popen, PIPE


def test_ip(ip):
    cmd = 'ping %s' % ip
    session = subprocess.Popen([cmd], stderr=PIPE, stdout=PIPE, shell=True)
    print session.stdout, session.stderr


def runProcess(exe):
    cmd = exe.split(' ')
    p = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, preexec_fn=os.setsid)
    print cmd
    while(True):
        retcode = p.poll() #returns None while subprocess is running
        line = p.stdout.readline()
        if line.find("ttl=") != -1:
            print cmd, "work"
            os.killpg(os.getpgid(p.pid), signal.SIGINT)
            break
        if line.find("timeout") != -1 or line.find("Host is") != -1 or line.find("icmp_seq 0") != -1:
            os.killpg(os.getpgid(p.pid), signal.SIGINT)
            break
        #if line:
        #    yield line

def finished(titer):
    try:
        titer.next()
        return True
    except:
        return False

if __name__ == "__main__":
    iters = []
    for i in xrange(1,256):
        ret = runProcess('ping 192.168.3.%d' % i)
        iters.append(ret)
    while True:
        iters = [x for x in iters if finished(x)]
        if len(iters) == 0:
            break
    print "check finished"
