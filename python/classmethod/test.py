class A(object):
    def foo(self, x):
        print "executing foo(%s, %s)" % (self, x)
    
    @classmethod
    def class_foo(cls, x):
        print "executing class_foo(%s, %s)" % (cls, x)

    @staticmethod
    def static_foo(x):
        print "executing static_foo(%s)" % x

a = A()

a.foo(1)
A.class_foo(1)
a.class_foo(1)
