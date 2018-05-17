#-*- coding: utf-8 -*-


import time




def test_time(key, cont):
    start = time.time()
    for i in range(1, 100000):
        if key in cont:
            pass
    end = time.time()
    print("the type is %s" % type(cont), "consume %s" % (end - start))



if __name__ == "__main__":
    key = "eos_eth"
    QUEUE_QUOTE_LIST = [
        # spot usdt
        'btc_usdt', 'bch_usdt', 'eth_usdt', 'etc_usdt', 'ltc_usdt', 'eos_usdt', 'xrp_usdt',
        # spot btc
        'bch_btc', 'eth_btc', 'ltc_btc', 'etc_btc', 'eos_btc', 'xrp_btc',
        # spot eth
        'bch_eth', 'ltc_eth', 'etc_eth', 'eos_eth', 'xrp_eth',
        # future btc
        'fut_btc_tw', 'fut_btc_nw', 'fut_btc_qt', 'fut_ltc_tw', 'fut_ltc_nw',
        'fut_ltc_qt', 'fut_eth_tw', 'fut_eth_nw', 'fut_eth_qt',
        # future etc
        'fut_etc_tw', 'fut_etc_nw', 'fut_etc_qt', 'fut_bch_tw', 'fut_bch_nw', 'fut_bch_qt',
        # future xrp
        'fut_xrp_tw', 'fut_xrp_nw', 'fut_xrp_qt',
        # future eos
        'fut_eos_tw', 'fut_eos_nw', 'fut_eos_qt', 
    ]
    DQUEUE_QUOTE_LIST = {
        # spot usdt
        'btc_usdt', 'bch_usdt', 'eth_usdt', 'etc_usdt', 'ltc_usdt', 'eos_usdt', 'xrp_usdt',
        # spot btc
        'bch_btc', 'eth_btc', 'ltc_btc', 'etc_btc', 'eos_btc', 'xrp_btc',
        # spot eth
        'bch_eth', 'ltc_eth', 'etc_eth', 'eos_eth', 'xrp_eth',
        # future btc
        'fut_btc_tw', 'fut_btc_nw', 'fut_btc_qt', 'fut_ltc_tw', 'fut_ltc_nw',
        'fut_ltc_qt', 'fut_eth_tw', 'fut_eth_nw', 'fut_eth_qt',
        # future etc
        'fut_etc_tw', 'fut_etc_nw', 'fut_etc_qt', 'fut_bch_tw', 'fut_bch_nw', 'fut_bch_qt',
        # future xrp
        'fut_xrp_tw', 'fut_xrp_nw', 'fut_xrp_qt',
        # future eos
        'fut_eos_tw', 'fut_eos_nw', 'fut_eos_qt', 
    }

    test_time(key, QUEUE_QUOTE_LIST)
    test_time(key, set(QUEUE_QUOTE_LIST))
    test_time(key, DQUEUE_QUOTE_LIST)
