#!/usr/bin/env python

"""
bidirection convert ip and int
"""
import struct
import socket


def string_reverse(string):
    return string[::-1]


def inttoip(ip):
    return socket.inet_ntoa(hex(ip)[2:].encode().decode('hex'))


def iptoint(ip):
    return int(socket.inet_aton(ip).encode('hex'), 16)


def ip2int(addr):
    return struct.unpack("!I", socket.inet_aton(addr))[0]


def int2ip(addr):
    return socket.inet_ntoa(struct.pack("!I", addr))


if __name__ == "__main__":
    print(int2ip(1428072640))
    print(int2ip(16777343))
