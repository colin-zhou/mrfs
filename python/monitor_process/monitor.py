# -*- coding: utf-8 -*-

# Import Python libs
import os, re, signal, subprocess

# monitor a process
def monitor():
    print "Starting procedure"

    p = subprocess.Popen('./problematic_procedure.py',
                         stdout=subprocess.PIPE
                         )

    while p.poll() is None:
        line = p.stdout.readline()
        print "Procedure output was %s" % line
        if re.match('bad', line):
            os.kill(p.pid, signal.SIGTERM)
            print "Procedure failed so I killed it"
            monitor()

monitor()
print 'Procedure exited'
