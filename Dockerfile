FROM node:18-alpine AS builder

WORKDIR /

COPY package*.json ./
RUN npm install

COPY . .

CMD ["node", "app.js"]