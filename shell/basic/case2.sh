#!/bin/bash


echo "is it morning? answer yes or no"
read timeofday


case "$timeofday" in
	yes  | y | Yes | YES )
		echo "good morning"
		echo "up bright and early this morning"
		;;
	[nN]* )
		echo "good afternoon"
		;;
	*)
		echo "sorry, answer not recongnized"
		echo "please answer yes or no"
		exit 1
		;;
esac

exit 0
