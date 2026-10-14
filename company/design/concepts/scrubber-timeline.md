---
id: scrubber-timeline
name: Scrubber timeline
kind: interaction
status: approved
owner: interaction-designer
kit: Slider (kit <Timeline> proposed)
references: coaster-track-shape
variants: step-run-button
seeded: seeded by design-engineer; design lead to confirm
---

# Scrubber timeline

A slider over time (days, years, frames, steps), sometimes with play.

_Seeded by design-engineer on 2026-10-13 from company/design/formats.md (storyboard anatomy) and real lessons in src/demos (pattern seen in Demo.tsx); design lead to confirm._

## When to use
- A process over time the learner should be able to scrub back and forth.

## When not to
- Only the end state matters.

## Anatomy
- A Slider labelled with a unit of time.
- Key-frame ticks.
- Optional play with a step button.

## Rules
- Prefer manipulation to animation.
- Auto-play respects prefers-reduced-motion.

## Open questions
- Should key frames snap?
