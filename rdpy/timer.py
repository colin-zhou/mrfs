# import threading
# import time
# class TimerThread(threading.Thread):
#     def __init__(self, app, reactor, ret):
#         super(TimerThread, self).__init__()
#         self._stopper = threading.Event()
#         self._cnt = 0
#         self._app = app
#         self._reactor = reactor
#         self._cfail = False
#         self._ret = ret
#
#     def stop(self):
#         self._stopper.set()
#
#     def stopped(self):
#         return self._stopper.isSet()
#
#     def conn_fail(self):
#         self._cfail = True
#
#     def run(self):
#          while not self.stopped():
#             if self._cfail:
#                 # self._ret["connected"] = False
#                 self.stop()
#             # wait 10 seconds
#             elif self._cnt == 5:
#                 self._reactor.stop()
#                 self._app.exit()
#                 self._ret["connected"] = True
#                 self.stop()
#             else:
#                 self._cnt += 1
#                 time.sleep(1)