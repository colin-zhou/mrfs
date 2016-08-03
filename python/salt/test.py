#!/bin/python
#-*- coding:utf-8 -*-


import salt.client
a=salt.client.LocalClient()
jid = a.cmd_async('*', 'cmd.script', ['salt://script/one.sh'])
gen = a.get_cli_returns(jid, '*')
for x in gen:
    print x


