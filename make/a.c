#include <stdio.h>
#include <stdlib.h>


extern int shared;
int xacabc = 100;
int main()
{
    printf("%d\n", xacabc);
	int a = 100;
	swap ( &a, &shared );
}
