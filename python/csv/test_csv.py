# -*- coding:utf-8 -*-

import csv


# with open('test.csv', 'rb') as f:
#     reader = csv.reader(f,delimiter=',')
#     for line in reader:
#         print line

x="""strategy,hi51atest_shag_day.so_101,hi51test_shag_day.so_102,hi52test_shag_day.so_103,other,avg,n_signals
hi51atest_shag_day.so_101,1.000000,0.774580,0.513189,0.800959,0.643885,417
hi51test_shag_day.so_102,0.774580,1.000000,0.472406,0.450331,0.623493,453
hi52test_shag_day.so_103,0.513189,0.472406,1.000000,0.553957,0.492798,417"""
def formate_my_rss_sig_dup(csv_list_orig):
    result = []
    keys = []
    # csv_list = pickle.loads(csv_list_orig) if csv_list_orig else []
    csv_list = [csv_list_orig]
    for csv_item in csv_list:
        if csv_item:
            rows_str = csv_item.split('\n')
            for idx, row in enumerate(rows_str):
                if not keys and not idx:
                    keys = row.split(',')
                else:
                    values = row.split(',')
                    tmp_dict = {}
                    for idx, item in enumerate(values):
                    	print keys[idx], "<->", item
                        tmp_dict[keys[idx]] = item
                    result.append(tmp_dict)
    return keys, result


print formate_my_rss_sig_dup(x)