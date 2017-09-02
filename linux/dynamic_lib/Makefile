all:
	gcc -c -Wall -Werror -fpic 1.c
	gcc -shared -o 1.so 1.o
	gcc -o 2 2.c -ldl
