#!/usr/bin/env python
# -*- coding: utf-8 -*-


import os
import datetime


filter_day_list = [
	'20170101',
	'20170102',
	'20170127',
	'20170128',
	'20170129',
	'20170130',
	'20170131',
	'20170201',
	'20170202',
	'20170402',
	'20170403',
	'20170404',
	'20170501',
	'20170528',
	'20170529',
	'20170530',
	'20171001',
	'20171002',
	'20171003',
	'20171004',
	'20171005',
	'20171006',
	'20171007',
	'20171008',
]


def enum_date(dstart, dend):
	"""
	the date range is [dstart, dend)
	"""
	cur_date = datetime.datetime.strptime(dstart, '%Y%m%d')
	end_date = datetime.datetime.strptime(dend, '%Y%m%d')
	while (cur_date < end_date):
		ds = cur_date.strftime('%Y%m%d')
		print(ds)
		cur_date += datetime.timedelta(days=1)
		yield ds


def is_trade_date(day):
	"""
	check a date is trading day or not
	"""
	if day in filter_day_list:
		return False
	to_datetime = datetime.datetime.strptime(day, '%Y%M%d')
	if to_datetime.isoweekday() == 6 or to_datetime.isoweekday() == 7:
		return False
	return True


def write_result(day_list, filename):
	"""
	if filename not exist create the file or append not exist date to the end
	"""
	print(day_list)
	cur_days = set()
	days_lists = []
	if os.path.exists(filename):
		with open(filename, 'r') as tdf:
			for line in tdf.readlines():
				day = line.strip()
				if day != '' and day not in cur_days:
					cur_days.add(day)
					days_lists.append(day)
		new_day_list = [day for day in day_list if day not in cur_days]
		days_lists.extend(new_day_list)
		str_write = '\n'.join(days_lists)
		with open(filename, 'w') as tdf:
			tdf.write(str_write)
	else:
		str_write = '\n'.join(day_list)
		with open(filename, 'w') as tdf:
			tdf.write(str_write)


def main(dstart, dend, filename):
	result = []
	for day in enum_date(dstart, dend):
		if is_trade_date(day):
			result.append(day)	
	write_result(result, filename)	


if __name__ == "__main__":
	main('20170101', '20180101', 'mytradedays.txt')
