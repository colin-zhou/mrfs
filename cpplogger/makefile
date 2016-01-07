VER_MAJ:=0
VER_MIN:=1
DEBUG:=n
CC:=g++
TOP:=../../..
SRCS:=$(wildcard *.cpp)
OBJS:=$(patsubst %.cpp,%.o,${SRCS})
INCPATH:=-I.
CFLAGS:=${INCPATH} -fPIC -std=c++11 -pthread
LIBPATH:=
LDFLAGS:=${LIBPATH} -pthread
LIBNAME:=liblogger.a
OUT:=$(LIBNAME)

GCH:=
DEP:=.dep

ifeq ($(strip $(DEBUG)), y)
 LDFLAGS +=
 CFLAGS += -O0 -g2
else
 CFLAGS += -Wall -O2 -DNDEBUG
endif

all:${OUT}

$(OUT):$(GCH) $(OBJS)
	ar crs $(OUT) $(OBJS)

%.o:%.cpp
	g++ -c $(CFLAGS) $< -o $@

dep:
	$(CC) $(CFLAGS) -MM $(SRCS) > $(DEP)

-include $(DEP)
vi:
	vi -p *.h *.cpp makefile
debug:
	@echo $(VAR_MAJ)
	@echo $(VER_MIN)
install:

clean:
	-@rm -f *.o || True
	-@rm -f $(OUT) || True

distclean:
	-@rm -f $(GCH) || True
	-@rm -f *.o || True
	-@rm -f $(OUT) || True
