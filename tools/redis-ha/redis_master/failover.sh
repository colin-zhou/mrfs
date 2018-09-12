#!/bin/bash

MASTER_IP=${6}
MY_IP='192.168.1.16'
VIP='192.168.1.220'
NETMASK='24'
INTERFACE='ens2f0'

# echo $MASTER_IP > /home/rss/colin/redis_test/haha

if [ ${MASTER_IP} = ${MY_IP} ]; then
        sudo /sbin/ip addr add ${VIP}/${NETMASK} dev ${INTERFACE}
        sudo /sbin/arping -q -c 3 -A ${VIP} -I ${INTERFACE}
        exit 0
else
        sudo /sbin/ip addr del ${VIP}/${NETMASK} dev ${INTERFACE}
        exit 0
fi
exit 1
