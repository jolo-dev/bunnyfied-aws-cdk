# Welcome to your Bun CDK TypeScript project 🍔

This is the Bun 💨 for your AWS CDK development ☁️ with [Bun](https://bun.sh/) and TypeScript.

## What are the Fillings 🥟

- Native Bun tools: such as [runtime](https://bun.sh/docs/cli/run), ~~[`bun test`](https://bun.sh/docs/cli/test)~~ [vitest](https://vitest.dev), and [`bun`dler](https://bun.sh/docs/bundler)
- [AWS CDK](https://docs.aws.amazon.com/cdk/v2/guide/home.html)
  - A Construct for your Bun Lambda `BunFun`
  - A Lambda Layer Stack for your Bun Runtime thanks to [`bun-lambda`](https://github.com/oven-sh/bun/tree/main/packages/bun-lambda)
- Lint and Formatting for Typescript with [@antfu/eslint-config](https://github.com/antfu/eslint-config) (If you don't like it, remove the `@antfu/eslint-config`)

## Pre-requisite

- [bun >= v1.0.0](https://bun.sh/docs/installation)

> NOTE: Please, no global CDK --> `npm remove -g cdk`. [Check out why!](https://medium.com/@jolodev/dont-run-npm-install-g-465ede5a7ddc)

## Why Bun?

- Bun is a swiss army knife for all your Typescript projects.
- Bun has its own Bundler which doesn't care if you use ESM or CJS
- Bun has its own Testing library
- Bun has its own Runtime to execute Typescript, and Javascript files without transpiling them

## CDK Diff

The difference here is:

- Remove Jest and use ~~[`bun test`](https://bun.sh/docs/cli/test)~~ [vitest](https://vitest.dev)
- Replace `npx` with `bun`- commands
- Bun as Package Manager
- Added Eslint
- Use Monorepo

## Useful commands

* `bun build`   emits the synthesized CloudFormation template or `bun cdk synth`
* `bun watch`   watch for changes and compile
* `bun run test`    perform the vitest unit tests (NOTE: `bun test` would run the `bun test` instead of vitest)
* `bun cdk deploy:all`  deploy this stack to your default AWS account/region
  * Use `AWS_PROFILE=my-profile bun cdk deploy:all` when deploying using an profile
  * Use `bun cdk:only` when deploying a single Stack (default is `BunFunStack`)
  * Use `STACK=MyCustomStack bun cdk:only` when deploying a single `MyCustomStack` Stack
* `bun cdk diff`    compare deployed stack with current state
* `bun cdk synth`   emits the synthesized CloudFormation template

## Troubleshooting

- Sometimes the first time you hit any `bun deploy`, you may encounter an error. Just run it again. Maybe bun is too quick for AWS CLI, I have no idea why that happen 🤷‍♂️