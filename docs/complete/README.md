# Complete sample

> A fully functional example with NodeJs/Express server API, nginx, mongodb and Vue

In the ```complete``` folder I have included the files from a project I've been working on
that uses VueJs for the web client and it has a NodeJs/Express server side API backed by
a MongoDb.

The other day I got an email from the folks at Digital Ocean warning me that my 
mongoDb was running without password protection.  I'm not sure how they found out
because all my services run behind a fire wall. But the fact is that MongoDb, BY DEFAULT,
runs in this unprotected way. 

Passing in secrets like passwords and API keys is a challenge. But with the use of the
```.env``` file its not so hard.

> Nginx

The complete sample has a nginx folder to contain all the files needed. Note

The nginx.conf file is a base configuration file. The main change is
```
include /etc/nginx/sites-enabled/*.conf;
```
to have nginx look into the sites-enabled folder for web site configuration.

The ```build.sh``` file will run inside the nginx container (thanks to the Dockerfile).


> deployment

See the scripts inside the deployment folder's package.json
```json
"scripts": {
  "dev:build": "cp dev.env .env && docker-compose -f d-c.yml up --build",
  "dev:run": "cp dev.env .env && docker-compose -f d-c.yml up -d",
  "dev:stop": "docker-compose -f d-c.yml down",
  "prod:build": "cp prod.env .env && docker-compose -f d-c.yml -f d-c-prod.yml up --build",
  "prod:run": "cp prod.env .env && docker-compose -f d-c.yml -f d-c-prod.yml up -d",
  "prod:stop": "docker-compose -f d-c.yml -f d-c-prod.yml down",
  "ls": "docker ps -a",
  "stop": "docker stop $(docker ps -a -q)",
  "rm": "docker rm $(docker ps -a -q)",
  "prune": "docker system prune",
}
```

See how the ```dev.env``` and the ```prod.env``` files are first copied into ```.env``` before 
docker-compose is run.  That's all that is different between a prod and dev instance.


