#!/bin/bash

redis-cli -p 26379 sentinel masters
redis-cli -p 26379 sentinel slaves mymaster
redis-cli -p 26379 info sentinel
redis-cli -p 26379 sentinel get-master-addr-by-name mymaster
