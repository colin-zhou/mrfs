#!/usr/python
# -*- coding: utf-8 -*-

# from qpython import qconnection
# from qpython import qcollection
from binascii import hexlify
import numpy
from qpython import*

# https://github.com/exxeleron/qPython
# https://kx.com/documentation.php

q = qconnection.QConnection(host='192.168.3.10', port=9001,
                            username='superuser1',
                            password='password', timeout=3.0)
try:
    q.open()
    print(q.sync('til 10'))
    print(q.sync('{til x}', 10))
    print(q.sync('{y + til x}', 10, 1))
    print(q.sync('{y + til x}', *[10, 1]))
    print(q('{y + til x}', 10, 1))
    q.query(qconnection.MessageType.SYNC, '{x}', 10)
    print(q.receive(data_only=False, raw=False))

    q.query(qconnection.MessageType.SYNC, '{x}', 10)
    print(q.receive(data_only=True, raw=False))

    q.sync('asynchMult:{[a;b] res:a*b; (neg .z.w)(res) }')
    q.async('asynchMult', 2, 3)
    print(q.receive())

    q.query(qconnection.MessageType.SYNC, '{x}', 10)
    print(hexlify(q.receive(data_only=True, raw=True)))

    query = "{[x] 0Nd, `date$til x}"
    print(hexlify(q(query, 5, raw=True)))

    print(q.sync(query, 5, numpy_temporals=True))

    q.query(qconnection.MessageType.SYNC, query, 3)
    print(q.receive(numpy_temporals=False))

    print(q.sync('{[x] type each x}', ['one', 'two', '3'],
          single_char_strings=False))
    print(q.sync('{[x] type each x}', ['one', 'two', '3'],
          single_char_strings=True))

    print repr(qcollection.qlist(numpy.array([0x01, 0x02, 0xff],
                                 dtype=numpy.byte)))
    # qcollection.qlist([366, 121, qnull(QDATE)], qtype=QDATE_LIST)
    # qcollection.qlist(numpy.array(
    #                   [uuid.UUID('8c680a01-5a49-5aab-5a65-d4bfddb6a661'),
    #                    qnull(QGUID)]), qtype=QGUID_LIST)
    [numpy.int64(1), numpy.string_('bcd'), '0bc', numpy.float32(5.5)]

    # qlist([1, 2, 3], qtype=QSHORT_LIST)
    # (1h;2h;3h)

    # qlist([366, 121, qnull(QDATE)], qtype=QDATE_LIST)

    print [numpy.int64(42), None, numpy.string_('foo')]
    # ...
    ds = q('(1i;0Ni;3i)', pandas=True)
    print ds
    print(ds.meta)

finally:
    q.close()
