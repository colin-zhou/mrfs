
//#include <iostream>
#include <stdio.h>
#include <limits.h>
#include "merge_sort.h"

enum SORT_METHOD {
    BY_LOCAL_TIME=0,
    BY_EXCH_TIME=1
};

/***
 * Max support 4096 channel quote in order
 */
typedef struct quote_tick {
    uint64_t exch_time;
    uint64_t local_time;
    uint32_t column;
    uint32_t row;
} quote_tick_t;

typedef struct common_quote {
    int serial;
    int mi_type;
    uint64_t exch_time;
    uint64_t local_time;
} common_quote_t;

typedef struct channel_data {
    void *data;                                /* point to data array like common_quote_t */
    int itemsize;                              /* itemsize of tick item */
    int size;                                  /* number of the tick in this channel */
} channel_data_t;						       
										       
typedef size_t loser_index_t;			       
										       
typedef struct g_quote {				       
    int            size;                       /* size of loser tree */
    int            sort_method;                /* the sort method of merge sort */
	uint32_t       p_tick_col;                 /* previous return column */
	uint32_t       p_tick_row;                 /* previous return row */
    quote_tick_t   q[MAX_CHANNEL_CNT + 1];     /* quote items q[k]->minimum value*/
    loser_index_t  l[MAX_CHANNEL_CNT + 1];     /* loser index l[0]->champion value*/
    channel_data_t d[MAX_CHANNEL_CNT + 1];     /* channel data information */
} g_quote_t;

g_quote_t    all_quote_data;
quote_tick_t d_max_quote_tick;

void
adjust_by_exch_time(int s)
{
    int i;
    for(i = (s + all_quote_data.size) / 2; i > 0; i = i / 2) {
        /* champion node bigger than father node */
        if (all_quote_data.q[s].exch_time > all_quote_data.q[all_quote_data.l[i]].exch_time)
        {
			/* swap ls[i] and s */
			size_t tmp = s;
			s = all_quote_data.l[i];
			all_quote_data.l[i] = tmp;
        }
    }
    /* the champion of the adjustment */
    all_quote_data.l[0] = s;
}

void
adjust_by_local_time(int s)
{
    int i;
    for(i = (s + all_quote_data.size) / 2; i > 0; i = i / 2) {
        /* champion node bigger than father node */
        if (all_quote_data.q[s].local_time > all_quote_data.q[all_quote_data.l[i]].local_time)
        {
            /* swap ls[i] and s */
			size_t tmp = s;
			s = all_quote_data.l[i];
			all_quote_data.l[i] = tmp;
        }
    }
    /* the champion of the adjustment */
    all_quote_data.l[0] = s;
}

void
convert_to_quote_tick(void *squote, quote_tick_t *dquote, int column, int row)
{
    common_quote_t *cq = (common_quote_t *)(((channel_data_t *)squote)->data);
    dquote->column = column;
    dquote->row = row;
    dquote->local_time = cq->local_time;
    dquote->exch_time = cq->exch_time;
}

/**
 * multi sorted list of tick_sort_item_t
 */
static void
init_loser_tree()
{
    int i;
    all_quote_data.p_tick_row = 0;
	all_quote_data.p_tick_col = 0;
    d_max_quote_tick = (quote_tick_t){.local_time=UINT_MAX, .exch_time=UINT_MAX, .column=(uint32_t)-1, .row=(uint32_t)-1};
    all_quote_data.q[all_quote_data.size] = (quote_tick_t){.local_time=0, .exch_time=0, .column=(uint32_t)-1, .row=(uint32_t)-1};
    /* all index point to the smallest value, always be champion */
    for (i = 0; i < all_quote_data.size + 1; i++)
        all_quote_data.l[i] = all_quote_data.size;
    if (all_quote_data.sort_method == BY_LOCAL_TIME) {
        for (i = all_quote_data.size - 1; i >= 0; i--)
            adjust_by_local_time(i);
    } else {
        for (i = all_quote_data.size - 1; i >= 0; i--)
            adjust_by_exch_time(i);
    }
}

/**
 * update the loser tree after remove one item
 */
static void
update_loser_tree()
{
	int row = all_quote_data.p_tick_row;
	int col = all_quote_data.p_tick_col;
    if (row < all_quote_data.d[col].size) {
        /* more quote in the queue */
        convert_to_quote_tick(all_quote_data.d[col].data, &all_quote_data.q[col], col, row+1);
    } else {
        all_quote_data.q[col] = d_max_quote_tick;
    }
    if (all_quote_data.sort_method == BY_LOCAL_TIME) {
        adjust_by_exch_time(col);
    } else {
        adjust_by_local_time(col);
    }
}

/**
 * pop tick data and update the code context
 */
int64_t
pop_tick()
{
    /* return an int value identify the column and row */
	printf("current values: %lld\n", all_quote_data.q[0].exch_time);
	printf("current values: %lld\n", all_quote_data.q[1].exch_time);
	printf("current values: %lld\n", all_quote_data.q[2].exch_time);
	printf("current values: %lld\n", all_quote_data.q[3].exch_time);
	printf("the top index is %d and value is %d\n", all_quote_data.l[0],
			all_quote_data.q[all_quote_data.l[0]].exch_time);

    all_quote_data.p_tick_col = all_quote_data.q[all_quote_data.l[0]].column;
	all_quote_data.p_tick_row = all_quote_data.q[all_quote_data.l[0]].row;
    update_loser_tree();
    if (all_quote_data.p_tick_col == -1) {
        /* None */
        return -1;
    }
    return encode_tick(all_quote_data.p_tick_col, all_quote_data.p_tick_row);
}

/**
 * load quote locally
 */
void
load_quote(void **data, int sort_method)
{
    /* load the quote channel into cell array */
    /* initial all necessary data */
    init_loser_tree();
}

void
load_quote_c(void **data, int size, int sort_method)
{
    channel_data_t *d;
    all_quote_data.size = size;
    all_quote_data.sort_method = sort_method;
    for (int i = 0; i < size; i++) {
        /* initial each channel of data */
        d = &all_quote_data.d[i];
        d->data = (void *)data[i];
		/* load data into queue */
		convert_to_quote_tick((void *)data[i], &all_quote_data.q[i], i, 0);
        d->size = 3;
    }
    init_loser_tree();
	//printf("the top1 minmum value is %d\n", all_quote_data.q[all_quote_data.l[0]]);
}
