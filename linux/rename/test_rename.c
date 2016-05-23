#include <stdio.h>

int main()
{
	char *oldpath = "/home/rss/test100";
	char *newpath = "/home/rss/hehe/test100";
	int ret = rename(oldpath, newpath);
	printf("ret = %d\n",ret);
	return 0;
}