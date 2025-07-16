# Use an official Node.js runtime as a parent image
FROM node:18-alpine AS builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the application (if necessary - adjust command if needed)
# RUN npm run build  # Example build command, remove if not applicable


# Use a lightweight base image for production
FROM node:18-alpine

WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app .

# Expose the port your application listens on
EXPOSE 3000

# Define environment variables (optional)
ENV NODE_ENV production
ENV PORT 3000

# Start the application
CMD ["npm", "start"]