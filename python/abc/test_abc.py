import abc

class BasePizza(object):
    __metaclass__ = abc.ABCMeta

    default_ingredients = ['cheese']

    @classmethod
    @abc.abstractmethod
    def get_ingredients(self):
        """Return the ingredient list."""


class Calzone(BasePizza):
    def get_ingredients(self, with_egg=False):
        egg = Egg() if with_egg else None
        return self.ingredients + [egg]


class DietPizza(BasePizza):
    @staticmethod
    def get_ingredients():
        return None

class DietPizzax1(BasePizza):
    def get_ingredients():
        return [Egg()] + super(DietPizza, self).get_ingredients()


def parent():
    return object


class A(parent()):
    pass


if __name__ == "__main__":
    A.mro() # method resolution order
