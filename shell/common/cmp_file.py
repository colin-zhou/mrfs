# -*- coding: utf-8 -*-

"""
Compare files in two directory
"""

import hashlib
import os,sys
import glob


def CalcSha1(filepath):
    with open(filepath,'rb') as f:
        sha1obj = hashlib.sha1()
        sha1obj.update(f.read())
        hash_hex = sha1obj.hexdigest()
        return hash_hex


def CalcMD5(filepath):
    with open(filepath,'rb') as f:
        md5obj = hashlib.md5()
        md5obj.update(f.read())
        hash_hex = md5obj.hexdigest()
        return hash_hex


dir1 = "/home/rss/media/"
dir2 = "/home/rss/media/"

file_diff1 = []
file_diff2 = []
index = 0
filename1 = glob.glob(dir1)
filename2 = glob.glob(dir2)


for file1 in filename1:
    if CalcMD5(file1) != CalcMD5(filename2[index]):
        print("MD5 diff:",file1,filename2[index])
        print index
    index = index + 1
