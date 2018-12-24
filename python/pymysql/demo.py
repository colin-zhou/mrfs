# -*- coding: utf-8 -*-

import pymysql



conn = pymysql.connect(host='127.0.0.1', user='root', password='123456',
                       port=3306, cursorclass=pymysql.cursors.DictCursor)


try:
    with conn.cursor() as cursor:
        sql = "insert into users (`email`, `password`) values ('t@qq.com', 'secret')";
        cursor.execute(sql)

    conn.commit()

    with conn.cursor() as cursor:
        sql = "select * from users where email='t@qq.com'";
        cursor.execute(sql)
        result = cursor.fetchone()
        print(result)
finally:
    conn.close()

