# encoding: utf-8


import sys
import tempfile


bak_f = sys.stdout
if sys.version_info[0] < 3:
    sys.stdout = tempfile.NamedTemporaryFile(delete=True)
else:
    sys.stdout = tempfile.TemporaryFile(mode='w+', encoding='utf-8')


print("msg")
print("msg")


sys.stdout.flush()
sys.stdout.seek(0)
data = sys.stdout.read()

sys.stdout = bak_f

print(data)
