#!/bin/python
# -*-coding:utf-8-*-

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

group    = None
user     = None
local_ip = None
cpath = os.path.dirname(os.path.abspath(__file__)) 

def usage():
    print "su - master_install group:user"
    sys.exit(-1)

def get_local_ip():
    global local_ip
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    s.connect(("baidu.com", 80))
    local_ip = s.getsockname()[0]
    s.close()

def install():
    try:
        p = subprocess.Popen(['yum', '-y', 'install', 'salt-master'], 
                             stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
        ret = p.wait()
        for res in p.stdout:
            if res.find("error") > 0:
                return False
        ## ret = os.system("yum -y install salt-master") can't wait here
        if ret == 0:
           return True
    except Exception as e:
        print "salt-master failed!"
        print str(e)
    sys.exit(-1)

def check_user():
    cur_user = getpass.getuser()
    if cur_user != "root":
        usage()
    
def check_params():
    global group, user
    if len(sys.argv) != 2:
        usage()
    group, user = sys.argv[1].split(':')
    if not group or not user:
        usage()

def master_config():
    global user, cpath, local_ip
    write_item = {
                  'interface' : local_ip,
                  'user' : user,
                  'file_roots': { 'base':[cpath] }
                 } 
    with open("/etc/salt/master", "a") as tf:
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
    global group, user
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
                for momo in dirs:
                    os.chown(os.path.join(root, mono), uid, gid)
                for mono in files:
                    os.chown(os.path.join(root, mono), uid, gid)
            os.chown(dir_item, uid, gid)
        except:
            traceback.print_exc()
    # change config in /etc/salt/master
    master_config()
    

def main():
    try:
        global user, group
        get_local_ip()
        check_user()
        check_params()
        install()
        config()
        print "Install and config salt-master success"
    except Exception as e:
        traceback.print_exc()

if __name__ == "__main__":
    main()

