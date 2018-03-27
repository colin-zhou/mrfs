#include <stdio.h>
#include <limits.h>
#include "merge_sort.h"

/***
 * Support 4096 channel quote sorted in order
 */
typedef struct quote_tick {
    uint64_t exch_time;
    uint64_t local_time;
    uint32_t column;
    uint32_t row;
} quote_tick_t;

typedef size_t loser_index_t;                  /* father node index */

typedef struct quote_data {
    int            size;                       /* size of loser tree */
    int            sort_method;                /* the sort method of merge sort */
	uint32_t       p_tick_col;                 /* previous return column */
	uint32_t       p_tick_row;                 /* previous return row */
    quote_tick_t   q[MAX_CHANNEL_CNT + 1];     /* quote items q[k]->minimum value*/
    loser_index_t  l[MAX_CHANNEL_CNT + 1];     /* loser index l[0]->champion value*/
    channel_data_t d[MAX_CHANNEL_CNT + 1];     /* channel data information */
} quote_data_t;

quote_data_t    all_data;
quote_tick_t    fill_tick;

void
adjust_by_exch_time(int s)
{
    int i;
    for(i = (s + all_data.size) / 2; i > 0; i /= 2) {
        /* champion node bigger than father node */
        if (all_data.q[s].exch_time > all_data.q[all_data.l[i]].exch_time)
        {
			/* swap ls[i] and s */
			size_t tmp = s;
			s = all_data.l[i];
			all_data.l[i] = tmp;
        }
    }
    /* the champion of the adjustment */
    all_data.l[0] = s;
}

void
adjust_by_local_time(int s)
{
    int i;
    for(i = (s + all_data.size) / 2; i > 0; i /= 2) {
        /* champion node bigger than father node */
        if (all_data.q[s].local_time > all_data.q[all_data.l[i]].local_time)
        {
            /* swap ls[i] and s */
			size_t tmp = s;
			s = all_data.l[i];
			all_data.l[i] = tmp;
        }
    }
    /* the champion of the adjustment */
    all_data.l[0] = s;
}

/**
 * squote is some data channel
 */
void
convert_to_quote_tick(channel_data_t *c_quote, quote_tick_t *dquote, int column, int row)
{
    common_quote_t *cq = (common_quote_t *)(((channel_data_t *)c_quote)->data);
    //printf("col:%d, row:%d, the addr is %p, val1=%llu, val2=%llu\n", column, row, cq, cq[0].exch_time, cq[1].exch_time);
    dquote->column = column;
    dquote->row = row;
    // ensure each quote be posive
    dquote->local_time = cq[row].local_time + 1;
    dquote->exch_time = cq[row].exch_time + 1;
}

/**
 * multi sorted list of tick_sort_item_t
 */
static void
init_loser_tree()
{
    int i;
    all_data.p_tick_row = 0;
	all_data.p_tick_col = 0;
    fill_tick = (quote_tick_t){.local_time=UINT_MAX, .exch_time=UINT_MAX, .column=UINT_MAX, .row=UINT_MAX};
    all_data.q[all_data.size] = (quote_tick_t){.local_time=0, .exch_time=0, .column=UINT_MAX, .row=UINT_MAX};
    /* all index point to the smallest value, always be champion */
    for (i = 0; i < all_data.size + 1; i++)
        all_data.l[i] = all_data.size;
    if (all_data.sort_method == BY_LOCAL_TIME) {
        for (i = all_data.size - 1; i >= 0; i--)
        {
            adjust_by_local_time(i);
        }
    } else {
        for (i = all_data.size - 1; i >= 0; i--)
        {
            adjust_by_exch_time(i);
        }
    }
}

/**
 * update the loser tree after remove one item
 */
static void
update_loser_tree()
{
	int row = all_data.p_tick_row;
	int col = all_data.p_tick_col;
    // todo: remote minus 1
    if (row < all_data.d[col].size - 1) {
        /* more quote in the queue */
        convert_to_quote_tick(&all_data.d[col], &all_data.q[col], col, row+1);
    } else {
        all_data.q[col] = fill_tick;
    }
    if (all_data.sort_method == BY_LOCAL_TIME) {
        adjust_by_exch_time(col);
    } else {
        adjust_by_local_time(col);
    }
}

/**
 * pop tick data and update the code context
 */
uint64_t
pop_tick()
{
    /* return an int value identify the column and row */

    all_data.p_tick_col = all_data.q[all_data.l[0]].column;
	all_data.p_tick_row = all_data.q[all_data.l[0]].row;

    update_loser_tree();

    //printf("tree idx %u, real col: %d, real row: %d\n", all_data.l[0], all_data.p_tick_col, all_data.p_tick_row);
    if (all_data.p_tick_col == UINT_MAX) {
        /* None */
        return REACH_END;
    }
    return encode_tick(all_data.p_tick_row, all_data.p_tick_col);
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

/**
 * data is list of channel_data_t
 */
void
load_quote_c(void **data, int size, int sort_method)
{
    int i;
    all_data.size = size;
    all_data.sort_method = sort_method;
    for (i = 0; i < size; i++) {
        /* initial each channel of data */
        all_data.d[i] = *(channel_data_t *)data[i];
		/* load top of list data into queue */
		convert_to_quote_tick((channel_data_t *)data[i], &all_data.q[i], i, 0);
    }
    init_loser_tree();
}
