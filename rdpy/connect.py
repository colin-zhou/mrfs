"""
example of use rdpy as rdp client
"""

import sys, os, getopt, socket

from PyQt4 import QtGui, QtCore
from rdpy.ui.qt4 import RDPClientQt
from rdpy.protocol.rdp import rdp
from rdpy.core.error import RDPSecurityNegoFail
from rdpy.core import rss
import qt4reactor

import rdpy.core.log as log
log._LOG_LEVEL = log.Level.INFO


class RDPClientQtRecorder(RDPClientQt):
    """
    @summary: Widget with record session
    """
    def __init__(self, controller, width, height, rssRecorder):
        """
        @param controller: {RDPClientController} RDP controller
        @param width: {int} width of widget
        @param height: {int} height of widget
        @param rssRecorder: {rss.FileRecorder}
        """
        RDPClientQt.__init__(self, controller, width, height)
        self._screensize = width, height
        self._rssRecorder = rssRecorder
        
    def onUpdate(self, destLeft, destTop, destRight, destBottom, width, height, bitsPerPixel, isCompress, data):
        """
        @summary: Notify bitmap update
        @param destLeft: {int} xmin position
        @param destTop: {int} ymin position
        @param destRight: {int} xmax position because RDP can send bitmap with padding
        @param destBottom: {int} ymax position because RDP can send bitmap with padding
        @param width: {int} width of bitmap
        @param height: {int} height of bitmap
        @param bitsPerPixel: {int} number of bit per pixel
        @param isCompress: {bool} use RLE compression
        @param data: {str} bitmap data
        """
        #record update
        self._rssRecorder.update(destLeft, destTop, destRight, destBottom, width, height, bitsPerPixel, rss.UpdateFormat.BMP if isCompress else rss.UpdateFormat.RAW, data)
        RDPClientQt.onUpdate(self, destLeft, destTop, destRight, destBottom, width, height, bitsPerPixel, isCompress, data)
    
    def onReady(self):
        """
        @summary: Call when stack is ready
        """
        self._rssRecorder.screen(self._screensize[0], self._screensize[1], self._controller.getColorDepth())
        RDPClientQt.onReady(self)
          
    def onClose(self):
        """
        @summary: Call when stack is close
        """
        self._rssRecorder.close()
        RDPClientQt.onClose(self)
        
    def closeEvent(self, e):
        """
        @summary: Convert Qt close widget event into close stack event
        @param e: QCloseEvent
        """
        self._rssRecorder.close()
        RDPClientQt.closeEvent(self, e)

class RDPClientQtFactory(rdp.ClientFactory):
    """
    @summary: Factory create a RDP GUI client
    """
    def __init__(self, width, height, username, password, domain, fullscreen, keyboardLayout, optimized, security, recodedPath, mytimer):
        """
        @param width: {integer} width of client
        @param heigth: {integer} heigth of client
        @param username: {str} username present to the server
        @param password: {str} password present to the server
        @param domain: {str} microsoft domain
        @param fullscreen: {bool} show widget in fullscreen mode
        @param keyboardLayout: {str} (fr|en) keyboard layout
        @param optimized: {bool} enable optimized session orders
        @param security: {str} (ssl | rdp | nego)
        @param recodedPath: {str | None} Rss file Path
        """
        self._width = width
        self._height = height
        self._username = username
        self._passwod = password
        self._domain = domain
        self._fullscreen = fullscreen
        self._keyboardLayout = keyboardLayout
        self._optimized = optimized
        self._nego = security == "nego"
        self._recodedPath = recodedPath
        self._mytimer = mytimer
        if self._nego:
            #compute start nego nla need credentials
            if username != "" and password != "":
                self._security = rdp.SecurityLevel.RDP_LEVEL_NLA
            else:
                self._security = rdp.SecurityLevel.RDP_LEVEL_SSL
        else:
            self._security = security
        self._w = None
        
    def buildObserver(self, controller, addr):
        """
        @summary:  Build RFB observer
                    We use a RDPClientQt as RDP observer
        @param controller: build factory and needed by observer
        @param addr: destination address
        @return: RDPClientQt
        """
        #create client observer
        if self._recodedPath is None:
            self._client = RDPClientQt(controller, self._width, self._height)
        else:
            self._client = RDPClientQtRecorder(controller, self._width, self._height, rss.createRecorder(self._recodedPath))
        #create qt widget
        self._w = self._client.getWidget()
        self._w.setWindowTitle('rdpy-rdpclient')
        if self._fullscreen:
            self._w.showFullScreen()
        else:
            self._w.show()
        
        controller.setUsername(self._username)
        controller.setPassword(self._passwod)
        controller.setDomain(self._domain)
        controller.setKeyboardLayout(self._keyboardLayout)
        controller.setHostname(socket.gethostname())
        if self._optimized:
            controller.setPerformanceSession()
        controller.setSecurityLevel(self._security)
        
        return self._client
    
    def clientConnectionLost(self, connector, reason):
        """
        @summary: Connection lost event
        @param connector: twisted connector use for rdp connection (use reconnect to restart connection)
        @param reason: str use to advertise reason of lost connection
        """
        #try reconnect with basic RDP security
        if reason.type == RDPSecurityNegoFail and self._nego:
            #stop nego
            log.info("due to security nego error back to standard RDP security layer")
            self._nego = False
            self._security = rdp.SecurityLevel.RDP_LEVEL_RDP
            self._client._widget.hide()
            connector.connect()
            return

        self._mytimer.conn_fail()
        log.info("Lost connection : %s"%reason)
        
    def clientConnectionFailed(self, connector, reason):
        """
        @summary: Connection failed event
        @param connector: twisted connector use for rdp connection (use reconnect to restart connection)
        @param reason: str use to advertise reason of lost connection
        """
        self._mytimer.conn_fail()
        log.info("Connection failed : %s"%reason)


