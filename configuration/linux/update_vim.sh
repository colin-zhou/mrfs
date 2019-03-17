#!/bin/bash

## cript update vim compiled with python

# Clean from standard vim
sudo apt-get remove --purge vim vim-runtime vim-gnome vim-tiny vim-common vim-gui-common
# install Vim dependency
sudo apt-get install liblua5.1-dev luajit libluajit-5.1 python3-dev libperl-dev libncurses5-dev ruby-dev

# Clean and prepare folders
sudo rm -rf /usr/local/share/vim
sudo rm -rf /usr/bin/vim
sudo mkdir /usr/include/lua5.1/include

# Download it and compile
cd /usr/local/src/
sudo git clone https://github.com/vim/vim
cd vim/src
sudo make distclean

sudo ./configure --with-features=huge \
            --enable-rubyinterp \
            --with-ruby-command=$(which ruby) \
            --enable-largefile \
            --disable-netbeans \
           	--enable-python3interp=yes \
			--with-python3-config-dir=$(python3-config --configdir) \
            --enable-perlinterp \
            --enable-luainterp \
            --with-luajit \
            --enable-gui=auto \
            --enable-fail-if-missing \
            --enable-cscope

sudo make
sudo make install
