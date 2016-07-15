#include <stdio.h>
#include <stdlib.h>


int main()
{
    char x[] = "12345";
    char y[] = "bic";
    char z[100];
    z[0] = '1';
    z[1] = '2';
    z[2] = '3';

    printf("%d %d\n", atoi(x), atoi(y));
    printf("%d\n", atoi(z));
    // 12345, 0
    // 错误即返回0
    return 0;
}
