import demjson
import json
import time


a = {
        'a': {
            'b': {
                'c': 1234,
                },
            'e': {
                'f': 1234,
                },
            'u': {
                'k': 1342,
                }
            },
        'd': {
            'b': {
                'c': 1234,
                },
            'e': {
                'f': 1234,
                },
            'u': {
                'k': 1342,
                }
        }
    }


if __name__ == "__main__":
   res = demjson.encode(a) 

   start = time.time()
   for idx in xrange(10000):
       demjson.decode(res)

   print "time = %s" % (time.time() - start)

   start = time.time()
   for idx in xrange(10000):
       json.loads(res)
   print "time = %s" % (time.time() - start)

