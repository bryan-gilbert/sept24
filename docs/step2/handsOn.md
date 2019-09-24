# Step 2 - Hands On 

> Live content inside a container

We're going to see what volumes can do for our containerization.

```bash
cd step2

docker-composer -f d-c.yml up --build

```

Verify your web server is running by going to your web browser and checking your site is up and running.


```bash
# press Ctrl-C to stop your containers

# now run the built containers detached
docker-composer -f d-c.yml up -d 

cd content
vi index.html
# make some edit to the file. Save the change
# esc :wq

```

Return to the browser and verify you can see the change.


When done stop your containers.
```bash
docker-composer -f d-c.yml down

```