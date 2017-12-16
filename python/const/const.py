# encoding: utf-8

import sys


class Const:
    def __new__(cls, *args, **kw):
        if not hasattr(cls, '_instance'):
            orig = supper(Const, cls)
            cls._instance = orig.__new__(cls, *args, **kw)
        return cls._instance

    class ConstError(TypeError):
        def __init__(self, name):
            self.msg = "can't rebind const instance attribute %s" % name

        def __str__(self):
            return 'error msg: {}'.format(self.msg)

        def __repr__(self):
            return self.__str__()

    def __setattr__(self, name, value):
        if self.__dict__.has_key(name):
            raise self.ConstError(name)

        self.__dict__[name] = value

    def __delattr__(self, name):
        if self.__dict__.has_key(name):
            raise self.ConstError(name)

        raise self.ConstError(name)

sys.modules[__name__] = Const()