import threading
import time
class TimerThread(threading.Thread):
    def __init__(self, app, reactor, ret):
        super(TimerThread, self).__init__()
        self._stopper = threading.Event()
        self._cnt = 0
        self._app = app
        self._reactor = reactor
        self._cfail = False
        self._ret = ret

    def stop(self):
        self._stopper.set()

    def stopped(self):
        return self._stopper.isSet()

    def conn_fail(self):
        self._cfail = True

    def run(self):
         while not self.stopped():
            if self._cfail:
                # self._ret["connected"] = False
                self._reactor.crash()
                self._app.exit()
                self.stop()
            # wait 10 seconds
            # you can change this according your demand
            elif self._cnt == 2:
                self._reactor.crash()
                self._app.exit()
                self._ret["connected"] = True
                self.stop()
            else:
                self._cnt += 1
                time.sleep(1)

def run_once(f):
    def wrapper(*args, **kwargs):
        if not wrapper.has_run:
            wrapper.has_run = True
            return f(*args, **kwargs)
    wrapper.has_run = False
    return wrapper


@run_once
def my_initial():
    qt4reactor.install()


def mytest(ip, port, username, password):
    domain = ""
    width = 1024
    height = 800
    fullscreen = False
    optimized = False
    recodedPath = None
    keyboardLayout = 'en'
    app = QtGui.QApplication(sys.argv)

    my_initial()

    from twisted.internet import reactor
    ret = {"connected": False}
    mytimer = TimerThread(app, reactor, ret)
    mytimer.start()
    timeout = 2
    reactor.connectTCP(ip, int(port), RDPClientQtFactory(width, height, username, password, domain, fullscreen, keyboardLayout, optimized, "nego", recodedPath, mytimer), timeout)
    reactor.runReturn()
    app.exec_()
    reactor = None
    return ret


if __name__ == '__main__':


    try:
        res = mytest('192.168.0.111','3389','colin','zhou')
    except Exception:
        res = {"connected": False}
    print res


    try:
        res = mytest('192.168.0.111','3389','colin','zhou')
    except Exception:
        res = {"connected": False}
    print res

    try:
        res = mytest('192.168.0.111','3389','coli1n','zhou')
    except Exception:
        res = {"connected": False}
    print res

    try:
        res = mytest('192.168.0.111','3389','colin','zhou')
    except Exception:
        res = {"connected": False}
    print res


    try:
        res = mytest('192.168.0.111','3389','colin','zhou')
    except Exception:
        res = {"connected": False}
    print res

    try:
        res = mytest('192.168.0.111','3389','coli1n','zhou')
    except Exception:
        res = {"connected": False}
    print res