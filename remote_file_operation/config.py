#!/usr/bin/python
#-*-coding:utf-8-*-

"""
 *  Description: 定义gateway所需的常量
 *  Author:pax  Modify:savion
 *  Date: 2015-04-03
"""

import os, sys

ROOT_DIR = os.path.dirname(__file__)
COMM_DIR = '..'
DB_FILE_PATH = os.path.join(ROOT_DIR, 'state.sqlite3')
RSS_RESULT_FILE = 'rss.detail.dat'

MAX_THREADS = 2
LOCAL_PORT = 20020

START_TASK = 'start_task_cmd'
RECV_RESULT = 'recv_result_cmd'
UPLOAD_FILE = 'upload_file_cmd'

MOUNT_DATA_PATH = '/mnt/data/rss_live_data/'
TRADER_CONF_PATH = '/opt/trader/config/'

DEADLINE = '18:00:00'

###debug: info : warn : error: fatal###
LOG_LEVEL = 'debug'
LOG_FILE = 'logs/gateway.log'
