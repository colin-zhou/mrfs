#!/bin/python
#-*- coding: utf-8 -*-


if __name__ == "__main__":
    import test_header

import os
import time
import traceback
import datetime
import tempfile
import subprocess
import xmltodict
from config import Log
from RSS import settings
from operation.models import EVMap
from cron_comm import cron_trigger
from cron_comm import dir_check
from cron_comm import multiple_listen_stdout
from salt.client.ssh.client import SSHClient


"""
1. sacn the my_capital.config get the running strategy, local find mapping files
2. rsync files to remote path
3. upload middle message to redis and mysql
"""

# return type: [] strategies list
def get_config_strategy(file_content):
    ret_list = []
    try:
        config_obj = xmltodict.parse(file_content)
        st_obj = config_obj["MyExchange"]["strategies"]["strategy"]
        if not isinstance(st_obj, list):
            st_obj = [st_obj]
        for st in st_obj:
            ret_list.append(st["@model_file"])
    except Exception, ex:
        Log.error("xml parse error! %s" % ex)
    return ret_list


# map those strategies to config file names according to the config in db
def strategy_map_ev(st_list):
    all_data = EVMap.objects.all()
    map_entity = {}
    file_set = set()
    for item in all_data:
        map_entity[item.strategy] = item.ev_file
    for st in st_list:
        if st in map_entity:
            file_set.add(os.path.join(settings.MOUNT_STOCK_PATH,
                                      map_entity[st]))
        else:
            raise
    return list(file_set)


# return files exsit or not and return total file size
def loacal_files_check(files):
    if not files:
        return False, 0
    try:
        total_size = 0
        for tfile in files:
            total_size += os.path.getsize(tfile)
        return True, total_size
    except os.error:
        Log.error("files %s not exist or can't access" % files)
        return False, 0


def get_ot_files(vpn_ip, path):
    pass


# load the mycapital.config to check what strategy used and rsync special ev
def get_ev_files(vpn_ip, path):
    pre_dir    = os.path.dirname(path)
    my_capital = os.path.join(pre_dir, "my_capital.config")
    cli = SSHClient()
    try:
        ret = cli.cmd(vpn_ip, 'cmd.run', ['cat %s' % my_capital])
        if ret.get(vpn_ip).get('retcode') == 0:
            capital_content = ret.get(vpn_ip).get('return')
            sts = get_config_strategy(capital_content)
            print "sts: ", sts
            return strategy_map_ev(sts)
    except Exception, ex:
        traceback.print_exc()
        Log.error("get ev files error! %s" % ex)
    return False


def get_local_files(task_type, vpn_ip, path):
    get_files_handler = {
        'Upload Ev': get_ev_files,
        'Upload Ot': get_ot_files
    }
    if task_type in get_files_handler.keys():
        return get_files_handler[task_type](vpn_ip, path)
    Log.error("task type not found %s" % task_type)
    return False


def upload_method(cron_id, vpn_ip, work_path, exchange, task_type):
    try:
        run_date = datetime.datetime.now().strftime("%Y%m%d")
        # remote check
        remote_check_flag = dir_check(vpn_ip, work_path)
        local_files = get_local_files(task_type, vpn_ip, work_path)
        print local_files
        # local check
        local_check_flag, size = loacal_files_check(local_files)
        if not local_files or not remote_check_flag or not local_check_flag:
            cron_trigger(cron_id, -1, size, run_date)
            return False
        his_cron_id = cron_trigger(cron_id, 0, size, run_date)
        if his_cron_id < 0:
            return False
        file_str = ' '.join(local_files)
        cmd = "rsync -avz --progress %s %s@%s:%s" % (file_str, "mycapitaltrade",
                vpn_ip, work_path)
        print cmd
        tf_out   = tempfile.NamedTemporaryFile()
        tf_out_r = open(tf_out.name, 'r')
        proc = subprocess.Popen(cmd, shell=True,
                                stdin=subprocess.PIPE,
                                stdout=tf_out)
        while proc.poll() is None:
            multiple_listen_stdout(cron_id, his_cron_id, size, run_date, tf_out_r)
            time.sleep(0.5)
        else:
            multiple_listen_stdout(cron_id, his_cron_id, size, run_date, tf_out_r)
        tf_out_r.close()
        tf_out.close()
        return True
    except:
        Log.error("rsync log failed. %s" % traceback.format_exc())
        return False


if __name__ == "__main__":
    upload_method('10', '192.168.3.76', '/home/mycapitaltrade/mytrader_zx1/ev', 0, 'Upload Ev')
