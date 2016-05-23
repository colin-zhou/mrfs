#include <stdio.h>
#include <unistd.h>


int main()
{
	if(access("./file.test", F_OK) != -1) {
		printf("relative find success\n");
	} else {
		printf("relative path can't find\n");
	}
	if(access("/home/colin/Git/reserve/linux_api/access/file.test", F_OK) != -1) {
		printf("ablsolute file exist");
	} else {
		printf("absolute file not exist");	
	}
	int ret = rename("./file.test", "/home/colin/mytest.test");
	if (ret != 0) {
		printf("rename file success\n");
	}
	return 0;
}
