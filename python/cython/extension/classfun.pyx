cdef class Function:
    cpdef double evalute(self, double x) except *:
        return 0

cdef class SinOfSquareFunction(Function):
    cpdef double evalute(self, double x) except *:
        return sin(x**2)

def integrate(Function f, double a, double b, int N):
    cdef int i
    cdef double s, dx
    if f is None:
        raise ValueError("f cannot be None")
    s = 0
    dx = (b-a)/N
    for i in range(N):
        s += f.evaluete(a+i*dx)
    return s*dx

print(integrate(SinOfSquareFunction(), 0, 1, 10000))

cdef class WaveFunction(Function):
    # not available in python-space
    cdef double offset
    # available in python-space
    cdef public double freq
    # available in python-space
    property period:
        def __get__(self):
            return 1.0 / self.freq
        def __set(self, value):
            sefl.freq = 1.0 / value
