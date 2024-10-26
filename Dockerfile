# Use Node.js base image with Alpine for reduced image size
FROM node:18.18.2-alpine as base

# Set working directory for all stages
WORKDIR /usr/src/app

# Copy Qwik package.json and lock files to leverage Docker caching
COPY qwik/package.json qwik/yarn.lock ./qwik/

################################################################################
# Stage 1: Install Qwik dependencies
FROM base as qwik-deps

# Cache dependencies and avoid copying unnecessary files
RUN --mount=type=cache,target=/root/.yarn \
    yarn install --frozen-lockfile --cwd qwik

################################################################################
# Stage 2: Build the Qwik application
FROM qwik-deps as qwik-build

# Copy the full source code to the container
COPY qwik ./qwik

# Build the Qwik application
RUN yarn run build --cwd qwik

################################################################################
# Final Stage: Run the application
FROM node:18.18.2-alpine as final

# Set production environment variable and origin for Qwik server
ENV NODE_ENV=production
ENV ORIGIN=https://fs.upayan.space

# Run the application as a non-root user
USER node

# Copy production dependencies and built application files from previous stages
COPY --from=qwik-deps /usr/src/app/qwik/node_modules ./qwik/node_modules
COPY --from=qwik-build /usr/src/app/qwik/dist ./qwik/dist
COPY --from=qwik-build /usr/src/app/qwik/server ./qwik/server

# Expose the port that Qwik server listens on (match entry adapter config)
EXPOSE 3000

# Set working directory for API server and copy dependencies
WORKDIR /app
COPY api/package*.json ./api/

# Install API dependencies
RUN npm install --prefix api

# Copy API source code
COPY api ./api

# Run both servers in the same CMD instruction
CMD sh -c "yarn serve --cwd qwik & npm start --prefix api"
