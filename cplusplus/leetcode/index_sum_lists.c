#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int findIndex(char **list, int size, char *t)
{
    for(int i = 0; i < size; i++) {
        if (strcmp(t, list[i]) == 0) {
            return i;
        }
    }
    return -1;
}

struct middle_ans {
    int idxsum;
    char *str;
};

int cmpMethod(const void *a, const void *b)
{
    struct middle_ans *t1 = (struct middle_ans *)a;
    struct middle_ans *t2 = (struct middle_ans *)b;
    return t1->idxsum - t2->idxsum;
}

char** findRestaurant(char** list1, int list1Size, char** list2, int list2Size, int* returnSize) {
    char **longs, **shorts;
    int longSize, shortSize;
    struct middle_ans ha[1000];
    int findidx = 0;
    char **ret = (char **)malloc(sizeof(char *) * 1000);
    if (list1Size > list2Size) {
        longs = list1;
        shorts = list2;
        longSize = list1Size;
        shortSize = list2Size;
    } else {
        longs = list2;
        shorts = list1;
        longSize = list2Size;
        shortSize = list1Size;
    }
    for (int i = 0; i < shortSize; i++) {
        char *t = shorts[i];
        int idx = findIndex(longs, longSize, t);
        printf("str: %s, idx = %d\n", t, idx);
        if (idx != -1) {
            ha[findidx].idxsum = idx+i;
            ha[findidx].str = t;
            findidx++;
        }
    }
    qsort(ha, findidx, sizeof(struct middle_ans), cmpMethod);
    *returnSize = 1;
    ret[0] = ha[0].str;
    int tsum = ha[0].idxsum;
    for (int i = 1; i < findidx; i++) {
        if (tsum == ha[i].idxsum) {
            ret[(*returnSize)++] = ha[i].str;
        } else {
            break;
        }
    }
    printf("string: %s\n", ret[0]);
    return ret;
}

int main()
{
    char *a1[] = {"Shogun","Tapioca Express","Burger King","KFC"};
    char *a2[] = {"Piatti","The Grill at Torrey Pines","Hungry Hunter Steakhouse","Shogun"};
    int cnt;
    findRestaurant(a1, 4, a2, 4, &cnt);
    printf("cnt: %d\n", cnt);
    return 0;
}
