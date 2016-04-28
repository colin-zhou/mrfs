import redis
import datetime
import threading
import time


redis_config = {
	"host": "127.0.0.1",
	"port": 6379,
	"db": 0
}

mconn = redis.client.StrictRedis(**redis_config)



x = mconn.hget("a:oss:clock", "192.168.3.10(debian-rss)")

print float(x)/1000
