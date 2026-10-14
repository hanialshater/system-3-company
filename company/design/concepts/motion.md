---
id: motion
name: Motion
kind: visual
status: approved
owner: visual-designer
kit: by hand
variants: scrubber-timeline
seeded: seeded by design-engineer; design lead to confirm
---

# Motion

Motion settles within 450 ms (the QA wait) and respects prefers-reduced-motion.

_Seeded by design-engineer on 2026-10-13 from company/design/system.md; design lead to confirm._

## When to use
- Transitions that show cause and effect.

## When not to
- Animation as a substitute for manipulation.

## Anatomy
- Transition up to 450 ms.
- A reduced-motion fallback.

## Rules
- Settle within 450 ms.
- Respect prefers-reduced-motion.
- If it plays, it can also step.

## Open questions
- Is 450 ms right for auto-played simulations?
