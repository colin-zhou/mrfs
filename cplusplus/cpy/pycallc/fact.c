#include <Python.h>

int fact(int n)
{
	if (n <= 1)
		return 1;
	else
		return n * fact(n - 1);
}

PyObject * wrap_fact(PyObject* self, PyObject* args)
{
	int n, result;
	/* a complex, also providing a function name for errors */
	if ( !PyArg_ParseTuple(args, "i:fact", &n))
		return NULL;
	result = fact(n);
	// return to int type object
	return Py_BuildValue("i", result);
}

static PyMethodDef exampleMethods[] =
{
	// When using only METH_VARARGS, the function should expect the
	// Python-level parameters to be passed in as a tuple acceptable
	// for parsing via PyArg_ParseTuple();
	{"fact", wrap_fact, METH_VARARGS, "Caculate N!"},
	{NULL, NULL}
};

// extern "C" for cpp file compiled with g++
void initexample()
{
	PyObject* m;
	m = Py_InitModule("example", exampleMethods);
}
