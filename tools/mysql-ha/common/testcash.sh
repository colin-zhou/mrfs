#!/bin/bash


# create table
echo "create database sbtest;" | mysql -uroot -p123 -P 3307 -h 127.0.0.1
echo "grant all on sbtest.* to testdb@localhost identified by 'testpw';" | mysql -uroot -p123 -P 3307 -h 127.0.0.1
echo "flush privileges;" | mysql -uroot -p123 -P 3307 -h 127.0.0.1

# prepare the database
sysbench --mysql-user=testdb \
 --mysql-password=testpw \
 --db-driver=mysql \
 --mysql-socket=/mnt/beegfs/mysql/var/mysqld_3307.sock oltp_common prepare

# read / write test
sysbench --mysql-user=testdb \
 --threads=120 \
 --db-driver=mysql \
 --mysql-socket=/mnt/beegfs/mysql/var/mysqld_3307.sock \
 --mysql-password=testpw oltp_read_write run

# clean env
sysbench --mysql-user=testdb \
  --db-driver=mysql \
  --mysql-socket=/mnt/beegfs/mysql/var/mysqld_3307.sock \
  --mysql-password=testpw oltp_read_write cleanup

echo "drop database sbtest" | mysql -uroot -p123 -P 3307 -h 127.0.0.1
echo "drop user if exists testdb" | mysql -uroot -p123 -P 3307 -h 127.0.0.1
