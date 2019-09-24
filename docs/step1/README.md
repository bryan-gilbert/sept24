# Step 1 
> Get your laptops ready and connected

## Project files in the ```prep``` folder
  
### dev.env

This is a sample environment file. Before running any docker commands copy the dev or prod environment file
into the file that Docker will import automatically: ```.env```  You will need to do this on your server, when we log on. 
For now this is just to show you how to switch between a dev and prod environment.

```bash
    vi dev.env
    # change the value of DOMAIN to your domain. Save and exit.
    # eg
    # DOMAIN=sept24test.bryangilbert.ca

    # Now make your dev env file the active default. 
    # See how easy it is to have a prod.env or a test.env and you just cp the environment you want into .env
    cp dev.env .env
```

### content
This is a directory and contains some static html for your first web site

### nginx.conf

This is a simple nginx (a web server) configuration file. 
``` 
server {
  listen 80;
  server_name DOMAIN;

  root /usr/share/nginx/html/;

  location / {
    try_files $uri $uri/ /index.html;
  }
}
```

Key points
 - will listen on port 80 which is http:
 - the all caps DOMAIN will automatically be replaced by our Dockerfile based on the .env file
 - the web server will server content from the default nginx directory.


### Dockerfile

Time for some Docker magic.   Here is our first docker file.
```
 1 FROM nginx
 2
 3 ARG DOMAIN
 4 RUN echo "DOMAIN $DOMAIN"
 5
 6 COPY content /usr/share/nginx/html
 7 
 8 WORKDIR /etc/nginx/conf.d/
 9 RUN rm default.conf
10 COPY ./nginx.conf ./default.conf
11
12 RUN sed -i "s|DOMAIN|${DOMAIN}|g" ./default.conf

```

The ```FROM nginx``` line tells Docker to go out to the central registry and pull down a copy of the nginx image. This is all
that you really need to run nginx in a container.  Except the image is so basic you do need to change it's default configuration
file to something like the one we have.  It needs to say listen on port 80 and what the server name is.  That is what
is happening starting at line 8. 

```
WORKDIR /etc/nginx/conf.d/ 
```
This sets the current working directory within the nginx image.  All commands from this point on are relative to this directory.
Next line 9 removes the default conf file that comes with the image and line 10 replaces it with ours.

```
ARG DOMAIN
```
Line 3 declares to Docker that this file expects to be given an environment variable. There are several nuances around these
values.  For one the placement after the FROM is significant and in our case we don't need to provide a default value.
You can learn more about these nuances in the docs.

Line 12 ```RUN sed ...``` runs the command sed which does a search and replace of DOMAIN in our nginx config file.


### d-c.yml
The last file in the prep folder is the one that pulls it all together. It is the Docker Compose configuration file.
Will update this section

BRYAN update this section

## Next ...
Look at the [handsOn](handsOn.md) readme to try out the above. 

To select a DO server see the [server list](serverList.md)