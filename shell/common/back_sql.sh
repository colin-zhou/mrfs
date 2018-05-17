#!/bin/bash 

#Restore from .gz file:
#
#Step 1: Copy file to formal server.
#
#Step 2: Extract from .gz file on formal server (192.168.1.175).
#>   gunzip -c "*.sql.gz" > "*.sql"
#
#Step 3: Restore database on formal server (192.168.1.175).
#>   mysql -u root -p123456 "db_name"< "*.sql"


time=` date +%Y%m%d`

mkdir -p $BACKUP_DIR

ssh $DB_HOST "mysqldump -u$DB_USER -p$DB_PASSWD $DB_NAME " | gzip > $BACKUP_DIR/$DB_NAME$time.sql.gz
find $BACKUP_DIR -name "$DB_NAME*.sql.gz" -type f -mtime +5 -exec rm {} \; > /dev/null 2>&1
