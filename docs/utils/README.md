# Useful Stuff

## Docker commands

```
# to list all active containers
docker ps -a

# to stop all active containers
docker stop $(docker ps -a -q)

# to remove all stoped containers
docker rm $(docker ps -a -q)

# to prune out all containers, images and such from your system.
# only use this when you are certain you're the only one using the machine

docker system prune 
```

## Docker Compose

```bash
# To build and run the containers defined in d-c.yml
docker-compose -f d-c.yml up --build
# To stop Ctrl-C

# To run the containers defined in d-c.yml and detach
docker-compose -f d-c.yml up -d

# To stop containers
docker-compose -f d-c.yml down

```