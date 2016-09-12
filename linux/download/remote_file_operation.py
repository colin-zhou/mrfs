#!/usr/bin/python
# -*-coding:utf-8-*-

"""
Package the remote file download operation.
This package is based on paramiko.To get the latest stable release:
sudo pip install paramiko
"""

from hashlib import sha1 as lsha1
from paramiko import AutoAddPolicy, SSHClient
import json
import os
import re
import logging

FORMAT = "%(asctime)-15s | %(filename)s | %(funcName)s | %(levelname)s | %(message)s"
# logging.INFO, logging.ERROR, logging.WARNING
logging.basicConfig(filename="download.log", level=logging.INFO, format=FORMAT)

class Download(object):
    """
    a download module which use ssh_client to fetch the remote file to
    specified path. after the download this module automatically
    """
    def __init__(self, ssh_entity, dl_task_list, ret_map):
        self.ssh_entity = ssh_entity                    # the local SSH entity
        self.dl_task_list = dl_task_list
        self.ret_map = ret_map

    def run(self):
        for task in self.dl_task_list:
            try:
                task_id = task[0]
                remote_file = task[1]
                local_file = task[2]
                # expand '~' in local file path
                local_file = re.sub('^~', os.path.expanduser("~"), local_file)
                logging.debug("remote=%s,local=%s" % (remote_file, local_file))
                if not self.parent_path_exists(local_file):
                    self.ret_map[task_id] = (-1, "no permission opt files")
                elif self.download(remote_file, local_file, task_id):
                    logging.debug("download success")
                    self.chmod(local_file, "644")
                    logging.debug("chmod success")
                    self.ret_map[task_id] = (0, "download success")
            except Exception, e:
                logging.warning('Exception in run: %s' % str(e))
                self.ret_map[task_id] = (-1, str(e))

    def parent_path_exists(self, local_file):
        ret = True
        p_path = os.path.dirname(local_file)
        if not os.path.exists(p_path):
            try:
                os.makedirs(p_path)
            except Exception, e:
                logging.warning('Exception in parent_path_exists: %s' % str(e))
                ret = False
        return ret

    def chmod(self, filename, mode):
        inner_mode = int(mode, 8)
        ret = True
        try:
            os.chmod(filename, inner_mode)
        except Exception, e:
            logging.warning('Exception in chmod:%s' % str(e))
            ret = False
        return ret

    def download(self, remote_file, local_file, task_id):
        try:
            logging.debug("into the download function")
            remote_checksum = self.remote_sha1sum(remote_file, task_id)
            logging.debug("remote checksum finished")
            if remote_checksum is None:
                return False
            # checksum before download
            local_checksum = self.local_sha1sum(local_file, task_id)
            logging.debug("local checksum finisehd")
            if remote_checksum == local_checksum:
                return True
            else:
                logging.debug("sftp get before")
                self.ssh_entity.sftp.get(remote_file, local_file)
                logging.debug("sftp get after")
            # checksum after download
            local_checksum = self.local_sha1sum(local_file, task_id)
            if remote_checksum != local_checksum:
                # delete the broken file
                self.local_delete(local_file)
                self.ret_map[task_id] = (-1, "download file checksum cmp error")
                return False
            else:
                return True
        except Exception, e:
            logging.warning("Exception in downloadfunc %s" % str(e))
            # print str(e)
            self.ret_map[task_id] = (-1, "%s %s" % (remote_file, str(e)))
            return False

    def local_delete(self, local_file):
        try:
            os.remove(local_file)
        except OSError:
            pass

    def local_sha1sum(self, local_file, task_id):
        try:
            sha_handler = lsha1()
            with open(local_file, 'r') as open_file:
                for line in open_file:
                    sha_handler.update(line)
            return sha_handler.hexdigest()
        except Exception, e:
            logging.warning("Exception in local_checksum %s" % str(e))
            self.ret_map[task_id] = (-1, "local_sha1sum %s %s" %
                                     (local_file, str(e)))
            return None

    def remote_sha1sum(self, remote_file, task_id):
        try:
            clt = self.ssh_entity.clt
            out_info = clt.exec_command("sha1sum " + remote_file)[1]
            remote_sum = out_info.read()
            rf_checksum = remote_sum.split(' ')[0]
            if rf_checksum:
                return rf_checksum
            else:
                self.ret_map[task_id] = (-1, "remote file %s not exist" %
                                         remote_file)
                return None
        except Exception, e:
            logging.warning("Exception in remote_checksum %s" % str(e))
            self.ret_map[task_id] = (-1, "remote_sha1sum %s %s" %
                                     (remote_file, str(e)))
            return None


