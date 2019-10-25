# -*- coding: utf-8 -*-


import os
import sys

import numpy as np

stock_dtype = np.dtype([
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

future_dtype = np.dtype([
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


class QuoteType:
    FUTURE = 0
    STOCK = 1


def calc_func(qtype, quote):
    if not isinstance(quote, memoryview):
        print("quote not valid", file=sys.stderr)
        return None
    if qtype == QuoteType.FUTURE:
        # future quote do some calculation
        # make sure add float converter to the result if get some data else return None
        print(np.frombuffer(quote, future_dtype))
        return float(1)
    elif qtype == QuoteType.STOCK:
        # future quote do some calculation
        # make sure add float converter to the result if get some data else return None
        print(np.frombuffer(quote, stock_dtype))
        return float(2)
    else:
        print("quote type not valid", file=sys.stderr)
        return None


if __name__ == "__main__":
    calc_func(0, None)
