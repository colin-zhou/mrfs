# install all the necessary programs


# install brew and cask source
xcode-select --install
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
brew doctor
brew install caskroom/cask/brew-cask
brew install git
# usage brew cask install/remove/search name


# replace source with ustc
cd "$(brew --repo)"
git remote set-url origin https://mirrors.ustc.edu.cn/brew.git
cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
git remote set-url origin https://mirrors.ustc.edu.cn/homebrew-core.git


# install zsh update the zsh theme
brew install zsh
brew install wget
brew install curl
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
npm install -g spaceship-zsh-theme

# basic software