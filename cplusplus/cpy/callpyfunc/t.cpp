#include <iostream>
#include <Python.h>
#include <stdlib.h>
#include "quote.h"

#define MY_PY_MOD "mymod"
#define MY_PY_FUNC "calc_func"

using std::cout;
using std::endl;
using std::cerr;

typedef struct _mod_ctx {
    PyObject *stock_type;
    PyObject *future_type;
    PyObject *p_name;
    PyObject *p_module;
    PyObject *p_func;
    PyObject *p_args1;
    PyObject *p_args2;
    PyObject *p_memview1;
    PyObject *p_memview2;
} py_mod_ctx_t;

static my_stock_t           s;  // stock
static my_futures_spot_t    f;  // future
static py_mod_ctx_t         ctx_;

int start_py()
{
    setenv("PYTHONPATH", "./", 1);
    const char *version = Py_GetVersion();
    cout << "Python Version: " << endl << version << endl << endl;
    if (!Py_IsInitialized()) {
        Py_Initialize();
        cout << "initialize" << endl;
    }
    do {
        if (ctx_.p_name == NULL) {
            //PyRun_SimpleString("import sys;print(sys.path)");
            //PyRun_SimpleString("import mymod;");
            int ret;
            ctx_.p_name = PyUnicode_FromString(MY_PY_MOD);
            ctx_.p_module = PyImport_Import(ctx_.p_name);
            ctx_.future_type = PyLong_FromLong((long)FUTURE_TYPE);
            ctx_.stock_type = PyLong_FromLong((long)STOCK_TYPE);
            if (ctx_.p_module != NULL) {
                ctx_.p_func = PyObject_GetAttrString(ctx_.p_module, MY_PY_FUNC);
                if (!ctx_.p_func) {
                    cerr << "function " MY_PY_FUNC "not found" << endl;
                    break;
                }
                if(!PyCallable_Check(ctx_.p_func)) {
                    cerr << "function " MY_PY_FUNC " not callable"<< endl;
                    break;
                }
                ctx_.p_args1 = PyTuple_New(2);
                if (!ctx_.p_args1) {
                    cerr << "build tuple args1 failed" << endl;
                    break;
                }
                ctx_.p_args2 = PyTuple_New(2);
                if (!ctx_.p_args2) {
                    cerr << "build tuple args2 failed" << endl;
                    break;
                }
                ctx_.p_memview1 = PyMemoryView_FromMemory((char *)&f, sizeof(my_futures_spot_t), 'C');
                if (!ctx_.p_memview1) {
                    cerr << "memoryview1 mapping failed" << endl;
                    break;
                }
                ctx_.p_memview2 = PyMemoryView_FromMemory((char *)&f, sizeof(my_stock_t), 'C');
                if (!ctx_.p_memview2) {
                    cerr << "memoryview2 mapping failed" << endl;
                    break;
                }
#define TUPLE_SETITEM(target, idx, data)                                       \
        ret = PyTuple_SetItem(ctx_.target, idx, data);                         \
        if (ret != 0) {                                                        \
            cerr << "tuple set item" #target "of idx " #idx " failed" << endl; \
            break;                                                             \
        }
                TUPLE_SETITEM(p_args1, 0, ctx_.future_type)
                TUPLE_SETITEM(p_args1, 1, ctx_.p_memview1)
                TUPLE_SETITEM(p_args2, 0, ctx_.stock_type)
                TUPLE_SETITEM(p_args2, 1, ctx_.p_memview2)
                return 0;
            }
        }
    } while (0);
    if (PyErr_Occurred()) {
        PyErr_Print();
    }
    return -1;
}


void exit_py()
{
    if (Py_IsInitialized()) {
#define DECREF_FIELD(name)         \
    if (ctx_.name) {               \
        Py_DECREF(ctx_.name);      \
        ctx_.name = NULL;          \
    }
        DECREF_FIELD(stock_type)
        DECREF_FIELD(future_type)
        DECREF_FIELD(p_name)
        DECREF_FIELD(p_module)
        DECREF_FIELD(p_func)
        DECREF_FIELD(p_args1)
        DECREF_FIELD(p_args2)
        DECREF_FIELD(p_memview1)
        DECREF_FIELD(p_memview2)
        Py_Finalize();
        cout << "finalize" << endl;
    }
}

void call_py_func(int quote_type)
{
    PyObject *ret;
    if (quote_type == FUTURE_TYPE) {
        // feed future
        ret = PyObject_CallObject(ctx_.p_func, ctx_.p_args1);
    } else {
        // feed stock
        ret = PyObject_CallObject(ctx_.p_func, ctx_.p_args2);
    }
    if (ret != Py_None) {
        double value = PyFloat_AS_DOUBLE(ret);
        cout << "the return value is " << value << endl;
    } else {
        cout << "return None" << std::endl;
    }
}

int main()
{
    int ret = start_py();
    if (ret != 0) {
        cerr << "load func failed" << endl;
        exit(-1);
    }
    strcpy(s.ticker, "000001");
    strcpy(f.symbol, "rb1912");
    for (int i = 0; i < 10; i++) {
        if (i % 2 == 0) {
            f.int_time = 90000000 + i;
            call_py_func(FUTURE_TYPE);
        } else {
            s.exch_time = 9000000 + i;
            call_py_func(STOCK_TYPE);
        }
    }
    exit_py();
    return 0;
}