# TODO: add dis-connect check
class SSH(object):
    """
    package for ssh_client, in this class stores the sftp handlers and the
    ssh_client
    """
    def __init__(self, host, user, password, port=22):
        self.host = host
        self.user = user
        self.password = password
        self.port = port

    def client_init(self):
        self.clt = SSHClient()
        self.clt.load_system_host_keys()
        self.clt.set_missing_host_key_policy(AutoAddPolicy())

    def ssh_connect(self, task_list, ret_map):
        try:
            self.client_init()
            self.clt.connect(hostname=self.host, username=self.user,
                             password=self.password, port=self.port,
                             timeout=3)
            self.sftp = self.clt.open_sftp()
        except Exception, e:
            self.ssh_close()
            for task in task_list:
                if len(task) > 1:
                    ret_map[task[0]] = (-1, "ssh connect error %s" %
                                        str(e))
            return False
        return True

    def ssh_close(self):
        try:
            if self.sftp:
                self.sftp.close()
                self.sftp = None
        except:
            pass
        try:
            if self.clt:
                self.clt.close()
                self.clt = None
        except:
            pass


def task_deserialize(task_list, n_task_list):
    try:
        o_task_list = task_list["data"]
        remote_files = o_task_list["remote_files"]
        local_files = o_task_list["local_files"]
        tsk_size = min(len(remote_files), len(local_files))
        for i in range(tsk_size):
            tarr = []
            tarr.append(i)
            tarr.append(remote_files[i])
            tarr.append(local_files[i])
            n_task_list.append(tarr)
    except Exception as e:
        logging.warning("Task deserialize failed %s" % str(e))


def dlret_serialize(dl_ret, task_list):
    try:
        ret = {}
        ret["seq"] = task_list["seq"]
        ret["type"] = task_list["type"]
        ret["return"] = 1
        ret["data"] = {"msg": [], "remote_file": []}
        for key, value in dl_ret.iteritems():
            if value[0] == -1:
                ret["return"] = -1
        # print key, value
            ret["data"]["msg"].append(value[1])
            ret["data"]["remote_file"].append(task_list["data"][
                                              "remote_files"][key])
        real_ret = json.dumps(ret)
    except Exception as e:
        logging.warning("Return serialize failed %s" % str(e))
    return real_ret


def download_file(conn_cfg, o_task_list):
    tasks_per_thread = 200
    task_list = []
    ret_map = {}
    task_deserialize(o_task_list, task_list)
    ssh_mgr = SSH(conn_cfg["host"], conn_cfg["user"], conn_cfg["password"],
                  conn_cfg["port"])
    if not ssh_mgr.ssh_connect(task_list, ret_map):
        return ret_map
    task_nums = len(task_list)
    download_threads = -(-task_nums // tasks_per_thread)  # ceil division
    for i in range(download_threads):
        t_task_list = task_list[i * tasks_per_thread:
                                (i + 1) * tasks_per_thread]
        downloadhandler = Download(ssh_mgr, t_task_list, ret_map)
        downloadhandler.run()
    ssh_mgr.ssh_close()

    return ret_map


# __main__ function
def main(ser_cfg, dl_cmd):
    try:
        import sys
        reload(sys)
        sys.setdefaultencoding('utf8')
        connf_cfg = json.loads(ser_cfg)
        task_list = json.loads(dl_cmd)
        dl_ret = download_file(connf_cfg, task_list)
        ret = dlret_serialize(dl_ret, task_list)
        return ret
    except Exception, e:
        logging.warning("[E]error msg is %s" % str(e))
        return None
