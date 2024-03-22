FROM node:lts-alpine as build-stage
ARG MODE=allinonefly
WORKDIR /build
COPY ./canary-fe/ ./
RUN npm install
RUN npm run build -- --mode allinonefly

FROM python:3.12.2 as all-in-on
WORKDIR /app

RUN pip install -U pip setuptools wheel
RUN pip install pdm

RUN apt update
RUN apt install vim -y

RUN curl -sL https://deb.nodesource.com/setup_20.x -o /tmp/nodesource_setup.sh
RUN bash /tmp/nodesource_setup.sh
RUN apt-get install nodejs -y

RUN npm install -g npm
RUN npm install -g json-server

RUN apt install nginx -y
RUN rm /etc/nginx/sites-enabled/default
COPY ./docker-all-in-on/proxy.conf /etc/nginx/conf.d
COPY --from=build-stage /build/dist /usr/share/nginx/html

COPY . .
RUN mkdir __pypackages__ && pdm sync --prod --no-editable

ENV PYTHONPATH=/app/__pypackages__/3.12/lib
RUN mv /app/__pypackages__/3.12/bin/* /bin/

EXPOSE 80

CMD ["/bin/bash", "-c", "./start-all-in-on.sh"]