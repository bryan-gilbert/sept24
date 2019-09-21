# Stage 1 - Basic Nginx

## Hands On
ssh onto the server

    git clone https://github.com/bryan-gilbert/sept24.git

    cd sept24

! Important: edit the dev.env file and change the DOMAIN to your sub-domain.

    vi dev.env
    # then
    cp dev.env .env

    # Now start the nginx server
    docker-compose -f d-c.yml up --build
