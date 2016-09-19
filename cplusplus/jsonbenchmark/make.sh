cd $(pwd)
g++ -Wall -std=c++11 -I/usr/local/include/json-c -I/home/rss/nrss/rss/src/rss/lib/include -L/home/rss/nrss/rss/src/rss/lib/bin -o parse_time ./parse_time.cpp -l:libjsoncpp.a -ljson-c
gcc -Wall -I/usr/local/include/json-c -o json_parser ./json_parser.c -ljson-c
g++ -Wall -std=c++11 -I/usr/local/include/json-c -I/home/rss/nrss/rss/src/rss/lib/include -L/home/rss/nrss/rss/src/rss/lib/bin -o struct_time ./struct_time.cpp -l:libjsoncpp.a -ljson-c
