cd $(pwd)
#g++ -Wall -std=c++11 -I/usr/local/include/json-c -I/home/rss/nrss/rss/src/rss/lib/include -L/home/rss/nrss/rss/src/rss/lib/bin -o parse_time parson.c ./parse_time.cpp -l:libjsoncpp.a -ljson-c -l:libu.a -lm -lwjreader -lwjelement -l:libjansson.a
g++ -Wall -std=c++11 -I/usr/local/include/json-c -I/home/rss/nrss/rss/src/rss/lib/include -L/home/rss/nrss/rss/src/rss/lib/bin -o parse_time ./parse_time.cpp -l:libjsoncpp.a -l:libjansson.a
#g++ -Wall -std=c++11 -I/usr/local/include/json-c -I/home/rss/nrss/rss/src/rss/lib/include -L/home/rss/nrss/rss/src/rss/lib/bin -o struct_time parson.c ./struct_time.cpp -l:libjsoncpp.a -l:libu.a -ljson-c -lwjelement -lm
g++ -Wall -std=c++11 -I/usr/local/include/json-c -I/home/rss/nrss/rss/src/rss/lib/include -L/home/rss/nrss/rss/src/rss/lib/bin -o struct_time ./struct_time.cpp -l:libjsoncpp.a -l:libu.a -ljson-c -lwjelement -lm -l:libjansson.a
