#!/bin/python

x = 0

try:
    x = 1
    raise RuntimeError("abc")
except Exception:
    raise ValueError("ggg")
    x = 3
finally:
    x = 4

print(x)
