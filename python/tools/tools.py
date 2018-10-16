# -*- coding: utf-8


import functools
from collections import defaultdict


def new_2d_array1():
    # can be serilize with pickle
    return defaultdict(functools.partial(defaultdict, list))


def new_2d_array2():
    # cann't be serilized to pickle object
    return defaultdict(lambda: defaultdict(list))


def l_to_sql_string(in_list):
    # convert list to string can accepted in sql
    return '(' + ','.join(map(str, in_list)) + ')'


if __name__ == "__main__":
    x = new_2d_array1()
    x['1']['b'] += [1]
    y = new_2d_array1()
    print(x, y)
