from qpython import qconnection

if __name__ == '__main__':
        q = qconnection.QConnection(host='localhost', port=9001,
                                    username='superuser1',
                                    password='password', timeout=3.0)
        q.open()

        print(q)
        print('IPC version: %s. Is Connected: %s' % (q.protocol_version, q.is_connected()))

        data = q('{`int$ til x}', 10)
        print('type: %s, numpy.dtype: %s, meta.qtype: %s, data: %s' % (type(data), data.dtype, data.meta.qtype, data))

        data = q.sync('{`long$ til x}',10)
        print('type: %s, numpy.dtype: %s, meta.qtype: %s, data:%s ' % (type(data), data.dtype, data.meta.qtype, data))

        q.query(qconnection.MessageType.SYNC, '{`short$ til x}', 10)
        msg = q.receive(data_only=False, raw=False)
        print('type: %s, message type: %s, data size: %s, is_compressed: %s ' % (type(msg), msg.type, msg.size, msg.is_compressed))
        data = msg.data
        print('type: %s, numpy.dtype: %s, meta.qtype: %s, data: %s ' % (type(data), data.dtype, data.meta.qtype, data))
        q.close()