#!/bin/usr/env python
#-*- coding:utf-8 -*-

import unittest
import fixtures

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


class TestMe(unittest.TestCase):
    def setUp(self):
        self.list = [1,2,3]

    def test_length(self):
        self.list.append(4)
        self.assertEqual(len(self.list), 4)

    def test_has_one(self):
        self.assertEqual(len(self.list), 3)
        self.assertIn(1, self.list)

# rule: path.to.your.module:ClassOfYourTest.test_method
# nosetests --process

# fixtures.TestWithFixutes inherts from unittest.TestCase

class TestEnviron(fixtures.TestWithFixtures):
    def test_environ(self):
        fixture = self.useFixture(
            fixtures.EnvironmentVariable("FOOBAR", "42")
        )
        self.assertEqual(`os.environ.get("FOOBAR"), "42")

    def test_environ_no_fixture(self):
        self.assertEqual(os.environ.get("FOOBAR"), None)

