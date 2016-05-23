#include <stdio.h>
#include <string.h>


int main()
{
    char home[] = "/home/dev";
    char path[] = "~/test/abc.c";
    char tmp[256];
    int len = strlen(home);
    char result[256];
    int lenpath = strlen(path);
    strncpy(tmp, home, len);
    strncpy(&tmp[len],&path[1], lenpath+1);
    strncpy(result, tmp, len+lenpath+1);
    printf("result=%s\n", result);
    return 0;
}
