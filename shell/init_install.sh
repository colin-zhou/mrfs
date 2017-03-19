# fetch all configuration
cd ~ && mkdir Git && cd Git
git clone https://github.com/colin-zhou/mrfs

# install basic software
yum install epel-release
yum install mariadb mariadb-server
yum install ncurses
yum install autojump-zsh

# shell zsh
yum install zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"

# python develop
yum install python-pip
yum install python-devel
pip install --upgrade pip
pip install MySQL-python
pip install sqlalchemy
pip install faker
git clone https://github.com/VundleVim/Vundle.vim.git ~/.vim/bundle/Vundle.vim
