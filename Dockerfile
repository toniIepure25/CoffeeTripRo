# Use an official Node runtime as a parent image
FROM node:18-alpine AS builder

WORKDIR /

# Install app dependencies
COPY package*.json ./
RUN npm install --production

# Bundle app source
COPY . ./

# Build the application (if necessary)
# RUN npm run build  # Uncomment if you have a build step

# Expose the port your app runs on
EXPOSE 3000

# Define environment variable
ENV PORT=3000
ENV NODE_ENV=production

# Start the app (example command, adjust as needed)
CMD ["node", "app.js"]