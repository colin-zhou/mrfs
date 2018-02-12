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
    void *data;
    int itemsize;
    int size; 
} channel_data_t;

typedef size_t loser_index_t;

typedef struct g_quote {
    int            size;
    int            sort_method;
    uint64_t       p_tick_id;              /* previous return index */
    quote_tick_t   q[MAX_CHANNEL_CNT + 1]; /* quote items q[k]->mininum value*/ 
    loser_index_t  l[MAX_CHANNEL_CNT + 1]; /* loser index l[0]->champion value*/
    channel_data_t d[MAX_CHANNEL_CNT + 1]; /* channel data information */
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
            all_quote_data.l[i] = s;
            s ^= all_quote_data.l[i];
            all_quote_data.l[i] = s;
        }
    }
    /* the champion of the adjustion */
    all_quote_data.l[0] = s;
}

void
adjust_by_local_time(int s)
{
    int i;
    for(i = (s + all_quote_data.size) / 2; i> 0; i = i / 2) {
        /* champion node bigger than father node */
        if (all_quote_data.q[s].local_time > all_quote_data.q[all_quote_data.l[i]].local_time)
        {
            /* swap ls[i] and s */
            all_quote_data.l[i] = s;
            s ^= all_quote_data.l[i];
            all_quote_data.l[i] = s;
        }
    }
    /* the champion of the adjustion */
    all_quote_data.l[0] = s;
}

void
convert_to_quote_tick(void *squote, quote_tick_t *dquote, int column, int row)
{
    common_quote_t *cq = (common_quote_t *)squote;
    dquote->column = column;
    dquote->row = row; 
    dquote->local_time = cq->local_time;
    dquote->exch_time = cq->exch_time;
}

/**
 * multi sorted list of tick_sort_item_t 
 */
static void
init_loser_tree(int sort_method)
{
    int i;
    d_max_quote_tick = {UINT_MAX, UINT_MAX, (uint32_t)-1, (uint32_t)-1};
    all_quote_data.p_tick_id = -1;
    /* compare item */
    all_quote_data.q[all_quote_data.size] = {0, 0, (uint32_t)-1, (uint32_t)-1};
    /* all index point to the largest value */
    for (i = 0; i < all_quote_data.size + 1; i++)
        all_quote_data.l[i] = all_quote_data.size;
    if (sort_method == BY_LOCAL_TIME) {
        for (i = all_quote_data.size - 1; i > 0; i--)
            adjust_by_local_time(i);
    } else {
        for (i = all_quote_data.size - 1; i > 0; i--)
            adjust_by_exch_time(i);
    }

}

/**
 * fetch quote tick in array and fill it into tick
 * pointed memory
 */
static void
fetch_tick(int column, int row, quote_tick_t *tick)
{
}

/**
 * update the loser tree after remove one item
 */
static void
update_loser_tree()
{
    int col, row;
    col = decode_tick_col(all_quote_data.p_tick_id);
    row = decode_tick_row(all_quote_data.p_tick_id);
    if (row < all_quote_data.d[col].size) {
        /* more quote in the queue */
        //all_quote_data.q[col] = all_quote_data.q[col+1];
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
 * pop tick data
 */
int64_t
pop_tick()
{
    /* return an int value identify the column and row */
    int64_t col, row;
    col = all_quote_data.q[0].column;
    row = all_quote_data.q[0].row;
    update_loser_tree();
    if (col == -1) {
        /* None */
        return -1; 
    }
    return encode_tick(col, row);
}

/**
 * load quote locally
 */
void
load_quote(void *data, int sort_method)
{
    /* load the quote channel into cell array */
    /* init all necessary */
    init_loser_tree(sort_method); 
}

void
load_quote_c(void *data, int size, int sort_method)
{
    int j = 0;
    channel_data_t *d;
    for (int i = 0; i < size; i++) {
        d = &all_quote_data.d[i];
        d->data = data;
        d->size = 100;
    }
    init_loser_tree(sort_method);

}
