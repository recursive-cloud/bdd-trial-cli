# 0001. Record Architecture Decisions

- Status: Accepted
- Date: 2026-11-12
- Amended: 2026-11-12, Accepted ADRs may be amended in place when a reviewed pull request carries the change.

## Context
Decisions must outlive sessions and agent memory. This repository is worked by autonomous agents whose context is disposable, so a decision that is not written down gets re-litigated or silently reversed.

## Decision
We will record architecture decisions as short ADRs in `docs/adr/NNNN-kebab-title.md`, in the format this file demonstrates. Accepted ADRs may be amended in place when a reviewed pull request carries the change; the pull request is the record, and git history keeps the trail.

## Consequences
Every agent can find current decisions in one directory. Reversing a decision still requires a reviewed pull request, which is deliberate friction.
