#!/usr/bin/python
#-*-coding:utf-8-*-

"""
 *  Description: 整个工程依赖的日志类
 *  Author:pax  Modify:savion
 *  Date: 2015-04-02
"""

import os, sys, logging
from logging.handlers import TimedRotatingFileHandler
from utils import Singleton


LEVELS = {'debug': logging.DEBUG,
          'info':  logging.INFO,
          'warn':  logging.WARNING,
          'error': logging.ERROR,
          'fatal': logging.CRITICAL}

@Singleton
class MYLogger:
    __logger = None

    def __init__(self, level, logfile):
        MYLogger.__logger = logging.getLogger()
        setval = LEVELS.get(level.lower(), logging.WARNING)
        MYLogger.__logger.setLevel(setval)

        ch = logging.handlers.TimedRotatingFileHandler(logfile, 'D')
        format = '%(asctime)s | %(levelname)s | %(message)s'
        fmt = logging.Formatter(format)
        ch.setFormatter(fmt)
        MYLogger.__logger.addHandler(ch)

    def details(self, msg, depth=2):
        frame = sys._getframe(depth)
        file = os.path.basename(frame.f_code.co_filename)
        linenum = ''
        if frame.f_back is not None:
            linenum = frame.f_back.f_lineno
        info = "%s - %s line:%s" % (file, frame.f_code.co_name, linenum)
        return "%s | %s" % (info, msg)

    def debug(self, msg):
        MYLogger.__logger.debug(self.details(msg))

    def info(self, msg):
        MYLogger.__logger.info(self.details(msg))

    def warn(self, msg):
        MYLogger.__logger.warn(self.details(msg))

    def error(self, msg):
        MYLogger.__logger.error(self.details(msg))

    def fatal(self, msg):
        MYLogger.__logger.critical(self.details(msg))

