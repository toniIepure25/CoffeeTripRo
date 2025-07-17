FROM node:18-alpine

WORKDIR /

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]