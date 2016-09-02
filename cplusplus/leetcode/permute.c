#include <stdio.h>

void print_array(int *num, int len)
{
    int idx;
    for (idx = 0; idx < len; idx++) {
        printf("%d ", num[idx]);
    }
    printf("\n");
}

void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

void permute(int *num, int i, int len)
{
    if (i == len) {
       print_array(num, len); 
       return;
    }
    int j;
    for (j = i; j < len; j++) {
       swap(&num[i], &num[j]); 
       permute(num, i+1, len);
       swap(&num[i], &num[j]);
    }
}


int main()
{
    int a[] = {1,2,3,4,5};
    permute(a, 0, 5);
    return 0;
}
