# -*- coding: utf-8 -*-

"""
the size of iteration is 1,000,000
"""

import numpy as np
from enum import Enum
from enum import IntEnum
from myperf import perf_print


ibook_stock_dtype = np.dtype([
    ('wind_code', 'S32'),
    ('ticker', 'S32'),
    ('action_day', 'i4'),
    ('trading_day', 'i4'),
    ('exch_time', 'i4'),
    ('status', 'i4'),
    ('pre_close_px', 'u4'),
    ('open_px', 'u4'),
    ('high_px', 'u4'),
    ('low_px', 'u4'),
    ('last_px', 'u4'),
    ('ap_array', ('u4', 10)),
    ('av_array', ('u4', 10)),
    ('bp_array', ('u4', 10)),
    ('bv_array', ('u4', 10)),
    ('num_of_trades', 'u4'),
    ('total_vol', 'u8'),
    ('total_notional', 'u8'),
    ('total_bid_vol', 'u8'),
    ('total_ask_vol', 'u8'),
    ('weighted_avg_bp', 'u4'),
    ('weighted_avg_ap', 'u4'),
    ('IOPV', 'i4'),
    ('yield_to_maturity', 'i4'),
    ('upper_limit_px', 'u4'),
    ('lower_limit_px', 'u4'),
    ('prefix', "S4"),
    ('PE1', 'i4'),
    ('PE2', 'i4'),
    ('change', 'i4')
], align=True)

numpy_send_order_dtype = np.dtype([
    ('exch', 'i1'),
    ('symbol', 'S64'),
    ('volume', 'i4'),
    ('price', 'f8'),
    ('direction', 'i4'),
    ('open_close', 'i4'),
    ('investor_type', 'i4'),
    ('order_type', 'i4'),
    ('time_in_force', 'i4'),
    ('st_id', 'i8'),
    ('order_id', 'i8'),
    ('org_ord_id', 'i8')
], align=True)

numpy_response_dtype = np.dtype([
    ('order_id', 'i8'),
    ('symbol', 'S64'),
    ('direction', 'i2'),
    ('open_close', 'i2'),
    ('exe_price', 'f8'),
    ('exe_volume', 'i4'),
    ('status', 'i4'),
    ('error_no', 'i4'),
    ('error_info', 'S512'),
    ('reserved_data', 'i8')
], align=True)

ibook_bar_dtype = np.dtype([
    ('symbol', 'S64'),
    ('int_time', 'i4'),
    ('open', 'f8'),
    ('close', 'f8'),
    ('high', 'f8'),
    ('low', 'f8'),
    ('volume', 'i8'),
    ('turnover', 'f8'),
    ('upper_limit', 'f8'),
    ('lower_limit', 'f8'),
    ('open_interest', 'f8'),
    ('bar_index', 'i4'),
], align=True)

numpy_book_bar_dtype = np.dtype([
    ('serial', 'i4'),
    ('mi_type', 'i4'),
    ('local_time', 'i8'),
    ('exchange_time', 'i8'),
    ('quote', ibook_bar_dtype),
], align=True)

ibook_futures_dtype = np.dtype([
    ('book_type', 'i4'),
    ('symbol', 'S64'),
    ('exchange', 'i2'),
    ('int_time', 'i4'),
    ('pre_close_px','f4'),
    ('pre_settle_px', 'f4'),
    ('pre_open_interest','f8'),
    ('open_interest', 'f8'),
    ('open_px','f4'),
    ('high_px','f4'),
    ('low_px','f4'),
    ('avg_px','f4'),
    ('last_px', 'f4'),
    ('bp_array', ('f4',5)),
    ('ap_array', ('f4',5)),
    ('bv_array', ('i4',5)),
    ('av_array', ('i4',5)),
    ('total_vol', 'u8'),
    ('total_notional', 'f8'),
    ('upper_limit_px','f4'),
    ('lower_limit_px','f4'),
    ('close_px','f4'),
    ('settle_px','f4'),
    ('implied_bid_size', ('i4',5)),
    ('implied_ask_size', ('i4',5)),
    ('total_buy_ordsize', 'i4'),
    ('total_sell_ordsize', 'i4'),
    ('weighted_buy_px','f4'),
    ('weighted_sell_px','f4'),
], align=True)

numpy_book_futures_dtype = np.dtype([
    ('serial', 'i4'),
    ('mi_type', 'i4'),
    ('local_time', 'i8'),
    ('exchange_time', 'i8'),
    ('quote', ibook_futures_dtype),
], align=True)

numpy_book_stock_dtype = np.dtype([
    ('serial', 'i4'),
    ('mi_type', 'i4'),
    ('local_time', 'i8'),
    ('exchange_time', 'i8'),
    ('quote', ibook_stock_dtype),
], align=True)

