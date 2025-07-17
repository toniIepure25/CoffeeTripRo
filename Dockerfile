# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR / 

# Copy package*.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install --production

# Copy the rest of the application code into the container
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Define environment variable
ENV PORT=3000
ENV NODE_ENV=production

# Command to run the application
CMD ["node", "app.js"]

# .dockerignore
node_modules/