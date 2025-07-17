# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install --production

# Bundle app source code inside the Docker image
COPY .

# Expose port 3000
EXPOSE 3000

# Define environment variable
ENV NODE_ENV production

# Start the app
CMD ["npm", "start"]