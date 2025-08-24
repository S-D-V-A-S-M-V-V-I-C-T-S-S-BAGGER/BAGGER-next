FROM node:20.19-alpine AS base

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk update
RUN apk add --no-cache libc6-compat

FROM base AS builder
# Split the files for efficient docker builds
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo telemetry disable
RUN turbo prune api --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer

WORKDIR /app

# First install dependencies (as they change less often)
COPY --from=builder /app/out/json/ .
RUN corepack yarn install

# Build the project and its dependencies
COPY --from=builder /app/out/full/ .

RUN corepack yarn turbo build

FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1684 expressjs
RUN adduser --system --uid 1684 expressjs
USER expressjs
COPY --from=installer /app .

CMD node apps/api/dist/index.cjs
