# bdd-trial-cli

Throwaway TypeScript CLI that exists to prove the autonomous planning-and-delivery workflow end to end, including a cucumber BDD acceptance suite.
Sensitivity: private

## Architecture
- Architecture decisions live in `docs/adr/`: 0002 runtime, 0003 repository layout, 0004 BDD framework, 0005 unit-test runner.

## Conventions
- Conventional Commits (`feat:`, `fix:`, `chore:`).

## Rules
- Erasable TypeScript only: no enums, parameter properties, or decorators. node:test runs `.ts` files through native type stripping (ADR 0005).
- Node 22.18.0 or later is required for native type stripping (ADR 0002).
