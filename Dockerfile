# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package*.json and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy the rest of the application code
COPY .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app (assuming 'npm start' is defined in package.json)
CMD ["npm", "start"]