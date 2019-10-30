import argparse
import logging
import socket
import sys
import struct
import threading
import time
from dicttoxml import dicttoxml


def make_new_connection(name, host, port):
    sockobj = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sockobj.connect((host, port))
    logging.info('{0} connected...'.format(name))

    for x in range(2):
        """
        Arguments:
        max_order_cnt
        max_order_amount
        szsz_freq
        sse_freq
        cancel_ratio_pct
        cancel_limit_baseline
        error_ratio_pct
        error_limit_baseline
        trade_ratio_pct
        trade_limit_baseline
        """
        ret = dicttoxml({
            'rule_switch': 1,
            'max_order_cnt': 100,
            'max_order_amount': 200000,
            'szse_freq': 1000,
            'sse_freq': 1000,
            'cancel_ratio_pct': 0.5,
            'cancel_limit_baseline': 300,
            'error_ratio_pct': 0.4,
            'error_limit_baseline': 300,
            'trade_ratio_pct': 0.3,
            'trade_limit_baseline': 500,
            'whitelist_addr': ['aaaaaaaaaaaaaaaaa', 'bbbbbbbbbbbbbbbbbbb'],
        })
        # ret = dicttoxml({'aaaa': 1})
        s = struct.pack('ii%ss' % len(ret), 0, len(ret), ret) 
        print("length is", len(ret))
        logging.info('{0} sending {1}'.format(name, s))
        sockobj.send(s)
        sockobj.settimeout(1.0)
        msg = sockobj.recv(100)
        sockobj.settimeout(None)
        logging.info('{0} received {1}'.format(name, msg))
        if isinstance(msg, bytes) and len(msg) > 0 and msg.decode().startswith("ok"):
                print("update rule success")
        else:
                print("update rule failed")
                

def main():
    argparser = argparse.ArgumentParser('Simple TCP client')
    argparser.add_argument('host', help='Server host name')
    argparser.add_argument('port', type=int, help='Server port')
    argparser.add_argument('-n', '--num_concurrent', type=int,
                           default=1,
                           help='Number of concurrent connections')
    args = argparser.parse_args()

    logging.basicConfig(
        level=logging.DEBUG,
        format='%(levelname)s:%(asctime)s:%(message)s')

    t1 = time.time()
    connections = []
    for i in range(args.num_concurrent):
        name = 'conn{0}'.format(i)
        tconn = threading.Thread(target=make_new_connection,
                                 args=(name, args.host, args.port))
        tconn.start()
        connections.append(tconn)

    for conn in connections:
        conn.join()

    print('Elapsed:', time.time() - t1)


if __name__ == '__main__':
    main()
