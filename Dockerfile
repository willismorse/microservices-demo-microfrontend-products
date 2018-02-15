FROM node:alpine

# Create app directory
WORKDIR /usr/src/app

# install app dependencies
COPY package*.json ./

RUN npm install
# RUN npm install --only=production

COPY . .

EXPOSE 8080

CMD [ "npm", "start" ]