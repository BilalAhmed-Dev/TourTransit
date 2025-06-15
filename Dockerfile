# Use Node.js LTS version
FROM node:latest

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Install nodemon globally for development
RUN npm install -g nodemon

# Create public/js directory structure
RUN mkdir -p public/js

# Expose port
EXPOSE 3000

# Default command - can be overridden in docker-compose
CMD ["npm", "run", "dev"]