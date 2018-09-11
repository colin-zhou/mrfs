#!/bin/bash

# alter user 'root'@'localhost' identified by '123';

#mysql -u root -P 3307 -h 127.0.0.1 -p123 <<START
#update mysql.user set authentication_string=password('123') where user='root';
#flush privileges
#START

mysql -u root -P 3307 -h 127.0.0.1 -p123 <<EOF
alter user 'root'@'localhost' identified by '123';
grant all privileges on *.* to 'root'@'%' identified by '123';
flush privileges
EOF
