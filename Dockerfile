FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

# Define the command to run the app
CMD ["npm", "start"]

EXPOSE 3000