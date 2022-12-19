---
layout: default
title: Home
nav_order: 1
description: "Trace financial accounting software technical specifications"
permalink: /
---

# Platform and technology

Trace version 2.0 is developed new from scratch. Several technologies used in Trace version 1.0 are deprecated. In the cloud now, **RabbitMQ** is proposed for messaging purposes. **FastAPI** is being used instead of **Flask**. At client side **React version 18.x** is being used. For UI **Material-UI** is now discarded and **Chakra UI** along with **Ant design** is being used, although data grid of Material-ui (now MUI) is proposed to be used.

---

## This documentation
Documentation site is create using `jekyll` tool using *just the docs* template. Documentation site is enabled in `github` in the `docs` folder and appropriate settings are done in `github`. We had installed `ruby` and `jekyll` in local machine to visualize this documentation site locally. It is proposed that the documentation would proceed side by side along with the project development process.

## Cloud platform
> We selected **Jelastic cloud** which is based on **Virtuozzo** application platform. Cloudjiffy is service providers for Jelastic. This platform is flexible and economical in comparison to other cloud platforms like DigitalOcean, Amazon AWS, Microsoft Azure, Google cloud or Heroku.

> We hosted the application at **Cloudjiffy**. The url is [Here](https://app.cloudjiffy.com). You need to login by providing user ID and password.

> The platform provides docker containers. You can select any container available in docker hub. 

---

## Server technologies

> *Database*              : **PostgreSQL**

> *API*        : **Fastapi with GraphQL using Ariadne schema generator**

> *Programming language*  : **Python**

> *Deployed in*           : **Ubuntu docker + Nginx as reverse proxy + Gunicorn + uvicorn + fastapi**

> Queue: **RabbitMQ**

> Sockets: **socket.io**

> Socket server for front end: **Node.js**

---

## Client technologies

> **React.js**

> **Material-UI**

> **chakra-ui**

> **ant design**

> **prime-react**

> **TypeScript**

> **Socket.io**

> **GraphQL**

> **React signals** for state management
