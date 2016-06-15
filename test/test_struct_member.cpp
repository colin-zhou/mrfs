#include <stdio.h>

struct test{
    char heh[10];
    int m;
};

int main()
{
    printf("%d", sizeof(test.heh));
    return 0;
}
