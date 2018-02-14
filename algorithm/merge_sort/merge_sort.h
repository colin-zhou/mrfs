
#ifndef _MY_MERGE_SORT_H
#define _MY_MERGE_SORT_H

#include <stdint.h>

#define MAX_CHANNEL_CNT    (4096)
#define encode_tick(a, b)  (((a)<<12) + (b))
#define decode_tick_col(v) ((0xFFFFF000 & v) >> 12)
#define decode_tick_row(v) (0xFFF & v)

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
int64_t
pop_tick();


#endif //_MY_MERGE_SORT_H
