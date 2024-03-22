FROM node:20.11.1

RUN npm install -g npm
RUN npm install -g json-server

WORKDIR /app

EXPOSE 80
CMD ["json-server", "-p", "80", "-w", "/app/data/interface.json"]
