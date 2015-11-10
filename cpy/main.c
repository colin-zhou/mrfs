#include <Python.h>
#include <stdio.h>

int
main()
{
	// initial the interpreter
	Py_Initialize();
	if (!Py_IsInitialized()) {
		return -1;
	}
	// import the sys module
	PyRun_SimpleString("import sys");
	// add the current path to sys.path
	PyRun_SimpleString("sys.path.append('./')");

	PyObject * pModule = NULL;
	PyObject * pFunc = NULL;
	PyObject * pName = NULL;
	PyObject * pModule1 = NULL;
	PyObject * pFunc1 = NULL;
	PyObject * pDict = NULL;
	PyObject * pArgs = NULL;

	pName = PyString_FromString("pytest");
	pModule1 = PyImport_Import(pName);
	if (!pModule1) {
		printf("can't find pytest.py");
		getchar();
		return -1;
	}
	pDict = PyModule_GetDict(pModule1);
	if (!pDict) {
		return -1;
	}
	pFunc1 = PyDict_GetItemString(pDict, "add");
	if (!pFunc1 || !PyCallable_Check(pFunc1)) {
		printf("can't find function [add]");
		getchar();
		return -1;
	}
	// create a Tuple(2)
	pArgs = PyTuple_New(2);
	// create long int and make Tumple points it
	PyTuple_SetItem(pArgs, 0, Py_BuildValue("l", 3));
	PyTuple_SetItem(pArgs, 1, Py_BuildValue("l", 4));
	// call a function with parameters
	PyObject_CallObject(pFunc1, pArgs);
	// reuse the pFunc1 parameter
	pFunc1 = PyDict_GetItemString(pDict, "foo");
	if(!pFunc1 || !PyCallable_Check(pFunc1)) {
		printf("can't find function [foo]");
		getchar();
		return -1;
	}
	pArgs = PyTuple_New(1);
	PyTuple_SetItem(pArgs, 0, Py_BuildValue("l", 2));
	PyObject_CallObject(pFunc1, pArgs);
	// a another way to import a module
	pModule = PyImport_ImportModule("helloworld");
	// find a function in a module
	pFunc = PyObject_GetAttrString(pModule, "hello");
	// call the function
	PyEval_CallObject(pFunc, NULL);

	// free the memory
	Py_DECREF(pName);
	Py_DECREF(pArgs);
	Py_DECREF(pModule1);
	Py_DECREF(pModule);
	// close python, release the resource
	Py_Finalize();

	return 0;
}