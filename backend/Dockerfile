FROM node:14.17.6-alpine3.13

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . . 

EXPOSE 5555

CMD ["npm", "run", "dev"] 