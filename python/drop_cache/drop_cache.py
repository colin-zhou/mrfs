#!/usr/bin/env python


def clear_cache():
    with open('/proc/sys/vm/drop_caches', 'w') as stream:
        stream.write('1\n')


if __name__ == "__main__":
    clear_cache()
