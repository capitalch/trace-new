---
layout: default
title: Jelastic SSH putty
# nav_exclude: true
parent: Useful articles
---

## Connect your windows desktop to Jelastic using SSH and putty


- You need two tools **_PuttyGen_** (For key generation) and **_putty client_** for this work to be completed successfully. Download and install them in your Windows machine from [Here](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html). This installs two softwares (**Puttygen** aka putty keygen and **putty** aka putty client) together.
- Run puttygen and generate RSA key. Store private key locally. You will require that later on. Insert .ppk entry in .gitignore file so that private key is not uploaded to GitHub

![putty ssh](../../../assets/images/putty-key-gen.png "putty ssh")

 - Copy and paste public key in Jelastic with a sensible name
 
![putty public key](../../../assets/images/putty-public-key.png "putty public key")

- Now run **putty** aka putty client. Give host name as in my case **143458-638@gate.cloudjiffy.com** and port as **3022**

- In Connection --> SSH -->auth --> Credentials browse for private key already stored earlier by you.

![private key](../../../assets/images/putty-private-key-browse.png "private key")

- Now save the session with meaningful environment name for later use. Finally click the open button. You will see following screen. For every application server / vps etc. you can create a session and load the session as required and connect to work in SSH mode.

![putty command line](../../../assets/images/putty-command-line.png "putty command line key")