#include <stdio.h>


#define MAX_CHANNEL_CNT (4096)
#define encode_tick(a, b) (a)<<12 + (b)
#define decode_tick_col(v) (0xFFFFF000 & a) >> 12
#define decode_tick_row(v) (0xFFF & v)

enum _SORT_METHOD {
    LOCAL_TIME=0,
    EXCH_TIME=1,
} SORT_METHOD;

/***
 * Max support 4096 channel quote in order
 */

typedef quote_tick {
    uint64_t exch_time;
    uint64_t local_time;
    uint32_t column;
    uint32_t index;
} quote_tick_t;


typedef common_quote {
    int serial;
    int mi_type;
    uint64_t exch_time;
    uint64_t local_time;
} common_quote_t;


typedef loser_index_t size_t;

typedef g_quote {
    int size;
    quote_tick_t q[MAX_CHANNEL_CNT + 1]; /* quote items q[k]->mininum value*/
    loser_index  l[MAX_CHANNEL_CNT + 1]; /* loser index l[0]->champion value*/
} g_quote_t;

g_quote_t all_quote_data;

void
adjust_by_exch_time(int s)
{
    int i;
    for(i = (s + all_quote_data.size) / 2; i > 0; i = i / 2) {
        /* i is father node */
        if (all_quote_data.q[s].exch_time > b[all_quote_data.l[i]].exch_time)
        {
            /* swap ls[i] and s */
            ls[i] = s;
            s^ = ls[i];
            ls[i] = s;
        }
    }
    all_quote_data.l[0] = s;
}

void
adjust_by_local_time(int s)
{
    int i;
    for(i = (s + all_quote_data.size) / 2; i> 0; i = i / 2) {
        if (all_quote_data.q[s].local_time > b[all_quote_data.l[i]].local_time)
        {
            ls[i] = s;
            s^ = ls[i];
            ls[i] = s;
        }
    }
    all_quote_data.l[0] = s;
}

void
convert_to_quote_tick(void *squote, quote_tick_t *dquote, int index, int col)
{
    dquote->colume = col;
    dquote->index = index;
    dquote->local_time = squote->local_time;
    dquote->exch_time = squote->exch_time;
}

void
process_col_finished(int index)
{
}

/**
 * multi sorted list of tick_sort_item_t 
 */
void
init_loser_tree(int sort_method)
{
    int i;
    /* only work on 64bit compiler */
    all_quote_data.q[all_quote_data.size] = {ULONG_MAX, ULONG_MAX, 0, 0};
    /* all index point to the largest value */
    for (i = 0; i < all_quote_data.size + 1; i++)
        all_quote_data.l[i] = all_quote_data.size;
    if (sort_method == LOCAL_TIME) {
        for (i = 0; i < all_quote_data.size; i++)
            adjust_by_local_time(i);
    } else {
        for (i = 0; i < all_quote_data.size; i++)
            adjust_by_exch_time(i);
    }

}

/**
 * pop tick data
 */
int
pop_tick()
{
}


/**
 * insert tick data
 */
int
insert_tick()
{
}


