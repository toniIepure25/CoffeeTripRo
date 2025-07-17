FROM node:18-alpine AS builder

WORKDIR ./

COPY package*.json ./
RUN npm install --omit=dev

COPY . .

# No build step is needed in this case.

# Stage 2: Production image
FROM node:18-alpine

WORKDIR ./

COPY --from=builder /app/node_modules ./node_modules
COPY . .

EXPOSE 3000

CMD ["node", "app.js"]