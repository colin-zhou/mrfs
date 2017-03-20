set nocompatible              " be iMproved, required
filetype off                  " required
" color molokai
set wildmenu

" set the runtime path to include Vundle and initialize
if version >= 500
    set rtp+=~/.vim/bundle/Vundle.vim
    call vundle#begin()
    " alternatively, pass a path where Vundle should install plugins
    "call vundle#begin('~/some/path/here')
    
    " let Vundle manage Vundle, required
    Plugin 'VundleVim/Vundle.vim'
    "
    " The following are examples of different formats supported.
    " Keep Plugin commands between vundle#begin/end.
    " plugin on GitHub repo
    " Plugin 'tpope/vim-fugitive'
    " plugin from http://vim-scripts.org/vim/scripts.html
    " Plugin 'L9'
    " Git plugin not hosted on GitHub
    " Plugin 'git://git.wincent.com/command-t.git'
    " git repos on your local machine (i.e. when working on your own plugin)
    " Plugin 'file:///home/gmarik/path/to/plugin'
    " The sparkup vim script is in a subdirectory of this repo called vim.
    " Pass the path to set the runtimepath properly.
    " Plugin 'rstacruz/sparkup', {'rtp': 'vim/'}
    " Install L9 and avoid a Naming conflict if you've already installed a
    " different version somewhere else.
    " Plugin 'ascenator/L9', {'name': 'newL9'}
    Plugin 'scrooloose/nerdtree'
    Plugin 'scrooloose/syntastic'
    Plugin 'scrooloose/nerdcommenter'
    Plugin 'tpope/vim-surround'
    Plugin 'kien/ctrlp.vim'
    Plugin 'bling/vim-airline'
    Plugin 'majutsushi/tagbar'
    Plugin 'airblade/vim-gitgutter'
    Plugin 'pangloss/vim-javascript'
    Plugin 'mattn/emmet-vim'
    Plugin 'ervandew/supertab'
    Plugin 'nathanaelkane/vim-indent-guides'
    Plugin 'brookhong/cscope.vim'
    " Plugin 'klen/python-mode'
    Plugin 'taglist.vim'
    
    " All of your Plugins must be added before the following line
    call vundle#end()            " required
    filetype plugin indent on    " required
endif

" To ignore plugin indent changes, instead use:
"filetype plugin on
"
" Brief help
" :PluginList       - lists configured plugins
" :PluginInstall    - installs plugins; append `!` to update or just
" :PluginUpdate
" :PluginSearch foo - searches for foo; append `!` to refresh local cache
" :PluginClean      - confirms removal of unused plugins; append `!` to auto-approve removal
"
" see :h vundle for more details or wiki for FAQ
" Put your non-Plugin stuff after this line

"show row number
set nu
"sudo save the file
command W w !sudo tee % > /dev/null
"redefine tab as 4 spaces(tabstop->effectively the width of an actual tab character)
set ts=4
set softtabstop=4
set shiftwidth=4
set autoindent
set cindent
set cinoptions={0,1s,t0,n-2,p2s,(03s,=.5s,>1s,=1s,:1s
"insert spaces instead of tab characters
set expandtab
set wrap
set textwidth=0 wrapmargin=0
set tags=./tags;/
" indent

" cscope part
nmap <F6> :cn<cr>
nmap <F7> :cp<cr>
map <F5> :!cscope -Rbq<CR>:cs reset<CR><CR>

" make comments looks better
hi Comment ctermfg=6 

" support paste auto indent
set pastetoggle=<F2>
