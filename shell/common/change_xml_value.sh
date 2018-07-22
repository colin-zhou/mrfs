#!/bin/bash


val=$(sed -n 's:<max_order_id>\(.*\)<\/max_order_id>:\1:p' haha.xml)
new_val=$(($val + 1000))

sed -i "s:<max_order_id>\(.*\)</max_order_id>:<max_order_id>${new_val}</max_order_id>:" haha.xml
