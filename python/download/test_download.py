# -*- coding: utf-8 -*-

from remote_file_operation import main
import json

ser_cfg = {
    "host": "192.168.0.91",
    "port": 22,
    "user": "colin",
    "password": ""
}

dl_cmd = {
    "type": 102,
    "seq": 1,
    "data": {
        "remote_files": ['/home/colin/agent_download/1/9/0_d69aaa9e-0c1f-11e6-893b-8cdcd431385c',
                         '/home/colin/agent_download/1/9/0_hi76test_shag_day.so',
                         '/home/colin/agent_download/1/9/1_d69aaa9e-0c1f-11e6-893b-8cdcd431385c',
                         '/home/colin/agent_download/1/9/1_hi51atest_shag_day.so'
                         ],
        "local_files": ['~/workspace/download/a',
                        '~/workspace/download/b',
                        '~/workspace/download/c',
                        '~/workspace/download/d',
                        ]
    }
}

import os
import re
def delete_file_folder(src):  
    '''delete files and folders''' 
    if os.path.isfile(src):
        try:
            os.remove(src) 
        except:
            pass 
    elif os.path.isdir(src):
        for item in os.listdir(src):
            itemsrc=os.path.join(src,item)
            delete_file_folder(itemsrc)
        try:
            os.rmdir(src)
        except:
            pass

def file_exsit_check(files):
    for f in files:
        f = re.sub('^~', os.path.expanduser("~"), f)
        if os.path.isfile(f):
            print f, "exsit"
        else:
            print f, "not exist"

print "delete all local files"
delete_file_folder("/home/rss/workspace/download/")

print "before download task check"
file_exsit_check(dl_cmd["data"]["local_files"])

main(json.dumps(ser_cfg), json.dumps(dl_cmd))

file_exsit_check(dl_cmd["data"]["local_files"])