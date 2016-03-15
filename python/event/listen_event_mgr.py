# -*- coding:utf-8 -*-
# Import python libs
from my_event import log_event, pro_event


class event_vector(object):
    def __init__(self):
        # key and event instance
        self.e_vector = []

    def exist(self, event):
        for s_event in self.e_vector:
            if s_event == event:
                return True
        return False 

    def insert(self, event):
        if not self.exist(event):
            return self.e_vector.append(event)
        return True

    def remove(self, event):
        try:
            for s_event in self.e_vector:
                if s_event == event:
                    self.e_vector.remove(s_event)
        except Exception:
            return False

    def print_all(self):
        for s_event in self.e_vector:
            print s_event


class listen_event(object):
    
    class CONST:
        LOG,PRO,NUM = range(0,3)
    
    def __init__(self):
        self.listen_event = [None] * self.CONST.NUM
        for i in range(0, self.CONST.NUM):
            self.listen_event[i] = event_vector()

    def exist(self, event, etype):
        if etype < self.CONST.NUM and etype >= 0:
            return self.listen_event[etype].exist(event)
        return False

    def insert_event(self, event, etype):
        if etype <self.CONST.NUM and etype >= 0:
            return self.listen_event[etype].insert(event)
        return False

    def remove_event(self, event, etype):
        if etype < self.CONST.NUM and etype >= 0:
            return self.listen_event[etype].remove(event)
        return False

    def print_all(self):
        for i in range(0, self.CONST.NUM):
            self.listen_event[i].print_all()

if __name__ == "__main__":
    event_mgr = listen_event()
    k = log_event('/etc/nginx', 'nginx', '12:00:00', 'nothing', 'error', 'failed')
    d = pro_event('/etc/nginx', 'nginx', '12:00:00', 'nothing',{'connection': 3})
    event_mgr.insert_event(k, 0)
    event_mgr.insert_event(d, 1)
    event_mgr.print_all()
    event_mgr.remove_event(k, 0)
    print "after remove a element"
    event_mgr.print_all()
