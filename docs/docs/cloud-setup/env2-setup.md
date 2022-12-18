---
layout: default
title: Environment2 setup
parent: Cloud server
nav_order: 2
---

{: .highlight}
We can avail hosting solutions like CloudAMQP or local RabbitMQ deployment. We decided to go for local RabbitMQ deployment.

What we are going to do
{: .fs-6 }
- Create a new cloudjiffy environment from Ubuntu docker image
- Install and expose the port of RabbitMQ server as an endpoint of Cloudjiffy
- Activate the RabbitMQ management server and expose the port for it as endpoint
- Ceate a node.js application and start it as service; expose its endpoint
- Create a new server for PostgreSQL and expose its endpoint
- Create a MongoDB server and expose its endpoint

Detailed steps for RabbitMQ server
{: .fs-6 .fw-600}

{: .note}
Erlang is a dependency of RabbitMQ. The Ubuntu repository does not have latest versions of both, Erlang and RabbitMQ. You need to register third party repositories of Erlang and RabbitMQ with Ubuntu to get their latest versions. At this point RabbitMQ 3.11.2, Erlang 25.1.2 and Ubuntu 22,04, Jammy are latest ones. [I followed this blog](https://www.cherryservers.com/blog/how-to-install-and-start-using-rabbitmq-on-ubuntu-22-04)

- **Create Ubuntu environment**

Created new environment from Docker image Ubuntu, in Cloudjiffy custom setup and activated https. You can connect to this new environment in three manner: 1) Web SSH, 2) Through puttygen and putty client using private and public key, 3) Using command line and login by using SSH gate command and password provided on main while generating the environment.

- **At first some pre-requisites**
```
apt-get install curl gnupg apt-transport-https -y
curl -1sLf "https://keys.openpgp.org/vks/v1/by-fingerprint/0A9AF2115F4687BD29803A206B73A36E6026DFCA" | sudo gpg --dearmor | sudo tee /usr/share/keyrings/com.rabbitmq.team.gpg > /dev/null
curl -1sLf "https://keyserver.ubuntu.com/pks/lookup?op=get&search=0xf77f1eda57ebb1cc" | sudo gpg --dearmor | sudo tee /usr/share/keyrings/net.launchpad.ppa.rabbitmq.erlang.gpg > /dev/null
curl -1sLf "https://packagecloud.io/rabbitmq/rabbitmq-server/gpgkey" | sudo gpg --dearmor | sudo tee /usr/share/keyrings/io.packagecloud.rabbitmq.gpg > /dev/null
```
- Create a file at **/etc/apt/sources.list.d/rabbitmq.list** and add these lines
```
deb [signed-by=/usr/share/keyrings/net.launchpad.ppa.rabbitmq.erlang.gpg] http://ppa.launchpad.net/rabbitmq/rabbitmq-erlang/ubuntu jammy main
deb-src [signed-by=/usr/share/keyrings/net.launchpad.ppa.rabbitmq.erlang.gpg] http://ppa.launchpad.net/rabbitmq/rabbitmq-erlang/ubuntu jammy main
deb [signed-by=/usr/share/keyrings/io.packagecloud.rabbitmq.gpg] https://packagecloud.io/rabbitmq/rabbitmq-server/ubuntu/ jammy main
deb-src [signed-by=/usr/share/keyrings/io.packagecloud.rabbitmq.gpg] https://packagecloud.io/rabbitmq/rabbitmq-server/ubuntu/ jammy main
```
- **Install Erlang**
```
apt-get update -y
apt-get install -y erlang-base erlang-asn1 erlang-crypto erlang-eldap erlang-ftp erlang-inets erlang-mnesia erlang-os-mon erlang-parsetools erlang-public-key  erlang-runtime-tools erlang-snmp erlang-ssl erlang-syntax-tools erlang-tftp erlang-tools erlang-xmerl
```

- **Finally rabbitmq-server**
```
apt-get install rabbitmq-server -y --fix-missing
```
- **Start rabbitmq server**
```
systemctl start rabbitmq-server
systemctl enable rabbitmq-server
systemctl status rabbitmq-server
rabbitmqctl version
```
It shows the version as 3.11.2, which is latest version so far.

- Create an endpoint in Cloudjiffy to connect the RabbitMQ server from outside. The private port for that endpoint should be 5672. To connect from outside you need to create a new user with required permissions.

{: .note}
If you want to install latest version of Erlang from source [follow the process as explained here](../erlang-build-from-source). I did it successfully. Although it is not required in the present case.

RabbitMQ management server
{: .fs-6 .fw-600}

- When the RabbitMQ service is on, give this command to enable RabbitMQ management.
```
rabbitmq-plugins enable rabbitmq_management
```
- Expose RabbitMQ management endpoint in cloudjiffy with 15672 as private port. Default username and password for RabbitMQ are **guest, guest**. They only work with localhost. You need to create another user with password and permissions when you ar connecting from outside localhost.

- I created a new admin user, made it administrator and set permissions by using rabbitmqctl commands explained later on. I was able to connect to cloudjiffy endpoint for management from the browser through the url <http://trace-link.cloudjiffy.net:11363/> by logging in with the new user.

Some useful RabbitMQ control commands using **rabbitmqctl**
{: .fs-6 .fw-600}

[Elaborated list of command and options](https://www.rabbitmq.com/rabbitmqctl.8.html#set_user_tags)

`rabbitmqctl version # shows version of rabbitMQ`

**Create new user**

`rabbitmqctl add_user username password # adds new user`

**Make the user as administrator**

`rabbitmqctl set_user_tags username administrator # set the user as administrator`

**Set permissions for user**

`rabbitmqctl set_permissions -p / username ".*" ".*" ".*" # Sets user permission to all`

`rabbitmqctl change_password username newpassword`

`rabbitmqctl delete_user username`

`rabbitmqctl list_users`

`rabbitmqctl list_user_permissions username`

`rabbitmqctl set_permissions`

Install node.js
{: .fs-6 .fw-600}

- Run following scripts. It installs node version 18.12.0 as on date
```
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs            
```
- Now install forever, express
```
cd /home && mkdir nodejs-server && cd nodejs-server
npm install express
npm install -g forever
```

