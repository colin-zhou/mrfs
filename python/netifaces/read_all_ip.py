# encoding: utf-8


"""
read all ip of running server
"""

from netifaces import interfaces, ifaddresses, AF_INET, AF_INET6

def ip4_addresses():
    ip_list = []
    for interface in interfaces():
        adds = ifaddresses(interface)
        if AF_INET not in adds:
            continue
        for link in adds[AF_INET]:
            ip_list.append(link['addr'])
    return ip_list


def ip6_addresses():
    ip_list = []
    for interface in interfaces():
        adds = ifaddresses(interface)
        if AF_INET6 not in adds:
            continue
        for link in adds[AF_INET6]:
            ip_list.append(link['addr'])
    return ip_list



if __name__ == "__main__":
    x = ip4_addresses()
    print(x) 
    x = ip6_addresses()
    print(x)
