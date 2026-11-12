# 0001. Record Architecture Decisions

- Status: Accepted
- Date: 2026-11-12

## Context
Decisions must outlive sessions and agent memory. This repository is worked by autonomous agents whose context is disposable, so a decision that is not written down gets re-litigated or silently reversed.

## Decision
We will record architecture decisions as short ADRs in `docs/adr/NNNN-kebab-title.md`, in the format this file demonstrates. Accepted ADRs are immutable; to change a decision, write a new ADR and mark the old one "Superseded by".

## Consequences
Every agent can find current decisions in one directory. Reversing a decision costs a new ADR, which is deliberate friction.
