#!/bin/bash

redis-cli -p 26379 sentinel failover mymaster
