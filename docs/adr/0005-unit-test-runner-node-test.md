# 0005. Unit Test Runner: node:test

- Status: Accepted
- Date: 2026-11-12

## Context
Unit tests cover the CLI's internal functions alongside the cucumber acceptance suite. Node 22.18 and later run `.ts` files through native type stripping, so a unit runner needs no loader or flag. The unit surface is small, pure Node code; nothing needs module mocking, snapshots, or watch mode. Research recorded in Capacities ("bdd-trial-cli: unit test runner choice") converged on the built-in runner for this project shape.

## Decision
We will use Node's built-in `node:test` with `node:test/assert` for unit tests under `tests/unit/`. The codebase uses only erasable TypeScript, enforced by `erasableSyntaxOnly` in tsconfig. `engines` pins Node 22.18.0 or later.

## Options Considered
- Vitest: strong watch, coverage, and module mocking, but a large dev-only dependency tree with nothing Vite-shaped to share it, and no need for its strengths here.

## Consequences
The unit runner adds zero dependencies. If module mocking, snapshots, or non-erasable syntax become necessary, a new ADR supersedes this one and adopts vitest.
