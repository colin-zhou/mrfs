# -*- coding: utf-8 -*-


import getopt
import sys
import binascii


type_list = ['hex', 'str']
default_type = type_list[0]

def usage():
    print("python %s -t {hex, str} -d 'xxxxx'" % __file__) 
    sys.exit(0)


def convert_hex(data):
    data = str(data)
    res_list = []
    hex_data = binascii.hexlify(data)
    for i in range(len(hex_data)/2): 
        idx = i * 2
        slice_part = hex_data[idx: idx+2]
        res_list.append('\c00%s' % slice_part)
    return ''.join(res_list)


def convert_str(data):
    ddata = "u'%s'" % data
    data = eval(ddata)
    return str(data)


if __name__ == "__main__":
    try:
        func_map = {
            'hex': convert_hex,
            'str': convert_str,
        }
        options, args = getopt.getopt(sys.argv[1:], 'ht:d:', ["help", "type", "data"])
        ctype = default_type
        cdata = ''
        for name, value in options:
            if name in ("-h", "--help"):
                usage()
            if name in ("-t", "--type"):
                if value in type_list: 
                    ctype = value
                else:
                    raise ValueError(value)
            if name in ("-d", "--data"):
                cdata = value
        result = func_map[ctype](cdata)
        print(result)
    except getopt.GetoptError:
        usage()
