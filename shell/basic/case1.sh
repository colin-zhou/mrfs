#!/bin/bash


echo "is it morning, please answer yes or no"
read timeofday


case "$timeofday" in
	yes | y | Yes | YES )	echo "good morning";;
	n* | N* )				echo "good afternoon";;
	* )						echo "sorry, answer not recongized"
esac

exit 0
