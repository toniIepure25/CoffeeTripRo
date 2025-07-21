FROM node:latest

# Copy package.json and install dependencies
COPY package.json package-lock.json /app/
WORKDIR /app
RUN npm install

# Copy the rest of the application
COPY . .

# Expose port
EXPOSE 3000

# Command to run the application
CMD ["node", "app.js"]