FROM node:12.15

# RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

RUN npm i -g @adonisjs/cli

COPY . .

EXPOSE 3333

CMD [ "npm", "rum", "start"]
