#-*- coding: utf-8 -*-

import os
import shutil


def move_replace(root_src, root_dst):
    for src_dir, dirs, files in os.walk(root_src):
        dst_dir = src_dir.replace(root_src, root_dst, 1)
        print(dst_dir)
        if not os.path.exists(dst_dir):
            os.makedirs(dst_dir)
        for file_ in files:
            src_file = os.path.join(src_dir, file_)
            dst_file = os.path.join(dst_dir, file_)
            if os.path.exists(dst_file):
                # in case of the src and dst are the same file
                if os.path.samefile(src_file, dst_file):
                    continue
                os.remove(dst_file)
            shutil.move(src_file, dst_dir)


if __name__ == "__main__":
    move_replace('/root/ctp', '/root/cttt')

