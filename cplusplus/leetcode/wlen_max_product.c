#include <stdio.h>
#include <stdlib.h>

int hashval[10000];
int lensval[10000];

void
hashstring(char *t, int *v, int *l)
{
    int n;
    *v = 0;
    int c = 0;
    while(*t != '\0') {
        n = *t - 'a';
        *v = *v | (1 << n);
        t++;
        c++;
    }
    *l = c;
}
int maxProduct(char** words, int wordsSize) {
    int i, j;
    for (i = 0; i < wordsSize; i++) {
        hashstring(words[i],&(hashval[i]),&(lensval[i]));
    }
    int max = 0, tpro;
    for (i = 0; i < wordsSize; i++) {
        for(j = i+1; j < wordsSize; j++) {
            if (!(hashval[i] & hashval[j])) {           
                tpro = lensval[i] * lensval[j];
                max = max > tpro? max : tpro;
            }
        }
    }
    return max;
}
int main()
{
    char *t[] = {"ab","cd","ef","igk","aaa"};
    printf("%d\n", maxProduct(t, 5));
    return 0;
}
