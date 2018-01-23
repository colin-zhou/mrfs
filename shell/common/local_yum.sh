#/usr/bin/env bash


##############################################################
################ install python3.5 env #######################
##############################################################

##############################################################
###### should prepare all necessary package in direcotry #####
##############################################################


DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"


cd /etc/yum.repos.d/
touch localsource.repo
echo -e "[localsource]\nname=localsource\nbaseurl=file://$DIR\nenabled=1\ngpgcheck=0" > localsource.repo


# yum install -y createrepo
# cd /root/py35_all
# createrepo

yum install -y --disablerepo=* --enablerepo=localsource python35u python35u-devel python35u-pip
#
#

cd $DIR
pip3.5 install ./numpy-1.13.3-cp35-cp35m-manylinux1_x86_64.whl
pip3.5 install ./six-1.11.0-py2.py3-none-any.whl
pip3.5 install ./pytz-2017.3-py2.py3-none-any.whl
pip3.5 install ./python_dateutil-2.6.1-py2.py3-none-any.whl
pip3.5 install ./pandas-0.21.1-cp35-cp35m-manylinux1_x86_64.whl
pip3.5 install ./qPython-1.2.2.tar.gz
