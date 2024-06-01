# Use an official node image as the base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the React app
RUN npm run build

# Use a lightweight web server to serve the build output
RUN npm install -g serve

# Use the PORT environment variable provided by Railway, default to 3000 if not set
ENV PORT=${PORT:-3000}

# Command to run the application
CMD ["serve", "-s", "build", "-l", "$PORT"]

# Expose the port (optional, but good for documentation)
EXPOSE $PORT
