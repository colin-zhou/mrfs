import abc

class Pizza(object):
    radius = 42
    """
    we can overwrite this function in subclass
    """
    @staticmethod
    def mix_ingredients(x, y):
        return x+y
    
    def cook(self):
        return self.mix_ingredients(self.cheese, self.vegetables)

    @classmethod
    def get_radius(cls):
    """
    first parameter of this is class itself, factory function
    """
        return cls.radius

    @staticmethod
    def get_radius():
        raise NotImplementedError


class BasePizza(object):
    __metaclass__ = abc.ABCMeta

    @abc.abstractmethod
    def get_radius(self):
        """Method that should do something"""
