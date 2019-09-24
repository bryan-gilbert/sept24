# Pre-Prep by your host
> What was done to prepare for the workshop

The following are notes I took while getting ready for this workshop.  We may review this content if time permits.

## SSH Key 

Generate a SSH key for my Digital Ocean (DO) account.  Will use this key only for the servers created for this workshop.
And will only run these servers for the short duration of the workshop.   Will share the key with participants when they
come to the workshop.  This way they can access and control droplets created for this workshop.

Shortly after the workshop I will delete all these droplets and remove the key from my DO account. 

```
cd ~/.ssh
export KF=sept24-ecdsa
# Generate key, enter a password or passphrase when prompted
ssh-keygen -t ecdsa -b 256 -f $KF
```

Add the new key to my DO account

    doctl compute ssh-key import sept24-ecdsa  --public-key-file ~/.ssh/sept24-ecdsa.pub

List the keys to verify it got there

    doctl compute ssh-key list


$$ Docker CLI

Use ```doctl``` the Docker command line app to explore what options we have to create a new droplet.

    doctl compute droplet list
    doctl compute region list
        tor1    Toronto 1          true
    doctl compute image list --public | grep -i debian
        debian-10-x64
        debian-9-x64
    deployment$ doctl compute size list | grep 0.007440
        512mb              512       1        20      5.00             0.007440
        s-1vcpu-1gb        1024      1        25      5.00             0.007440

Selected tor1, debian-9-x64, 512mb

Use doctl to create a droplet

    doctl compute droplet create test --size 512mb --image debian-9-x64 --region tor1 --ssh-keys d4:ae:e4:e6:8e:ca:ef:b7:ad:0d:7e:af:50:b0:04:61

Used the wrong name in that command so rename it

    doctl compute droplet-action rename 159830659 --droplet-name sept24-1

## Secure the server

Register the new SSH key with the mac's OS  

    ssh-add ~/.ssh/sept24-ecdsa

test ssh root@IP works

    ssh root@IP


Configure the server

    cd /path/bg-basic-server

    ./configure_droplet.sh IP sept24

(sept24 is the name of the new user)

When this is done we have 
  - SSH locked down to one user
  - Docker and Docker compose are installed
  - Node and NPM installed
  - certbot installed
  - uncomplicated firewall installed
  - SSH daemon more secure
  
Verify you can log on

    ssh sept24@159.89.116.165 -p 22
    exit

... configure the user account ...

    ./configure_user.sh 159.89.116.165 sept24

Follow the instructions that have you log on and finalize the configuration.  
When done the sept24 user has aliases and more to help with dev tasks

## Snapshot the basic server

    doctl compute droplet list
    doctl compute droplet-action snapshot droplet_id --snapshot-name snapshot_name
    # eg
    doctl compute droplet-action snapshot 159830659 --snapshot-name sept24-basic

Then wait a while and then see the list of snapshots for the droplet

    doctl compute droplet snapshots droplet_id
    # eg
    doctl compute droplet snapshots 159830659
    ID          Name            Type        Distribution    Slug    Public    Min Disk
    52544959    sept24-basic    snapshot    Debian                  false     20


  doctl compute image list-user

doctl compute droplet create --region nyc3 --image 5812605 --size 8gb foobar


doctl compute droplet create sept24-2 --size 512mb --image 52658280 --region tor1 --ssh-keys d4:ae:e4:e6:8e:ca:ef:b7:ad:0d:7e:af:50:b0:04:61

doctl compute droplet-action power-off 159830659
doctl compute droplet-action power-off 52544959

doctl compute droplet-action power-on 159830659
doctl compute droplet-action power-on 52544959


# Domain setup
TODO: document how to set up the DNS

    doctl compute domain list

    doctl compute domain create domain_name --ip-address droplet_ip_address
    #eg
    doctl compute domain create sept24test.bryangilbert.ca --ip-address 159.89.116.165

    doctl compute domain records list domain_name
    #eg
    doctl compute domain records list sept24test.bryangilbert.ca


TODO: 
## Log on set up SSL
Log onto the new droplet and set up SSL

## Last steps

Before turning the servers over to you I will stop and remove all docker containers and images.

    docker stop $(docker ps -a -q)
    docker rm $(docker ps -a -q)
    docker system prune -f
    


[checked]: ../images/checked-20.png "checked"
[unchecked]: ../images/unchecked-20.png "unchecked"
