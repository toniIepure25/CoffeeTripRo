# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /

# Copy package*.json and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy the rest of the application code
COPY . ./

# Expose port 3000
EXPOSE 3000

# Command to run the app using npm start
CMD ["npm", "start"]