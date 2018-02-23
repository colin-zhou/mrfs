#!/bin/bash


# clear cache
echo "password" | sudo -S sysctl -m vm.drop_caches=3

# start monitor(transmite, receive)
speedometer -r wlan0 -t wlan0

# bind core
taskset -c 0-10 ./xxx
