#include <stdio.h>

void a()
{
	char *p = NULL;
	printf("%d\n", *p);
}

int main()
{
	a();
	return 0;
}
