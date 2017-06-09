# -*- coding: utf-8 -*- 

"""
check if specified machine opened service, if check failed print some error
"""

import nmap
import config
from time import sleep


def get_check_config():
    ret_dict = dict()
    for key, value in config.service_cfg.items():
        ret_dict[key] = value['open'] + value['close']
    return ret_dict


def get_origin_config():
    return config.service_cfg


def callback_result(host, scan_result):
    print('--------------------{}------------------'.format(host))
    tcp_info = scan_result['scan'][host]['tcp']
    cfg = get_origin_config()
    open_ports = cfg[host]['open']
    close_ports = cfg[host]['close']
    error_log = list()
    for op in open_ports:
        #print('host: {0} port: {1} need open'.format(host, tcp_info[op]['state']))
        if tcp_info[op]['state'] != 'open':
            error_log.append('{0} need to open port {1}'.format(host, op))
    for cp in close_ports:
        #print('host: {0} port: {1} need close'.format(host, tcp_info[op]['state']))
        if tcp_info[op]['state'] == 'open':
            error_log.append('{0} need to close port {1}'.format(host, op))
    if len(error_log) != 0:
        print('check error: \n', '\n'.join(error_log))
    else:
        print('every thing is ok\n')


def main():
    cfg = get_check_config()
    nma_list = list()
    for ip, port_list in cfg.items():
        nma = nmap.PortScannerAsync()
        ports = ','.join(map(str, port_list))
        arguments = '-n'
        nma.scan(hosts=ip, ports=ports, arguments=arguments, callback=callback_result)
        nma_list.append(nma)

    while True:
        ok_now = True
        for nma in nma_list:
            if nma.still_scanning(): 
               ok_now = False
               break
        if not ok_now:
            #print("waiting >>>")
            sleep(1)
        else:
            break


if __name__ == "__main__":
    main()
