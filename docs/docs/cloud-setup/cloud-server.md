---
layout: default
title: Cloud server
nav_order: 2
has_children: true
---

![Server setup](../../../assets/images/server-setup.png "Server setup")


{: .highlight}
In environment1 we are creating an Nginx server as reverse proxy server. This serves the react app at port 80 ('/') and passes the api requests to fastapi which is hosted as Linux service on top of Gunicorn and uvicorn servers.

{: .highlight}
In environment2 we are exposing RabbitMQ server to outside world. And also we are creating node.js and python links which individually listens  to and sends data to RabbitMQ server. Also PostgreSQL and MongoDB are installed.

The above setup can very well be carried on with a VPS or VM in any reliable cloud hosting platform.



