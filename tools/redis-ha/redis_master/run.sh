#!/bin/bash



start()
{
	echo "123456" | sudo -S redis-server ./redis.conf --protected-mode no &
	echo "123456" | sudo -S redis-server ./sentinel.conf --sentinel &
}

stop()
{
	ps aux|grep redis|grep -v ":6379" | grep -v "grep" | awk '{print $2}' |xargs kill -9
}

if [ $1 = "start" ];then
	start
elif [ $1 = "stop" ]; then
	stop
fi
