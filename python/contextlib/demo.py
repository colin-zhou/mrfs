# coding:utf-8

from contextlib import contextmanager

@contextmanager
def make_context():
    print 'enter'
    try:
            yield {}
    except RuntimeError:
        print 'error'
    finally:
        print 'exit'


with make_context() as value:
    print(value)
