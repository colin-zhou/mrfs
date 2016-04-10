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
        # 9001
        # q.sync .u.upd
        q = qconnection.QConnection(host='localhost', port=9026,
                                    username='superuser1',
                                    password='password', timeout=3.0)
        q.open()

        while True:
            # q.sync('.u.upd[`myctpquote;(`IF1606;`CFFEX;.z.D;`abc;123i;1f;2f;3f;4f;5f;6f;7f;1i;1f;2f;3f;4f;5f;6f;7f;8f;.z.T;100f;100i;100f;100i;100f;100i;100f;100i;100f;100i;100f;100i;100f;100i;100f;100i;100f;100i;100f;100i;.z.D)]')
            q.sync('.ws.loadClear[`getCffex]')
            time.sleep(1)