# -*- coding: utf-8 -*-
#
import logging
import logging.config
import my_event

def singleton(cls):
    instances = {}
    def getinstance():
        if cls not in instances:
            instances[cls] = cls()
        return instances[cls]
    return getinstance

def run_once(f):
    def wrapper(*args, **kwargs):
        if not wrapper.has_run:
            wrapper.has_run = True
            return f(*args, **kwargs)
    wrapper.has_run = False
    return wrapper

def get_log_properties(filename):
    all_format = [{"format":["date", "time", "process", "mode", "level", "info"], "separator":" "},
                  {"format":["time", "process", "level", "info"], "separator":"|"},
                  {"format":[], "separator":":"}]
    prorgram = ["agent", "rtserver", "gateway", "tunnel", "quote"]
    idx = 2
    if isinstance(filename, basestring):
        if filename.find("agent") != -1:
            idx = 0
        elif filename.find("rtserver") != -1:
            idx = 1
    return prorgram[idx], all_format[idx]

def get_event_type(event):
    if isinstance(event, my_event.log_event):
        return 0
    return 1


logging.config.fileConfig("log.config")
my_log = logging.getLogger("root")