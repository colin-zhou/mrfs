main:main.cpp download.o
	g++ -Wall -I/usr/include/python2.7/ -L/usr/lib -lpython2.7 -lpthread -o $@ $^
download.o:download.cpp
	g++ -c -I/usr/include/python2.7/ -L/usr/lib -lpython2.7 -lpthread -o $@ $^