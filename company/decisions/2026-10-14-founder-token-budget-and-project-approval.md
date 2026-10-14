# Founder decision: a token budget to track investments, and an approval forum for major projects

owner: founder (recorded by chief-of-staff)
date: 2026-10-14
status: decided. Routed to portfolio-manager (Odette, the founder's office).

## What the founder said

> "Talk to the protofoilo manager in my office, and task is to create token budget so we can track our investments, I want to work with VPs and cheafs and PEs to approve major projects"

## Decision

1. **A token budget.** Every unit of work (a project, wave, category, ritual or engineering change) has a token budget set in advance, and actual spend is tracked against it, so the company can see what each investment costs and what it returned (lessons published, claims verified, findings fixed).
2. **A project approval forum.** Major projects are approved by the founder together with the VPs, the chiefs and the principal engineers, before work starts. Today that means:
   - **VPs:** vp-rnd, plus the VP of Marketing once created;
   - **chiefs:** chief-of-staff, chief-of-staff-ceo-office;
   - **PEs:** principal-engineer, principal-engineer-ops, principal-pm-verticals.

   The portfolio manager runs it, and defines what counts as "major".

## Context (why now)

Today's work ran without any budget: up to 20 agents at once, with the host's limits and the usage budget as the only brakes (2026-10-14-retro.md). Several investments were started without approval and later shown to cost more than expected. Two examples: the Life Hacks 200 (0 of 200 publishable, because of an engine bug) and Books decks (60 slots buy about 12 books, not 30).

## Constraints that still bind

- Token usage figures must come from real records (agent run reports, the event log, `npm run metrics`), never estimated after the fact and presented as measured.
- The approval forum does not override existing gates: deploy approval, protected paths, publish gates and the review independence rules.
- The approval forum adds a gate only for work above the "major" threshold; small work (fixes, routine checks, publishes) must not wait on it.

## Objections carried forward

- **principal-engineer-ops (ops review):** measuring tokens per agent run needs a record that does not exist on disk today; any backfill of 2026-10-14 is partial and must say so.
- **chief-of-staff:** a forum that meets on every project would slow small work; "major" must have a threshold, and everything under it skips the forum.
