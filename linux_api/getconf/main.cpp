#include <unistd.h>
#include <stdio.h>


int main()
{
    long num1 = sysconf(_SC_NPROCESSORS_CONF);
    long num2 = sysconf(_SC_NPROCESSORS_ONLN);

    printf("%ld %ld\n", num1,num2);
    printf("lenlong= %d, lenint=%d\n", sizeof(long), sizeof(int));

    long x = 100;
    int m = x;
    printf("origx = %ld, passed = %d\n", x, m);
    return 0;
}
