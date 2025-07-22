FROM node:14 AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install production dependencies
RUN npm install --only=production && npm cache clean --force;

# Copy the rest of the application code
COPY . .

# Set the user to a non-root user for security
USER node

# Command to run the application
CMD ["node", "app.js"]