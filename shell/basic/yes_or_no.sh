#!/bin/bash


yes_or_no(){
	echo "is your name $* ?"
	while true
	do
		echo -n "enter ye or no:"
		read x
		case "$x" in
			y | yes ) 	return 0;;
			n | no ) 	return 1;;
			*)			echo "answer yes or no"
		esac
	done
}

echo "original parameters are $*"

if yes_or_no "$1"
then
	echo "hi $1, nice name"
else
	echo "never mind"
fi

exit 0
