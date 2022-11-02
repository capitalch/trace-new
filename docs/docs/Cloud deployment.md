---
layout: default
title: Cloud deployment
nav_order: 2
---

# Cloud deployment and configuration

What we are going to do
{: .fs-6 }
We shall create two servers in Cloudjiffy environment, although one server could do the work. Reason is to distribute the load. Its a complex process which consists of configuring Ubuntu docker containers, Nginx, Ubuntu VPS for RabbitMQ, node.js based socket server to connect browser based clients and also to connect RabbitMQ

1. ### Configure an Ubuntu server named as **Fastapi server** in the cloudjiffy environment which will do the following:
- React web app will be served from port 80 and the fastapi will be available from **/api** route.
- We will use Docker image for latest version of Ubuntu and install Nginx as proxy server in it. All calls to the host will hit the proxy server and the proxy server will route the default port 80 calls to serve index.html of react web application. 
- Proxy server will also route /api calls to fastapi. The fastapi is started through an asgi server uvicorn. The uvicorn in turn will be managed by Gunicorn. The gunicorn, uvicorn and fastapi web server application should be started by linux service, so that we need not have to manually start it each time the web server starts.
- We selected nginx as proxy server this because it is very easy to configure nginx for the required purpose. We rejected the default apache2 or httpd server which is available by default when you select python as platform. We could not configure apache2 appropriately.

2. ### Configure another Ubuntu server named as **Socket server** in cloudjiffy environment which will do the following:
- Provision the RabbitMQ queue as autostart Linux service.
- Provision Socket.io node.js server as autostart Linux service which will subscribe to RabbitMQ and also interact with React browser based application. It is worth noting that we found socket.io as reliable library which autoconnects predictably. We also checked WebSocket and ws which had their own shortcomings. Also the browsers do not directly connect reliably with RabbitMQ. We did required research.

Detailed steps
{: .fs-7 .fw-600}

Part - 1: Fastapi server
{: .fs-6 .fw-500}

