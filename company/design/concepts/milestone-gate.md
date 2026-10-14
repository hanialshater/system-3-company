---
id: milestone-gate
name: Milestone gate
kind: interaction
status: kit-supported
owner: interaction-designer
kit: Milestones / useMilestones
seeded: seeded by design-engineer; design lead to confirm
---

# Milestone gate

The reveal unlocks only when the learner reaches the named key states.

_Seeded by design-engineer on 2026-10-13 from company/product/demo-standard.md and real lessons in src/demos (pattern seen in Demo.tsx); design lead to confirm._

## When to use
- Every lesson with a key state (the earn-the-reveal pattern).

## When not to
- Lessons where any action is enough.

## Anatomy
- Named milestones.
- minInteractions equals the number of milestones.
- The explore hint names what to reach.

## Rules
- interact() only for steps toward the key state.
- Every milestone is reachable on the QA path.

## Open questions
- Should the learner see the milestone checklist?
