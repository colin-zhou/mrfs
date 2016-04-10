import qpython
from qpython import qconnection
from qpython.qtype import QException

try:
        input = raw_input
except NameError:
        pass

if __name__ == '__main__':
        q = qconnection.QConnection(host='localhost', port=9001,
                                    username='superuser1',
                                    password='password', timeout=3.0)
        q.open()
        print('qPython %s Cython extensions enabled: %s' % (qpython.__version__, qpython.__is_cython_enabled__))

        print (q)

        while True:
                try:
                        x = input('Q)')
                except EOFError:
                        print('')
                        break

                if x == '\\\\':
                        break
                try:
                        result = q(x)
                        print(type(result))
                        print(result)
                except QException as msg:
                        print('q error: \'%s' % msg)
