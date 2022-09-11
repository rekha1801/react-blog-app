FROM node:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
RUN npm install -g json-server
COPY ./db.json /usr/src/app
ENTRYPOINT ["json-server", "--port", "8080", "--host", "0.0.0.0"]