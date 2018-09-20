# -*- coding: utf-8 -*-


import uuid
from myperf import perf_print


def gen_dict():
    x = {}
    for i in range(100000):
        x[str(uuid.uuid4())] = i
    return x


@perf_print
def iter_items(sdict):
    sum_value  = 0
    for key, value in sdict.items():
        pass
       # sum_value += value
    return sum_value


@perf_print
def iter_values(sdict):
    sum_value = 0
    for key in sdict.keys():
        value = sdict[key]
        pass
        # sum_value += value
    return sum_value


if __name__ == "__main__":
    sdict = gen_dict()
    iter_items(sdict)
    iter_values(sdict)

