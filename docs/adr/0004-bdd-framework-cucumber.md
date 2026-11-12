# 0004. BDD Framework: @cucumber/cucumber

- Status: Accepted
- Date: 2026-11-12

## Context
The project exists to prove the delivery workflow end to end, including a real BDD acceptance suite. Its product is a CLI, and the operator specified @cucumber/cucumber with TypeScript step definitions.

## Decision
We will write acceptance scenarios in Gherkin under `features/*.feature`, implemented with TypeScript step definitions and run by @cucumber/cucumber. Step definitions load through tsx, per the cucumber-js transpiling documentation.

## Options Considered
- Statements-only acceptance criteria: rejected, because the project's goal includes a real BDD suite.
- Web-UI BDD tooling: aimed at browsers; a poor fit for a CLI.

## Consequences
Observable behaviour needs a `.feature` scenario before it counts as done. The harness (runner wiring, npm scripts, CI workflow) is delivered by a dedicated Chore issue, not the bootstrap commit.
