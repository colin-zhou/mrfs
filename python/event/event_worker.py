# -*- coding: utf-8 -*-
#
import threading
from multiprocessing import Process, Value
import time
from Queue import Queue
from yaml_parse import event_parser
from utils import get_event_type, my_log


def worker(event_queue, runflag):
    ep = event_parser()
    while runflag.value:
        # blocking here if there is none event
        item = event_queue.get()
        try:
            le = ep.get_my_listen_event()
            etype = get_event_type(item)
            if le.exist(item, etype):
                print "catch the msg", item
            # my_log.info("queue recv msg: %s" % item)
        finally:
            time.sleep(0.05)
    else:
        my_log.error("worker exit")

class event_manager(threading.Thread):

    def __init__(self, event_queue, nums=2):
        threading.Thread.__init__(self)
        self.e_queue = event_queue
        self.processes = []
        self.runstate = Value('b', 0)
        self.p_start = False
        self.p_stop = False
        self.p_nums = nums
        self.stop = False

    def update_nums(self, nums):
        self.p_nums = nums

    def stop_worker(self):
        self.p_stop = True

    def start_worker(self):
        self.p_start = False

    def stop(self):
        self.stop = True

    def run(self):
        while not self.stop:
            try:
                if not self.p_start:
                    self.p_start = True
                    self.runstate.value = 1
                    for i in range(0, self.p_nums):
                        p = Process(target=worker, args=(self.e_queue, self.runstate))
                        p.start()
                        self.processes.append(p)
                if self.p_stop:
                    self.runstate.value = 0
                    self.p_stop = False
                    time.sleep(0.5)
                    for p in self.processes:
                        p.terminate()
                    self.processes = []
                else:
                    time.sleep(0.5)
            except Exception, e:
                print str(e)


if __name__ == "__main__":
    equeue = Queue()
    x = event_manager(equeue)
    x.start()
