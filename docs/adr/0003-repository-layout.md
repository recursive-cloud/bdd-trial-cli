# 0003. Repository Layout

- Status: Accepted
- Date: 2026-11-12

## Context
The CLI needs production source, a cucumber acceptance suite, and unit tests, kept apart so each test runner sees only its own tree.

## Decision
We will use:
- `src/` for production source (`index.ts` entry, `greet.ts` command).
- `features/` for Gherkin scenarios, with step definitions in `features/step_definitions/`.
- `tests/unit/` for node:test unit tests.
- `docs/adr/` for decision records.

## Options Considered
- Tests beside source: blurs which runner owns which test.
- One `test/` tree for both suites: the cucumber-js convention is a `features/` tree.

## Consequences
Cucumber and node:test configurations point at disjoint globs. New code goes in `src/`, its unit tests in `tests/unit/`, and its acceptance scenarios in `features/`.
