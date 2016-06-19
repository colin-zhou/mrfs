#include <stdio.h>

int main()
{
	int i = 3, j = 9, x, y;
	x = --i, y = j++;
	printf("%4d,%d,%3d,%d\n", i,j,x,y);
	return 0;
}
