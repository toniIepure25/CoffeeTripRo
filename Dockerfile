# syntax=docker/dockerfile:1.4
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . ./

# Multi-stage build - production image
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app ./ 

EXPOSE 3000

CMD ["node", "app.js"]