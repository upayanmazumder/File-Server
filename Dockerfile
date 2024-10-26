# Use the official Node.js image
FROM node:20

# Create and change to the app directory
WORKDIR /app

# Copy application dependency manifests to the container image
COPY package*.json ./
COPY api/package*.json ./api/
COPY qwik/package*.json ./qwik/

# Install dependencies for the root
RUN npm install

# Install dependencies for the api folder
WORKDIR /app/api
RUN npm install

# Install dependencies for the qwik folder and set ORIGIN environment variable
WORKDIR /app/qwik
ENV NODE_ENV production
ENV ORIGIN=https://fs.upayan.space
RUN npm install

# Copy the local code to the container image
WORKDIR /app
COPY . .

# Run the web service on container startup
CMD [ "npm", "run", "build-qwik", "&&", "npm", "run", "deploy" ]