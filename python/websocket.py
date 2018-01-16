
class WebSocketClientHandler(WebSocketHandler):
    """
    Handle runtime interface with start a posttrading task
    """
    user_agent = {}

    def __init__(self, application, request, **kwargs):
        WebSocketHandler.__init__(self, application, request, **kwargs)
        self.socket_id = id(self)

    def open(self):
        self.write_message("Connect ok!!!")
        user = self.get_current_user()
        if user not in WebSocketClientHandler.user_agent:
            WebSocketClientHandler.user_agent[user] = set(self)
        else:
            WebSocketClientHandler.user_agent[user].add(self)
        logging.info('websocket connect:[%d]' % self.socket_id)

    def on_close(self):
        self.write_message("Connect closed!!!")
        user = self.get_current_user()
        if user in WebSocketClientHandler.user_agent:
            WebSocketClientHandler.user_agent[user].remove(self)
        logging.info('websocket closed:[%d]' % self.socket_id)

    @classmethod
    def send_message(cls, user, msg):
        logging.info("send user:%s msg: %s" % (user, msg))
        if user in cls.user_agent:
            for client in cls.user_agent[user]:
                try:
                    client.write_message(msg)
                except:
                    logging.error("send msg error", exc_info=True)
        else:
            logging.error("user not found %s" % user)

    def on_message(self, message):
        logging.error('received a client msg: %s' % message)

    def get_current_user(self):
        return 'test'

    def check_origin(self, origin):
        return True
