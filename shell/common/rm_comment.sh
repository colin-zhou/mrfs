#!/bin/bash


function usage()
{
    echo "usage: $0 ./somefile"
    echo "make sure the file exist!!!!"
    exit 1;
}


if [ $# != 1 ];then
    usage;
fi

if [ ! -f $1 ];then
    echo "file $1 not exist!!!"
    exit 1;
fi

sed -i -e 's/^\s*#.*$//' -e '/^\s*$/d' $1
