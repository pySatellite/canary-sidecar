FROM python:3.12.2

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

COPY . .
RUN mkdir __pypackages__ && pdm sync --prod --no-editable

ENV PYTHONPATH=/app/__pypackages__/3.12/lib
RUN mv /app/__pypackages__/3.12/bin/* /bin/



EXPOSE 7963
EXPOSE 8864
EXPOSE 80

CMD ["/bin/bash", "-c", "./start-all-in-on.sh"]