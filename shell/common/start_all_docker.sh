#!/bin/bash


docker ps -a | awk '{print $1}' | grep -v CONT | xargs docker start
