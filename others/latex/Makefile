SRC:=$(wildcard *.tex)
# SRC:=$(filter-out latex/bheader.tex, $(SRC))
BUILDER:=lualatex
TARGET:=$(patsubst %.tex, %.pdf, $(SRC))
OPT:= --halt-on-error --interaction=errorstopmode

all: $(TARGET)

%.pdf: %.tex
	$(BUILDER) $(OPT) $<

v:
	vi -p $(SRC)
w:
	open *.pdf
clean:
	@rm -f *.log *.nav *.out *.snm *.toc *.aux
mv:
	mv *.pdf build/
