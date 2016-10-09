"""
Demonstrates how to use the blocking scheduler to schedule a job that executes on 3 second
intervals.
"""

from datetime import datetime
import os
import time

from apscheduler.schedulers.blocking import BlockingScheduler
from apscheduler.schedulers.background import BackgroundScheduler



def tick():
    print('Tick! The time is: %s' % datetime.now())


if __name__ == '__main__':
    #scheduler = BlockingScheduler()
    scheduler = BackgroundScheduler()
    scheduler.add_job(tick, 'interval', seconds=3, id='test')
    print('Press Ctrl+{0} to exit'.format('Break' if os.name == 'nt' else 'C'))

    try:
        scheduler.start()
	scheduler.reschedule_job('test', trigger='cron', minute='*/1')
	time.sleep(1000)
    except (KeyboardInterrupt, SystemExit):
        pass
