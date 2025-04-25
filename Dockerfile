FROM node:23-alpine AS build-app
WORKDIR /app
COPY app/package.json app/package-lock.json* ./
RUN npm ci
COPY app/ .
RUN npm run build

FROM node:23-alpine AS build-api
WORKDIR /api
COPY api/package.json api/package-lock.json* ./
RUN npm ci
COPY api/ .

FROM node:23-alpine

RUN apk add --no-cache tini

WORKDIR /workspace

COPY --from=build-app /app ./app
COPY --from=build-api /api ./api

EXPOSE 3000 5000

ENTRYPOINT ["/sbin/tini", "--"]

CMD ["sh", "-c", "cd app && npm run deploy & cd api && npm run start"]
