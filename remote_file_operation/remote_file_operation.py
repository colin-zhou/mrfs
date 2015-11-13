#!/usr/bin/python
# -*-coding:utf-8-*-
# Copyright (c) 2015 MyCapital
# Author: colin <zhouchaolin@mycapital.net>
# Comments: Mainly function ara transfer from gateway module

import os
import sys
import types
import json
import hashlib
import sqlite3
import logging
import paramiko as ssh
from logging.handlers import TimedRotatingFileHandler

LEVELS = {'debug': logging.DEBUG,
          'info':  logging.INFO,
          'warn':  logging.WARNING,
          'error': logging.ERROR,
          'fatal': logging.CRITICAL}


def cal_sha1sum(file_path):
    mh = hashlib.sha1()
    try:
        fp = open(file_path, 'r')
    except:
        Log.error("Can not open file: %s" % file_path)
        return None
    lines = fp.readlines()
    for line in lines:
        mh.update(line)
    fp.close()
    return mh.hexdigest()


def Singleton(cls):
    instances = {}
    def _singleton(*args, **kw):
        if cls not in instances:
            instances[cls] = cls(*args, **kw)
        return instances[cls]
    return _singleton

@Singleton
class MYLogger:
    __logger = None

    def __init__(self, level, logfile):
        MYLogger.__logger = logging.getLogger()
        setval = LEVELS.get(level.lower(), logging.WARNING)
        MYLogger.__logger.setLevel(setval)

        ch = logging.handlers.TimedRotatingFileHandler(logfile, 'D')
        format = '%(asctime)s | %(levelname)s | %(message)s'
        fmt = logging.Formatter(format)
        ch.setFormatter(fmt)
        MYLogger.__logger.addHandler(ch)

    def details(self, msg, depth=2):
        frame = sys._getframe(depth)
        file = os.path.basename(frame.f_code.co_filename)
        linenum = ''
        if frame.f_back is not None:
            linenum = frame.f_back.f_lineno
        info = "%s - %s line:%s" % (file, frame.f_code.co_name, linenum)
        return "%s | %s" % (info, msg)

    def debug(self, msg):
        MYLogger.__logger.debug(self.details(msg))

    def info(self, msg):
        MYLogger.__logger.info(self.details(msg))

    def warn(self, msg):
        MYLogger.__logger.warn(self.details(msg))

    def error(self, msg):
        MYLogger.__logger.error(self.details(msg))

    def fatal(self, msg):
        MYLogger.__logger.critical(self.details(msg))

LOG_LEVEL = 'debug'
LOG_FILE = 'logs/gateway.log'
Log = MYLogger(LOG_LEVEL, LOG_FILE)

class DataBase:
    def __init__(self, path):
        conn = sqlite3.connect(path, check_same_thread = False)
        if os.path.exists(path) and os.path.isfile(path):
            self.conn = conn
        else:
            Log.error('Create sqlite3 file fail. use memory!')
            self.conn = sqlite3.connect(':memory:')

    def get_cursor(self):
        if self.conn is not None:
            return self.conn.cursor()

    def close(self):
        if self.conn is not None:
            self.conn.close()

    def execute(self, sql, data=None):
        Log.debug('execute :' + sql)
        try:
            cu = self.get_cursor()
            if data:
                for dt in data:
                    cu.execute(sql, dt)
                    self.conn.commit()
            else:
                cu.execute(sql)
                self.conn.commit()
        except Exception, e:
            Log.error('execute error:' + str(e))
        finally:
            cu.close()

    def fetch(self, sql, data=None):
        rows = []
        Log.debug('fetch :' + sql)
        try:
            cu = self.get_cursor()
            if data:
                cu.execute(sql, data)
            else:
                cu.execute(sql)
            rows = cu.fetchall()
        except Exception, e:
            Log.error('fetch error:' + str(e))
        finally:
            cu.close()
        if rows is not None and len(rows) > 0:
            return rows[0][0]
        else:
            return None


