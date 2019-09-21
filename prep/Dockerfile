FROM nginx

ARG DOMAIN
RUN echo "DOMAIN $DOMAIN"

COPY content /usr/share/nginx/html

WORKDIR /etc/nginx/conf.d/
RUN rm default.conf
COPY ./nginx.conf ./default.conf

RUN   sed -i "s|DOMAIN|${DOMAIN}|g" ./default.conf

