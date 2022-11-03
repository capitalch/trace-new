---
layout: default
title: Environment2 setup
parent: Cloud server
nav_order: 3
---

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
1. **Create Ubuntu environment**

    Created new environment from Docker image Ubuntu, in Cloudjiffy custom setup and activated https. You can connect to this new environment in three manner: **1) Web SSH, 2) Through puttygen and putty client using private and public key, 3) Using command line and login by using SSH gate command** and password provided on main while generating the environment.

2. **Setup RabbitMQ in ubuntu environment**
    - At first install erlang
    ```
    apt update && apt upgrade
    ```
    If you face any issues regarding openjdk-11, specially in docker container like instance case, run this command. This is a hack.

        ```
        mkdir -p /usr/share/man/man1
        ```

    - Add RabbitMQ latest repository
    ```
    curl -s https://packagecloud.io/install/repositories/rabbitmq/rabbitmq-server/script.deb.sh | sudo bash
    ```
    - Update package list and then install RabbitMQ
    ```
    apt update && apt install rabbitmq-server
    ```