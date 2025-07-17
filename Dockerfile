FROM node:18-alpine AS builder
WORKDIR /
COPY package*.json ./
RUN npm install --production
COPY . ./
EXPOSE 3000
CMD ["node", "app.js"]