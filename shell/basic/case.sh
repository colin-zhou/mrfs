#!/bin/bash

echo "is it morning ? please answer yes or no"
read timeofday

case "$timeofday" in
	yes) echo "good morning";;
	no ) echo "good afternoon";;
	y  ) echo "good morning";;
	n  ) echo "good afternoon";;
	*  ) echo "sorry, answer not recognized";;
esac

exit 0
