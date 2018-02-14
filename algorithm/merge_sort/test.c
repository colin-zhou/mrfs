#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include "merge_sort.h"


typedef struct channel_data {
    void *data;
    int itemsize;
    int size;
} channel_data_t;

typedef struct common_quote {
    int serial;
    int mi_type;
    uint64_t exch_time;
    uint64_t local_time;
} common_quote_t;

typedef struct quote_tick {
    uint64_t exch_time;
    uint64_t local_time;
    uint32_t column;
    uint32_t row;
} quote_tick_t;

channel_data_t *
get_random_data(int size)
{
    channel_data_t *d = (channel_data_t *)malloc(sizeof(channel_data_t));
	common_quote_t *tick = (common_quote_t *)malloc(sizeof(common_quote_t) * size);
    d->data = (void*) tick;
    d->itemsize = sizeof(common_quote_t);
	d->size = size;
	printf("\n");
    for(int i = 0; i < size; i++) {
        tick[i].local_time = rand() % 10 + i * 10;
        tick[i].exch_time = tick->local_time;
		printf("%d ", tick[i].local_time);
    }
	printf("\n");
    return d;
}

void
test_load_quote()
{
    void *x[4];
    channel_data_t *d1 = get_random_data(3);
    channel_data_t *d2 = get_random_data(3);
    channel_data_t *d3 = get_random_data(3);
    channel_data_t *d4 = get_random_data(3);
    x[0] = d1;
    x[1] = d2;
    x[2] = d3;
    x[3] = d4;
    load_quote_c(x, 4, 0);
}

void
init_srand()
{
    srand((unsigned) time(0));
}

int main()
{
    init_srand();
    test_load_quote();
    int row, col;
    int64_t res;
    int idx = 0;
    while ((res = pop_tick()) != -1) {
        idx++;
        row = decode_tick_row(res);
        col = decode_tick_col(res);
        printf("idx = %d, row = %d, col = %d\n", idx, row, col);
		//if(idx == 12)
		break;
    }
    printf("finished\n");
	system("pause");
}
