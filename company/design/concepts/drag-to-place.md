---
id: drag-to-place
name: Drag to place
kind: interaction
status: proposed
owner: interaction-designer
kit: by hand (pointer events)
variants: slider-drives-live-chart
seeded: seeded by design-engineer; design lead to confirm
---

# Drag to place

The learner drags a point or object directly on the stage.

_Seeded by design-engineer on 2026-10-13 from real lessons in src/demos (pattern seen in Demo.tsx); design lead to confirm._

## When to use
- Direct manipulation is the idea (move the outlier, move the hill).

## When not to
- A slider says the same thing (sliders are reachable by keyboard and by the QA path for free).

## Anatomy
- A draggable handle at least 44 px.
- A keyboard or button alternative.
- A readout of the position.

## Rules
- Every drag has a button or slider equivalent (QA presses each control once).
- Handles are at least 44 px.

## Open questions
- Is drag allowed at all, given the QA path cannot drag?
