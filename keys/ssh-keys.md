trace-link ubunto app server
Login: root
Password: UyyF58B1qq

# erlang make
mkdir -p /usr/share/man/man1
tar -zxf otp_src_25.1.2.tar.gz
cd otp_src_25.1.2
export ERL_TOP=`pwd`
export LANG=C

sudo apt-get install build-essential
sudo apt-get -y install autoconf m4         # ./otp_build: autoconf: not found
sudo apt-get -y install libssl-dev          # No usable OpenSSL found
sudo apt-get -y install libncurses5-dev     # configure: error: No curses library functions found
sudo apt-get -y install libwxgtk3.0-gtk3-dev

# "optional"
sudo apt-get -y install default-jdk         # jinterface     : No Java compiler found
sudo apt-get -y install unixodbc-dev        # odbc           : ODBC library - link check failed

# These are for the documentation.
sudo apt-get -y install xsltproc fop libxml2-utils

./configure

make # takes a long time

## URLS for making Erlang
https://www.erlang.org/doc/installation_guide/install
https://blog.differentpla.net/blog/2019/01/30/erlang-build-prerequisites/




