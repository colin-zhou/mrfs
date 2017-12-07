#!/bin/bash


systemctl restart redis

nohup sentry run web > /dev/null 2>&1 &
nohup sentry run worker > /dev/null 2>&1 &
nohup sentry run cron > /dev/null 2>&1 &
