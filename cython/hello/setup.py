from distutils.core import setup
from Cython.Build import cythonize

setup(
        name='calc app',
        ext_modules = cythonize("helloworld.pyx"),
)
