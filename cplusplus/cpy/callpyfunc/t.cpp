#include <iostream>
#include <Python.h>
#include <stdlib.h>

#define MY_PY_MOD "mymod"
#define MY_PY_FUNC "calc_func"

using std::cout;
using std::endl;
using std::cerr;

typedef struct _quote {
    char symbol[32];
    int exch_time;
} quote_t;

typedef struct _mod_ctx {
    PyObject *p_name;
    PyObject *p_module;
    PyObject *p_func;
    PyObject *p_args;
    PyObject *memview;
} py_mod_ctx_t;

static quote_t q;
static py_mod_ctx_t ctx_;

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
            ctx_.p_name = PyUnicode_FromString(MY_PY_MOD);
            ctx_.p_module = PyImport_Import(ctx_.p_name);
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
                ctx_.p_args = PyTuple_New(1);
                if (!ctx_.p_args) {
                    cerr << "build tuple args failed" << endl;
                    break;
                }
                ctx_.memview = PyMemoryView_FromMemory((char *)&q, sizeof(quote_t), 'C'); 
                if (!ctx_.memview) {
                    cerr << "memoryview mapping failed" << endl;
                    break;
                }
                int ret = PyTuple_SetItem(ctx_.p_args, 0, ctx_.memview);
                if (ret != 0) {
                    cerr << "tuple set item failed" << endl;
                    break;
                }
                return 0;
            }
        }
    } while (0);
    if (PyErr_Occurred()) {
        PyErr_Print();
    }
    return -1;
}

#define DECREF_FIELD(name)         \
    if (ctx_.name) {               \
        Py_DECREF(ctx_.name);      \
        ctx_.name = NULL;          \
    }

void exit_py()
{
    if (Py_IsInitialized()) {
        DECREF_FIELD(p_name)
        DECREF_FIELD(p_module)
        DECREF_FIELD(p_func)
        DECREF_FIELD(p_args)
        DECREF_FIELD(memview)
        Py_Finalize();
        cout << "finalize" << endl;
    }
}

void call_py_func()
{
    PyObject *ret = PyObject_CallObject(ctx_.p_func, ctx_.p_args);
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
    strcpy(q.symbol, "rb1912");
    for (int i = 0; i < 10; i++) {
        cout << i << endl;
        q.exch_time = 90000000 + i;
        call_py_func();
    }
    exit_py();
    return 0;
}
