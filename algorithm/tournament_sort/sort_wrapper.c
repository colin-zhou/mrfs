#include <Python.h>
#include "merge_sort.h"

#pragma GCC visibility push(default)
PyMODINIT_FUNC PyInit_quote_sorter(void);
#pragma GCC visibility pop

#define  NPY_NO_DEPRECATED_API NPY_1_7_API_VERSION
#include "numpy/arrayobject.h"

static void *_data[MAX_CHANNEL_CNT];
static channel_data_t _buf[MAX_CHANNEL_CNT];
static PyObject *input_source[MAX_CHANNEL_CNT];

/**
 * tuple(0) - a list of quote data, each include the header, item_size, size
              [(quote, item_size, size), ...]
 * tuple(1) - a int type of value to identify sort method @see SORT_METHOD
 */
static PyObject *
py_load_quote(PyObject *self, PyObject *args)
{
    int i, size, sort_method;
    int q_itemsize, q_size;
    PyObject *q_list;
    PyObject *q_tuple;
    PyObject *quote;

    if (!PyArg_ParseTuple(args, "OI:load_quote", &q_list, &sort_method)) {
        PyErr_Format(PyExc_TypeError, "load quote: Parameters mismatch.");
        return NULL;
    }

    size = PyList_Size(q_list);
    if (!PyList_Check(q_list) || size  == 0) {
        PyErr_Format(PyExc_TypeError, "load quote: quote source can't be empty.");
        return NULL;
    }
    for (i = 0; i < size; i++) {
        // parse list item
        q_tuple = PyList_GetItem(q_list, i);
        // parse data in tuple
        quote = PyTuple_GetItem(q_tuple, 0);
        q_itemsize = PyLong_AsLong(PyTuple_GetItem(q_tuple, 1));
        q_size = PyLong_AsLong(PyTuple_GetItem(q_tuple, 2));
        input_source[i] = quote;

        _buf[i].data = (common_quote_t *)PyArray_DATA((PyArrayObject *)quote);
        _buf[i].itemsize = q_itemsize;
        _buf[i].size = q_size;
        _data[i] = &_buf[i];
    }
    load_quote_c(_data, size, sort_method);
    return PyLong_FromLong(0);
}

static PyObject *
py_pop_tick(PyObject *self, PyObject *args)
{
    uint64_t res;
    uint32_t row, col;
    while ((res = pop_tick()) != REACH_END) {
        row = decode_tick_row(res);
        col = decode_tick_col(res);
        return Py_BuildValue("(OI)", input_source[col], row);
    }
    return Py_None;
}

char doc_load_quote[] = "load origin np.array quote interface";
char doc_pop_tick[] = "pop quote by target sort method";

static PyMethodDef my_qs_exposed_methods[] = {
    {"load_quote", (PyCFunction)py_load_quote, METH_VARARGS, doc_load_quote},
    {"pop_tick", (PyCFunction)py_pop_tick, METH_VARARGS, doc_pop_tick},
    {NULL, NULL, 0, NULL}   /* sentinel */
};

static struct PyModuleDef my_qs_module = {
    PyModuleDef_HEAD_INIT,
    "quote_sorter",
    NULL,
    -1,
    my_qs_exposed_methods,
    NULL, NULL, NULL, NULL
};

PyMODINIT_FUNC
PyInit_quote_sorter(void)
{
    PyObject *m;
    import_array();
    m = PyModule_Create(&my_qs_module);
    if (m == NULL) {
        return NULL;
    }
    Py_INCREF(PyExc_OSError);
    PyModule_AddObject(m, "error", PyExc_OSError);
    return m;
}
