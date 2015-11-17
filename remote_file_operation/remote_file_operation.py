#!/usr/bin/python
# -*-coding:utf-8-*-
# Copyright (c) 2015 MyCapital
# Author: colin <zhouchaolin@mycapital.net>

"""
Package the remote file download operation. at first, you should set up a
ssh connection to remote server, then, you can down load files from that
server.(Mainly functions are transfer from gateway module)
"""
import logging
from os import path as ospath
from sys import _getframe as sys_getframe
from hashlib import sha1 as lsha1
from paramiko import AutoAddPolicy, SSHClient
from logging.handlers import TimedRotatingFileHandler


LEVELS = {'debug': logging.DEBUG,
          'info':  logging.INFO,
          'warn':  logging.WARNING,
          'error': logging.ERROR,
          'fatal': logging.CRITICAL}

def cal_sha1sum(path_file):
    """
    calcualte a local file's checksum
    """
    sha_handler = lsha1()
    try:
        open_file = open(path_file, 'r')
    except (OSError, IOError):
        Log.error("Can not open file: %s" % path_file)
        return None
    lines = open_file.readlines()
    for line in lines:
        sha_handler.update(line)
    open_file.close()
    return sha_handler.hexdigest()


def singleton(cls):
    """
    decorate a class and make it to generate singleton entity
    @singleton
    class xxx:
    """
    instances = {}
    def _singleton(*args, **kw):
        """
        a closure function for decorator to execute each time
        """
        if cls not in instances:
            instances[cls] = cls(*args, **kw)
        return instances[cls]
    return _singleton


@singleton
class MYLogger(object):
    """
    Encapsulate the logger operation for download module
    """
    __logger = None

    def __init__(self, level, logfile):
        self.__logger = logging.getLogger()
        setval = LEVELS.get(level.lower(), logging.WARNING)
        self.__logger.setLevel(setval)

        log_handler = logging.handlers.TimedRotatingFileHandler(logfile, 'D')
        log_format = '%(asctime)s | %(levelname)s | %(message)s'
        log_fmt_obj = logging.Formatter(log_format)
        log_handler.setFormatter(log_fmt_obj)
        self.__logger.addHandler(log_handler)

    def details(self, msg, depth=2):
        """
        encapsulate the message to write into log file
        """
        frame = sys_getframe(depth)
        cur_file = ospath.basename(frame.f_code.co_filename)
        linenum = ''
        if frame.f_back is not None:
            linenum = frame.f_back.f_lineno
        info = "%s - %s line:%s" % (cur_file, frame.f_code.co_name, linenum)
        return "%s | %s" % (info, msg)

    def debug(self, msg):
        self.__logger.debug(self.details(msg))

    def info(self, msg):
        self.__logger.info(self.details(msg))

    def warn(self, msg):
        self.__logger.warn(self.details(msg))

    def error(self, msg):
        self.__logger.error(self.details(msg))

    def fatal(self, msg):
        self.__logger.critical(self.details(msg))


@singleton
class FileDeploy(object):
    """
    Encapsulate the remote file operation, mainly for download
    """
    def __init__(self):
        self.__pool = {}
    # setup a ssh connection to specified host and establish a sftp connection
    def connect(self, host, username, password, port=22):
        self.close(host)
        try:
            clt = SSHClient()
            clt.load_system_host_keys()
            clt.set_missing_host_key_policy(AutoAddPolicy())
            clt.connect(hostname=host, username=username,
                        password=password, port=port)
            stp = clt.open_sftp()
        except Exception, e:
            try:
                clt.connect(hostname=host, username=username,
                            password=password, port=222)
                stp = clt.open_sftp()
            except Exception, e:
                Log.error("Ssh connect to " + host + " failed: %s" % str(e))
                return False
        self.__pool[host] = (clt, stp)
        return True

    # check if the connection is exist in the __pool
    def check_conn(self, host):
        if not self.__pool.has_key(host):
            Log.warn("Connection to " + host + " have not setup yet.")
            return False
        return True

    # download a remote file to a local file
    def download(self, host, remote, local):
        if not self.check_conn(host):
            return False
        try:
            local_checksum = cal_sha1sum(local)
            stp = self.__pool[host][1]
            remote_checksum = self.remote_sha1sum(host, remote)
            if remote_checksum is None:
                Log.error("fetch remote file verification failed\n")
                return False
            if remote_checksum == local_checksum:
                # print "not really download the file\n"
                return True
            else:
                stp.get(remote, local)
        except Exception, e:
            Log.error("Transport file: %s error: %s" % (remote, str(e)))
            return False
        return True

    # remote execute a cmd to fetch specified file's checksum
    def remote_sha1sum(self, host, path):
        conn = self.__pool[host][0]
        out_info = conn.exec_command("sha1sum " + path)[1]
        remote_sum = out_info.read()
        return remote_sum.split(' ')[0]

    # clear the information while clean rf_handler
    def close(self, host):
        if not self.check_conn(host):
            return False
        clt = self.__pool[host][0]
        clt.close()
        del self.__pool[host]


LOG_LEVEL = 'debug'
LOG_FILE = 'gateway.log'
Log = MYLogger(LOG_LEVEL, LOG_FILE)
ROOT_DIR = ospath.dirname(__file__)
rf_handler = FileDeploy()

# get server parameters and connect the remote server
def conn_server(host, user, password, port=22):
    # rf_handler = FileDeploy()
    # return rf_handler.connect(host, user, password, port)
    # print host, user, password, port
    return rf_handler.connect(host, user, password, port)

# process user command
def download_file(host, remote, local):
    # return rf_handler.download(host, user, remote, local);
    # print host, remote, local
    # print "check conn", rf_handler.check_conn(host)
    return rf_handler.download(host, remote, local)

if __name__ == "__main__":
    rf_handler.connect("192.168.1.21", "rss", "123456", port=22)
    print rf_handler.download("192.168.1.21", "/home/rss/Public/text.txt",
                              "/home/rss/workspace/text.txt")
