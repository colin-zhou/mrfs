# -*- coding:utf-8 -*-
# Import python libs


class base_event(object):

    def __init__(self, location="/var/log/syslog", program="agent", time=123456,
                 exec_mod="nothing"):
        self.location = location
        self.program = program
        self.time = time
        self.exec_mod = exec_mod

    def __str__(self):
        tmp = ["event_contains:"]
        tmp.append(self.location)
        tmp.append(self.program)
        tmp.append(self.exec_mod)
        tmp.append(str(self.time))
        return " ".join(tmp)

    def __eq__(self, other):
        if isinstance(other, base_event):
            return self.program == other.program
        return False

    def get_location(self):
        return self.location

    def get_program(self):
        return self.program

    def get_time(self):
        return self.time


class log_event(base_event):

    """
    package the event it contains the following field
    log event format{
        "location": "notice",
        "program": "abc",
        "level": "error",
        "info": "what happened",
        "time": "2016-01-29 12:00:00",
    }
    """
    def __init__(self, location="", program="", time="", exec_mod="",
                 level="", info=""):
        super(log_event, self).__init__(location, program, time, exec_mod)
        self.level = level
        self.info = info

    def __str__(self):
        base_str = super(log_event, self).__str__()
        return "%s %s %s" % (base_str, self.level, self.info)

    def __eq__(self, other):
        if isinstance(other, log_event):
            base_cmp = super(log_event, self).__eq__(other)
            if base_cmp:
                if not self.level:
                    return other.get_info().find(self.info) != -1
                if not self.info:
                    return self.info == other.get_info()
                return self.level == other.get_level() and \
                       other.get_info().find(self.info) != -1
        return False

    def get_info(self):
        return self.info

    def get_level(self):
        return self.level


class pro_event(base_event):
    """
    log event format{
        "location": "/home/rss/agent",
        "program": "abc",
        "asure": {
            "connection": 3
        }
        "time": "2016-01-29 12:00:00",
    }
    """
    def __init__(self, location="", program="", time="", exec_mod="",
                 asure={}):
        super(pro_event, self).__init__(location, program, time, exec_mod)
        self.asure = asure

    def __str__(self):
        base_str = super(pro_event, self).__str__()
        return base_str + " " + str(self.asure)

    def __eq__(self, other):
        if isinstance(other, log_event):
            base_cmp = super(log_event, self).__eq__(other)
            if base_cmp:
                return other.get_asure == self.asure
        return False

    def get_asure(self):
        return self.asure

if __name__ == "__main__":
    k = log_event('/etc/nginx', 'nginx', '12:00:00', 'nothing', 'error', 'failed')
    d = pro_event('/etc/nginx', 'nginx', '12:00:00', 'nothing',{'connection': 3})
    b = base_event()
    print k
    print d
    print b