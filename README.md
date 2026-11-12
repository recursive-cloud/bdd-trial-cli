# bdd-trial-cli

A small TypeScript CLI that greets you by name. The repo is a throwaway trial built to prove an autonomous planning-and-delivery workflow end to end, with a BDD (behaviour-driven development) acceptance suite. Greeting logic lives in `src/greet.ts`.

## Requirements

Node.js 22.18.0 or later. `package.json` sets `engines.node` to `>=22.18.0`, and `.nvmrc` pins `22.18.0`.

The CLI and the tests run TypeScript directly, with no build step; the BDD suite loads TypeScript through tsx (see `docs/adr/0002-runtime-typescript-on-node-22.md`).

## Install

Clone the repository and change into it, then install dependencies:

```sh
npm install
```

## Usage

`package.json` declares no `bin` entry, so run the entry file with `node`:

```sh
node src/cli.ts greet Ada
```

```
Hello, Ada!
```

Pass `--shout` to uppercase the greeting:

```sh
node src/cli.ts greet Ada --shout
```

```
HELLO, ADA!
```

Omit the name and the CLI prints usage to stderr and exits with code 1:

```sh
node src/cli.ts greet
```

```
Usage: bdd-trial-cli greet <name>
```

## Tests

```sh
npm test
```

`npm test` runs the unit suite, then the BDD suite.

- `npm run test:unit` runs the `node:test` files under `tests/unit`.
- `npm run test:bdd` runs the cucumber BDD suite against the feature files in `features/`.

## Build

`npm run build` typechecks the project with `tsc --noEmit`.
