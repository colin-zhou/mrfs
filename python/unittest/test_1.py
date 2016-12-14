#!/bin/usr/env python
#-*- coding:utf-8 -*-

import unittest
try:
    import mylib
except ImportError:
    mylib = None

class TestKey(unittest.TestCase):
    def test_key(self):
        a = ['a', 'b']
        b = ['b']
        self.assertEqual(a,b)

class TestFail(unittest.TestCase):
    def test_range(self):
        for x in range(5):
            if x > 4:
                self.fail("Range returned a too big value %d" % x)

class TestSkipped(unittest.TestCase):
    @unittest.skip("do not run this")
    def test_fail(self):
        self.fail("this should not be run")

    @unittest.skipIf(mylib is None, "mylib is not available")
    def test_mylib(self):
        self.assertEqual(mylib.foobar(), 42)

    def test_skip_at_runtime(self):
        if True:
            self.skipTest("finally i don't want to run it")
