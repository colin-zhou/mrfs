#!/bin/python
#-*- coding:utf-8 -*-

"""
intall python-redis, python-git
install and config salt-minion
"""

import os
import sys
import pwd
import grp
import yaml
import errno
import socket
import getpass
import traceback
import subprocess


group     = None
user      = None
local_ip  = None
master_ip = None
gid       = None
uid       = None
pip_list = ["redis", "GitPython"]
yum_list = ["python-pip","salt-minion"]

def usage():
    print "su - dependency master group:user"
    sys.exit(-1)


def get_local_ip():
    global local_ip
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    s.connect(("baidu.com", 80))
    local_ip = s.getsockname()[0]
    s.close()


def pip_install(package):
    try:
        print "pip install %s" % package
        p = subprocess.Popen(['pip', 'install', package],
                              stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
        ret = p.wait()
        for res in p.stdout:
            print res
            if res.find("error") > 0:
                print "pip install %s failed" % package
                sys.exit(-1)
        if ret == 0:
            print "pip install %s success" % package
            return True
    except Exception, ex:
        print "pip install %s failed" % package
        print ex
    sys.exit(-1)


def yum_install(software):
    try:
        print "yum install %s" % software
        p = subprocess.Popen(['yum', '-y', 'install', software], 
                             stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
        ret = p.wait()
        for res in p.stdout:
            if res.find("error") > 0:
                print "yum install %s error!" % software
                sys.exit(-1)
        ## ret = os.system("yum -y install salt-master") can't wait here
        if ret == 0:
           print "yum install %s success" % software
           return True
    except Exception, ex:
        print "yum install %s error!" % software
        print ex
    sys.exit(-1)


def install_all():
    for tp in yum_list:
        yum_install(tp)
    for tp in pip_list:
        pip_install(tp)


def check_user():
    cur_user = getpass.getuser()
    if cur_user != "root":
        usage()


def check_master(host):
    try:
        socket.inet_aton(host)
    except socket.error:
        return False
    p = subprocess.Popen(['ping', '-c', '1', host], stdout=subprocess.PIPE,
                         stderr=subprocess.STDOUT)
    #response = os.system("ping -c 1 %s" % host)
    response = p.wait()
    if response != 0:
        return False
    return True
    

def check_params():
    global group, user, master_ip
    if len(sys.argv) != 3:
        usage()
    master_ip = sys.argv[1]
    group, user = sys.argv[2].split(':')
    if not group or not user or not check_master(master_ip):
        usage()


def master_config():
    global user, cpath, master_ip, local_ip
    write_item = {
                  'master' : master_ip,
                  'user' : user,
                  'id': local_ip
                 } 
    with open("/etc/salt/minion", "a") as tf:
        tf.write(yaml.dump(write_item, default_flow_style=False))


def ensure_path_exist(path):
    try:
        os.makedirs(path)
    except OSError as exc:
        if exc.errno == errno.EEXIST and os.path.isdir(path):
            pass
        else:
            raise


def config():
    print "begin to config salt-minion"
    global group, user, uid, gid
    # change the salt dir's group:user
    default_dir = ['/etc/salt',
                   '/var/cache/salt',
                   '/var/log/salt',
                   '/var/run/salt']
    uid = pwd.getpwnam(user).pw_uid
    gid = grp.getgrnam(group).gr_gid
    for dir_item in default_dir:
        ensure_path_exist(dir_item)
    for dir_item in default_dir:
        try:
            for root, dirs, files in os.walk(dir_item):
                for mono in dirs:
                    os.chown(os.path.join(root, mono), uid, gid)
                for mono in files:
                    os.chown(os.path.join(root, mono), uid, gid)
            os.chown(dir_item, uid, gid)
        except Exception, ex:
            traceback.print_exc()
            print ex 
    # change config in /etc/salt/master
    master_config()


def demote(uid, gid):
    def result():
        os.setgid(gid)
        os.setuid(uid)
    return result


# start minion with specified group:user
def start_minion_service():
    global uid, gid
    p = subprocess.Popen(['salt-minion', '>/dev/null', '2>&1', '&'], preexec_fn=demote(uid, gid))


def main():
    try:
        global user, group
        get_local_ip()
        check_user()
        check_params()

        install_all()
        config()
        start_minion_service()
        print "Install and config salt-minion success and started"
    except Exception, ex:
        print ex
        traceback.print_exc()

if __name__ == "__main__":
    main()
