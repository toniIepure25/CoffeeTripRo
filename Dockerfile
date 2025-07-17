FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --silent
COPY . ./

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app ./
RUN npm install --production --silent
EXPOSE 3000
CMD ["npm", "start"]