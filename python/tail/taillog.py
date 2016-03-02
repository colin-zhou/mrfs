# -*- coding: utf-8 -*-

import time
import subprocess
import select

'''
event format{
    "name": "notice",
    "log_file": "abc.log",
    "level": "error",
    "infomation": "what happened",
    "time": "2016-01-29 12:00:00",
}
'''

class check_func_arr(object):
    '''generate check func to deal with the log line'''
    '''2016-03-01 15:25:33.180600759 agent.dbg.0.7.0/17678 oss TRACE start the task'''
    class column_info(object):
        DATE = 0
        TIME = 1
        PID = 2
        PROGRAM = 3
        LEVEL = 4
        INFORMATION = 5

    def __init__(self):
        self.func_handler = []

    def add_func(self, func, basic_params):
        proc_func = {func, basic_params}
        self.func_handler.append(proc_func)

    def del_func(self, func_idx):
        if func_idx > 0 and func_idx < len(self.func_handler):
            del self.func_handler[func_idx]

    def line_log_contains(self, line, basic_params, out_event):
        if isinstance(line, basestring):
            line_split = line.split(" ")
            info = line_split[column_info.INFORMATION]
            if isinstance(basic_params, basic_params):
                 

    def line_log_level(self, line, basic_params, out_event):


class analysis_log(object):
    '''
    analysis the log generate by agent and trader
    '''
    class debug(object):
        ''' enum in analysis_log '''
        LOG_EMERG = 0
        LOG_ALERT = 1
        LOG_CRIT = 2
        LOG_ERR = 3
        LOG_WARNING = 4
        LOG_NOTICE = 5
        LOG_INFO = 6
        LOG_DEBUG = 7

    def __init__(self, logfile="test.log"):
        self.filename = logfile

    def line_analysis(self, in_line):


    def read_log(self):
        f = subprocess.Popen(['tail', '-F', self.filename],
                             stdout=subprocess.PIPE,
                             stderr=subprocess.PIPE)
        p = select.poll()
        p.register(f.stdout)
        while True:
            if p.poll(1):
                print f.stdout.readline()
            time.sleep(1)