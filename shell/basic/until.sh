#!/bin/bash

until who | grep "$1" > /dev/null
do
	sleep 10
done

echo -e "\a"
echo "**************** just logged in *************"
exit 0
