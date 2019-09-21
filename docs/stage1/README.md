# Stage 1 - Secure production server

> To deliver an application you need a secure server

You will be hacked. All the time.  Every server is under constant attack.  They are
looking to steal data and they want your computational resources. They want your machine
to stage attacks on other servers.

Yet you want to focus on developing your application.  How can you get your app onto prod in a secure way?
This stage 1 recipe will solve 95% of your problems which is good enough for most small scale applications. 
This recipe sets up our server in a way that makes it difficult, not impossible, for the hacker. 
Difficult is good enough because hackers don't want to spend a lot of time on systems that have low value.
If you need to protect information then you're going to need to go beyond this recipe.

Secure server
1. ![checked] No SSH access via password (public key cryptography only)
2. ![checked] No root user SSH access
3. ![checked] SSH access via non-standard port
4. ![checked] User account with user name that is unique and difficult to quess
5. ![checked] User has sudo privileges
6. ![checked] Firewall blocks all ports except 80 and 443 (and custom ssh)

# Update
The material in Stage 1 was presented on May 14, 2019.  Afterwards, Jonathan composed a really nice tidy script that 
accomplishes all the tasks of stage one.   [basic-server](https://github.com/jonathan-longe/basic-server)

## Workshop Instructions

Log onto a newly created Debian based production server and follow the steps in [server setup](./server.md)



[checked]: ../images/checked-20.png "checked"
[unchecked]: ../images/unchecked-20.png "unchecked"