ibook_btc_dtype = np.dtype([
    ('exchange', 'S20'),
    ('symbol', 'S32'),
    ('my_symbol','S32'),
    ('last_px','f8'),
    ('last_vol','f8'),
    ('bid_px', ('f8',5)),
    ('ask_px', ('f8',5)),
    ('bid_vol', ('f8',5)),
    ('ask_vol', ('f8',5)),
    ('local_time', 'S32'),
   ], align=True)

numpy_book_btc_dtype = np.dtype([
    ('serial', 'i4'),
    ('mi_type', 'i4'),
    ('local_time', 'i8'),
    ('exchange_time', 'i8'),
    ('quote', ibook_btc_dtype),
], align=True)

ibook_forex_type = np.dtype([
    ('symbol', 'S64'),
    ('exchange','S20'),
    ('int_time', 'i4'),
    ('open_px','f4'),
    ('high_px','f4'),
    ('low_px','f4'),
    ('pre_close_px','f4'),
    ('last_px','f4'),
    ('last_size','i4'),
    ('bp_array', ('f4',5)),
    ('ap_array', ('f4',5)),
    ('bv_array', ('i4',5)),
    ('av_array', ('i4',5)),
    ("volume","u8")
   ],
align=True)

numpy_book_forex_dtype = np.dtype([
    ('serial', 'i4'),
    ('mi_type', 'i4'),
    ('local_time', 'i8'),
    ('exchange_time', 'i8'),
    ('quote', ibook_forex_type),
], align=True)

ibook_stock_order_queue_dtype = np.dtype([
    ('time', 'i4'),
    ('market','i4'),
    ('symbol','S32'),
    ('side','S4'),
    ('price','i4'),
    ('total_numbers','i4'),
    ('numbers','i4'),
    ('qty_array', ('i4', 50)),
], align=True)

numpy_book_stock_order_queue_dtype = np.dtype([
    ('serial', 'i4'),
    ('mi_type', 'i4'),
    ('local_time', 'i8'),
    ('exchange_time', 'i8'),
    ('quote', ibook_stock_order_queue_dtype),
], align=True)

ibook_stock_order_dtype = np.dtype([
    ('market','i4'),
    ('symbol','S32'),
    ('time','i4'),
    ('order_price','i4'),
    ('order_id','i8'),
    ('order_volume','i8'),
    ('fuction_code', 'S4'),
    ('order_kind', 'S4'),
], align=True)

numpy_book_stock_order_dtype = np.dtype([
    ('serial', 'i4'),
    ('mi_type', 'i4'),
    ('local_time', 'i8'),
    ('exchange_time', 'i8'),
    ('quote', ibook_stock_order_dtype),
], align=True)

ibook_stock_transaction_type = np.dtype([
    ('time', 'i4'),
    ('market','i4'),
    ('symbol','S32'),
    ('record_id','i8'),
    ('trade_price','i4'),
    ('trade_volume','i8'),
    ('trade_amount','i8'),
    ('order_kind','S4'),
    ('bsflag','S4'),
    ('function_code','S4'),
    ('sell_id','i4'),
    ('buy_id','i4'),
], align=True)

numpy_book_stock_transaction_dtype = np.dtype([
    ('serial', 'i4'),
    ('mi_type', 'i4'),
    ('local_time', 'i8'),
    ('exchange_time', 'i8'),
    ('quote', ibook_stock_transaction_type),
], align=True)



class QuoteType(Enum):
    FutureQuote = 0
    StockQuote = 1
    ManualOrder = 2
    IBQuote = 3
    CoinQuote = 4
    ForexQuote = 5
    HedgeInfo = 6
    StockOrderQueue = 7
    StockOrder = 8
    StockTransaction = 9


mapper = {
    numpy_book_futures_dtype: QuoteType.FutureQuote.value,
    numpy_book_stock_dtype: QuoteType.StockQuote.value,
    numpy_book_bar_dtype: QuoteType.IBQuote.value,
    numpy_book_btc_dtype: QuoteType.CoinQuote.value,
    numpy_book_forex_dtype: QuoteType.ForexQuote.value,
    numpy_book_stock_order_queue_dtype: QuoteType.StockOrderQueue.value,
    numpy_book_stock_order_dtype: QuoteType.StockOrder.value,
    numpy_book_stock_transaction_dtype: QuoteType.StockTransaction.value,
}


def gen_dtype_array():
    tmp = np.zeros(shape=10000000, dtype=numpy_book_futures_dtype)
    return tmp


@perf_print
def dtype_map(slist):
    for item in slist:
        x = mapper[item.dtype]


if __name__ == "__main__":
    out = gen_dtype_array()
    dtype_map(out)
