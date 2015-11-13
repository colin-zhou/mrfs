/**
 * create a pthread, in the thread call a python threading.Thread
 */

#include <Python.h>
#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>

pthread_t thread1;
// thread2, thread3;

void*
ThreadProc1(void*);
// void
// ThreadProc2(void*);
// void
// ThreadProc3(void*);


#define NUM_ARGUMENTS 2
typedef struct 
{
   char *argv[NUM_ARGUMENTS]; 
} CMD_LINE_STRUCT;


int
main(int argc, char *argv[])
{
	CMD_LINE_STRUCT msg_pt1, msg_pt2, msg_pt3;
	msg_pt1.argv[0] = "py_thread";
	msg_pt1.argv[1] = "createthread";

	pthread_create(&thread1, NULL, ThreadProc1, &msg_pt1);
	// pthread_create(&thread2, NULL, ThreadProc2, &msg_pt2);
	// pthread_create(&thread3, NULL, ThreadProc3, &msg_pt3);
	
	pthread_join(thread1, NULL);
	// pthread_join(thread2, NULL);
	// pthread_join(thread3, NULL);
	printf("Main thread finished gracefully. \n");
	return 0;
}

void*
ThreadProc1(void *data)
{
	CMD_LINE_STRUCT* arg = (CMD_LINE_STRUCT*)data;
	PyObject *pName, *pModule, *pDict, *pFunc, *pInstance;
	int error_flag = 0;
	do {
		Py_Initialize();
		if (!Py_IsInitialized()) {
			error_flag = 1;
			break;
		}
		if (arg->argv[1] == NULL || arg->argv[0] == NULL) {
			error_flag = 2;
			fprintf(stderr, "input parameters error\n");
			break;
		}
		PyRun_SimpleString("import sys");
		PyRun_SimpleString("sys.path.append('./')");
		pName = PyString_FromString(arg->argv[0]);
		if (pName == NULL) {
			error_flag = 1;
			break;
		}
		pModule = PyImport_Import(pName);
		if (pModule == NULL) 
		{
			error_flag = 1;
			break;
		}
		pDict = PyModule_GetDict(pModule);
		if (pDict == NULL) {
			error_flag = 1;
			break;
		}

		pFunc = PyDict_GetItemString(pDict, arg->argv[1]);
		if (pFunc == NULL || !PyCallable_Check(pFunc))
		{
			error_flag = 1;
			break;
		}
		pInstance = PyObject_CallObject(pFunc, NULL);
		if (pInstance == NULL)
		{
			error_flag = 1;
			break;
		}
	} while(0);
	if (pModule) {
		Py_DECREF(pModule);
	}
	if (pName) {
		Py_DECREF(pName);
	}
	if (error_flag == 0) {
		PyErr_Print();
	}
	Py_Finalize();
	printf("Child thread in C finished. \n");
	pthread_exit(NULL);
}
