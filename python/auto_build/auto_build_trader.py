#!/bin/python
# -*- coding: utf-8 -*-

"""
input: json configuration
output: stdout
"""

config = {
    'lib': {
        'git_path':'/home/colin/Git/quote_tunnels',
        'branch': 'branch_v2.5.8_dev',
        'base_lib': ['qtm', 'my_compliance_checker', 'my_common'],
        'lib_name': ['ctp']
    },
    'trader': {
        'git_path': '/home/colin/Git/my-trader',
        'branch': 'v2.6.3_centos',
        'trader_path': 'trunk/dist/mytrader_cf_dcelevel2',
        'forwarder_path':'trunk/dist/quote_forwarder_all_exchanges_level1'
    },
    'release': {
        'path':'/home/colin/test',
        'folder_name':'trader_ctp',
        'tarfile':'ctp_result.tar.gz'
    },
    'send_to': [ {
        'ip':'192.168.3.181',
        'user': 'rss',
        'path': '/home/rss/runtest' } 
    ]
}

import sys
import os
import signal
import git
import traceback
import select
import shutil
import tarfile
from subprocess import Popen, PIPE, STDOUT


class AutoBuild():
    def __init__(self, config):
        self.config = config

    def __set_trader_path(self, bash_file, td_path):
        try:
            trader_path = os.path.abspath(td_path)
            sed_param = 's;TRADER_ROOT=.*;TRADER_ROOT=%s;' % trader_path
            sed_cmd = 'sed -i "%s" %s' % (sed_param, bash_file)
            ret = os.system(sed_cmd)
            if ret == 0:
                return True
            else:
                return False
        except Exception:
            traceback.print_exc()
            return False

    #def __adjust_lib_source_file(self, include_path):
    #    try:
    #        ret = os.chdir(include_path)
    #        if not ret:
    #            return False 
    #        os.system("ls ")
    #    except Exception:
    #        traceback.print_exc()

    def __kill_pro(self, process):
        os.killpg(os.getpgid(process.pid), signal.SIGTERM)
    
    def __send_to(self):
        pass 

    def exec_bash(self, bash_file):
        try:
            cmd = 'bash %s' % bash_file
            make = Popen(cmd, stdout=PIPE, stderr=STDOUT, shell=True,
                         preexec_fn=os.setsid)
            p = select.poll()
            p.register(make.stdout) 
            '''appear continuous null line null_max times need to check
            if the process is exit'''
            retcode, null_cnt, null_max = 0, 0, 10
            while True:
                if p.poll(1) and null_cnt < null_max:
                    line = make.stdout.readline()
                    null_cnt = null_cnt+1 if len(line)==0 else 0
                    print line.rstrip('\n')
                    if line.find("error:") != -1 or\
                        line.find("Error") != -1:
                        if line.find("[clean]") != -1:
                            print "clean error happened"
                        elif line.find("warning:") != -1:
                            print "warnning happened"
                        else:
                            print "fatal error happened"
                            retcode = -1 
                            self.__kill_pro(make)
                    elif line.find("error:") != -1:
                        print "fatal error happened"
                        retcode = -1
                        self.__kill_pro(make)
                elif make.poll() is not None:
                    if retcode == 0:
                        retcode = make.poll() 
                    break
            if retcode == 0:
                return True
            return False
        except Exception:
            traceback.print_exc()
            return False

    def make_lib(self):
        try:
            # pull source file and checkout to specified branch
            abs_path = os.path.abspath(self.config["lib"]["git_path"])
            print "check branch and pull remote tnl and quote lib git"
            g = git.cmd.Git(abs_path)
            g.checkout(self.config["lib"]["branch"])
            g.pull()
            print "check and pull finished"
            bash_file = os.path.join(self.config["lib"]["git_path"], "make_all.sh")
            ret = self.__set_trader_path(bash_file, self.config["trader"]["git_path"])
            if not ret:
                return False
            # exec specfied bash script
            print "start to compile tnl and quote lib: %s" % bash_file
            return self.exec_bash(bash_file)
        except Exception as e:
            traceback.print_exc()
            return False

    def make_trader(self):
        try:
            # switch to specified branch and pull source file
            abs_path = os.path.abspath(self.config["trader"]["git_path"])
            print "check branch and pull remote trader git"
            g = git.cmd.Git(abs_path)
            g.checkout(self.config["trader"]["branch"])
            g.pull()
            print "check and pull finished"
            bash_file = os.path.join(self.config["trader"]["git_path"], "trunk/make_all.sh")
            print "start to compile trader: %s" % bash_file
            return self.exec_bash(bash_file) 
        except Exception:
            traceback.print_exc() 
            return False

    def __create_dir(self, path):
        try:
            if not os.path.exists(path):   
                os.makedirs(path)
            return True
        except Exception:
            traceback.print_exc()
            return False
    
    def __tar_path(self, path):
        try:
            target = os.path.join(self.config["release"]["path"],
                                  self.config["release"]["tarfile"])
            with tarfile.open(target, "w:gz") as tar:
                tar.add(path, arcname=self.config["release"]["folder_name"])
            return True
        except Exception:
            traceback.print_exc()
            return False

    def __dir_inside_copy(self, src, dest):
        print "directory copy:", src, dest
        try:
            src_files = os.listdir(src)
            print src_files
            for file_name in src_files:
                full_file_name = os.path.join(src, file_name)
                if (os.path.isfile(full_file_name)):
                    shutil.copy(full_file_name, dest) # file->path
                else:
                    shutil.copytree(full_file_name, os.path.join(dest, file_name))
            return True
        except:
            traceback.print_exc()
            return False

    def __clean_env(self):
        try:
            del_path = os.path.join(self.config["release"]["path"],
                                    self.config["release"]["folder_name"])
            if os.path.exists(del_path):
                shutil.rmtree(del_path)
            print "clean env success"
        except:
            traceback.print_exc()

    def package(self):
        try:
            self.__create_dir(self.config["release"]["path"])
            trader_path = os.path.join(self.config["release"]["path"],
                                       "%s/trader" % self.config["release"]["folder_name"])
            self.__create_dir(trader_path)
            forwarder_path = os.path.join(self.config["release"]["path"],
                                          "%s/forwarder" % self.config["release"]["folder_name"])
            self.__create_dir(forwarder_path)
            trader = os.path.join(self.config["trader"]["git_path"],
                                  self.config["trader"]["trader_path"])
            forwarder = os.path.join(self.config["trader"]["git_path"],
                                     self.config["trader"]["forwarder_path"])
            common = os.path.join(self.config["trader"]["git_path"],
                                  "trunk/lib/common")

            for tnl in self.config["lib"]["lib_name"]:
                tunnel_lib = os.path.join(self.config["trader"]["git_path"],
                                          "trunk/lib/tunnel/%s" % tnl)
                self.__dir_inside_copy(tunnel_lib, trader_path)

            self.__dir_inside_copy(trader, trader_path)
            self.__dir_inside_copy(common, trader_path)
            self.__dir_inside_copy(forwarder, forwarder_path)
            
            print "copy file finished!" 
            ret = self.__tar_path(self.config["release"]["path"])
            if not ret:
                return False
            else:
                print "tar directory finished"
            return True
        except Exception:
            traceback.print_exc()
            return False 
    
    def main(self):
        try:
            ret = True
            if self.make_lib():
                print "compile tunnel and quote success"
            else:
                raise RuntimeError("compile tunnel and quote failed!")
            if self.make_trader():
                print "compile trader success"
            else:
                raise RuntimeError("compile trader failed!")
            if self.package():
                print "package trader success"
            else:
                raise RuntimeError("package trader failed!")
        except:
            ret = False
            traceback.print_exc()
        self.__clean_env()
        return ret


if __name__ == "__main__":
    test = AutoBuild(config) 
    test.main()
    #test.make_trader()
    #for base in self.config["lib"]["base_lib"]:
    #    abs_path = os.path.join(self.config["lib"]["git_path"], base)
    #    cmd = "make clean all -j8 -C %s" % abs_path
    #    os.system(cmd)
    #for lib_name in self.config["lib"]["lib_name"]:
    #    abs_path = os.path.join(self.config["lib"]["git_path"], lib_name)
    #    cmd = "make clean all -j8 -C %s" % abs_path
    #    os.system(cmd)
