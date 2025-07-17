# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install app dependencies
RUN npm install --production # Install only production dependencies for a smaller image size

# Bundle app source code
COPY .

# Expose the port your app runs on
EXPOSE 3000  # Assuming the application listens on port 3000; adjust as needed.

# Define environment variable (example)
ENV NODE_ENV=production

# Command to run the app using npm
CMD ["npm", "start"]