# -*- coding: utf-8 -*-


import os
import sys

import numpy as np

qdtype = np.dtype([
    ('symbol', 'S32'),
    ('exch_time', 'i4'),
])


def calc_func(quote):
    if isinstance(quote, memoryview):
        print(np.frombuffer(quote, qdtype))
        return float(1)
