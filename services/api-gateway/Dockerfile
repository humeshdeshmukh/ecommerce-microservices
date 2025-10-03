# Use Node.js LTS
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install --production

# Copy source
COPY src ./src

# Expose API Gateway port
EXPOSE 8080

# Run the app
CMD ["node", "src/app.js"]
