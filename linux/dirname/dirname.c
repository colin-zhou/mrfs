#include <libgen.h>
#include <stdio.h>

int main()
{
    char x[] = "/usr/get/abc/";
    printf("%s\n", dirname(x));
    printf("%s\n", x);
    return 0;
}
