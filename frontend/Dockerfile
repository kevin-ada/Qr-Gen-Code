# Dockerfile for Next.js
FROM node:18-alpine

# Set work directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY frontend/package.json frontend/yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy project files
COPY frontend/ ./

# Build the project
RUN yarn build

# Expose the port the app runs on
EXPOSE 3000

# Run the application
CMD ["yarn", "start"]