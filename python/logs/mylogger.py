#!/usr/bin/env python3.5
# -*- coding: utf-8 -*-


import os
import logging
import argparse


class LoggerHandler:
	def __init__(self, lname='bss-agent', lid=1):
		if not os.path.exists('./logs'):
			os.makedirs('./logs')
		log_name = "logs/%s_%d.log" % (lname, lid)
		self.logger = logging.getLogger(__name__)
		self.logger.setLevel(logging.DEBUG)
		fh = logging.FileHandler(log_name)  # record above debug into log file
		fh.setLevel(logging.DEBUG)
		ch = logging.StreamHandler()        # terminal print log above error
		ch.setLevel(logging.ERROR)
		formatter = logging.Formatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s")
		ch.setFormatter(formatter)
		fh.setFormatter(formatter)
		self.logger.addHandler(ch)          # register termianl print log into logger
		self.logger.addHandler(fh)          # register file log into logger

	def debug(self, *args, **kwargs):
		self.logger.debug(*args, **kwargs)

	def info(self, *args, **kwargs):
		self.logger.debug(*args, **kwargs)

	def warn(self, *args, **kwargs):
		self.logger.warn(*args, **kwargs)

	def error(self, *args, **kwargs):
		self.logger.error(*args, **kwargs)

	def critical(self, *args, **kwargs):
		self.logger.critical(*args, **kwargs)


def parse_command_line():
	parser = argparse.ArgumentParser(description='my argument parser')
	parser.add_argument('-p', '--process', type=int, default=0, help='process index')
	args = parser.parse_args()
	return args.process


logger = LoggerHandler(lid=parse_command_line())


if __name__ == '__main__':
	logger = LoggerHandler(1)
	logger.debug('123')
	logger.info('123')
	logger.warn('123')
	logger.error('123')
	logger.critical('123')
