#!/usr/bin/python
# -*-coding:utf-8-*-

"""
Package the remote file download operation.
This package is based on paramiko.To get the latest stable release:
sudo pip install paramiko
Copyright(c) 2007-2015, by MY Capital Inc.
"""
from threading import Thread
from hashlib import sha1 as lsha1
from paramiko import AutoAddPolicy, SSHClient


class Download(Thread):
    """
    a download thread which use ssh_client to fetch the remote file to
    specified path. after the download this thread exit automatically
    """
    def __init__(self, ssh_entity, dl_task_list, ret_map):
        self.ssh_entity = ssh_entity                    # the local SSH entity
        self.dl_task_list = dl_task_list
        self.ret_map = ret_map
        Thread.__init__(self)

    def run(self):
        # print "a thread in python"
        for task in self.dl_task_list:
            try:
                task_id = task[0]
                remote_file = task[1]
                local_file = task[2]
                if self.download(remote_file, local_file, task_id):
                    self.ret_map[task_id] = (0, "download success")
            except Exception, e:
                print str(e)
                self.ret_map[task_id] = (-1, str(e))

    def download(self, remote_file, local_file, task_id):
        try:
            remote_checksum = self.remote_sha1sum(remote_file, task_id)
            if remote_checksum is None:
                return False
            # checksum before download
            local_checksum = self.local_sha1sum(local_file, task_id)
            if remote_checksum == local_checksum:
                return True
            else:
                self.ssh_entity.sftp.get(remote_file, local_file)
            # checksum after download
            local_checksum = self.local_sha1sum(local_file, task_id)
            if remote_checksum != local_checksum:
                self.ret_map[task_id] = (-1, "checksum is diff")
                return False
            else:
                return True
        except Exception, e:
            print str(e)
            self.ret_map[task_id] = (-1, "sftp get failed")
            return False

    def local_sha1sum(self, local_file, task_id):
        try:
            sha_handler = lsha1()
            with open(local_file, 'r') as open_file:
                lines = open_file.readlines()
                for line in lines:
                    sha_handler.update(line)
                return sha_handler.hexdigest()
        # except (OSError, IOError):
        except Exception, e:
            self.ret_map[task_id] = (-1, "local_sha1sum %s failed" % local_file)
            return None

    def remote_sha1sum(self, remote_file, task_id):
        try:
            clt = self.ssh_entity.clt
            out_info = clt.exec_command("sha1sum " + remote_file)[1]
            remote_sum = out_info.read()
            return remote_sum.split(' ')[0]
        except Exception, e:
            self.ret_map[task_id] = (-1, "remote_sha1sum %s failed"
                                     % remote_file)
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

    def ssh_connect(self, task_list, ret_map):
        try:
            self.clt = SSHClient()
            self.clt.load_system_host_keys()
            self.clt.set_missing_host_key_policy(AutoAddPolicy())
            self.clt.connect(hostname=self.host, username=self.user,
                             password=self.password, port=self.port)
            self.sftp = self.clt.open_sftp()
        except Exception, e:
            try:
                self.clt.connect(hostname=self.host, username=self.user,
                                 password=self.password, port=22)
                self.sftp = self.clt.open_sftp()
            except Exception, e:
                for task in task_list:
                    if len(task) > 1:
                        ret_map[task[0]] = (0, "ssh connect error")
                return False
        return True


def download_file(conn_cfg, task_list):
    tasks_per_thread = 1
    ret_map = {}
    # host,user,passwd,port
    ssh_mgr = SSH(conn_cfg[0], conn_cfg[1], conn_cfg[2], conn_cfg[3])
    # connect to the ssh server
    if not ssh_mgr.ssh_connect(task_list, ret_map):
        return ret_map
    task_nums = len(task_list)
    download_threads = -(-task_nums // tasks_per_thread)  # ceil division
    for i in range(download_threads):
        t_task_list = task_list[i*tasks_per_thread:(i+1)*tasks_per_thread]
        downloadhandler = Download(ssh_mgr, t_task_list, ret_map)
        downloadhandler.run()
    # return {1:(1,"ok"),2:(1,"haha")}
    return ret_map
