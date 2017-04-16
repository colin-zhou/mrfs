#!/usr/bin/env python


from celery import Celery

app = Celery('tasks', backend='redis://localhost',broker="amqp://localhost")

@app.task
def add(x, y):
    return x + y