class DBOperate:
    """
    Encapsulate all the operation for file check, and 
    the history checksum stored in the local sqlite3
    """
    # local database operation
    def __init__(self, db_file_path):
        self.operate = DataBase(db_file_path)
        self.create_table()

    # close the database connection
    def __del__(self):
        self.operate.close()

    # create two tables: profile and detail
    def create_table(self):
        profile = '''CREATE TABLE IF NOT EXISTS `profile` (
                  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
                  `host_ip` varchar(32) NOT NULL,
                  `user_name` varchar(32) NOT NULL,
                  `user_dir` varchar(256) NOT NULL
                )'''
        self.operate.execute(profile)
        detail = '''CREATE TABLE IF NOT EXISTS `detail` (
                  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
                  `host_ip` varchar(32) NOT NULL,
                  `user_name` varchar(32) NOT NULL,
                  `file` varchar(64) NOT NULL,
                  `check_code` varchar(64) NOT NULL
                )'''
        self.operate.execute(detail)

    # drop the two tables if it could
    def drop_table(self):
        drop_sql = 'DROP TABLE IF EXISTS profile'
        self.operate.execute(drop_sql)
        drop_sql = 'DROP TABLE IF EXISTS detail'
        self.operate.execute(drop_sql)

    # fetch the user dir throught host_ip and user_name from database
    def query_user_dir(self, host_ip, user_name):
        query = '''SELECT user_dir FROM profile WHERE host_ip='%s' \
              AND user_name='%s' ''' % (host_ip, user_name)
        return self.operate.fetch(query)

    # update the user's dir in database
    def update_user_dir(self, host_ip, user_name, user_dir):
        add_sql = ""
        if self.query_user_dir(host_ip, user_name):
            add_sql = '''UPDATE profile SET user_dir='%s' WHERE  host_ip='%s' \
                 AND user_name='%s' ''' % (user_dir, host_ip, user_name)
        else:
            add_sql = '''INSERT INTO  profile (host_ip, user_name, user_dir) \
             VALUES ('%s', '%s', '%s') ''' % (host_ip, user_name, user_dir)
        self.operate.execute(add_sql)

    # delele a row in profile
    def delete_dir(self, host_ip, user_name):
        del_sql = '''DELETE FROM profile WHERE  host_ip='%s' \
                 AND user_name='%s' ''' % (host_ip, user_name)
        self.operate.execute(del_sql)

    # check that if the file's checksum is the same
    def query_check_code(self, host_ip, user_name, file):
        query = '''SELECT check_code FROM detail WHERE host_ip='%s' \
            AND user_name='%s' AND file='%s' ''' % (host_ip, user_name, file)
        return self.operate.fetch(query)

    # update the checksum of a user's file
    def update_check_code(self, host_ip, user_name, file, check_code):
        add_sql = ""
        if self.query_check_code(host_ip, user_name, file):
            add_sql = '''UPDATE detail SET check_code='%s' WHERE  host_ip='%s' \
            AND user_name='%s' AND file='%s' ''' % (check_code, host_ip, user_name, file)
        else:
            add_sql = '''INSERT INTO  detail (host_ip, user_name, file, check_code) \
            VALUES ('%s', '%s', '%s', '%s') ''' % (host_ip, user_name, file, check_code)
        self.operate.execute(add_sql)

    # delete a detail 
    def delete_file(self, host_ip, user_name, file):
        del_sql = '''DELETE FROM detail WHERE  host_ip='%s' \
            AND user_name='%s' AND file='%s' ''' % (host_ip, user_name, file)
        self.operate.execute(del_sql)

