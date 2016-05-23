#include <stdio.h>
#include <stdlib.h>

int main()
{
    printf("Running ps with system\n");
    system("ps aux &");
    printf("Done.\n");
    exit(0);
}
