FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
RUN npm run build # Assuming a build script exists. Adapt if needed.

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist # Copy only the built files.
COPY package*.json ./
RUN npm install --production
EXPOSE 3000
USER node
CMD ["npm", "start"]
# .dockerignore file:
# node_modules/
dist/