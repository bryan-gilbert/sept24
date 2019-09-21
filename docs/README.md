# Basic Docker

> A workshop about docker. 
> Tuesday Sept 24th 5:30 to 7:30

## Agenda

What: Introduction DevOp **containerization** and **orchestration** with Docker and Docker Compose.

Where: Alliance room at Quartech's office. 2nd floor 1012 Douglas Street (Quartech has generously allowed us to use this
meeting room and will provide some pizzas and beverages too.)

The problems we’ll address include

BRYAN UPDATE THIS LIST
- set up a secure production server suitable for small scale application
- passing secrets into the application
- securing MongoDB inside a container
- handling OS specific dependencies
- proxying API calls
- using the same configuration for both development and production with minimal differences.
and more

We’ll be using NodeJS with Express and MongoDB to create an API micro-service.
On development we'll have a hot-swapping Vue client.
On production will use static files served by Nginx.
Nginx will also proxy the API calls. The whole environment will be built with docker-compose.

Agenda:
- greetings and introductions
- short presentation on the technology
- hands on practice. 
- general discussion

## Preparation 

- what's your OS? Windows, Mac, Linux?
- can you run terminal on your laptop
- can you cd, cat, ls?
- can you vi, vim or emac or..?
- can you run ssh
 
## A simple "What is Docker and Docker Compose?"

Docker containerizes applications.  A beginners way to think of a container is like a virtual server.  A container has
an operating system and applications and does something for the outside world.  But this is a crude analogy and 
we'll discuss this more during the workshop.

Docker Compose orchestrates containers.  It tells docker to build and run a set of containers and it creates a network
for these containers to communicate with each other. Docker compose is mainly suitable for running a set of 
containers on a single machine.  When you get larger then you will look to OpenShift and/or Kubernetes for your orchestration needs. 

## The workshop stages
This workshop is broken down into ,,,

### Stage 1
...

Next stage .. go to [preparation](./preparation)

