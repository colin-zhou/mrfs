# Path to your oh-my-zsh installation.
  export ZSH=/home/colin/.oh-my-zsh

# Set name of the theme to load.
# Look in ~/.oh-my-zsh/themes/
# Optionally, if you set this to "random", it'll load a random theme each
# time that oh-my-zsh is loaded.
ZSH_THEME="afowler"

# Uncomment the following line to use case-sensitive completion.
# CASE_SENSITIVE="true"

# Uncomment the following line to use hyphen-insensitive completion. Case
# sensitive completion must be off. _ and - will be interchangeable.
# HYPHEN_INSENSITIVE="true"

# Uncomment the following line to disable bi-weekly auto-update checks.
# DISABLE_AUTO_UPDATE="true"

# Uncomment the following line to change how often to auto-update (in days).
# export UPDATE_ZSH_DAYS=13

# Uncomment the following line to disable colors in ls.
# DISABLE_LS_COLORS="true"

# Uncomment the following line to disable auto-setting terminal title.
# DISABLE_AUTO_TITLE="true"

# Uncomment the following line to enable command auto-correction.
# ENABLE_CORRECTION="true"

# Uncomment the following line to display red dots whilst waiting for completion.
# COMPLETION_WAITING_DOTS="true"

# Uncomment the following line if you want to disable marking untracked files
# under VCS as dirty. This makes repository status check for large repositories
# much, much faster.
# DISABLE_UNTRACKED_FILES_DIRTY="true"

# Uncomment the following line if you want to change the command execution time
# stamp shown in the history command output.
# The optional three formats: "mm/dd/yyyy"|"dd.mm.yyyy"|"yyyy-mm-dd"
# HIST_STAMPS="mm/dd/yyyy"

# Would you like to use another custom folder than $ZSH/custom?
# ZSH_CUSTOM=/path/to/new-custom-folder

# Which plugins would you like to load? (plugins can be found in ~/.oh-my-zsh/plugins/*)
# Custom plugins may be added to ~/.oh-my-zsh/custom/plugins/
# Example format: plugins=(rails git textmate ruby lighthouse)
# Add wisely, as too many plugins slow down shell startup.
plugins=(git autojump)

# User configuration

# export PATH="/usr/bin:/bin:/usr/sbin:/sbin:$PATH"
export PATH="/home/colin/bin:/usr/local/texlive/2016/bin/x86_64-linux:$PATH"
export MANPATH="/usr/local/man:/usr/local/texlive/2016/texmf-dist/doc/man:$MANPATH"
export INFOPATH="/usr/local/texlive/2016/texmf-dist/doc/man:$INFOPATH"

source $ZSH/oh-my-zsh.sh

# You may need to manually set your language environment
export LANG=en_US.UTF-8

# Preferred editor for local and remote sessions
if [[ -n $SSH_CONNECTION ]]; then
   export EDITOR='vi'
else
   export EDITOR='vim'
fi

# Compilation flags
# export ARCHFLAGS="-arch x86_64"

# ssh
# export SSH_KEY_PATH="~/.ssh/dsa_id"

# Set personal aliases, overriding those provided by oh-my-zsh libs,
# plugins, and themes. Aliases can be placed here, though oh-my-zsh
# users are encouraged to define aliases within the ZSH_CUSTOM folder.
# For a full list of active aliases, run `alias`.
#
# Example aliases
alias zshconfig="mate ~/.zshrc"
alias ohmyzsh="mate ~/.oh-my-zsh"
alias g='grep --color=always -EnR '
alias pynb='jupyter notebook --notebook-dir=/home/colin/Workspace --no-browser >1 2>&1 &'

if [[ -d /home/colin/Git/arcanist ]]; then
    export PATH="$PATH:/home/colin/Git/arcanist/bin/:/opt/cmake-3.6.1/bin"
fi

if [[ -d /var/www/html/phabricator/arcanist/bin ]]; then
    export PATH="$PATH:/var/www/html/phabricator/arcanist/bin"
fi

if [[ -d /usr/local/vpnclient ]];then
    export PATH="$PATH:/usr/local/vpnclient"
fi

if [[ -d /opt/spark-2.2.0-bin-hadoop2.7 ]]; then
    export PATH="$PATH:/opt/spark-2.2.0-bin-hadoop2.7/bin"
fi


# for python virtual env
export WORKON_HOME=$HOME/.virtualenvs
if [[ -f /usr/bin/virtualenvwrapper.sh ]]; then
    source /usr/bin/virtualenvwrapper.sh
fi

# ls tcp connection
lscnt() {
    netstat -n | awk '/^tcp/ {++b[$NF]} END {for(a in b) print a, b[a]}'
}

if [[ -d /opt/q ]]; then
    export PATH=$PATH:/opt/q/l32
    export QHOME=/opt/q
    alias qq="rlwrap /opt/q/l32/q"
fi

[ -f ~/.fzf.zsh ] && source ~/.fzf.zsh
[ -f /usr/share/autojump/autojump.zsh ] && source /usr/share/autojump/autojump.zsh
