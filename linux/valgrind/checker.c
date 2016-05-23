#include <stdio.h>
#include <stdlib.h>

int main()
{
    char *ptr = (char *) malloc(1024);
    char ch;

    ch = ptr[1024];
    ptr[1024] = 0;

    ptr = 0;
    exit(0);
}
