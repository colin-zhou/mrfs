===============================

__new__方法接受的参数虽然也和__init__一样，但是__init__是在类实例创建之后调用的，而__new__方法是创建这个类实例的方法。

__new__(cls, *args, *kw):
    super(XXX, cls).__new__(cls, ...)

1. __init__ 通常用于初始化一个实例，控制这个初始化的过程，比如添加一些属性，做一些额外的操作，发生在类实例被创建完以后，它是实例级别的方法，__new__通常用于控制生成一个新实例的过程，它是类级别的方法。


class PositiveInteger(int):
    def __new__(cls, value):
        return super(PositiveInteger, cls).__new__(csl, abs(value))


i = PositiveInteger(-3)

print(i)


对于int这种不可变的对象，我们只有重载它的__new__方法才能起到自定义的作用。
