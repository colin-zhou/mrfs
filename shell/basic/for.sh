#!/bin/sh

for foo in bar fud 34
do
	echo $foo
done

for file in $(ls f*.sh);do
	echo  $file
done
exit 0
