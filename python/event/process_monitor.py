# -*- coding:utf-8 -*-


import psutil
import threading
from time import sleep
from listen_event import listen_event

class process_monitor(threading.Thread):

    def __init__(self, monitor_process, equeue):
        super(process_monitor, self).__init__()
        self.stop_flag = False
        self.event_queue = equeue
        self.update_monitor(monitor_process)

    def get_process_id(self):
        if isinstance(self.monitor_process, list):
            if not self.name_pid_d:
                self.name_pid_d = dict.fromkeys(self.monitor_process, -1)
            for name in self.monitor_process:
                l_pids = psutil.pids()
                for ppid in l_pids:
                    p = psutil.Process(ppid)
                    if p.name() in self.name_pid_d:
                        self.name_pid_d[p.name()] = ppid
        return None

    def update_monitor(self, monitor_process):
        self.monitor_process = monitor_process
        self.name_conn_d = None
        self.name_pid_d = None
        self.get_process_id()
        self.get_process_info()

    def check_info(self, info):
        


    def stop(self):
        self.stop_flag = True

    def update_info(self):
        self.get_process_info()

    def get_process_info(self):
        if isinstance(self.monitor_process, list):
            if not self.name_conn_d:
                self.name_conn_d = dict.fromkeys(self.monitor_process, None)
            for name, pid in self.name_pid_d.items():
                if pid != -1:
                    p = psutil.Process(pid)
                    self.name_conn_d[name] = p.connections()
            return [self.name_pid_d, self.name_conn_d]

    def run(self):
        while not self.stop_flag:
            info = self.get_process_info()
            self.check_info(info)
            sleep(1)





if __name__ == "__main__":
    monitor_process = ["agent.dbg.1.0.0", "quote_ctp_lib_demo"]
    from multiprocessing import Queue
    myqueue = Queue()
    a = process_monitor(monitor_process, myqueue)
    a.start()
