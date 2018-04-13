# -*- coding: utf-8 -*-

from my.data import quote
from quote_sorter import load_quote, pop_tick


def merge_two_quote(q1, q2, sort_method=0):
    """
    :param q1: first quote
    :param q2: second quote
    :param sort_method: sort method enum
    :return: return two way merged quote
    """
    if q1 is None and q2 is not None:
        return q2
    if q1 is not None and q2 is None:
        return q1
    if q1 is None and q2 is None:
        return None
    idx, idy = 0, 0
    cnt1, cnt2 = len(q1), len(q2)
    sort_key = 'exchange_time'
    if sort_method == 0:
        sort_key = 'local_time'
    quote_items = []
    while idx <= cnt1 and idy <= cnt2:
        if idx == cnt1:
            if idy == cnt2:
                break
            quote_items.append(q2[idy])
            idy += 1
        elif idy == cnt2:
            if idx == cnt1:
                break
            quote_items.append(q1[idx])
            idx += 1
        else:
            time1 = q1[idx][sort_key]
            time2 = q2[idy][sort_key]
            if time1 > time2:
                quote_items.append(q2[idy])
                idy += 1
            else:
                quote_items.append(q1[idx])
                idx += 1
    return quote_items


def merge_quotes(quote_list, sort_method=0):
    """
    :param quote_list: a list of pre-defined numpy quote
    :param sort_method: sort key enum
    :return: return merged quote array
    """
    """
    @param a list of predefined numpy quote
    """
    if len(quote_list) == 1:
        return quote_list[0]
    quote_arr_cnt = len(quote_list)
    pair_cnt = quote_arr_cnt // 2
    n_quote_list = []
    for idx in range(0, pair_cnt * 2, 2):
        left_q = quote_list[idx]
        right_q = quote_list[idx + 1]
        new_q = merge_two_quote(left_q, right_q, sort_method)
        n_quote_list.append(new_q)
    if pair_cnt * 2 != quote_arr_cnt:
        n_quote_list.append(quote_list[-1])
    return merge_quotes(n_quote_list, sort_method)



def test_1():
    date = 20170301
    day_night = 0

    qdef = [
        {'mi_type': 212, 'code': 'cu1704', 'source': '0'},
        {'mi_type': 225, 'code': 'CU3M', 'source': '0'},
        {'mi_type': 259, 'code': 'USD.CNH', 'source': '0'}
    ]

    q_array = []
    for priv_key in qdef:
        qt = quote.data(date, priv_key['mi_type'], priv_key['code'], day_night, priv_key['source'])
        q_array.append(qt)

    #print(q_array[2][0])
    #print(q_array[2][1])
    #return

    sorted_quote = merge_quotes(q_array, 0)
    quote_array = [(item, item[0].itemsize, len(item)) for item in q_array]
    load_quote(quote_array, 0)

    tick = 0
    flag = True
    while True:
        item, idx = pop_tick()
        if item is None:
            break
        if item[idx]['local_time'] != sorted_quote[tick]['local_time'] and flag:
            #print(id(item), id(q_array[2]))
            flag = False
            print(idx)
            print(item[idx])
            print(sorted_quote[tick])
        #if tick == 1573:
            break
        # print(tick, item[idx]['local_time'])
        tick += 1
    #print([q[2] for q in quote_array])
    size = sum([item[2] for item in quote_array])
    print(size, "count tick", tick)
    assert(size == tick)

if __name__ == "__main__":
   test_1()
