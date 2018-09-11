#!/bin/bash


function start {
	# mysqld --defaults-file=/mnt/beegfs/mysql/my.cnf 
	mysqld --defaults-file=/root/bin/my.cnf --daemonize --user=root > /dev/null 2>&1
}

function stop {
	# ps uax|grep "/root/bin/my.cnf" | grep -v grep | awk '{print $2}' | xargs kill -9
	mysqladmin -uroot -p123 -S /root/bin/mysqld_3307.sock shutdown
}

if [ $# != 1 ]; then
	echo "argument error"
	exit 0
fi

if [ $1 == "start" ];then
	start
elif [ $1 == "stop" ];then
	stop
fi
