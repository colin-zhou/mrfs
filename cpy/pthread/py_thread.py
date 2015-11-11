''' Demonstrate the use of python threading'''
import time
import threading


class MyThread(threading.Thread):
        def __init__(self):
                threading.Thread.__init__(self)

        def run(self):
                for i in range(15):
                        print 'Python printed from MyThread...'
                        time.sleep(1)


def createthread():
        print 'Python Create and run MyThread'
        background = MyThread()
        background.start()
        print 'Python Main thread continues to run in foreground.'
        for i in range(10):
                print 'Python printed from main thread.'
                time.sleep(1)
        print 'Python Main thread joins MyThread and waits until it is done...'
        background.join()
        print 'The Python program completed gracefully.'
