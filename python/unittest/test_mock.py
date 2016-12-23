#!/usr/bin/env python
#-*- coding:utf-8 -*-

try:
    from unittest import mock
except ImportError:
    import mock

m = mock.Mock()
m.some_method.return_value = 42
m.some_method()

def print_hello():
    print("hello world!")

m.some_method.side_effect = print_hello
m.some_method()


def print_hello()
    print ("hello world!")
    return 43

m.some_method.side_effect = print_hello
m.some_method()

m.some_method.call_count

m.some_method('foo', 'bar')
m.some_method.assert_called_once_with('foo', 'bar')
m.some_method.assert_called_once_with('foo', mock.ANY)
m.some_method.assert_called_once_with('foo', 'baz')

import os
def fake_os_unlink(path):
    raise IOError('testing!')

with mock.patch('os.unlink', fake_os_unlink):
    os.unlink('foobar')
