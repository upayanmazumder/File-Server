# Stage 1: Base
FROM node:18.18.2-alpine AS base
WORKDIR /usr/src/app
COPY qwik/package.json ./qwik/
RUN chmod -R 755 /usr/src/app

# Stage 2: Qwik Dependencies
FROM base AS qwik-deps
RUN npm install --prefix qwik

# Stage 3: Qwik Build
FROM qwik-deps AS qwik-build
COPY qwik ./qwik
RUN npm run build --prefix qwik

# Stage 4: Final
FROM base AS final
WORKDIR /app

# Copy the Qwik build output
COPY --from=qwik-deps /usr/src/app/qwik/node_modules ./qwik/node_modules
COPY --from=qwik-build /usr/src/app/qwik/dist ./qwik/dist
COPY --from=qwik-build /usr/src/app/qwik/server ./qwik/server

# Copy API dependencies
COPY api/package*.json ./api/
RUN chmod -R 755 /app && npm install --prefix api

# Copy remaining files
COPY . .

# Expose the necessary ports (adjust as per your application)
EXPOSE 3000

# Command to start your application (adjust as necessary)
CMD ["npm", "start", "--prefix", "api"]
