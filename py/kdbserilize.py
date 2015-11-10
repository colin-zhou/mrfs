import numpy as np
import datetime


class Deserialize:
    def __init__(self, x):
        # x
        self.a = x[0]
        self.pos = 8
        self.j2p32 = 2 ** 32
        ta = buffer(x)
        self.ub = np.frombuffer(ta, np.uint8)
        self.sb = np.frombuffer(ta, np.int8)
        self.bb = np.array([0] * 8, np.uint8)
        self.hb = np.frombuffer(self.bb, np.int16)
        self.ib = np.frombuffer(self.bb, np.int32)
        self.eb = np.frombuffer(self.bb, np.float32)
        self.fb = np.frombuffer(self.bb, np.float64)

    def getret(self):
        return self.r()

    def rbool(self):
        return self.rint8() == 1

    def rchar(self):
        return ord(self.rint8())

    def rint8(self):
        tv = self.sb[self.pos]
        self.pos += 1
        return tv

    def rnuint8(self, n):
        for i in range(n):
            self.bb[i] = self.ub[self.pos]
            self.pos += 1

    def ruint8(self):
        tv = self.ub[self.pos]
        self.pos += 1
        return tv

    def rguid(self):
        x = "0123456789abcdef"
        s = ""
        for i in range(16):
            c = self.ruint8()
            if i == 4 or i == 6 or i == 8 or i == 10:
                s += '-'
            tidx = c >> 4
            s += x[tidx]
            s += x[c & 15]
        return s

    def rint16(self):
        self.rnuint8(2)
        h = self.hb[0]
        if h == -32768:
            return "NaN"
        if h == -32767:
            return "-Infinity"
        if h == 32767:
            return "Infinity"
        return h

    def rint32(self):
        self.rnuint8(4)
        i = self.ib[0]
        if i == -2147483648:
            return "NaN"
        if i == -2147483647:
            return "-Infinity"
        if i == 2147483647:
            return "Infinity"
        return i

    def rint64(self):
        self.rnuint8(8)
        x = self.ib[1]
        y = self.ib[0]
        if y >= 0:
            tv = y
        else:
            tv = self.j2p32 + y
        return x * self.j2p32 + tv

    def rfloat32(self):
        self.rnuint8(4)
        return self.eb[0]

    def rfloat64(self):
        self.rnuint8(8)
        return self.fb[0]

    def rsymbol(self):
        s = ""
        c = self.rint8()
        while c != 0:
            s += chr(c)
            c = self.rint8()
        return s

    def rtimestamp(self):
        return self.date(self.rint64() / 86400000000000)

    def rmonth(self):
        y = self.rint32()
        m = y % 12
        y = 2000 + y / 12
        return datetime.date(y, m, 01)

    def date(self, n):
        datetime.datetime.fromtimestamp(86400 * (n + 10957))

    def rdate(self):
        return self.date(self.rint32())

    def rdatetime(self):
        return self.date(self.rfloat64())

    def rtimespan(self):
        return self.date(self.rint64() / 86400000000000)

    def rseconds(self):
        return self.date(self.rint32() / 86400)

    def rminute(self):
        return self.date(self.rint32() / 1440)

    def rtime(self):
        return self.date(self.rint32() / 86400000)

    def r(self):
        fns = [self.r, self.rbool, self.rguid, None, self.ruint8, self.rint16,
                self.rint32, self.rint64, self.rfloat32, self.rfloat64,
                self.rchar, self.rsymbol, self.rtimestamp, self.rmonth,
                self.rdate, self.rdatetime, self.rtimespan,
                self.rminute, self.rseconds, self.rtime]
        i = 0
        t = self.rint8()
        if t < 0 and t > -20:
            return fns[-t]()
        if t > 99:
            if t == 100:
                self.rsymbol()
                return self.r()
            if t < 104:
                if self.rint8() == 0 and t == 101:
                    return None
                else:
                    return "func"
            if t > 105:
                self.r()
            else:
                n = self.rint32()
                while i < n:
                    self.r()
                    i += 1
            return "func"
        if t == 99:
            if self.ub[self.pos] == 98:
                flip = True
            else:
                flip = False
            x = self.r()
            y = self.r()
            if not flip:
                o = {}
                for i in range(len(x)):
                    o[x[i]] = y[i]
            else:
                o = {}
                o[0] = x
                o[1] = y
            return o
        self.pos += 1
        if t == 98:
            self.rint8()
            x = self.r()
            y = self.r()
            ta = {}
            for j in range(len(y[0])):
                o = {}
                for i in range(len(x)):
                    o[x[i]] = y[i][j]
                ta[j] = o
            return ta
        n = self.rint32()
        if t == 10:
            s = ""
            n += self.pos
            while self.pos < n:
                s += self.rchar()
            return s
        ta = {}
        f = fns[t]
        for i in range(n):
            ta[i] = f()
        return ta


