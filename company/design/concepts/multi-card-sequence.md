---
id: multi-card-sequence
name: Multi-card sequence
kind: format
status: proposed
owner: design-lead
kit: src/kit/sequence.tsx <CardSequence>/<SubCard> (EDD-006, built 2026-10-14 on branch design/multi-card-sequence; awaiting principal-engineer review)
variants: storyboard-scrub
seeded: seeded by design-engineer; design lead to confirm
---

# Multi-card sequence

Two to four sub-cards inside the explore phase, each with its own picture.

_Seeded by design-engineer on 2026-10-13 from company/design/formats.md; design lead to confirm._

## When to use
- An idea that needs 2 to 4 steps, each with its own picture.

## When not to
- One picture can carry the idea (use the single card).
- The steps are frames of one process over time (use the storyboard).

## Anatomy
- 2 to 4 sub-cards, swiped or stepped.
- Progress dots.
- Milestones per sub-card.
- Predict and reveal stay single.

## Rules
- No contract change: predict and reveal stay single.
- Every sub-card is reachable on the QA path.

## Open questions
- Swipe or step buttons inside a vertical feed that already swipes? EDD-006 answer: both. Next buttons and the step trail are the path (QA, keyboard, screen reader); a horizontal swipe is an accelerator only (touch and pen, never vertical, never from a control).
- Kit support: EDD-006 (`company/engineering/edd/EDD-006-multi-card-sequence.md`), reference draft `math/euclid-three-steps`. Builders may use it once the principal engineer approves the EDD and design review approves the reference.
