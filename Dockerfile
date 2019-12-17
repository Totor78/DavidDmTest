FROM node:latest

WORKDIR /usr/src/users

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001
CMD [ "npm", "start" ]
