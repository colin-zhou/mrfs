#!/bin/bash


TYPE=$1
NAME=$2
STATE=$3


case $STATE in
	"MASTER") sleep 3
                echo "$(date) master" >> /root/bin/test.haha
                /root/bin/run.sh start
                yes | cp /root/bin/check_mysql_m.sh /root/bin/check_mysql.sh
		exit 0
		;;
	"BACKUP") sleep 3
                echo "$(date) backup" >> /root/bin/test.haha
                /root/bin/run.sh stop
                yes | cp /root/bin/check_mysql_b.sh /root/bin/check_mysql.sh
		exit 0
		;;
	"FAULT") sleep 3
                echo "$(date) stop" >> /root/bin/test.haha
		/root/bin/run.sh stop
                yes | cp /root/bin/check_mysql_b.sh /root/bin/check_mysql.sh
		exit 0
		;;
	*)	echo "unknown state"
		exit 1
		;;
esac
