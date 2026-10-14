---
id: tally-counters
name: Tally counters
kind: interaction
status: kit-supported
owner: interaction-designer
kit: Readout
variants: slider-drives-live-chart
seeded: seeded by design-engineer; design lead to confirm
---

# Tally counters

Readouts that count events as they happen (hits, heads, rolls, steps).

_Seeded by design-engineer on 2026-10-13 from real lessons in src/demos (pattern seen in Demo.tsx); design lead to confirm._

## When to use
- Simulations and processes where the count is the evidence.

## When not to
- A single final number is enough.

## Anatomy
- Readouts in a row.
- Counts update live.
- '?' while locked.

## Rules
- Tabular figures.
- Counts are integers; rates are rounded.

## Open questions
- Should tallies show a rate as well as a count?
