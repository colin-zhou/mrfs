#!/bin/bash

# convert file of ISO-8859 to utf-8

find ./ "*.h|*.cpp" | xargs file | grep "8859" | awk '{print $1}' | sed 's/.$//' | awk '{print "iconv -f ISO-8859-1 -t UTF-8 " $1 " > " $1 ".tmp && mv " $1 ".tmp " $1}' | /bin/bash
