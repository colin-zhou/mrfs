#!/usr/bin/env python3


import time
import MySQLdb
import signal
from datetime import datetime


start = False
stop_time = None
running = True


def sig_handler(sig, frame):
	global running
	running = False
	print("prepare stop", running)


signal.signal(signal.SIGINT, sig_handler)
signal.signal(signal.SIGTERM, sig_handler)


while running:
	try:
		db = MySQLdb.connect(host='192.168.1.220', port=3307, user='root', passwd='123', db='mysql', connect_timeout=3)
		c = db.cursor()
		c.execute('select count(*) from user')
		res = c.fetchone()
		if stop_time is not None:
			print("recover time is", time.time() - stop_time)
			stop_time = None
		time.sleep(0.1)
		if not start:
			print("start time: ", datetime.now())
			start = True
	except:
		if stop_time is None:
			stop_time = time.time()
