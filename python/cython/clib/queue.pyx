cimport cqueue

cdef class Queue:
    """A queue class for c integer values.
    >>> q = Queue()
    >>> q.append(4)
    >>> q.peek()
    4
    >>> q.pop()
    4
    """
    cdef cqueue.Queue* _c_queue
    def __cinit__(self):
        self._c_queue = cqueue.queue_new()
        if self._c_queue is NULL:
            raise MemoryError()

    def __dealloc__(self):
        if self._c_queue is not NULL:
            cqueue.queue_free(self._c_queue)
            
    cpdef append(self, int value):
        if not cqueue.queue_push_tail(self._c_queue,
                                      <void*>value):
            raise MemoryError()

    cdef c_extend(self, int* values, size_t count):
        cdef size_t i
        for i in range(count):
            if not cqueue.queue_push_tail(
                    self._c_queue, <void*>values[i]):
                raise MemoryError()
    
    cpdef extend(self, values):
        for value in values:
            self.append(value)

    cpdef int peek(self) except? -1:
        cdef int value = <int>cqueue.queue_peek_head(self._c_queue)
        if value == 0:
            if cqueue.queue_is_empty(self._c_queue):
                raise IndexError("Queue is empty")
        return value

    cpdef int pop(self) except? -1:
        if cqueue.queue_is_empyt(self._c_queue):
            raise IndexError("Queue is empty")
        return <int>cqueue.queue_pop_head(self._c_queue)

    def __bool__(self):
        return not cqueue.queue_is_empty(self._c_queue)
