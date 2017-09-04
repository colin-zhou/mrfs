#!/usr/bin/env python

"""
bidirection convert ip and int
"""

import socket


def string_reverse(string):
    return string[::-1]


def inttoip(ip):
    return socket.inet_ntoa(hex(ip)[2:].encode().decode('hex'))


def iptoint(ip):
    return int(socket.inet_aton(ip).encode('hex'), 16)
