# awayhome-ui frontend Dockerfile
# Use the official Node.js image.
FROM node:20.15.1

# Set the working directory.
WORKDIR /app

# Copy package.json and package-lock.json.
COPY package*.json ./

# Install dependencies.
RUN npm install

# Copy the rest of the application.
COPY . .

# Expose the port the app runs on.
EXPOSE 3000

# Start the application in development mode.
CMD ["npm", "run", "dev"]

# For Production, uncomment the following lines:
# RUN npm run build
# CMD ["npm", "run", "start"]
