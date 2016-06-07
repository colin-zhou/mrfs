#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char* l_strcat(const char *a, const char *b)
{
    int lena = strlen(a), lenb = strlen(b);
    int h = lena + lenb + 1;
    char *ret = (char *)malloc(h * sizeof(char));
    if (ret == NULL) {
        printf("failed to malloc");
    }
    size_t i = 0, j = 0;
    while (i < lena) {
        // 计算从右到左边
        ret[i] = a[i];
        i++;
    }
    while (j < lenb)
        // 如果只有一个变量i的话，那么i++应该写在左边
        ret[i++] = b[j++];
    ret[i] = '\0';
    return ret;
}

int main(int argc, char *argv[])
{
    const char *a = "abcdef";
    const char *b = "mn";
    char *out = l_strcat(a, b);
    int i = 0;
    printf("%s\n", out);
    free(out);
    return 0;
}
