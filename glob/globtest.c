#include <glob.h>
#include <stdio.h>
#include <unistd.h>

int
main() {
	glob_t globbuf;
	int x = glob("*test.c", GLOB_NOSORT, NULL, &globbuf);
	printf("%d     %d\n", globbuf.gl_pathc, x);
	printf("%s\n", globbuf.gl_pathv[0]);
	printf("hello world\n\n\n");
	x = glob("*.c", GLOB_NOSORT, NULL, &globbuf);
	printf("%d     %d\n", globbuf.gl_pathc, x);
	printf("%s\n", globbuf.gl_pathv[0]);
	printf("hello world\n");
	return 0;
}