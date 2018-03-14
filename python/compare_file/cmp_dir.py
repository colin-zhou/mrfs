#! -*- coding: utf-8 -*-


import os
import hashlib


def list_dir(some_dir):
    for x, y, z in os.walk(some_dir):
        return map(lambda t: os.path.join(x, t), z)


def calc_md5(filepath):
    with open(filepath,'rb') as f:
        md5obj = hashlib.md5()
        md5obj.update(f.read())
        hash = md5obj.hexdigest()
        return hash


def is_file_same(file_left, file_right):
    return calc_md5(file_left) == calc_md5(file_right)


def remove_timecost(filename):
    """
    remove the timecost lines
    """
    f = open(filename, "r+")
    d = f.readlines()
    f.seek(0)
    for i in d:
        if not i.startswith("time cost"):
            f.write(i)
    f.truncate()
    f.close()


def compare_dir(left_dir, right_dir):
    """
    compare two directory
    """
    left_files = list_dir(left_dir)
    left_files = filter(lambda x: x.endswith("day.log") or x.endswith("night.log"), left_files)
    for item in left_files:
        filename = os.path.basename(item)
        left_file = item
        right_file = os.path.join(right_dir, filename)
        remove_timecost(left_file)
        remove_timecost(right_file)
        if not is_file_same(left_file, right_file):
            print("file %s, %s not equal" % (left_file, right_file))
        else:
            print("file is the same %s, %s" % (left_file, right_file))



if __name__ == "__main__":
    list_dir('./')
