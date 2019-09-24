# Step 2 - sharing
> sharing information between containers

This step is very similar to Step 1 but we'll introduce docker volumes. These are folders
that exist on your server and also are inside the container.  

## Volumes
Compare the d-c.yml files between step 1 and step 2.  Notice the addition of 
```yaml
    volumes:
      - ./content/:/usr/share/nginx/html
      - ./logs/:/var/log/nginx/
```

These two lines link two folders on the server to folders inside the container, that is running nginx.
The first links the static web content with the location nginx gets the static files.

In the hands on section you will see that you can edit this file and the container will see the change.

The second line sets up a folder for the nginx logs.  This is handy to be able to see what is 
happening insider you dockerized nginx.  It is also just another example of linking folders
from the server to inside a container.

If the d-c.yml file defined another container then it could use the same local folder 
in a ```- volumnes: ``` section. This means the two containers are seeing the same physical folder.

There are often times when the process running in the container doesn't have permission
to access the shared files.  This is because the containerized environment has it's own
set of users and groups.  Solving this problem is something we can tackle in a followup 
workshop.  Yet, remember that the root user is common because root is always id 0.


## Next ...
Look at the [handsOn](handsOn.md) readme to try out the above. 

