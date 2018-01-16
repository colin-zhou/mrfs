
#define PYTHON_EXCEPTION_HANDLE do {                                                        \
    if (PyErr_Occurred()) {                                                                 \
        char buf[LOG_BUF_SIZE] = {0};                                                       \
        char line[LOG_LINE_SIZE] = {0};                                                     \
        PyObject *ptype, *pvalue, *ptraceback;                                              \
        PyErr_Fetch(&ptype, &pvalue, &ptraceback);                                          \
        snprintf(buf, LOG_BUF_SIZE, "============Exception trace============\n%s:%s\n"      \
                    "Traceback (most recent call last):\n", PyExceptionClass_Name(ptype),   \
                    PyUnicode_AsUTF8(pvalue));                                              \
        for (PyTracebackObject *tb = (PyTracebackObject *)ptraceback; tb != NULL; tb = tb->tb_next) {\
            snprintf(line, LOG_LINE_SIZE, "File \"%.500s\", line %d, in %.500s\n",          \
                    PyUnicode_AsUTF8(tb->tb_frame->f_code->co_filename), tb->tb_lineno,     \
                    PyUnicode_AsUTF8(tb->tb_frame->f_code->co_name));                       \
            line[LOG_LINE_SIZE-1] = 0;                                                      \
            int n = LOG_BUF_SIZE - strlen(line) - 1;                                        \
            if (n <= 0) {                                                                   \
                buf[LOG_BUF_SIZE-1] = 0;                                                    \
                break;                                                                      \
            }                                                                               \
            strncat(buf, line, n);                                                          \
        }                                                                                   \
        printf("%s", buf);                                                                  \
        SEND_INFO_FUNCTION(S_STRATEGY_ABORT_INFO, strlen(buf), buf);                        \
        Py_XDECREF(ptype);                                                                  \
        Py_XDECREF(pvalue);                                                                 \
        Py_XDECREF(ptraceback);                                                             \
    }\
}   while(0)
