#!/bin/bash

usage()
{
    echo "usage: $0 prog_name"
    exit 0
}

if [[ $# == "1" ]]; then
    # ps -ajxf | grep $1 | awk '$1=="1"{print $2}' | xargs -I {} -n 1 sh -c 'echo prog: $1 -> pid: {}';
    cmd_line="echo \"prog: $1\""
    ps -ajxf | grep $1 | awk '$1=="1"{print $2}' | xargs -I {} sh -c "$cmd_line pid: {}"
else
    usage;
fi
