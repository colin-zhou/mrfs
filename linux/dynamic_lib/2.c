#include <dlfcn.h>
#include <stdio.h>


const char *file="./1.so";
typedef void(*func_t)(void);

int main()
{
	void *hdl = dlopen(file, RTLD_LAZY);
	if (hdl == NULL) {
		printf("file not found\n");
		return 0;
	}
	void *test = dlsym(hdl, "do_test");
	if (test == NULL) {
		printf("func not found\n");
		return 0;
	}
	func_t x = (func_t) test;
	x();
	dlclose(hdl);
	return 0;
}
