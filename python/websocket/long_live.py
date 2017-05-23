#-*- coding: utf-8 -*-


import websocket
import time
import json

def on_message(ws, message):
    print(message)

def on_error(ws, error):
    print(error)

def on_close(ws):
    print("### closed ###")

def on_open(ws):
    def run(*args):
        ws.send(json.dumps({'type': 'post_trading' ,'data': 'Request'}))
    run()

def get_cookie():
    return 'sessionid=%s; csrftoken=%s' % ('8ncmyp5oa5d072884oy8sdam60mmtnre', 'EMMxA9uDCVNYkwMAcw44PTWWHlFaQKP3')

if __name__ == "__main__":
    websocket.enableTrace(True)
    ws = websocket.WebSocketApp("ws://192.168.1.170:8088/rssrealtime/",
                              	on_message = on_message,
                              	on_error = on_error,
                              	on_close = on_close,
                                cookie = get_cookie())
    ws.on_open = on_open
    ws.run_forever()
