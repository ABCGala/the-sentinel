# Use an official Node.js runtime as the base image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Set environment to production
ENV NODE_ENV=production

# Copy package.json first to leverage caching
COPY package.json ./

# Install only production dependencies
RUN npm install --production

# Copy the rest of the application files
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port if needed (optional)
EXPOSE 3000

# Run the bot
CMD ["node", "dist/bot_main.js"]
