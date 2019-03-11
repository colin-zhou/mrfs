#!/bin/bash

cat /proc/cpuinfo |grep 'model name'|uniq|sed -e 's/.*\s\+\([.0-9]\+\)GHz.*/\1/'
