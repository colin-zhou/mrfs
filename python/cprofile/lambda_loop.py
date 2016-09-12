#!/usr/bin/env python
# -*- coding: utf-8 -*-

def testfunc(f):
    def wrapper(*args, **kwargs):
        import cProfile, pstats, StringIO
        import time
        starttime = time.time()
        pr = cProfile.Profile()
        pr.enable()
        f(*args, **kwargs)
        pr.disable()
        s = StringIO.StringIO()
        sortby = 'cumulative'
        ps = pstats.Stats(pr, stream=s).sort_stats(sortby)
        ps.print_stats()
        print s.getvalue()
        print "used time = %s" % (time.time() - starttime)
    return wrapper

@testfunc
def test():
    sum = 0
    for a in range(1000):
        if a % 2 == 0:
            sum += a
    print sum

@testfunc
def test1():
    sum = 0
    for x in filter(lambda x: not (x % 2), range(1000)):
        sum += x
    print sum

@testfunc
def test2():
    sum = reduce((lambda x,y: x+y),[x for x in range(1000) if x % 2 == 0])
    print sum


if __name__ == '__main__':
    test()
    test1()
    test2()
