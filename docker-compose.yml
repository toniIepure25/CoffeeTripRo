FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

# No need for extra build steps in this case.

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app .

EXPOSE 3000

CMD ["node", "app.js"]