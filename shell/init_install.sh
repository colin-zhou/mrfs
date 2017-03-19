# fetch all configuration
cd ~ && mkdir Git && cd Git
git clone https://github.com/colin-zhou/mrfs

# install basic software
yum install epel-release
yum install mariadb mariadb-server
yum install python-pip
pip install --upgrade pip
git clone https://github.com/VundleVim/Vundle.vim.git ~/.vim/bundle/Vundle.vim
