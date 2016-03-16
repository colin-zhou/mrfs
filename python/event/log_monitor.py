# -*- coding: utf-8 -*-

import subprocess
import select
import logging
import threading
import logging.config

from Queue import Queue
from time import sleep


class event_manager(threading.Thread):

    def __init__(self):
        self.e_queue = Queue()
        self.stop = False
        self.cache_arr = []
        self.cnt = 0
        threading.Thread.__init__(self)

    def stop(self):
        self.stop = True

    def print(self, event):
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
                    self.print(pro_event)
            else:
                self.cnt += 1
                sleep(1)

class analysis_log(object):

    '''
    analysis the log generate by agent and trader
    '''

    def __init__(self, logfile="test.log", program=""):
        self.filename = logfile
        self.program = program
        self.event_manager = event_manager()
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
