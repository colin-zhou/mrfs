Target = mocktrading.o
My = mytest

TopPath = ../../../../..
IncPath = -I./ -I$(TopPath)/lib/include
SrcPath = ./
LibPath = -L/usr/Lib -ldl -lpthread -L$(TopPath)/lib/bin -ltaskmgr -lrss_res_serializer
LibPathll = -L/usr/Lib -ldl -lpthread -L$(TopPath)/lib/bin -l:libjsoncpp.a -ltaskmgr -lrss_res_serializer -llogger

CC = gcc
CXX = g++
Flags = --std=c++11 -w -g
Dynamic = -fPIC -shared
AR = ar -rc
RANK = ranlib


DDDD = -fPIC

AllSrc := $(wildcard  $(SrcPath)/*.cpp)
AllFile := $(notdir $(AllSrc))
AllObj := $(patsubst %.cpp, %.o, $(AllFile))


all:$(My)

$(My):main.cpp mocktrading.o
	$(CXX) $^ $(Flags) $(DDDD) $(IncPath) $(LibPathll) -o $@
mocktrading.o:mocktrading.cpp
	$(CXX) $(Flags) $(Dynamic) -I$(TopPath)/lib/include -L$(TopPath)/lib/bin -ltaskmgr -llogger -c $^
	
# $(Target): $(AllFile)
# 	$(CXX) $(Flags) $(Dynamic) -c  $^  $(IncPath) 			 	# compile but not link
# 	$(CXX) $(Flags) $(Dynamic) -o  $@  $(AllObj) $(IncPath) $(LibPath) 	# compile a *.so file
# 	# cp $@ $(TopPath)/lib/bin

	

clean:
	rm -rf $(Target) *.o

