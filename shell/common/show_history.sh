#!/bin/bash

if [[ $# == "1" ]];then
	git log --pretty=oneline --author="Zhou Chaolin" --after "$1" --abbrev-commit --reverse --shortstat --relative-date --name-only
fi
