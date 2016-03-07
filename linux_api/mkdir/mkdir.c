#include <sys/types.h>
#include <sys/stat.h>
#include <unistd.h>
#include <stdio.h>

int 
main() {
	struct stat st = {0};
	if (stat("/home/rss/mytest", &st) == -1) {
    		int ret = mkdir("/home/rss/mytest", 0700);
    		printf("the ret = %d\n", ret);
	} else {
		printf("path exist\n");
	}
	return 0;
}
