# Preparation - Hands On 

## What you will be given during the workshop

Each participant will be given access to their own DO server. You need
 - the IP address of this server
 - the Domain associated with this server
 - the private key
 - the password

## 1. Get and install the SSH key
 
 Your host will distribute the private public key pair needed to access your Digital Ocean server.  
 
 On the mac you need to put these files into your ~/.ssh directory
 
    cd ~/.ssh
    vi sept24-ecdsa
    # copy and paste the private key your host will  give you. Save and exit (esc - :wq)
    vi sept24-ecdsa.pub
    # copy and paste the publci key below. Save and exit.

Public key

    ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBPr8DoUVJLe4IHUTlLCWQ5hOKsPBi7EeYueLGkOujqh18Dlk5CIBOnGqmU96TtQtYGQ3uNsblE5x2vPEIeSmTRI=    

Note sure if we need everything:

    ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBPr8DoUVJLe4IHUTlLCWQ5hOKsPBi7EeYueLGkOujqh18Dlk5CIBOnGqmU96TtQtYGQ3uNsblE5x2vPEIeSmTRI= bryangilbert@MacBook-Pro.local

## 2. Install key

Next add private key to the authentication agent. Your host will tell you the password during the workshop.

```
ssh-add ~/.ssh/sept24-ecdsa
```
## 3. Log on

After this you can log onto your server.  No password is needed because of the magic of ssh keys. This is very secure
because it's not possible to use ssh on these servers with a password. The only way to connect is via ssh key.

Time to run the show.  First open your browser and verify that you can not reach a web server at your domain

```
http://your_domain
```

Now from your laptop log onto your server

```
ssh sept24@IP_ADDRESS
```

## 4. Explore project files setup env

You server already has this repository cloned but you will update it first.

```
cd sept24
git pull
```
Now change directory into the project and then into ``prep``. Explore the files.

```
vi dev.env
# change the value of DOMAIN to your domain. Save and exit.
# eg
# DOMAIN=sept24test.bryangilbert.ca

# Now make your dev env file the active default. 
# See how easy it is to have a prod.env or a test.env and you just cp the environment you want into .env
cp dev.env .env
```

## 5. Run the system

```
docker-compose -f d-c.yml up --build
```
Return to your browser and refresh   http://your_domain.  See the content?  Return to your DO server and Ctrl-C to stop.

