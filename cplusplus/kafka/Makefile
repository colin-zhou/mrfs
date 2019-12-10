all:
	gcc producer.c -lrdkafka
	gcc -shared -fPIC -O0 -g3 kfk_inter.c -o libkfk_inter.so
	gcc -O0 -g3 -o test test.c -L./ -l:libkfk_inter.so -lrdkafka -Wl,-rpath,./
