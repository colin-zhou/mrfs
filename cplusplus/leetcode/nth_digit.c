#include <stdio.h>

int get_offset(int a, int idx)
{
    if (idx == 0) {
        return a % 10;
    }
    char buf[11];
    printf("a=%d, idx=%d\n", a, idx);
    sprintf(buf+1, "%d", a+1);
    return buf[idx] - '0';
}


int findNthDigit(int n) {
    int i, base = 9, factor = 1;
    unsigned int count = 0;
    for (i = 1; i < 12; i++){
        count = factor * base * i;
        if (n < count) {
            int offset = n / i;
            factor -= 1;
            int find_val = offset + factor;
            return get_offset(find_val ,n % i);
        } else {
            n -= count;
            printf("n = %d, count = %u\n", n, count);
        }
        factor *= 10;
    }
    return -1;
}

int main()
{
    printf("%d\n", findNthDigit(1000000000));
    return 0;
}
