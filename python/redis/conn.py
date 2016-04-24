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
# x = mconn.hgetall("a:oss:market")

redis_key = "a:oss:tradelog:192.168.0.113(debian)"
redis_value = {
"1032030_shrb_2343453.log": {
	"status": 0,
	"msg": "",
	"update_time": "2016-04-12 14:21:45.391 CST"
},
"1302943_shru_2398202.log": {
	"status": -1,
	"msg": "not write",
	"update_time": "2016-04-12 14:21:45.391 CST"
},
"1324343_shbu_3209430.log": {
	"status": -2,
	"msg": "load quote error",
	"update_time": "2016-04-12 14:21:45.391 CST"
},
"1324343_shbu_3209445.log": {
	"status": -3,
	"msg": "not exist",
	"update_time": "2016-04-12 14:21:45.391 CST"
}
}
# print len(x)
# print x



while True:
	import time
	import json
	ctime = str(datetime.datetime.now())[:-3]
	for key in redis_value:
		redis_value[key]["update_time"] = ctime
	for in_key, value in redis_value.iteritems():
		in_value = json.dumps(value)
		print in_key, in_value
		mconn.hset(redis_key, in_key, in_value)
	mconn.hset(redis_key, "update_time", ctime)
	print ctime
	time.sleep(5)