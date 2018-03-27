#ifndef _MY_MERGE_SORT_H
#define _MY_MERGE_SORT_H

#include <stdint.h>

#define MAX_CHANNEL_CNT    (4096)
#define encode_tick(a, b)  (((a)<<12) + (b))
#define decode_tick_row(v) ((0xFFFFF000 & v) >> 12)
#define decode_tick_col(v) (0xFFF & v)
#define REACH_END          ((uint64_t)(-1))

typedef struct common_quote {
    int serial;                                /* the serial index of the tick */
    int mi_type;                               /* internal message index type */
    uint64_t exch_time;                        /* exchange time of tick */
    uint64_t local_time;                       /* receive time of tick */
} common_quote_t;

typedef struct channel_data {
    common_quote_t *data;                      /* point to data array like common_quote_t */
    int itemsize;                              /* itemsize of tick item, useless now */
    int size;                                  /* number of quote tick in this channel */
} channel_data_t;

enum SORT_METHOD {
    BY_LOCAL_TIME=0,    /* sort by the quote recv time */
    BY_EXCH_TIME=1      /* sort by the quote exch time */
};

/**
 * input the python list of channel source
 * sort those quote and provide API to fetch
 * tick one by one
 */
void
load_quote(void **data, int sort_method);


void
load_quote_c(void **data, int size, int sort_method);

/**
 * ret = -1 means none tick now else exist quote tick
 */
uint64_t
pop_tick();


#endif //_MY_MERGE_SORT_H
