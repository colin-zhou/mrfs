# -*- coding: utf-8 -*-


import os
import pandas as pd
from filelock import FileLock
from multiprocessing import Pool


def to_csv(data, target='test.csv'):
    # 该文件可以放在某个子目录
    fl = "%s.lock" % target
    with FileLock(fl):
        print("read file")
        data.to_csv(target, index=False)
        print("release the lock")


def read_csv(source):
    # 该文件可以放在某个子目录
    fl = "%s.lock" % source
    with FileLock(fl):
        res = pd.read_csv(source)
    return res


def main():
    p = Pool(4)
    data = pd.DataFrame({"a": range(1,1000), "b": range(2, 1001)})
    p.map(to_csv, (data for i in range(4)))
    p.map(read_csv, ('./test.csv' for i in range(4)))
    p.close()
    p.join()




if __name__ == "__main__":
    main()
