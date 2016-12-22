import inspect

def mygenerator():
    yield 1
    yield 2
    yield 'a'


print inspect.isgeneratorfunction(mygenerator)
gen = mygenerator()

#print inspect.getgeneratorstate(gen)
#next(gen)
#
#print inspect.getgeneratorstate(gen)
#
#next(gen)
#print inspect.getgeneratorstate(gen)
#
#next(gen)
#print inspect.getgeneratorstate(gen)


for value in xrange(1000000):
    if value == 500000:
        print("found it")
        break


(x.upper() for x in ['hello', 'world'])
