# -*- coding:utf-8 -*-

import psutil

monitor_process = ["yandex-disk", "rss", "agent.dbg.1.0.0", "quote_ctp_lib_demo", "rq_feed_handler.1.0.1"]


class process_monitor(object):

    def __init__(self, monitor_process):
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

    def print_all_info(self):
        print self.get_process_info()


a = process_monitor(monitor_process)
a.print_all_info()
