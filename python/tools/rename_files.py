# -*- coding: utf-8 -*-


import os
import shutil


cur_path = os.path.abspath(os.path.dirname(__file__))
files = os.listdir(cur_path)


for file in files:
	date = file[:8]
	date_path = os.path.join(cur_path, date)
	if date.isdigit():
		if not os.path.exists(date_path): 
			os.makedirs(date_path)
		cur_file = os.path.join(cur_path, file)
		new_file = os.path.join(date_path, file[8:].replace('DB', ''))
		shutil.move(cur_file, new_file)
