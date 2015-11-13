#include <Python.h>
#include <pthread.h>
#include <string.h>

#define NUM_ARGUMENTS 3
typedef struct
{
   char *argv[NUM_ARGUMENTS];
} CMD_LINE_STRUCT;

static void*
py_agent_thread(void *data)
{
	// CMD_LINE_STRUCT* arg = (CMD_LINE_STRUCT*)data;
	// PyObject *pName, *pModule, *pDict, *pFunc, *pInstance;
	// char prefix[] = "sys.path.append('";
	// char suffix[] = "')";
	// int error_flag = 0;
	// do {
	// 	Py_Initialize();
	// 	if (!Py_IsInitialized()) {
	// 		error_flag = 1;
	// 		break;
	// 	}
	// 	if (arg->argv[1] == NULL || arg->argv[0] == NULL) {
	// 		error_flag = 2;
	// 		fprintf(stderr, "input parameters error\n");
	// 		break;
	// 	}
	// 	char *path;
	// 	if (arg->argv[2] != NULL) {
	// 	    strcat(prefix, arg->argv[2]);
	// 	} else {
	// 	    strcat(prefix, "./");
	// 	}
	// 	strcat(prefix, suffix);
	// 	path = prefix;
	// 	strcat(path, "')");
	// 	strcat(prefix, path);
	// 	PyRun_SimpleString("import sys");
	// 	PyRun_SimpleString(path); // run sys.path.append('./') by default
	// 	pName = PyString_FromString(arg->argv[0]);
	// 	if (pName == NULL) {
	// 		error_flag = 1;
	// 		break;
	// 	}
	// 	pModule = PyImport_Import(pName);
	// 	if (pModule == NULL)
	// 	{
	// 		error_flag = 1;
	// 		break;
	// 	}
	// 	pDict = PyModule_GetDict(pModule);
	// 	if (pDict == NULL) {
	// 		error_flag = 1;
	// 		break;
	// 	}

	// 	pFunc = PyDict_GetItemString(pDict, arg->argv[1]);
	// 	if (pFunc == NULL || !PyCallable_Check(pFunc))
	// 	{
	// 		error_flag = 1;
	// 		break;
	// 	}
	// 	pInstance = PyObject_CallObject(pFunc, NULL);
	// 	if (pInstance == NULL)
	// 	{
	// 		error_flag = 1;
	// 		break;
	// 	}
	// } while(0);
	// if (pModule) {
	// 	Py_DECREF(pModule);
	// }
	// if (pName) {
	// 	Py_DECREF(pName);
	// }
	// if (error_flag == 0) {
	// 	PyErr_Print();
	// }
	// Py_Finalize();
	// printf("Child thread in C finished. \n");
	// pthread_exit(NULL);
}

int
start_py_agent()
{
	// CMD_LINE_STRUCT msg_pt;
	// pthread_t id;
	// msg_pt.argv[0] = "agent";           // module
	// msg_pt.argv[1] = "start_py_agent";  // function
	// msg_pt.argv[2] = "../agent/";       // path
	// pthread_create(&id, NULL, py_agent_thread, &msg_pt);
	// pthread_detach(id);
	return 0;
}