#!/bin/bash

# make sure only one mysql process running on the machine

count=1

while true
do

mysql -uroot -p123 -S "/root/bin/sqld_3307.sock" -e "show status;" > /dev/null 2>&1
i=$?
if [ $i = 0 ]; then
   exit 0
else
   if [ $count -gt 5 ]; then
      break
   fi
   let count++
fi
done

# make it work now
exit 1
