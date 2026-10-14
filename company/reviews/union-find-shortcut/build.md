# Build note: union-find-shortcut (demo-builder, algo-builder session, 2026-10-14)

- Design intent: forest of 8 people with depth rows labelled 'leader, 1 hop, 2 hops, 3 hops'. Tap a person to see their hops to the leader (find), tap a second to merge (union by size).
- 'Merge the rest, tallest way' pairs equal groups (height 3); '1,000 random orders' runs seeded merges (mulberry32 seed 1, not chosen) and reports the worst height (3).
- Reveal gate: everyone in one group.
- Brief answer re-checked in node before building (scratchpad checks/all.mjs); it held.
- QA: computer-use contract passed locally on phone and desktop (2026-10-14). Claims all unverified; nothing verified by the builder.


## Revision v2

From the latest learner review and fact-check (batch 03).

- Row labels (leader, 1 hop ...) appear only as trees grow; nothing is drawn before the prediction.
- After a merge the message says tap two leaders (filled circles) to merge groups; "1 hop" singular.
- Hand-built tallest tree is counted separately from "Merge the rest, tallest way"; reveal words each from what the learner did.
