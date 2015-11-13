#!/usr/bin/python
# -*- coding:utf-8 -*-
# Copyright (c) 2015 MyCapital - savion <savion@mycapital.net>
# import needed package
import os, config
import paramiko as ssh
import types, json, hashlib, threading







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

class FileDeploy:
    """remote files operation"""
    def __init__(self):
        self.__pool = {}  #host:connection tuple
        from state_info import DBOperate
        self.state = DBOperate()

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