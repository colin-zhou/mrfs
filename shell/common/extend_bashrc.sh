#!/usr/bin/bash

# grep process with header
psaux () {
    ps -aux | grep -v grep | egrep "PID|$1"
}

