FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

# No build step needed for this app, but keeping the stage consistent with metadata.
# If a build script exists (e.g., `npm run build`), add it here:
# RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app .

EXPOSE 3000

CMD ["node", "app.js"]