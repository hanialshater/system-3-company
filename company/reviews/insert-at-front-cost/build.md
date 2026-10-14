# Build note: insert-at-front-cost (demo-builder, 2026-10-13)

- Design intent: the same six items A-F shown one way at a time (toggle): a row of 7 numbered slots ("Row: items sit in numbered slots, side by side") or a chain of boxes with arrows from "start" ("Chain: each box points to the next"). "Insert N at front": in the row all six slide right (CSS transform, 0.35 s, outlined red) and N takes slot 1; in the chain nothing moves and two arrows (start, N's) light. "Go to item 4": row outlines slot 4 (1 step); chain lights 3 numbered hops. Readouts: Items moved, Steps to item 4 (dashes while locked).
- Jargon: "array" and "linked list" appear only in the reveal, each after its stage name (row, chain).
- Key state: row insert (6 moved) and chain walk (3 hops). Milestones ["row-insert", "chain-walk"], minInteractions 2. QA path: Insert (row), Switch to chain, Go to item 4 (chain). Control order was chosen so this path reaches both.
- Numbers: 6, 0, 2, 3 and 4 come from ITEMS/TARGET constants. Reveal sentences about chain insert and row jump appear only if the learner did them.
- Retitled: slug states the cost; title "Room at the front of the line".
- After screenshots: arrowheads were oversized on thick hop lines; marker switched to userSpaceOnUse.

## Revision v2

Learner review 2026-10-13. Insert and "Go to item 4" now apply to the same list in both views, so switching shows N in place (it no longer vanishes with a 0 counter). Three milestones: inserted in the row, seen the chain with the insert, walked the chain. The reveal sentences about row jump or chain insert appear only if the learner saw them. Claims unchanged.
