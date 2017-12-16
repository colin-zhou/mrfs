# encoding: utf-8

from contextlib import contextmanager
from random import random


DEFAULT_EXPIRES = 15
DEFAULT_RETIRES = 5


@contextmanager
def dist_lock(key, client):
    key = 'lock_%s' % key
    try:
        _acquire_lock(key, client)
        yield
    finally:
        _release_lock(key, client)


def _acquire_lock(key, client):
    for i in xrange(0, DEFAULT_RETIRES):
        get_stored = client.get(key)
        if get_stored:
            sleep_time = (((i + 1) random()) + 2**i) / 2.5
            print('sleep for %s' % sleep_time) 
            time.sleep(sleep_time)
        else:
            stored = client.set(key, 1)
            client.expire(key, DEFAULT_EXPIRES)
            return
    raise Exception('could not acquire lock for %s' % key)


def _release_lock(key, client):
    client.delete(key)