I am influenced by [This](https://www.vultr.com/es/docs/how-to-deploy-fastapi-applications-with-gunicorn-and-nginx-on-ubuntu-20-04/?lang=es&utm_source=performance-max-apac&utm_medium=paidmedia&obility_id=16876059738&utm_adgroup=&utm_campaign=&utm_term=&utm_content=&gclid=CjwKCAjw5P2aBhAlEiwAAdY7dIBuAX_1_n62r4ty-lE-oau5SVqf-Yrv-K3QbtD0-3tR6y7ca2JUUhoCCmYQAvD_BwE) and [This](https://dev.to/shuv1824/deploy-fastapi-application-on-ubuntu-with-nginx-gunicorn-and-uvicorn-3mbl) blog articles.

[Click here for running Linux commands using SSH at your local windows desktop](../putty-ssh)
1. Create environment

    Login to <https://app.cloudjiffy.com>. Click **_new environment_**, select **_custom_**, select image of Ubuntu after searching and selecting **_Ubuntu_** as docker container from Docker hub. Give an environment name of your choice. My environment name was **_trace-plus-dev_**. Adjust the cloudlets and enable SSL.

    ![New environment](../../assets/images/new-env.png "New environment")
2. Initialize application server

    - Use web SSH. Execute following code in one go by copy paste to command line or execute one by one to do following stuff. Create directory _/home/api-server_. Change directory to _/home/api-server_. Create _Python virtual environment(venv)_ and _activate_ it.

    ```ubuntu
    mkdir /home/api-server && mkdir /home/api-server/logs && cd /home/api-server && sudo apt update && sudo apt install python3-venv && python3 -m venv venv && source venv/bin/activate
    ```

    - Install gunicorn, uvicorn and fastapi[all] in **_venv_**. The fastapi[all] includes uvicorn and many other dependencies.
    ```ubuntu
    pip install wheel && pip install fastapi[all] && pip install gunicorn
    ```
    - Upload following app.py file to the api-server folder
    ```python
    from fastapi import FastAPI
        app = FastAPI()
        @app.get("/api")
        async def home():
            return {"message": "Hello World for api"}
    ```


    - Now its time to check your so far work. Open two SSH windows of cloudjiffy. One is web SSH in the cloudjiffy screen itself and another one open through putty [as explained here](../putty-ssh). In one SSH window start your application using uvicorn as
    ```ubuntu
    cd /home/api-server && uvicorn app:app
    ```
    The uvicorn server runs on port 8000 by default. So in another SSH window give command as `curl http://localhost:8000`. The output should be **Hello World** as is expected from the output of fastapi app. Final folder structure in Cloudjiffy is as follows:

        ![Folder structure](../../assets/images/folder-structure.png "Folder structure")

3. Using Gunicorn, start uvicorn server which in turn runs fastapi
    - At first test Gunicorn server. Start Gunicorn in one SSH window.
    ```
    cd /home/api-server && source venv/bin/activate && gunicorn app:app -k uvicorn.workers.UvicornWorker
    ```
    Check the url in another SSH window through putty. Output should be **Hello World**.
    `curl http://localhost:8000`
    Here the Gunicorn server activates uvicorn server.
4. Create Linux autostart service (Systemd service). Create a new gunicorn_conf.py  file in folder `/home/api-server` with following code:
    ```
    from multiprocessing import cpu_count
    # Socket Path
    bind = 'unix:/home/api-server/gunicorn.sock'
    # Worker Options
    workers = cpu_count() + 1
    worker_class = 'uvicorn.workers.UvicornWorker'
    # Logging Options
    loglevel = 'debug'
    accesslog = '/home/api-server/logs/access_log'
    errorlog =  '/home/api-server/logs/error_log'
    ```
    
    {: .highlight }
    Gunicorn starts uvicorn as worker process. Ideally workers should be cpu count + 1. Bind command creates a unix domain socket which is very effecient for inter process communication in same server. Alternative is _http://_ which is comparatively slow. Please take care of proper indentation in file gunicorn_conf.py.

    Create a file as `/etc/systemd/system/api-server.service` with following code
    ```
    [Unit]
    Description=Gunicorn Daemon for FastAPI Application
    After=network.target
    
    [Service]
    User=root
    Group=www-data
    WorkingDirectory=/home/api-server
    ExecStart=/home/api-server/venv/bin/gunicorn -c gunicorn_conf.py app:app

    [Install]
    WantedBy=multi-user.target
    ```

    Enable and start the service and check the status
    ```
    sudo systemctl enable api-server
    sudo systemctl start api-server
    sudo systemctl status api-server
    ```

    {: .highlight}
    If everything is fine then following screen should appear

    ![Gunicorn status](../../assets/images/gunicorn-status.png "Gunicorn status")

5. Configure Nginx to serve React web application at default route ('/') and also the api's at ('/api'), both together in the same host. Nginx is an open-source, lightweight & powerful web server. It is recommended to use Nginx as a reverse proxy for seamless request handling. Also, you can take advantage of Nginx's vhost / virtual server feature to host multiple web applications on a single host if you wish to do so.
    - Install nginx

    ```
    sudo apt update && sudo apt install nginx
    ```

    - Add a file api-server in `/etc/nginx/sites-available` with following content

    ```
    server {
    listen 80;
    server_name trace-plus-dev.cloudjiffy.net www.trace-plus-dev.cloudjiffy.net;
    location /api {
        proxy_pass http://unix:/home/api-server/gunicorn.sock;
    }
    
    location / {
        root /home/build;
    }
}
    ```

    {: .highlight}
    There are two location attributes. The first one serves the api from fastapi at url `http://hostname/api` and second one serves the react application at `http://hostname/`

    - Add a softlink to above file in `/etc/nginx/sites-enabled`
    ```
    sudo ln -s /etc/nginx/sites-available/api-server /etc/nginx/sites-enabled/
    ```

    {: .highlight}
    Soft links in Linux are like shortcuts in Windows.

    - Test the configuration of Nginx
    `sudo nginx -t`. You will receive success message.

    - Now reload the Nginx service. The options are **enable, disable, start, stop, reload, status**
    `sudo systemctl reload nginx`

    {: .highlight}
    In case nginx service is not active, you need to enable and then start it

    - Restart the environment application server and check from browser `https://trace-plus-dev.cloudjiffy.net/api`. In case https is not enabled in your environment, enable https in cloudjiffy environment; its free.

    - Upload react application as build folder in `/home` directory and check at browser url `https://trace-plus-dev.cloudjiffy.net`. It worked with me.

    




