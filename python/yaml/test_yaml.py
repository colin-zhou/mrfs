import yaml

document = """
some log event description:
    my.event.log:
        - name: my/log_test
        - program: my_agent
        - level: error
        - info: 'failed'
        - timediff: 1000
        - exec: do_sth

some process event descritpion:
    my.event.process:
        - name: my/pro_test
        - program: my_agent
        - params:
            running: -1
            connections: 3
        - timediff: 1000
        - exec: do_sth
"""
a = yaml.safe_load(document)

for key in a:
    print a[key]


class yaml_event(object):

    class CONST:
        LOG_EVENT = 0
        PRO_EVENT = 1

    # store_event[0] log_event_handler
    # sotre_event[1] pro_event_handler
    def __init__():
        self.store_event = []
        self.tmp_dict = {}

    def syntax_check(yaml_str):
        try:
            self.tmp_dict = yaml.safe_load(yaml_str)
            tmp_str = yaml.safe_dump(self.tmp_dict)
            if isinstance(tmp_str, basestring):
                return True
            else:
                return False
        except Exception:
            return False

    def dict_to_event(p_dict, event_type):
        pass


    def insert_event(event, etype):
        if self.CONST.LOG_EVENT == etype || self.CONST.PRO_EVENT == etype:
            return self.store_event[etype].add(event)
        return False

    def remove_event(event, etype):
        if self.CONST.LOG_EVENT == etype || self.CONST.PRO_EVENT == etype:
            return self.store_event[etype].remove(event)
        return False


    def add_events(yaml_str):
        if self.syntax_check(yaml_str):
            local_log_events = {}
            local_pro_events = {}
            for desc in self.tmp_dict:
                name, tmp_event = self.dict_to_event(self.tmp_dict[desc], desc)
                if tmp_event:
                    local_events[name] = tmp_event
                else:
                    return False
            self.
        else:
            return False    


    def del_events():