@Singleton
class FileDeploy:
    """
    Encapsulate the remote file operation, including upload, download
    move and mkdir
    """
    def __init__(self, db_file):
        self.__pool = {}
        self.state = DBOperate(db_file)

    # setup a ssh connection to specified host and establish a sftp connection 
    def connect(self, host, username, password, port=22):
        self.close(host)
        try:
            clt = ssh.SSHClient()
            clt.load_system_host_keys()
            clt.set_missing_host_key_policy(ssh.AutoAddPolicy())
            clt.connect(hostname=host, username=username, password=password, port=port)
            stp = clt.open_sftp()
        except Exception, e:
            try:
                clt.connect(hostname=host, username=username, password=password, port=222)
                stp = clt.open_sftp()
            except Exception, e:
                Log.error("Ssh connect to " + host + " failed: " + str(e))
                return False
        self.__pool[host] = (clt, stp)
        return True

    def check_conn(self, host):
        if not self.__pool.has_key(host):
            Log.warn("Connection to " + host + " have not setup yet.")
            return False
        return True

    def download(self, host, user, remote, local):
        return self.__file_transfer(host, user, "download", local, remote)

    def upload(self, host, user, local, remote):
        return self.__file_transfer(host, user, "upload", local, remote)
    
    def remove(self, host, user, path):
        return self.__file_operate(host, user, "remove", path)

    def mkdir(self, host, user, path):
        return self.__file_operate(host, user, "mkdir", path)

    def __file_operate(self, host, user, operate, path):
        if not self.check_conn(host):
            return False
        fields = path.split('/')
        (clt, stp) = self.__pool[host]
        if operate == 'remove':
            file_name = fields[-1]
            ckeck_code = self.state.query_check_code(host, user, file_name)
            if ckeck_code is not None:
                cmd = "rm -rf " + path
                self.remote_command(clt, cmd)
                self.state.delete_file(host, user, file_name)

        elif operate == 'mkdir':
            user_dir = self.state.query_user_dir(host, user)
            if user_dir is None or user_dir != path:
                cmd = "mkdir -p " + path
                self.remote_command(clt, cmd)
                self.state.update_user_dir(host, user, path)
        return True


    def __file_transfer(self, host, user, direction, local, remote):
        if not self.check_conn(host):
            return False

        fields = remote.split('/')
        file_name = fields[-1]
        ckeck_code = self.state.query_check_code(host, user, file_name)
        local_sum = cal_sha1sum(local)

        (clt, stp) = self.__pool[host]
        try:
            if direction == "upload":
                if ckeck_code is None or ckeck_code != local_sum:
                    stp.put(local, remote)
                    self.state.update_check_code(host, user, file_name, local_sum)
            elif direction == "download":
                local_sum = cal_sha1sum(local)
                if ckeck_code is not None:
                    if local_sum is None or ckeck_code != local_sum:
                        stp.get(remote, local)
        except Exception, e:
            Log.error("Transport file: %s error: %s" % (file_name, str(e)) )
            return False
        return True

    def remote_sha1sum(self, conn, path):
        input, out_info, err_info = conn.exec_command("sha1sum " + path)
        remote_sum = out_info.read()
        return remote_sum.split(' ')[0]

    def remote_command(self, conn, cmd):
        input, out_info, err_info = conn.exec_command(cmd)

    def close(self, host):
        if not self.check_conn(host):
            return False
        (clt, stp) = self.__pool[host]
        clt.close()
        del self.__pool[host]

# remote file operation initial
def rfo_initial():
    ROOT_DIR = os.path.dirname(__file__)
    DB_FILE_PATH = os.path.join(ROOT_DIR, 'state.sqlite3')
    rf_handler = FileDeploy(DB_FILE_PATH)

# get server parameters and connect the remote server
def cfg_server(host, user, password, port=22):
    rf_handler = FileDeploy()
    return rf_handler.connect(host, user, password, port)

# process user command
def exec_cmd(type, remote, local):
    if type == "upload":
        print "1"
    elif type == "download":
        print "2"

if __name__ == "__main__":
    rfo_initial()

