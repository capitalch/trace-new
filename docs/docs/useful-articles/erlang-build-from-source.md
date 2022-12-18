---
layout: default
title: Erlang RabbitMQ from source
nav_order: 1
parent: Useful articles
---

### What we are going to do

- We shall install the latest version of Erlang (25.1)on Ubuntu Jammy (22.04)
- The two blog articles [Compile Erlang from source](https://www.erlang.org/doc/installation_guide/install) and [Pre-requisites for Erlang compilation from source](https://blog.differentpla.net/blog/2019/01/30/erlang-build-prerequisites/) were useful.

- download Erlang source and upload it to home folder of cloudjiffy from <http://www.erlang.org>. Its a tar file.
- Unpack and change directory and do some settings
    ```ubuntu
    tar -zxf otp_src_25.1.2.tar.gz
    cd otp_src_25.1.2
    export ERL_TOP='pwd'
    export LANG=C
    ```

- Install pre-requisites
    ```
    sudo apt-get install build-essential
    sudo apt-get -y install autoconf m4  
    sudo apt-get -y install libssl-dev  
    sudo apt-get -y install libncurses5-dev
    sudo apt-get -y install libwxgtk3.0-gtk3-dev

    mkdir -p /usr/share/man/man1
    sudo apt-get -y install default-jdk
    sudo apt-get -y install unixodbc-dev

    sudo apt-get -y install xsltproc fop libxml2-utils
    ```
- Configure and make. the make command will take time to complile.
```
./configure
make
```
- Now install
```
make install
```
- Erlang is installed. Now check erlang with `erl` command. Press CTRL-C to come out of Erlang interpreter. The erl will show that Erlang OTP 25 is installed.




