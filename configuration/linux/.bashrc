# ~/.bashrc: executed by bash(1) for non-login shells.

# Note: PS1 and umask are already set in /etc/profile. You should not
# need this unless you want different defaults for root.
# PS1='${debian_chroot:+($debian_chroot)}\h:\w\$ '
# umask 022
# params for kdb
export QHOME=~/q/
export PATH=$PATH:$QHOME/l32

# You may uncomment the following lines if you want `ls' to be colorized:
export LS_OPTIONS='--color=auto'
eval "`dircolors`"

alias df='df -h'
alias gt='gnome-terminal'
alias gtnt='gnome-terminal --tab'

alias ls='ls $LS_OPTIONS'
alias ll='ls $LS_OPTIONS -l'
alias l='ls $LS_OPTIONS -lA'
alias lf='ls $LS_OPTIONS -F'
alias la='ls $LS_OPTIONS -a'
alias pbcopy='xclip -selection clipboard'
alias pbpaste='xclip -selection clipboard -o'
alias jslint='/home/rss/node_modules/jslint/bin/jslint.js'
alias lsd='ls -ld */'
alias lss='find ./ -name "*.cpp" -o -name "*.c" -o -name "*.h"'
alias q='QHOME=~/q rlwrap -r ~/q/m32/q'
#alias vim='vim -p'
alias mytop='top -u $(whoami)'

#
# Some more alias to avoid making mistakes:
# alias rm='rm -i'
# alias cp='cp -i'
# alias mv='mv -i'
alias ..='cd ..'
alias ...='cd ../..'
alias aclocal-1.6='aclocal-1.14'
alias cdsite='cd ~/nrss/rss/src/rss/site'
alias cdrt='cd ~/nrss/rss/src/rss/new_rtserver'
alias cdrss='cd ~/nrss/rss'
alias cdagent='cd ~/nrss/rss/src/rss/rss_agent/rss/src'
alias cdgit='cd ~/Git/'
alias cdjs='cd /home/rss/nrss/rss/src/rss/site/core/static/platform/js'
alias cdinc='cd /home/rss/nrss/rss/src/rss/lib/include'
alias g='grep --color=always -EnR '
alias q='$QHOME/l32/q'

# from the "xttitle(1)" man page - put info in window title  
update_title()
{  
#	  [ $TERM = xterm -o $TERM = xterm-color ] && xttitle "[$$] ${USER}@${HOSTNAME}:$PWD"
	ip=`/sbin/ifconfig |grep "inet addr"|head -n 1|awk -F "." {'print $4'}|awk -F " " {'print $1'}`
#	[ $TERM = xterm -o $TERM = xterm-color ] && xttitle "[$$] $(basename `pwd`)"
	dir=$(basename `pwd`)
	title="$ip""-""$dir"
	[ $TERM = xterm -o $TERM = xterm-color ] && xttitle "[$$] $title"
}

cd()
{  
	builtin cd "${@}"
	update_title
}

# find in glibc include files
flibc() {
    grep "${@}" --color=always -EnR "/usr/src/glibc-2.19"
}

# find in glibc source code file 
fhead() {
    grep "${@}" --color=always -EnR "/usr/include"
}

# find api in 2, 3 volumns in man
fman() {
    apropos "${@}" | grep "([23])"
}
# store current path 
spwd() {
    echo "cd `pwd`" >/tmp/cwd 
}
rpwd() {
    . /tmp/cwd
}

PS1='\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[1;31m\]($?)\[\033[00m\]\$ '

export GTK_IM_MODULE=fcitx
export XMODIFIERS=@im=ibus
export QT_IM_MODULE=ibus
export PATH=$PATH:~/nrss/arcanist/bin/:/usr/local/bin

if [ -d /home/colin/bin ]; then
    export PATH=$PATH:/home/colin/bin
fi

ulimit -c unlimited

# tab prompt
if [ -f /etc/bash_completion.d/git-prompt ]; then
    source /etc/bash_completion.d/git-prompt > /dev/null 2>&1
    export PS1='\[\033[01;32m\]\u@\h\[\033[01;34m\]\w\[\033[01;31m\]$(__git_ps1)\[\033[01;34m\]($?)\[\033[00m\]\$ '
    export GIT_PS1_SHOWDIRTYSTATE=1
fi

# A wide range extractor
extract () {
    if [ ! -f "$1" ] ; then
        echo "'$1' does not exist."
        return 1
    fi

    case "$1" in
        *.tar.bz2)   tar xvjf "$1"   ;;
        *.tar.xz)    tar xvJf "$1"   ;;
        *.tar.gz)    tar xvzf "$1"   ;;
        *.bz2)       bunzip2 "$1"    ;;
        *.rar)       rar x "$1"      ;;
        *.gz)        gunzip "$1"     ;;
        *.tar)       tar xvf "$1"    ;;
        *.tbz2)      tar xvjf "$1"   ;;
        *.tgz)       tar xvzf "$1"   ;;
        *.zip)       unzip "$1"      ;;
        *.Z)         uncompress "$1" ;;
        *.7z)        7z x "$1"       ;;
        *.a)         ar x "$1"       ;;
        *)           echo "Unable to extract '$1'." ;;
    esac
}

# add gtest path
if [ -d /opt/gtest/ ];then
    export GTEST_HOME=/opt/gtest/
    export LD_LIBRARY_PATH=$GTEST_HOME/lib:$LD_LIBRARY_PATH
fi

# git top two commit diff
commitdiff () {
    git log | grep "commit" | awk 'NR==1,NR==2{print $2}' | tac | xargs git diff
}

# autojump
[[ -s /usr/share/autojump/autojump.sh ]] && source /usr/share/autojump/autojump.sh

# find source code
ff () {
    find . -name "*$@*" -print; 
}
fff () {
    find . -type f -print0 | xargs -0 grep -l $@
}

# check if dos or unix
checkdos() {
    if awk  '/\r$/{exit 0;} 1{exit 1;}' $1; then
        echo "$1 is DOS"
    #else
    #    echo "$1 not DOS"
    fi
}

checkcurdos() {
    files=$(find ./ -name "*.h" -o -name "*.cpp" -o -name "*.c")
    for file in $files; do
        checkdos $file
    done
}

has_debug_info() {
    readelf -S "$1" | grep -q " \(.debug_info\)\|\(.gnu_debuglink\) "
}

# added by Anaconda3 4.2.0 installer
if [ -d /home/colin/anaconda3/bin ];then
    export PATH="/home/colin/anaconda3/bin:$PATH"
fi

# set color mainly for remote connections
if [ -e /usr/share/terminfo/x/xterm-256color ]; then
    export TERM='xterm-256color'
else
    export TERM='xterm-color'
fi

cpu_num() {
    cat /proc/cpuinfo|grep "physical id" |grep "0"|wc -l
}

# ls file and directory
lsfile () {
    ls -la | grep '^-'
}

lsdir () {
    ls -la | grep '^d'
}
