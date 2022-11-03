---
layout: default
title: Environment1 setup
parent: Cloud server
nav_order: 3
---

Environment1 setup
{: .fs-7 .fw800}

What we are going to do
{: .fs-6 }

- Create an Ubuntu environment from latest docker image from docker hub
- Deploy and setup Gunicorn, uvicorn and fastapi and set them as self-start Linux service
- Install Nginx as reverse proxy server as self-start Linux service
- Deploy a fastapi app
- Deploy a React application
- Test **fastapi** and **react application** at _http://host/api_ and _http://host_ respectively

Detailed steps
{: .fs-7 .fw-600}
I have taken help from [This](https://www.vultr.com/es/docs/how-to-deploy-fastapi-applications-with-gunicorn-and-nginx-on-ubuntu-20-04/?lang=es&utm_source=performance-max-apac&utm_medium=paidmedia&obility_id=16876059738&utm_adgroup=&utm_campaign=&utm_term=&utm_content=&gclid=CjwKCAjw5P2aBhAlEiwAAdY7dIBuAX_1_n62r4ty-lE-oau5SVqf-Yrv-K3QbtD0-3tR6y7ca2JUUhoCCmYQAvD_BwE) blog article

[Click here to see how to run Linux commands using SSH at your local Windows desktop](../../putty-ssh)

1. Create environment

    Login to <https://app.cloudjiffy.com>. Click **_new environment_**, select **_custom_**, select image of Ubuntu after searching and selecting **_Ubuntu_** as docker container from Docker hub. Give an environment name of your choice. My environment name was **_trace_**. Adjust the cloudlets and enable SSL.

    ![New environment](../../../assets/images/new-env.png "New environment")

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

    - Now its time to check your work so far. Open two SSH windows of cloudjiffy. One is web SSH in the cloudjiffy screen itself and another one open through putty [as explained here](../../putty-ssh). In one SSH window start your application using uvicorn as
    ```ubuntu
    source venv/bin/activate && cd /home/api-server && uvicorn app:app
    ```
    The uvicorn server runs on port 8000 by default. So in another SSH window give command as `curl http://localhost:8000/api`. The output should be **Hello World** as is expected from the output of fastapi app. Final folder structure in Cloudjiffy is something like this:

        ![Folder structure](../../../assets/images/folder-structure.png "Folder structure")
    
3. Using Gunicorn, start uvicorn server which in turn runs fastapi
Press **ctrl-c** to come out to venv.
- At first, test Gunicorn server. Start Gunicorn in one SSH window.
```
gunicorn app:app -k uvicorn.workers.UvicornWorker
```
Check the url in another SSH window through putty. Output should be **Hello World**.
`curl http://localhost:8000/api`
Here the Gunicorn server activates uvicorn server. It is tested.

4. Create Linux autostart service (Systemd service). For that create a new **gunicorn_conf.py**  file in folder `/home/api-server` with following code:
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

    ![Gunicorn status](../../../assets/images/gunicorn-status.png "Gunicorn status")

5. Configure Nginx to serve React web application at default route ('/') and also the api's at ('/api'), both together in the same host. Nginx is an open-source, lightweight & powerful web server. It is recommended to use Nginx as a reverse proxy for seamless request handling. Also, you can take advantage of Nginx's vhost / virtual server feature to host multiple web applications on a single host if you wish to do so.
    - Install nginx at command prompt and not in venv

    ```
    sudo apt update && sudo apt install nginx
    ```

    - Add a file api-server in `/etc/nginx/sites-available` with following content. Replace host with your host name. In my case host was **trace** so my entry after 'listen 80' becomes `server_name trace.cloudjiffy.net www.trace.cloudjiffy.net`. The correct value in server_name line is important in following code; otherwise proper routing by Nginx will not happen.

    ```
    server {
    listen 80;
    server_name host.cloudjiffy.net www.host.cloudjiffy.net;
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

    - Add a softlink to above file in `/etc/nginx/sites-enabled` at command prompt and not in venv
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

    - Restart the environment application server and check from browser `https://host.cloudjiffy.net/api`. Replace host with your host name, in my case it was 'trace'. In case https is not enabled in your environment, enable https in cloudjiffy environment; its free.

    - Upload react application as build folder in `/home` directory and check at browser url `https://host.cloudjiffy.net`. It worked for me.


