# encoding: utf-8

from enum import Enum, unique

class abcd(Enum):
    a = 0
    b = 1
    c = 2


abcd.a.value
abcd.b.value

# not support set value
abcd.c.value = 100
