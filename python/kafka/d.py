# -*- coding: utf-8 -*-

from kafka import KafkaConsumer, KafkaProducer

consumer = KafkaConsumer('test', bootstrap_servers='localhost:9092', auto_offset_reset='earliest', consumer_timeout_ms=100)
producer = KafkaProducer(bootstrap_servers='localhost:9092')


def recv():
    for item in consumer:
        print(item)


def send():
    producer.send("test", b"colintest")



if __name__ == "__main__":
    for x in range(10):
        send()
    producer.flush()
    for x in range(10):
        recv()
