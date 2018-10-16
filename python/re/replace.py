# encoding: utf-8


import re


def abstract_things(x):
    # not one word
    patten = r'\W+'
    return re.split(patten, x)


if __name__ == "__main__":
    x = 'abc      \t   adf \t sdfjk'
    print(abstract_things(x))
