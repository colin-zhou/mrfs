#!/bin/bash

# make sure only one mysql process running on the machine

count=1

while true
do

mysql -uroot -p123 -S "/root/bin/mysqld_3307.sock" -e "show status;" > /dev/null 2>&1
i=$?
if [ $i = 0 ]
then
   echo "success"
   exit 0
else
   if [ $count -gt 5 ];then
        echo "failed"
	exit 1
   fi
   let count++
   continue
fi

done
