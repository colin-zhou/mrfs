# -*- coding: utf-8 -*-

import os
import shutil
import tempfile
from zipfile import ZipFile


def create_zip():
    os.system("echo 'a' > x.txt")
    os.system("echo 'b' > y.txt")
    os.system("echo 'c' > z.txt")
    with ZipFile('aaa.zip', 'w') as zo:
        zo.write('x.txt')
        zo.write('y.txt')
        zo.write('z.txt')
    os.system("rm {x,y,z}.txt")


def readzipfiles():
    # in memory
    with ZipFile('aaa.zip') as rz:
        for fn in ["x.txt", "y.txt", "z.txt"]:
            with rz.open(fn) as f:
                print(f.read())


def readziptmp():
    # in temp directory
    with tempfile.TemporaryDirectory() as tmppath:
        shutil.unpack_archive('aaa.zip', tmppath)
        for tf in ['x.txt', 'y.txt', 'z.txt']:
            rf = os.path.join(tmppath, tf)
            with open(rf, 'rb') as f:
                print(f.read())


if __name__ == "__main__":
    create_zip()
    readzipfiles()
    readziptmp()

