# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set working directory
WORKDIR /

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source code inside the container
COPY . ./

# Expose port 3000 for incoming requests
EXPOSE 3000

# Define command to run the application
CMD ["node", "app.js"]