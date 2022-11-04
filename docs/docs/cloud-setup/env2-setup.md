---
layout: default
title: Environment2 setup
parent: Cloud server
nav_order: 3
---

{: .highlight}
We can avail hosting solutions like CloudAMQP or local RabbitMQ deployment. We decided to go for local RabbitMQ deployment.

What we are going to do
{: .fs-6 }
- Create a new cloudjiffy environment from Ubuntu docker image
- Install and expose the port of RabbitMQ server as an endpoint
- Activate the RabbitMQ management server and expose the port for it as endpoint
- Ceate a node.js application and start it as service; expose its endpoint
- Create a new server for PostgreSQL and expose its endpoint
- Create a MongoDB server and expose its endpoint

Detailed steps
{: .fs-6 .fw-600}

{: .note}
Erlang is a dependency of RabbitMQ. The Ubuntu repository does not have latest versions of both, Erlang and RabbitMQ. You need to register third party repositories of Erlang and RabbitMQ with Ubuntu to get their latest versions. The best way we found, was, get the latest version of Erlang available but not the latest version of RabbitMQ. Reason is latest version of RabbitMQ at this time was 3.11.2 which required Erlang version 25.1.2. But the latest version of Erlang is not installable; so latest version of RabbitMQ is also not installable. So remedy is install latest installable version of Erlang and install available version of RabbitMQ in the Ubuntu, which is 22.0.4, Jimmy, in the instance case.

1. **Create Ubuntu environment**

    Created new environment from Docker image Ubuntu, in Cloudjiffy custom setup and activated https. You can connect to this new environment in three manner: **1) Web SSH, 2) Through puttygen and putty client using private and public key, 3) Using command line and login by using SSH gate command** and password provided on main while generating the environment.

{: .note}
If you want to install latest version of RabbitMQ then you need to compile Erlang from source for its latest version and then install RabbitMQ server latest version 3.11.2 by [following the process as explained here](../erlang-build-from-source). I did it successfully.

2. **Install latest available version of Erlang by importing GPG key**
    ```
    cd /home
    sudo apt update
    sudo apt install curl software-properties-common apt-transport-https lsb-release
    curl -fsSL https://packages.erlang-solutions.com/ubuntu/erlang_solutions.asc | sudo gpg --dearmor -o /etc/apt/trusted.gpg.d/erlang.gpg
    ```
    Note that in folder /etc/apt/trusted.gpg.d a file erlang.gpg is written.
    I found openjdk-11-jre error. So I ran the command
    ```
    mkdir -p /usr/share/man/man1
    ```
    Now I uninstalled Erlang which was a failure due to openjdf-11 error and reinstalled it.
    ```
    apt purge erlang
    sudo apt autoremove
    sudo apt install erlang
    ```

2. **Install RabbitMQ**
    - Don't add any RabbitMQ latest repository
    ```
    apt update && apt install rabbitmq-server
    ```
    This installed RabbitMQ successfully.

3. **Enable rabbitmq service**
    ```
    sudo systemctl status rabbitmq-server
    sudo systemctl enable rabbitmq-server
    sudo systemctl start rabbitmq-server
    ```
    Again check the status if rabbitmq-server service is running. Now restart the host server and check the status of service; it should be active. Once the rabbitmq-server service is running, you can check the version of RabbitMQ by command `rabbitmqctl version`. My version was 3.9.13. The latest version was 3.11.2.