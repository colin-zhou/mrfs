#!/bin/python

import time

def repeat_function(argument):
    def real_decorator(function):
        def wrapper(*args, **kwargs):
            for idx in range(argument):
                if function(*args, **kwargs):
                    return True
                else:
                    time.sleep(1)
            return False
        return wrapper
    return real_decorator


@repeat_function(5)
def test():
    print "abc"
    return True


if __name__ == "__main__":
    test()
