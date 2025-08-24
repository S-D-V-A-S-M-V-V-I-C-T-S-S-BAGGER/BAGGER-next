FROM node:20.19-alpine AS base
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk update
RUN apk add --no-cache libc6-compat

FROM base AS builder
# Split the files for efficient docker builds
WORKDIR /app
RUN corepack yarn global add turbo
COPY . .
RUN turbo telemetry disable
RUN turbo prune frontend --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer

WORKDIR /app
# First install dependencies (as they change less often)
COPY --from=builder /app/out/json/ .
RUN corepack yarn install

# Build the project and its dependencies
COPY --from=builder /app/out/full/ .

# Vite needs these environment variables at build time
# THEY SHOULD NOT CONTAIN SECRETS, as they are baked into the js
COPY apps/frontend/.env.build apps/frontend/.env

RUN corepack yarn turbo build

FROM nginx:1.28.0-alpine AS runner
WORKDIR /app

## add permissions for nginx user
RUN chown -R nginx:nginx /app && chmod -R 755 /app && \
        chown -R nginx:nginx /var/cache/nginx && \
        chown -R nginx:nginx /var/log/nginx && \
        chown -R nginx:nginx /etc/nginx/conf.d
RUN touch /var/run/nginx.pid && \
        chown -R nginx:nginx /var/run/nginx.pid

USER nginx

COPY --from=installer /app/apps/frontend/dist ./dist
#COPY default.nginx.conf /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf


