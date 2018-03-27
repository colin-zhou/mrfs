#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <sys/time.h>
#include <time.h>
#include "merge_sort.h"

void *x[4100];

typedef struct quote_tick {
    uint64_t exch_time;
    uint64_t local_time;
    uint32_t column;
    uint32_t row;
} quote_tick_t;

channel_data_t *
get_random_data(int size)
{
    int i;
    channel_data_t *d = (channel_data_t *)malloc(sizeof(channel_data_t));
	common_quote_t *tick = (common_quote_t *)malloc(sizeof(common_quote_t) * size);
    d->data = (void*) tick;
    d->itemsize = sizeof(common_quote_t);
	d->size = size;
    for(i = 0; i < size; i++) {
        tick[i].local_time = rand() % 10 + i * 10 + 1;
        tick[i].exch_time = tick[i].local_time;
    }
    return d;
}

void **
test_load_quote()
{
    channel_data_t *d1 = get_random_data(20000000);
    channel_data_t *d2 = get_random_data(20000000);
    channel_data_t *d3 = get_random_data(20000000);
    channel_data_t *d4 = get_random_data(20000000);
    x[0] = d1;
    x[1] = d2;
    x[2] = d3;
    x[3] = d4;
    load_quote_c(x, 4, 0);
    return (void **)x;
}

void **
test_load_spec(int num)
{
    int i;
    for (i = 0; i < num; i++) {
        x[i] = get_random_data(8000);
    }
    load_quote_c(x, num, 0);
    return (void **)x;
}

void
init_srand()
{
    srand((unsigned) time(0));
}

uint64_t
fetch_cell(int col, int row)
{
    common_quote_t *line = (common_quote_t *)((channel_data_t *)x[col])->data;
    return line[row].exch_time;
}

int main()
{
    struct timeval start, end;
    struct timezone tz;
    init_srand();
    void **data = test_load_spec(3000);
    uint32_t row, col;
    uint64_t res;
    int idx = 0;
    gettimeofday(&start, &tz);
    while ((res = pop_tick()) != REACH_END) {
        idx++;
        row = decode_tick_row(res);
        col = decode_tick_col(res);
        //printf("idx = %d, row = %d, col = %d, val=%llu\n", idx, row, col, fetch_cell(col, row));
    }
    printf("the idx = %d\n", idx);
    gettimeofday(&end, &tz);
    printf("time consumption : %lf us\n", (end.tv_sec * 1e6 + end.tv_usec - start.tv_sec * 1e6 - start.tv_usec) * 1.0);
}
