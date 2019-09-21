# Server setup

## How to generate a SSH Key
> Skip this step during the workshop. You will be given the key pair.

On your development box use ```ssh-keygen``` from ```openssh``` to generate a public private key.  KF is the name
we'll give to our key files.

> "the continuous increase in security requirements could very well render
 ECDSA the de-facto solution in the future." [Comparing ECDSA vs RSA](https://www.ssl.com/article/comparing-ecdsa-vs-rsa/)

Also take a read of [ECDSA](https://blog.cloudflare.com/ecdsa-the-digital-signature-algorithm-of-a-better-internet/)

```
export KF=may14-ecdsa
# Generate key, enter a password or passphrase when prompted
ssh-keygen -t ecdsa -b 256 -f $KF
```

The above is a good enough key for our sample application. Consider increasing the key length if your application or server
resources become more valuable to hackers.  Also consider using a different password/passphrase for your SSH key than
you later use for the user on the server who can get root access.

## Place your private public key files
> During the workshop you will be given the key files: may14-ecdsa and may14-ecdsa.pub

Link or copy the private and public key files into the default key folder. The following is for a linux/mac user.  
KF is set to match the root name of the key files.

```
export KF=may14-ecdsa
ln -s $KF ~/.ssh/$KF
ln -s $KF.pub ~/.ssh/$KF.pub
ls -al ~/.ssh

# register ssh key in your local environment, enter passphrase when prompted
ssh-add $KF

# When you need to copy and past the public key just cat the contents
cat $KF.pub
```

## Digital Ocean server setup
> Skip this step during the workshop. You will be given the IP address of a server

- Log onto DO
- create a droplet; (e.g. Debian, 1GB ($5/mth) Toronto or San Fran)
- add ssh key (see above)
- name your new droplet


## First log on

> On you development machine ssh onto your server.  Set SERVER = ip address of your server

Do log onto the new server via ssh. 

```
export SERVER=159.89.117.81
ssh root@$SERVER

```
The server has been configured to accept ssh from someone with the private key file we will use for the workshop. 


## Prepare the system.
If you want to really build your own app server then modify the following environment variables.
(Below are some instructions for generating user passwords.) 
For the workshop use the following.
Copy paste the following into the root ssh session you have open on the server.
```
# export PKS='replace with the contents of the public key file on your development box'
export PKS='ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBIrLLdQGnMofGqBWFnapwWORcxM4lU64bBmkVqWjq2VzrrBKzAhKgSSUzwOpRNV2yqusT46M+iMWt9rx1d9keEA='
export UN=may14
export UH=/home/$UN
export PW=YzFmYWEw

echo adding a favorite alias
alias ll='ls -lahG'

echo Set timezone
timedatectl set-timezone America/Vancouver

echo DigitalOcean recommends next line. See https://www.digitalocean.com/community/questions/debian-9-3-droplet-issues-with-useradd
apt-get remove -y unscd

echo Update system
apt-get update & apt-get -y upgrade

echo Installing essentials
apt-get install -y sudo curl git-core

addgroup ssh-access

echo Create user: $UN
# Create the user; add to group; create home directory (-m); set password hashed
# useradd -G users,sudo,www-data,ssh-access -m -s /bin/bash -p $(echo $PW | openssl passwd -1 -stdin) $UN
useradd -G users,sudo,ssh-access -m -s /bin/bash -p $(echo $PW | openssl passwd -1 -stdin) $UN

echo Stash favourite alias in shell init for user
echo "alias ll='ls -lahG'" >> $UH/.bashrc 

echo User created to remove the user created run 
echo   deluser $UN

echo Show information about the user: 
getent passwd $UN
id -Gn $UN

echo Placing SSH keys into users home directory  
mkdir -p $UH/.ssh

echo $PKS >> $UH/.ssh/authorized_keys
cat $UH/.ssh/authorized_keys

chmod 700 $UH/.ssh
chmod 600 $UH/.ssh/*
chown -R $UN:$UN $UH/.ssh

```

Return to your development machine and open another terminal session and test logging on as as the new (sudo-capable) user.

> On your development workstation:
```
echo Log into server $SERVER as user 
ssh may14@$SERVER
```
(recall SERVER was setup above. It is the IP address of your server)

> On the server check that user can use ```sudo```
```
# on the server you are now the new user. Test sudo
sudo su
# enter the user password to become sudoer
```

## Securing ssh access to the server
At this point you have a new server with a new user which can log on and run sudo commands.  
Let's secure the access via ssh  
- change the ssh port to 8201 (choose a different port as you wish)
- disable password log on
- disable root ssh access
- allow users in the ssh-access group to ssh onto the machine

```
# on the server - secure ssh

# you are the new user.. right?
whoami

cd /etc/ssh
# backup and remove the existing file ssh config file
sudo mv sshd_config sshd_config.bak
# create a new file
sudo nano sshd_config 
# Copy the text in the copy of sshd_config here in the deploy folder
# Paste into the server side. If prompted by nano paste with control characters.
# Save file
sudo diff sshd_config.bak sshd_config
# Check the differences with the following
```
OR instead of the above directly edit ```/etc/ssh/sshd_config``` and add or change the following:
``` 
Port 8201 
PermitRootLogin no
PasswordAuthentication no
AllowGroups ssh-access
# very optional for the workshop ... add this to avoid problem with multiple sshd processes
ClientAliveInterval 600
ClientAliveCountMax 3
```

export PORT=8201
cp /etc/ssh/sshd_config /etc/ssh/sshd_config.BAK
echo '*************** Secure sshd_config ******************'
sed -i 's/PermitRootLogin yes/PermitRootLogin no/g' /etc/ssh/sshd_config
sed -i "s/#Port 22/Port $PORT/g" /etc/ssh/sshd_config
sed -i 's/ClientAliveInterval 120/ClientAliveInterval 600/g' /etc/ssh/sshd_config
sed -i '$ a ClientAliveCountMax 3' /etc/ssh/sshd_config
sed -i '$ a AllowGroups ssh-access' /etc/ssh/sshd_config
diff --color=always /etc/ssh/sshd_config.BAK /etc/ssh/sshd_config



``` 
# Restart the ssh service:
sudo service ssh restart
```

## Firewall

``` 
sudo apt-get install -y ufw
```

Then set up the firewall.  Allow the port you set for ssh above
```
sudo ufw default deny incoming
sudo ufw default allow outgoing

# open ssh port
sudo ufw allow 8201/tcp
sudo ufw deny ssh

# open http port
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# open ntp port : to sync the clock of your machine
sudo ufw allow 123/udp

# turn on firewall
sudo ufw enable

# check the status
sudo ufw status
```

Should report:
``` 
Status: active

To                         Action      From
--                         ------      ----
8201/tcp                   ALLOW       Anywhere                  
22/tcp                     DENY        Anywhere                  
80/tcp                     ALLOW       Anywhere                  
443/tcp                    ALLOW       Anywhere                  
123/udp                    ALLOW       Anywhere                  
8201/tcp (v6)              ALLOW       Anywhere (v6)             
22/tcp (v6)                DENY        Anywhere (v6)             
80/tcp (v6)                ALLOW       Anywhere (v6)             
443/tcp (v6)               ALLOW       Anywhere (v6)             
123/udp (v6)               ALLOW       Anywhere (v6)
```

Next time you log in don't forget the ssh port has changed
```
ssh may14@159.203.14.23 -p 8201 
```


## A way to generate strong passwords
Even though we will block password SSH you will still need a good password for your sudo user. (```sudo user``` means a use that
become ```root``` and run root commands). You can use the following to generate a reasonable password for a new user. This script
might also be useful to generate a series of user accounts with difficult to hack passwords. Change the length from 8 to something
more secure, like 15, if desired.
```
# generate random password for user
PW=$(date +%s|sha256sum|base64|head -c 8)
echo ------------------ SAVE THIS: $PW
```
Or instead of a cryptic password you may consider a passphrases [with caution](https://security.stackexchange.com/questions/178015/passphrase-vs-password-entropy)
Make your choice based on
1. the value of your data
2. remember that you'll need to type in the password everytime you log onto your server and run sudo

