#include <stdio.h>
#include <string.h>
#include <stdlib.h>

void test1()
{
    char tokenstring[] = "12,3,,123,adfa";
    char *it;
    it = strtok(tokenstring, ",");
    while (it != NULL) {
        printf("it: %s, what!!!!\n", it);
        it = strtok(NULL, ",");
    }
    if (it)
        free(it);
}

void test2()
{
    char tokenstring[] = "12,3,4,5,aaa,,";
    char *it = tokenstring;
    do {
        int l = strcspn(it, ",");
        printf("the l is %d\n", l);
        printf("\"%.*s\"\n", l, it);
        it += l;
    } while (*it++);
}

int main()
{
    test2();
    return 0;
}
