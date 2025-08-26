# BAGGER-turbo

This is a Turborepo containing both the back and front-end of the BAGGER website.

## Using this repo

Run `yarn install` in the root of the project.
After that you can use `yarn run dev` to start the back and front-end servers locally,
or use dev.docker-compose.yml to start them in Docker.

When running in docker you need to add docker to your hosts file (usually 127.0.0.1) under one of the available callbacks
if you want to be able to log in via Google.

## What's inside?

This Turborepo includes the following packages and apps:

### Apps and Packages

- `api`: an [Express](https://expressjs.com/) server
- `frontend`: a [Vite](https://vitejs.dev/) single page app
- `@repo/eslint-config`: ESLint configurations used throughout the monorepo
- `@repo/jest-presets`: Jest configurations used throughout the monorepo
- `@repo/typescript-config`: tsconfig.json's used throughout the monorepo
- `@repo/types`: a library of types shared between the back and front-end

Each package and app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Jest](https://jestjs.io) test runner for all things JavaScript
- [Prettier](https://prettier.io) for code formatting
