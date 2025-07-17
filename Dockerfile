# Use an official Node runtime as a parent image
FROM node:18-alpine

# Set the working directory to /app
WORKDIR /

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install --production

# Bundle app source code
COPY .

# Expose port 3000
EXPOSE 3000

# Define environment variable
ENV NODE_ENV=production

# Start the app
CMD ["npm", "start"]