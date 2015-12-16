#include <stdio.h>
#include <string.h>
#include <stdlib.h>

int cc[27];
char ret[30];
int next_must_exist(char *x, int cc[27]) {
    int ti = *x - 'a';
    if(cc[ti] == 1) {
        return ti;
    } else {
        
        int small = ti;
        int tc = next_must_exist(x+1, cc);
    }

}

int smallerExist(int n, char x) {
    int i;
    if (x != '\0') {
        i = x-'a';
        if (cc[i] == 1 && i > n) {
            return 0;
        }
    }
    for(i = 0; i < n; i++) {
        if(cc[i])
            return 1;
    }
    return 0;
}
char* removeDuplicateLetters(char* s) {
    s = deletedupnear(s);
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
        if (cc[ti] == 1) {
            ret[j++] = *ts;
            cc[ti]--;
        } else if (cc[ti] > 1) {
            if(smallerExist(ti, *(ts+1))) {
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
    char *t = "bccab";
    printf("%s\n",removeDuplicateLetters(t));
    return 0;
}