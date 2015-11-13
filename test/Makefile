main:main.cpp py_agent.o
	g++ -I/usr/include/python2.7/ -L/usr/lib -lpython2.7 -lpthread -o $@ $^
py_agent.o:py_agent.cpp
	g++ -c -I/usr/include/python2.7/ -L/usr/lib -lpython2.7 -lpthread -o $@ $^