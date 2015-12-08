#include <glob.h>
#include <stdio.h>
#include <unistd.h>

int
main() {
	glob_t globbuf;
	char *s = "*test.c";
	int x = glob(s, GLOB_NOSORT, NULL, &globbuf);
	printf("%d     %d\n", globbuf.gl_pathc, x);
	printf("%s\n", globbuf.gl_pathv[0]);
	printf("hello world\n\n\n");

	char *y = "*.c";
	x = glob(y, GLOB_NOSORT, NULL, &globbuf);
	printf("%d     %d\n", globbuf.gl_pathc, x);
	printf("%s\n", globbuf.gl_pathv[0]);
	printf("hello world\n");
	return 0;
}