# 0002. Runtime: TypeScript on Node 22 with npm

- Status: Accepted
- Date: 2026-11-12

## Context
The operator specified a throwaway TypeScript CLI on Node 22 with npm. Node 22.18 and later run `.ts` files through native type stripping without a flag, which later decisions build on.

## Decision
We will write the CLI in TypeScript, target Node 22.18.0 or later (pinned in `engines` and `.nvmrc`), use ESM (`"type": "module"`), and manage dependencies with npm.

## Options Considered
- Node 24: newer, but the operator pinned Node 22 LTS.
- CommonJS: no benefit for a new CLI; ESM is the standard.

## Consequences
Native type stripping is available to the test tooling. Every contributor and CI job must run Node 22.18.0 or later.
