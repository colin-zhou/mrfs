#!/bin/bash


VIP=192.168.1.220
ip_status=$(ip -f inet addr)
mysql_status=$(mysql -uroot -p123 -P 3307 -h $VIP -e "show status;")
content="${ip_status}<br/><br/><br/>${mysql_status}"

# echo $content

cat > /tmp/tmp.py << EOF
# -*- coding: utf-8 -*-

import sys
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


def notify_email(recipients, message, title='MyCapital Notification'):
    sender = ''
    smtp_server = 'smtp.qiye.163.com'
    username = sender
    # 需要填入正确的密码
    password = ''
    email_entity = MIMEMultipart('alternative')
    email_entity['From'] = sender
    email_entity['To'] = ','.join(recipients)
    email_entity['Subject'] = title
    body = '<p>%s</p>' % message
    html_text = MIMEText(body, 'html')
    email_entity.attach(html_text)
    try:
        smtp = smtplib.SMTP()
        smtp.connect(smtp_server)
        smtp.login(username, password)
        smtp.sendmail(sender, recipients, email_entity.as_string())
        return True
    except:
        return False
notify_email([''], """$content""".replace('\n', '<br/>'), 'MySQL Notification')
EOF

chmod 755 /tmp/tmp.py
python /tmp/tmp.py
