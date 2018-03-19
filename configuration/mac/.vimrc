set encoding=utf-8
set nocompatible              " be iMproved, required
set guioptions-=r             " hide stroll bar
set guioptions-=L
set guioptions-=b

set showtabline=0             " hide top label line
set nowrap                    " not wrap line
set fileformat=unix           " use unix mode to save file
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
    Plugin 'lokaltog/vim-powerline'
    Plugin 'scrooloose/syntastic'
    Plugin 'scrooloose/nerdcommenter'
    Plugin 'tpope/vim-surround'
    Plugin 'kien/ctrlp.vim'
    Plugin 'bling/vim-airline'
    Plugin 'majutsushi/tagbar'
    " Plugin 'airblade/vim-gitgutter'
    " Plugin 'pangloss/vim-javascript'
    Plugin 'mattn/emmet-vim'
    Plugin 'ervandew/supertab'
    Plugin 'nathanaelkane/vim-indent-guides'
    Plugin 'brookhong/cscope.vim'
    " Plugin 'klen/python-mode'
    Plugin 'tell-k/vim-autopep8'
    Plugin 'Yggdroot/indentLine'
    " Plugin 'godlygeek/csapprox'
    Plugin 'taglist.vim'
    Plugin 'valloric/youcompleteme'
    
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
set showmatch    " show blancket
set scrolloff=5  " top and bottom 5 line
set laststatus=2 " two lines of command line
set fenc=utf-8   " encoding method
set backspace=2  " backspace items
set ignorecase   " ignore case
set incsearch
set hlsearch
set cursorline   " cursor currenct line
" set cursorcolumn " cursor currenct column
set cinoptions={0,1s,t0,n-2,p2s,(03s,=.5s,>1s,=1s,:1s

"insert spaces instead of tab characters
set expandtab
set wrap
set textwidth=0 wrapmargin=0
set tags=./tags;/
set ruler " make it show msg bottom
syntax on

" cscope part
" nmap <F6> :cn<cr>
" nmap <F7> :cp<cr>
" map <F5> :!cscope -Rbq<CR>:cs reset<CR><CR>

" make comments looks better
hi Comment ctermfg=6 

" support paste auto indent
set pastetoggle=<F2>

" nerdtree
map <leader>t :NERDTreeToggle<CR>
" show lines
let NERDTreeShowLineNumbers=1
let NERDTreeAutoCenter=1
" show the hidden file
let NERDTreeShowHidden=1
" set the window size
let NERDTreeWinSize=31
" share nerdtree before vim startup
let g:nerdtree_tabs_open_on_console_startup=1
" ignore file list
let NERDTreeIgnore=['\.pyc','\~$','\.swp']
" list bookmark list
let NERDTreeShowBookmarks=1
" if only open files in nerdtree then close
autocmd bufenter * if (winnr("$") == 1 && exists("b:NERDTreeType") &&b:NERDTreeType == "primary") | q | endif
" vim power-line
set laststatus=2
let g:Powerline_symbols='unicode'
set t_Co=256

" run python with f5 shortcut
map <F5> :Autopep8<CR> :w<CR> :call RunPython()<CR>
function RunPython()
    let mp = &makeprg
    let ef = &errorformat
    let exeFile = expand("%:t")
    setlocal makeprg=python\ -u
    set efm=%C\ %.%#,%A\ \ File\ \"%f\"\\,\ line\ %l%.%#,%Z%[%^\ ]%\\@=%m
    silent make %
    copen
    let &makeprg = mp
    let &errorformat = ef
endfunction

" for vim-autopep8
let g:indentLine_char='┆'  " indent guide line
let g:indentLine_enabled = 1
" autopep8 configuration
let g:autopep8_disable_show_diff=1

" map comment
map <F4> <leader>ci <CR>
