#include <stdio.h>
#include <string.h>

void reverseWorker(char *s, int len)
{
    int i;
    for(i = 0; i < len; i++)
    {
        char t = s[i];
        printf("i=%d, len-i-1=%d\n", i, len-i-1);
        s[i] = s[len-i-1];
        s[len-i-1] = t;
        printf("swap c1 = %c, c2 = %c\n", s[i], s[len-i-1]);
    }
    printf("s = %s\n", s);
}
char* reverseStr(char* s, int k) {
    int len = strlen(s);
    int reverse_times = len / k;
    int i;
    for(i = 0; i < reverse_times; i++) {
        printf("i*k=%d\n", i*k);
        reverseWorker(&(s[i*k]), k);
    }
    return s;
}

int main()
{
    char a[] = "abc";
    reverseStr(a, 2);
    printf("%s\n", a);
}
