# -*- coding: utf-8 -*-

import os
import socket
import datetime
from netifaces import interfaces, ifaddresses, AF_INET


def fmt_alchemy_attr(self):
    """
    convert each column of sql alchemy orm table to dictionary(drop the decimal field)
    """
    dump_dict = {}
    for attr in [attr for attr in dir(self) if not attr.startswith('_') and not attr.startswith('get_')]:
        value = getattr(self, attr)
        if isinstance(value, float):
            value = round(value, 3)
        if isinstance(value, decimal.Decimal):
            value = round(float(value), 3)
        dump_dict.update({attr: value})
    return dump_dict


def fmt_ctp_datetime(ctp_date, ctp_time):
    """
    ctp_date in 20180101 fmt and ctp_time in %H:%M:%S format, this will convert
    them into a python datetime.datetime data type and return it or return ''
    """
    try:
        if isinstance(ctp_date, bytes):
            ctp_date = ctp_date.decode()
        if isinstance(ctp_time, bytes):
            ctp_time = ctp_time.decode()
        ctp_datetime = '%s %s' % (ctp_date, ctp_time)
        fmt_datetime = datetime.datetime.strptime(ctp_datetime, '%Y%m%d %H:%M:%S')
        return fmt_datetime
    except ValueError:
        return ''


def get_dir_size(start_path = '.'):
    """
    get the total size of specified directory recursively
    """
    total_size = 0
    for dirpath, dirnames, filenames in os.walk(start_path):
        for f in filenames:
            fp = os.path.join(dirpath, f)
            total_size += os.path.getsize(fp)
    return total_size


def human_size(size):
    """
    convert bytes to human readable size
    """
    B = "B"
    KB = "KB"
    MB = "MB"
    GB = "GB"
    TB = "TB"
    UNITS = [B, KB, MB, GB, TB]
    HUMANFMT = "%f %s"
    HUMANRADIX = 1024.

    for u in UNITS[:-1]:
        if size < HUMANRADIX : return HUMANFMT % (size, u)
        size /= HUMANRADIX

    return HUMANFMT % (size,  UNITS[-1])


def ip4_addresses():
    """
    get all ipv4 address of current machine
    """
    ip_list = []
    for interface in interfaces():
	adds = ifaddresses(interface)
	if AF_INET not in adds:
	    continue
    for link in adds[AF_INET]:
        ip_list.append(link['addr'])
        return ip_list


def get_local_internet_ip():
    """
    get the ip address that can access internet
    """
    p = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    p.connect(('www.baidu.com', 80))
    return p.getsockname()[0]

