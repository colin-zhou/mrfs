# -*- coding: utf-8 -*-

import threading
import time
import datetime

class test(threading.Thread):

	def __init__(self):
		super(test, self).__init__()
		self.running = True
		self.sharedata = 0

	def stop(self):
		self.running = False

	def getdata(self):
		return self.sharedata

	def run(self):
		while self.running:
			time.sleep(2)
			self.sharedata = datetime.datetime.now()
			print "thread time"

if __name__ == "__main__":
	t = test()
	t.start()
	print t.getdata()
	time.sleep(3)
	print t.getdata()
