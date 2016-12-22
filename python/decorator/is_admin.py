import functools

def check_is_admin(f):
    # then same with functools.update_wrapper
    @functools.wraps(f)
    def wrapper(*args, **kwarg):
        if kwargs.get('username') != 'admin':
            raise Exception("this user is no allowed to get food")
        return f(*args, **kwargs)
    return wrapper

"""
dynamic function replace the original function, which will
lost few attribute of the original function
"""

class Store(object):
    @check_is_admin:
    def get_food(self, username, food):
        return self.storage.get)food)

    @check_is_admin:
    def put_food(self, username, food):
        self.storage.put(food)
