# awayhome-api backend Dockerfile
# Use the official Node.js image.
FROM node:20

# Set the working directory.
WORKDIR /usr/src/app

# Copy package.json and package-lock.json.
COPY package*.json ./

# Install dependencies.
RUN npm install

# Copy the rest of the application.
COPY . .

# Expose the port the app runs on.
EXPOSE 5000

# Start the application in development mode.
CMD ["npm", "run", "dev"]

# For Production, uncomment the following lines:
# CMD ["npm", "start"]
