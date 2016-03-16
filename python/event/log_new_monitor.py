# -*- coding: utf-8 -*-

import subprocess
import select
import threading

from time import sleep
from yaml_parse import event_parser
from utils import my_log, get_log_properties
from multiprocessing import Process, Value
from my_event import log_event


def log_to_event(line, filename):
    program, fobj = get_log_properties(filename)
    split_str = map(str.strip, line.split(fobj["separator"]))
    field_nums = len(fobj["format"])
    parse_nums = len(split_str)
    log_dict = {}
    if parse_nums >= field_nums:
        split_str[field_nums - 1] = ' '.join(split_str[field_nums - 1:])
        for i in range(0, field_nums):
            field_name = fobj["format"][i]
            log_dict[field_name] = split_str[i].lower()
        tmp_log = log_event(location=filename, program=program, exec_mod="",
                            time=log_dict["time"],level=log_dict["level"],
                            info=log_dict["info"])
        return tmp_log
    else:
        my_log.error("line error in log %s" % line)
        return None


def log_file_tail(filename, equeue, switch):
    tailf = subprocess.Popen(['tail', '-F', filename],
                             stdout=subprocess.PIPE,
                             stderr=subprocess.PIPE)
    sp = select.poll()
    fd = sp.register(tailf.stdout)
    while True:
        if sp.poll(1):
            if not switch.value:
                sp.unregister(tailf.stdout)
                tailf.kill()
                break
            line = tailf.stdout.readline()
            event = log_to_event(line, filename)
            if event != None:
                try:
                    equeue.put(event)
                    # my_log.info("queue put msg: %s" % event)
                except Exception:
                    my_log.error("event can't put into equeue %s" % event)
        else:
            sleep(0.05)

class log_monitor(threading.Thread):

    def __init__(self, equeue, files):
        super(log_monitor, self).__init__()
        self.event_queue = equeue
        self.runstate = Value('b',0)
        self.files = files
        self.stop_flag = False
        self.monitor_start = False
        self.monitor_stop = False

    def stop(self):
        self.stop_flag = True

    def stop_monitor(self):
        self.monitor_stop = True

    def start_monitor(self):
        self.monitor_start = False

    def run(self):
        while not self.stop_flag:
            try:
                if not self.monitor_start:
                    self.runstate.value = 1
                    self.monitor_start = True
                    self.processes = []
                    for filename in self.files:
                        p = Process(target=log_file_tail,
                                    args=(filename, self.event_queue,
                                          self.runstate))
                        p.start()
                        self.processes.append(p)
                if self.monitor_stop:
                    self.monitor_stop = False
                    self.runstate.value = 0
                    self.processes = []
                else:
                    sleep(0.5)
            except Exception, e:
                print str(e)
        else:
            self.runstate.value = 0
            self.processes = []




if __name__ == "__main__":

    document = """
        some log event description:
            my.event.log:
                location: /home/rss/nrss/rss/src/rss/rss_agent/rss/src/agent.dbg.0.4.0.log
                program: agent
                level: error
                info: 'qtm' 
                timediff: 1000
                exec: do_sth

        another log event description:
            my.event.log:
                location: /home/rss/nrss/rss/src/rss/rss_agent/rss/src/agent.dbg.1.0.0.log
                program: agent
                level: trace
                info: 'send ddd'
                timediff: 1000
                exec: do_sth

        some process event descritpion:
            my.event.process:
                location: my/pro_test
                program: my_agent
                asure:
                    connections: 3
                timediff: 1000
                exec: do_sth
    """

    x = event_parser()
    result = x.event_syntax_parse(document)
    # print x.get_listen_process()
    # print x.get_listen_logfile()
    files = x.get_listen_logfile()

    from multiprocessing import Queue
    tq = Queue()
    hd = log_monitor(tq, files)
    hd.start()

    from event_worker import event_manager
    tt = event_manager(tq)
    tt.start()