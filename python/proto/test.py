import time
import json
import numpy as np
import quote_pb2

symprice = quote_pb2.SymbolPrice()
symvolume = quote_pb2.SymbolVolume()
price_dict = {}
volume_dict = {}

symprice.code = 0
for i in range(50000):
    key = str(i).zfill(6)
    symprice.data[key] = price_dict[key] = np.random.random()

symvolume.code = 0
for i in range(50000):
    key = str(i).zfill(6)
    symvolume.data[key] = price_dict[key] = np.random.randint(1, 10000)

t1= time.time()
out1 = symprice.SerializeToString()
t2 = time.time()
print("dumps time", t2 - t1)

t1 = time.time()
out2 = symvolume.SerializeToString()
t2 = time.time()
print("dumps time", t2 - t1)

t1 = time.time()
data = quote_pb2.SymbolPrice()
data.ParseFromString(out1)
t2 = time.time()
print(data.data['000001'])
print("load time", t2 - t1, data.code)

t1 = time.time()
data = quote_pb2.SymbolVolume()
data.ParseFromString(out2)
t2 = time.time()
print(data.data['000001'], data.code)
print("load time", t2 - t1)

t1 = time.time()
d=json.dumps(price_dict)
t2 = time.time()

print("json dumps", t2 - t1)
t1 = time.time()
json.loads(d)
t2 = time.time()
print("json loads", t2 - t1)
