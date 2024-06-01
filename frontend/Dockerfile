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

# Install 'serve' to serve the build
RUN npm install -g serve

# Set environment variable for port (default to 3000)
ENV PORT 3000

# Expose the port (optional, for documentation purposes)
EXPOSE $PORT

# Command to run the application, ensure PORT is passed correctly
CMD ["sh", "-c", "serve -s build -l $PORT"]
