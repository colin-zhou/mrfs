import redis
import datetime
import threading
import time


def callback():
    r = redis.client.StrictRedis()
    sub = r.pubsub()
    sub.subscript('clock')
    while True:
            for m in sub.listen():
                print m # 'Recieved: {0}'.format(m['data'])

def main():
    t = threading.Thread(target=callback)
    t.setDaemon(True)
    t.start()
    while True:
            print 'waiting'
            time.sleep(30)

if __name__ == '__main__':
    main()
