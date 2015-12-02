OUT:= confuse_to_json
TOP:=..
# lib is very important
CFLAGS:= -I./lib/include  --std=c++11
LDFLASS:= -L./lib/bin  -l:libjsoncpp.a  -l:libconfuse.a

all: $(OUT)
        
# $< is the first relied on file
# $@ is the target file
# $^ is all files that relied on


$(OUT): confuse_to_json.o
	g++ $< $(LDFLASS) -o $@


confuse_to_json.o: confuse_to_json.cpp
	g++ -c $< $(CFLAGS) -Wall -g3 -O0 -o $@ 
