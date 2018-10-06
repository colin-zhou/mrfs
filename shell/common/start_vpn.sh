#!/bin/bash

/opt/vpnclient/vpnclient start
echo -e "2\n\naccountconnect myvpn" | /opt/vpnclient/vpncmd
ifconfig vpn_vpn 192.168.50.12

