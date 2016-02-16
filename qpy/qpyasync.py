import random
import threading
import time

from qpython import qconnection
from qpython.qtype import QException
from qpython.qconnection import MessageType
from qpython.qcollection import QDictionary

class ListenerThread(threading.Thread):

        def __init__(self, q):
                super(ListenerThread, self).__init__()
                self.q = q
                self._stopper = threading.Event()

        def stop(self):
                self._stopper.set()

        def stopped(self):
                return self._stopper.isSet()

        def run(self):
                while not self.stopped():
                        print('.')
                        try:
                                message = self.q.receive(data_only = False, raw = False)

                                if message.type != MessageType.ASYNC:
                                        print('Unexpected mesage, expected message of type: ASYNC')

                                print('type: %s, message type: %s, data size: %s, is_compressed: %s' % (type(message), message.type, message.size, message.is_compressed))
                                print(message.data)

                                if isinstance(message.data, QDictionary):
                                        if message.data[b'queryid'] == 9:
                                                self.stop()

                        except QException as e:
                                print(e)

if __name__ == '__main__':
        q = qconnection.QConnection(host='localhost', port=9001,
                                    username='superuser1',
                                    password='password', timeout=3.0)
        q.open()
        print(q)
        print('IPC version: %s. Is connected: %s' % (q.protocol_version, q.is_connected()))

        try:
                q.sync('asynchMult:{[queryid;a;b] res:a*b; (neg .z.w)(`queryid`result!(queryid;res)) }')
                t = ListenerThread(q)
                t.start()

                for x in range(10):
                        a = random.randint(1, 100)
                        b = random.randint(1, 100)
                        print('Asynchronous call with queryid=%s with arguments: %s, %s' % (x, a, b))
                        q.async('asynchMult', x, a, b)

                time.sleep(1)
        finally:
                q.close()