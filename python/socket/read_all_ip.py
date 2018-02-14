# encoding: utf-8


import socket
import psutil


def get_ip_addresses(family):
    # net_if_addrs list all nics and it's corresponding parameters
    for interface, snics in psutil.net_if_addrs().items():
        for snic in snics:
            if snic.family == family:
                yield (interface, snic.address)

ipv4s = list(get_ip_addresses(socket.AF_INET))
ipv6s = list(get_ip_addresses(socket.AF_INET6))

print(ipv4s, ipv6s)
