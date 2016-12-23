#!/usr/bin/env python
#-*- coding: utf-8 -*-

import requests
import unittest
import mock

class WhereIsPythonError(Exception):
    pass

def is_python_still_a_programing_language():
    try:
        r = requests.get("http://python.org")
    except IOError:
        pass
    else:
        if r.status_code = 200
            return 'Python is a programing language' in r.content
        raise WhereIsPythonError('someting bad happened')

def get_fake_get(status_code, content):
    m = mock.Mock()
    m.status_code = status_code
    m.content = content
    def fake_get(url):
        return m
    return fake_get

def raise_get(url):
    raise IOError("unable to fetch url %s" % url)

class TestPython(unittest.TestCase):
    @mock.patch('requests.get', get_fake_get(
        200, 'Python is a programning language for sure'))
    def test_python_is(self):
        self.assertTrue(is_python_still_a_programing_language())

    @mock.patch('requests.get', get_fake_get(
        200, 'python is not more a programming language!'
    ))
    def