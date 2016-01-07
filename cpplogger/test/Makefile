# Makefile template created by xuxx
# Revison: 20150817
# Project: 

CC:=g++ 
DEPS:=.dep

DEBUG:=y
TOP:=.
CPPFLAGS:=-std=c++11
CFLAGS:= -pthread -I..
LDFLAGS:= -pthread -L.. -llogger
OUT:=log_test
VER:=
SRCDIR:=.
SRC_TYPE=cpp

ifeq ($(strip $(DEBUG)),y)
	CFLAGS+=-g3 -O0 -DDEBUG
	OUT:=$(addsuffix .dbg, $(OUT))
else
	CFLAGS +=-O2 -Wall -DNDEBUG
endif

ifneq "$(strip $(VER))" ""
OUT:=$(addsuffix .$(VER), $(OUT))
endif 

SRCS:=$(foreach s, $(SRCDIR), $(wildcard $(s)/*.$(SRC_TYPE))) 
OBJS:=$(patsubst %.$(SRC_TYPE), %.o, $(SRCS)) 

all: $(OUT)

$(OUT):$(DEPS) $(SRCS) $(OBJS)
	$(CC) $(OBJS) $(LDFLAGS) -o $(OUT) 

.PHONY:dep
$(DEPS): $(SRCS)
dep:
	$(CC)  -MM $(CPPFLAGS) $(INCPATH) $(SRCS) >$(DEPS)

-include $(DEPS)

$(OBJS):$(DEPS) $(SRCS)

%.o: %.$(SRC_TYPE)
	$(CC) -c $(CPPFLAGS) $(CFLAGS) $(INCPATH) $< -o $@

vi:
	vim -p *.$(SRC_TYPE) *.h Makefile

version:
	@echo $(VERSION)

distclean:
	-@rm -f $(DEPS)
	-@rm -f $(OBJS) $(OUT)

clean:
	-@rm -f $(OBJS) $(OUT)

help:
	-@echo "all (default)"
	-@echo "vi"
	-@echo "clean"
	-@echo "distclean"
