FROM node:18-alpine AS build-stage

# Set working directory
WORKDIR /app

# Copy dependency descriptor files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --only=production

# Copy the rest of the application code
COPY . .

# Expose application port
EXPOSE 3000

# Set NODE_ENV to production
ENV NODE_ENV=production

# Run the application
CMD ["node", "app.js"]
EXPOSE 8080
