---
id: slider-drives-live-chart
name: Slider drives a live chart
kind: interaction
status: proposed
owner: interaction-designer
kit: Slider (chart by hand)
variants: preset-buttons
seeded: seeded by design-engineer; design lead to confirm
---

# Slider drives a live chart

A kit Slider whose value redraws a chart or diagram on every change.

_Seeded by design-engineer on 2026-10-13 from real lessons in src/demos (pattern seen in Demo.tsx); design lead to confirm._

## When to use
- A continuous parameter whose effect is a shape (curve, bar, path).

## When not to
- Only a few values matter (use preset buttons).
- The parameter is time (use the scrubber timeline).

## Anatomy
- Slider with label and live value.
- Chart redrawn on every input.
- Axis labels on the stage.
- A readout of the key value.

## Rules
- The chart responds within one frame.
- The value is rounded for display.
- The key value is reachable on the QA path.

## Open questions
- Should the slider start at a value that is not the answer?
