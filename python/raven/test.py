#!/bin/python3.5

from raven import Client

client = Client('http://4134ee7d2d794419b05c3b928343640c:7c2584ef60d94f0e954e7e2044372ea9@192.168.3.18:9000/2', tags={'notify': 'email'})
client.captureMessage('error test info a new test have a check')

try:
    raise TypeError
except TypeError:
    client.captureException()
