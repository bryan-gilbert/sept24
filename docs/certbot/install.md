# Install Certbot on Debian

> Installing certbot was more difficult that it should be

ON a clean fresh Digital Ocean Debian 9 server it takes some effort to install certbot.
Many sites recommend three steps.  e.g. (https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-16-04)
```
add-apt-repository ppa:certbot/certbot
apt update
apt install python-certbot-apache
```
But the first command gets this error
```
gpg: keybox '/tmp/tmpr4yek906/pubring.gpg' created
gpg: failed to start the dirmngr '/usr/bin/dirmngr': No such file or directory
gpg: connecting dirmngr at '/run/user/0/gnupg/d.rnajt48ww3h99oopj7cmnhwy/S.dirmngr' failed: No such file or directory
gpg: keyserver receive failed: No dirmngr
```

Another place says to (https://linuxhostsupport.com/blog/install-lets-encrypt-ssl-certificates-using-certbot/_
```
apt-get install software-properties-common python-software-properties
add-apt-repository ppa:certbot/certbot
apt-get update
apt-get install python-certbot-apache
```
Error 
```
Package python-software-properties is not available, but is referred to by another package.
This may mean that the package is missing, has been obsoleted, or
is only available from another source
However the following packages replace it:
  software-properties-common

E: Package 'python-software-properties' has no installation candidate
```
So I try installing just ```software-properties-common``` and then ```add-apt-repository ppa:certbot/certbot``` but the same dirmngr error appears.

Let’s look at the official Certbot site. https://certbot.eff.org/lets-encrypt/debianstretch-apache.html

1. Ssh onto server with account that has sudo privileges.
2. Instal backport https://backports.debian.org/Instructions/
3. Install certbot
```
apt-get install certbot python-certbot-apache -t stretch-backports
```


Step 2 is hard.
Quote:
> Add backports to your sources.list
<br>
```deb http://deb.debian.org/debian stretch-backports main```
<br>
to your sources.list (or add a new file with the ".list" extension to /etc/apt/sources.list.d/) You can instead use https when the apt-transport-https package is installed.
<br>
Run 
```apt-get update```

But it doesn’t say how to add the backport to the sources.list

A friend who is a true expert in Debian recommended this approach:
```
echo "deb http://deb.debian.org/debian stretch-backports main" | tee -a /etc/apt/sources.list
```


The complete set of steps to use are
```
echo "deb http://deb.debian.org/debian stretch-backports main" | tee -a /etc/apt/sources.list
apt-get update
apt-get install certbot python-certbot-apache -t stretch-backports
#verify
certbot --version

```

I posted a question about all this on stackoverflow
https://stackoverflow.com/questions/56894310/install-certbot-on-debian-gets-error-failed-to-start-the-dirmngr
