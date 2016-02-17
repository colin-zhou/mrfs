#include <stdio.h>
#include <string.h>
#include <stdlib.h>

int cc[27];
char ret[27];

char
fetch_first_smallest(int vv[27], char *str)
{
    if(str == NULL || *str == '\0') {
        return 'z';
    } else {
        int idx = *str - 'a';
        if (vv[idx] == 1) {
            return *str;
        } else if (vv[idx] == 0) {
            return fetch_first_smallest(vv, str+1);
        } else {
            char one = *str;
            vv[idx]--;
            char two = fetch_first_smallest(vv, str+1);
            return one>two?two:one;
        }
    }
}

char* 
removeDuplicateLetters(char* s) {
    memset(cc, 0, sizeof(cc));
    int i, ti, j = 0;
    char *ts = s;
    while(*ts != '\0') {
        ti = *ts - 'a';
        cc[ti]++;
        ts++;
    }
    ts = s;
    while(*ts != '\0') {
        ti = *ts - 'a';
        if (cc[ti] == 1 || (ti == 0 && cc[ti] != 0)) {
            ret[j++] = *ts;
            cc[ti] = 0;
        } else if (cc[ti] > 1) {
            int tcc[27];
            memcpy(tcc, cc, 27 * sizeof(int));
            tcc[ti]--;
            if(fetch_first_smallest(tcc, ts+1) < *ts ) {
                cc[ti]--;
            } else {
                ret[j++] = *ts;
                cc[ti] = 0;
            }
        }
        ts++;
    }
    ret[j] = '\0';
    return ret;
}

int main()
{
    char *t = "abacb";
    printf("%s\n",removeDuplicateLetters(t));
    return 0;
}