class Serialize:
    def __init__(self, x):
        self.a = 1
        self.pos = 0
        # bb , ib , fb shared the memory
        self.ub = []
        self.bb = np.array([0] * 8, dtype=np.uint8)
        self.ib = np.frombuffer(self.bb, dtype=np.uint16)
        self.fb = np.frombuffer(self.bb, dtype=np.uint64)
        self.n = self.calcn(x, None)
        self.ab = np.array([0] * (self.n + 8), dtype=np.uint8)
        self.ub = np.frombuffer(self.ab, dtype=np.uint8)
        self.wb(1)
        self.wb(0)
        self.wb(0)
        self.wb(0)
        self.ib[0] = (self.n + 8)
        self.wn(4)
        self.w(x, None)

    def getret(self):
        return self.ab

    def totype(self, obj):
        return str(type(obj))

    def getkeys(self, x):
        return x.keys()

    def getvals(self, x):
        return x.values()

    def calcn(self, x, dt):
        if dt:
            t = dt
        else:
            t = self.totype(x)
        if t is None or t == "<type 'NoneType'>":
            return 2
        elif t == "<type 'dict'>":
            return 1 + self.calcn(self.getkeys(x), 'symbols') + \
                self.calcn(self.getvals(x), None)
        elif t == "<type 'bool'>":
            return 2
        elif t == "<type 'int'>" or t == "<type 'float'>" or \
                t == "<type 'datetime.date'>" or \
                t == "<type 'datetime.datetime'>":
            return 9
        elif t == "<type 'list'>":
            n = 6
            for i in range(len(x)):
                n += self.calcn(x[i], None)
            return n
        elif t == "symbols":
            n = 6
            for i in range(len(x)):
                n += self.calcn(x[i], 'symbol')
            return n
        elif t == "<type 'str'>":
            tv = 6
            if x[0] == '`':
                tv = 1
            return len(x) + tv
        elif t == "symbol":
            return 2 + len(x)
        else:
            raise NameError('error type' + t)

    def wb(self, b):
        self.ub[self.pos] = b
        self.pos += 1

    def wn(self, n):
        for i in range(n):
            self.ub[self.pos] = self.bb[i]
            self.pos += 1

    def w(self, x, dt):
        if dt:
            t = dt
        else:
            t = self.totype(x)
        if t is None or t == "<type 'NoneType'>":
            self.wb(101)
            self.wb(0)
        elif t == "<type 'bool'>":
            self.wb(-1)
            if x:
                self.wb(1)
            else:
                self.wb(0)
        elif t == "<type 'int'>" or t == "<type 'float'>":
            self.wb(-9)
            self.fb[0] = x
            self.wn(8)
        elif t == "date":
            self.wb(-15)
            self.fb[0] = (x - datetime.datetime(1970, 1, 1)).total_seconds()
            self.fb[0] = self.fb[0] / 86400000 - 10957
            self.wn(8)
        elif t == "<type 'dict'>":
            self.wb(99)
            self.w(self.getkeys(x), 'symbols')
            self.w(self.getvals(x), None)
        elif t == "<type 'list'>":
            self.wb(0)
            self.wb(0)
            self.ib[0] = len(x)
            self.wn(4)
            for i in range(len(x)):
                self.w(x[i], None)
        elif t == "symbols":
            self.wb(0)
            self.wb(0)
            self.ib[0] = len(x)
            self.wn(4)
            for i in range(len(x)):
                self.w(x[i], 'symbol')
        elif t == "<type 'str'>":
            if x[0] == '`':
                self.w(x[1:], 'symbol')
            else:
                self.wb(10)
                self.wb(0)
                self.ib[0] = len(x)
                self.wn(4)
            for i in range(len(x)):
                self.wb(ord(x[i][0]))
        elif t == "symbol":
            self.wb(-11)
            for i in range(len(x)):
                # returns the numeric Unicode value of the character at the
                # given index
                self.wb(ord(x[i][0]))
            self.wb(0)
        else:
            raise NameError('error type')

if __name__ == '__main__':
    # x = ['loadOrder',['192.168.1.22(rss-4)/home/xuxx/code/trader/src/rss/rss_agent/oss/src/test/mock_trader']]
    # t = Serialize(x)
    # print t.getret().tobytes().__repr__()

    x = [1,0,0,0,139,0,0,0,0,0,2,0,0,0,245,103,101,116,76,105,110,107,67,111,110,116,114,97,99,116,83,116,114,97,116,
        101,103,121,0,98,0,99,11,0,6,0,0,0,116,105,109,101,0,115,121,109,0,73,80,72,111,115,116,78,97,109,101,0,84,114,97,
        100,101,114,80,97,116,104,0,83,116,114,97,116,101,103,121,0,67,111,110,116,114,97,99,116,0,0,0,6,0,0,0,16,0,0,0,0,0,
        11,0,0,0,0,0,11,0,0,0,0,0,11,0,0,0,0,0,11,0,0,0,0,0,0,0,0,0,0,0]
        
    bf = np.array(x, dtype=np.uint8)
    oj = Deserialize(bf)
    print oj.getret()
