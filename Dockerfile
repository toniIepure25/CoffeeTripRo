# Use an official Node.js runtime as a parent image
FROM node:18-alpine AS builder

WORKDIR /

# Install app dependencies
COPY package*.json ./
RUN npm install --production

COPY . ./

CMD ["npm", "start"]