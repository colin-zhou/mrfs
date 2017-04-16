from libc.stdlib cimport atoi
from cpython.version cimport PY_VERSION_HEX
from libc.math cimport sin

cdef parse_charptr_to_py_int(char* s):
    assert s is not NULL, "byte string value is NULL"
    return atoi(s)

print PY_VERSION_HEX

cdef double f(double x):
    return sin(x*x)
