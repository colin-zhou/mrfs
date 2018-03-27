# -std=c++11
LDFLAG:=$(shell python3.5-config --cflags)
INCLUDE:=$(shell python3.5-config --ldflags)
BSFLAG:=-Wall -g0 -O3 -fvisibility=hidden
SOFLAG:=-fPIC -shared -L.  -Wl,-rpath=./ -Wl,--no-undefined


ALL:
	cc -g0 -O3  merge_sort.c test.c -o test

wrapper:
	cc $(BSFLAG) $(SOFLAG) $(INCLUDE) $(LDFLAG) sort_wrapper.c merge_sort.c -o quote_sorter.so

clean:
	@rm -rf *.o test
