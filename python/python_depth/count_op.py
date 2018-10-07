# encoding: utf-8

# 每次只有一个线程在跑，另外一个线程run的时候，必然会触发cs，保证每次堆里面的数据不是缓存,
# 线程上下文信息缓存位是l1->l2->l3->main memory !!!, 计数不线程安全，但容器类数据结构是安全的

from dis import dis

a = 0


def counter():
    global a
    a += 1


print dis(counter)

