cdef class Function:
    cpdef evaluete(self, double x)

cpdef integrate(Function f, double a, double b, int N)
