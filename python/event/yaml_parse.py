import yaml
from my_event import log_event, pro_event
from listen_event_mgr import listen_event

class event_parser(object):

    class const:
        LOG="my.event.log"
        PRO="my.event.process"

    def __init__(self):
        self.my_listen_event = listen_event()
        self.listen_process = []
        self.listen_logfile = []
        self.tmp_dict = {}
        self.todo = []

    def event_syntax_check(self, yaml_str):
        try:
            self.tmp_dict = yaml.safe_load(yaml_str)
            tmp_str = yaml.safe_dump(self.tmp_dict)
            if isinstance(tmp_str, basestring):
                return True
            else:
                return False
        except Exception:
            return False

    def log_event_parse(self, p_dict):
        try:
            location = p_dict.get("location")
            program = p_dict.get("program")
            level = p_dict.get("level")
            info = p_dict.get("info")
            timediff = p_dict.get("timediff")
            exec_mod = p_dict.get("exec")
            t_event = log_event(location=location, program=program, exec_mod = exec_mod,
                                time=timediff, level=level, info=info)
            if t_event:
                self.listen_logfile.append(location);
                self.todo.append({"event":t_event,"etype":0})
                return True
            else:
                return False
        except Exception, e:
            return False

    def pro_event_parse(self, p_dict):
        try:
            location = p_dict.get("location")
            program = p_dict.get("program")
            timediff = p_dict.get("timediff")
            exec_mod = p_dict.get("exec")
            asure = p_dict.get("asure")
            t_event = pro_event(location=location, program=program, time=timediff,
                                asure=asure, exec_mod=exec_mod)
            if t_event:
                self.listen_process.append(program)
                self.todo.append({"event":t_event,"etype":1})
                return True
            else:
                return False
        except Exception, e:
            return False

    def event_syntax_parse(self, yaml_str):
        if self.event_syntax_check(yaml_str):
            self.todo = []
            for event_desc in self.tmp_dict:
                for event_type in self.tmp_dict[event_desc]:
                    print event_type
                    tvalue = True
                    if event_type == self.const.LOG:
                        tvalue = self.log_event_parse(self.tmp_dict[event_desc][event_type])
                    elif event_type == self.const.PRO:
                        tvalue = self.pro_event_parse(self.tmp_dict[event_desc][event_type])
                    else:
                        return False
                    if not tvalue:
                        return False
            for eve_obj in self.todo:
                self.my_listen_event.insert_event(eve_obj["event"], eve_obj["etype"])
            return True
        return False

    def get_my_listen_event(self):
        return self.my_listen_event

    def get_listen_process(self):
        return self.get_listen_process

    def get_listen_logfile(self):
        return self.get_listen_logfile


if __name__ == "__main__":

    document = """
        some log event description:
            my.event.log:
                location: my/log_test
                program: my_agent
                level: error
                info: 'failed'
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

    # a = yaml.safe_load(document)

    # for key in a:
    #     print a[key]
    x = event_parser()
    result = x.event_syntax_parse(document)
    print result