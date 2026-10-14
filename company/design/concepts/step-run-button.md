---
id: step-run-button
name: Step / run button simulation
kind: interaction
status: approved
owner: interaction-designer
kit: Control
references: lru-eviction-order
variants: scrubber-timeline
seeded: seeded by design-engineer; design lead to confirm
---

# Step / run button simulation

Step and run buttons advance a process or a batch of trials.

_Seeded by design-engineer on 2026-10-13 from company/design/formats.md (simulation run anatomy) and real lessons in src/demos (pattern seen in Demo.tsx); design lead to confirm._

## When to use
- Algorithms and simulations where each step is a discrete event.

## When not to
- The process is continuous (use a slider).

## Anatomy
- A Step button.
- A Run (or 'to the end') button.
- A Restart button that does not empty the stage at reveal time.
- A step counter.

## Rules
- If there is a run or play button there is also a step button.
- Restart is disabled at reveal time or keeps the last state visible.

## Open questions
- One standard label set (Step / Run / Restart)?
