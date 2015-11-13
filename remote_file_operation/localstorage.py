#!/usr/bin/python
#-*-coding:utf-8-*-

"""
 *  Description: 建立一个sqllite的本地数据，用于维护系统资源及状态
 *  Author:savion
 *  Date: 2015-04-20
"""

import os, sqlite3
import config
from utils import Log as 

class DataBase:

    def __init__(self, path):
        conn = sqlite3.connect(path,check_same_thread = False)
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

    def __init__(self):
        self.operate = DataBase(config.DB_FILE_PATH)
        self.create_table()

    def __del__(self):
        self.operate.close()

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

    def drop_table(self):
        drop_sql = 'DROP TABLE IF EXISTS profile'
        self.operate.execute(drop_sql)
        drop_sql = 'DROP TABLE IF EXISTS detail'
        self.operate.execute(drop_sql)


    def query_user_dir(self, host_ip, user_name):
        query = '''SELECT user_dir FROM profile WHERE host_ip='%s' \
              AND user_name='%s' ''' % (host_ip, user_name)
        return self.operate.fetch(query)

    def update_user_dir(self, host_ip, user_name, user_dir):
        add_sql = ""
        if self.query_user_dir(host_ip, user_name):
            add_sql = '''UPDATE profile SET user_dir='%s' WHERE  host_ip='%s' \
                 AND user_name='%s' ''' % (user_dir, host_ip, user_name)
        else:
            add_sql = '''INSERT INTO  profile (host_ip, user_name, user_dir) \
             VALUES ('%s', '%s', '%s') ''' % (host_ip, user_name, user_dir)
        self.operate.execute(add_sql)

    def delete_dir(self, host_ip, user_name):
        del_sql = '''DELETE FROM profile WHERE  host_ip='%s' \
                 AND user_name='%s' ''' % (host_ip, user_name)
        self.operate.execute(del_sql)


    def query_check_code(self, host_ip, user_name, file):
        query = '''SELECT check_code FROM detail WHERE host_ip='%s' \
            AND user_name='%s' AND file='%s' ''' % (host_ip, user_name, file)
        return self.operate.fetch(query)

    def update_check_code(self, host_ip, user_name, file, check_code):
        add_sql = ""
        if self.query_check_code(host_ip, user_name, file):
            add_sql = '''UPDATE detail SET check_code='%s' WHERE  host_ip='%s' \
            AND user_name='%s' AND file='%s' ''' % (check_code, host_ip, user_name, file)
        else:
            add_sql = '''INSERT INTO  detail (host_ip, user_name, file, check_code) \
            VALUES ('%s', '%s', '%s', '%s') ''' % (host_ip, user_name, file, check_code)
        self.operate.execute(add_sql)

    def delete_file(self, host_ip, user_name, file):
        del_sql = '''DELETE FROM detail WHERE  host_ip='%s' \
            AND user_name='%s' AND file='%s' ''' % (host_ip, user_name, file)
        self.operate.execute(del_sql)


