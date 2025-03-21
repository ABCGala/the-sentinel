# Use an official Node.js runtime as the base image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Set environment variables (Optional: Use .env for configuration)
ENV NODE_ENV=production

# Build the TypeScript code
RUN npm run build

# Expose the port if needed (optional)
EXPOSE 3000

# Run the bot
CMD ["npm", "start"]
