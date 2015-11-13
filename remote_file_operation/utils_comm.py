#!/usr/bin/python
# -*-coding:utf-8-*-

import config
import socket, struct, fcntl
import threading



def get_local_ip(ethname=config.NETWORK_CARD):
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    return socket.inet_ntoa(fcntl.ioctl(sock.fileno(), 0X8915, struct.pack('256s', ethname[:15]))[20:24])
if __name__ == '__main__':
    print get_local_ip('eth0')
