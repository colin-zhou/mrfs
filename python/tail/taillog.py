# -*- coding: utf-8 -*-

import time
import subprocess
import select
import logging
import logging.config

from Queue import Queue
import threading
from time import sleep


logging.config.fileConfig("log.config")
my_log = logging.getLogger("root")


class singleton(object):

    """
    To get the singleton instance, use the `Instance` method. Trying
    to use `__call__` will result in a `TypeError` being raised.

    Limitations: The decorated class cannot be inherited from.

    """

    def __init__(self, decorated):
        self._decorated = decorated

    def Instance(self):
        """
        Returns the singleton instance. Upon its first call, it creates a
        new instance of the decorated class and calls its `__init__` method.
        On all subsequent calls, the already created instance is returned.

        """
        try:
            return self._instance
        except AttributeError:
            self._instance = self._decorated()
            return self._instance

    def __call__(self):
        raise TypeError('Singletons must be accessed through `Instance()`.')

    def __instancecheck__(self, inst):
        return isinstance(inst, self._decorated)


class my_event(object):

    """
    package the event it contains the following field
    event format{
        "name": "notice",
        "program": "abc",
        "level": "error",
        "infomation": "what happened",
        "time": "2016-01-29 12:00:00",
    }
    """

    def __init__(self, name="default", program="", level="",
                 info="", ltime="2016-01-29 12:00:00"):
        self.name = name
        self.program = program
        self.level = level
        self.info = info
        self.time = time

    def __str__(self):
        tmp = ["mytest"]
        tmp.append(self.name)
        tmp.append(self.program)
        tmp.append(self.level)
        tmp.append(self.info)
        return " ".join(tmp)

    def __eq__(self, other):
        if isinstance(other, my_event):
            if self.program == other.program:
                if not self.level:
                    return self.info.find(other.info) != -1
                if not self.info:
                    return self.level == other.level.lower()
                return self.level == other.level and \
                       other.info.find(self.info) != -1
        return False

    def get_level(self):
        return self.level

    def get_info(slef):
        return self.info

    def get_file(self):
        return self.filename

    def is_info(self, info):
        return self.info.find(info) != -1

    def is_level(self, level):
        return self.info == level


@singleton
class event_handlers(object):

    def __init__(self):
        self._handlers = {}

    def add_handler(event, func, params=None):
        if event in self._handlers:
            return False
        else:
            self._handlers[event] = [func, params]
            return True

    def del_hanlder(event):
        if event in self._handlers:
            del self._handlers[event]
            return True
        else:
            return False

    def trigger_event(event):
        if event in self._handlers:
            fp = self._handlers[event]
            return fp[0](fp[1])
        return None


class event_manager(threading.Thread):

    def __init__(self):
        self.e_queue = Queue()
        self.stop = False
        self.handlers = event_handlers.Instance()
        self.cache_arr = []
        self.cnt = 0
        threading.Thread.__init__(self)

    def stop(self):
        self.stop = True

    def test_fun(self, event):
        print event

    def get_event_queue(self):
        return self.e_queue

    def run(self):
        while not self.stop:
            if not self.e_queue.empty():
                pro_event = self.e_queue.get()
                if not isinstance(pro_event, my_event):
                    my_log.error("pro_event type error")
                else:
                    self.test_fun(pro_event)
            else:
                self.cnt += 1
                sleep(1)

@singleton
class event_checkout(object):
    
    """
    Example:
    2016-03-01 15:25:33.180600759 agent.dbg.0.7.0/17678 oss TRACE start
    """

    class column_enum:
        DATE, TIME, PROGRAM, MODE, LEVEL, INFORMATION, SIZE = range(0, 7)

    def __init__(self):
        self.local_events = set()
        self.todo_queue = None

    def init_queue(self, todo_queue):
        self.todo_queue = todo_queue

    def add_event(self, event):
        if isinstance(event, my_event):
            self.local_events.add(event)
            return True
        else:
            return False

    def del_event(self, event):
        if isinstance(event, my_event):
            self.local_events.discard(event)
            return True
        else:
            return False

    def set_size(self):
        return len(self.local_events)

    def event_exsit(self, event):
        if isinstance(event, my_event):
            for one_event in self.local_events:
                if one_event == event:
                    return True
        return False

    # message in INFOMATION field
    def line_process(self, line, program):
        if isinstance(line, basestring):
            line_split = line.split(" ")
            if len(line_split) < self.column_enum.SIZE:
                return False
            info = " ".join(line_split[self.column_enum.INFORMATION:])
            level = line_split[self.column_enum.LEVEL]
            ltime = line_split[self.column_enum.TIME]

            tmp_event = my_event(program=program, level=level,
                                 info=info, ltime=ltime)

            if self.event_exsit(tmp_event):
                self.todo_queue.put(tmp_event)
            return True


class analysis_log(object):

    '''
    analysis the log generate by agent and trader
    '''

    def __init__(self, logfile="test.log", program=""):
        self.filename = logfile
        self.program = program
        self.event_manager = event_manager()
        self.event_handler = event_handlers.Instance()
        self.event_queue = self.event_manager.get_event_queue()
        self.event_check = event_checkout.Instance()
        self.event_check.init_queue(self.event_queue)
        

        t = my_event(name="default", program="agent", level="trace",
                     info="", ltime="")

        self.event_check.add_event(t)

        self.event_manager.start()




    def line_analysis(self, in_line):
        self.event_check.line_process(in_line, self.program)
        # print in_line

    def read_log(self):
        f = subprocess.Popen(['tail', '-F', self.filename],
                             stdout=subprocess.PIPE,
                             stderr=subprocess.PIPE)
        p = select.poll()
        p.register(f.stdout)
        while True:
            if p.poll(1):
                line = f.stdout.readline()
                self.line_analysis(line)


if __name__ == "__main__":
    te = analysis_log("agent.log", "agent")
    te.read_log()
