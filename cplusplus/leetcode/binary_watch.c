/**
 * Return an array of size *returnSize.
 * Note: The returned array must be malloced, assume caller calls free().
 */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>


int hour_list[12], idx, a, hour_max = 11, hour_exist[12];
int mins_list[60], idy, b, mins_max = 59, mins_exist[60];


void enumValue(int n, int max_value, int *lidx, int len, int *exist, int *tmp, int *res)
{
    if (n == 0) {
        if (*tmp <= max_value && *tmp >= 0 && exist[*tmp] == 0) {
            exist[*tmp] = 1;
            res[*lidx] = *tmp;
            *lidx += 1;
        }
        return; 
    }
    int i, t;
    for (i = 0; i < len; i++) {
        t = 1 << i;
        if (*tmp & t) {
            continue;
        }
        *tmp |= t;
        enumValue(n - 1, max_value, lidx, len, exist, tmp, res);
        *tmp &= ~t;
    }
}

void genValue(int m, int n, char **ret, int *num)
{
    if (m < 0 || m > 3 || n > 5 || n < 0) {
        return;
    }
    int i, j;
    idx = 0; a = 0;
    bzero(hour_exist, sizeof(int) * 12);
    enumValue(m, hour_max, &idx, 4, hour_exist, &a, hour_list);
    idy = 0; b = 0;
    bzero(mins_exist, sizeof(int) * 60);
    enumValue(n, mins_max, &idy, 6, mins_exist, &b, mins_list);
    for (i = 0; i < idx; i++) {
        for (j = 0; j < idy; j++) {
            char *item = (char *)malloc(8);
            snprintf(item, 8, "%d:%02d", hour_list[i], mins_list[j]);
            ret[*num] = item;
            // printf("addr= %d, *num = %d value=%s\n", ret[*num], *num, ret[*num]);
            *num += 1;
        }
    }
}

char** readBinaryWatch(int num, int* returnSize) {
    char **ret = (char **)malloc(1000);
    *returnSize = 0;
    int i, j;
    for (i = 0; i <= num; i++) {
        for (j = 0; j <= num; j++) {
            if (i + j == num) {
                genValue(i, j, ret, returnSize);
            }
        }
    }
    return ret;
}
int main()
{
    int a, i;
    char **t = readBinaryWatch(1, &a);
    for (i = 0; i < a;  i++) {
        printf("%s\n", t[i]);
    }
    return 0;
}
