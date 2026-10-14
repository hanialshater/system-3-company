---
id: simulation-run
name: Simulation run
kind: format
status: kit-supported
owner: design-lead
kit: Control + mulberry32 (kit/random)
references: drunk-walk-distance, herd-immunity
variants: step-run-button
seeded: seeded by design-engineer; design lead to confirm
---

# Simulation run

Many seeded trials with live tallies, for chance and populations.

_Seeded by design-engineer on 2026-10-13 from company/design/formats.md; design lead to confirm._

## When to use
- Chance, populations, anything that needs many trials before a pattern shows.

## When not to
- One exact calculation shows the idea better than noisy trials.
- Trials are not seeded (a run must be reproducible for QA).

## Anatomy
- Run and step buttons.
- A seeded generator (mulberry32), disclosed on the stage.
- Live tallies.
- The reveal quotes the learner's own run.

## Rules
- Seed the generator and say so.
- If there is a play or run button there is also a step button.
- The reveal names the learner's own numbers, not a canned run.

## Open questions
- Should the seed be visible on the stage or only in the reveal?
