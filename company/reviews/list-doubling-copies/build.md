# Build note: list-doubling-copies (demo-builder, 2026-10-13)

- Design intent: a row of slots that starts with room for 1. Append fills a slot; when the row is full Append is disabled and the learner must press Grow, which copies every item into a block twice the size (the copied items flash in the domain colour). A running line reads "Copies: 1 + 2 + 4 + 8 = 15"; readouts give appends, copies and copies per append. "Append to 16" auto-grows; manual Append continues to 32.
- Key state: one grow done by hand, and 16 items reached. Milestones ["grew", "reached-target"], minInteractions 2. QA path: Append, Grow, Append to 16, Start over.
- Numbers: question's 16 and options (15, 30, 120) come from grows()/TARGET in Demo.tsx; the reveal's sum is the same grows(16). Brief answer (A, 15) re-computed in Node and held.
- Deviation from brief claim list: dropped "Python lists double"; CPython over-allocates by about 1/8, Java ArrayList by 1.5x, so the reveal says "grow by a factor" and names ArrayList only.
- After screenshots: the single starting slot sat at the far left and "Grow: copy 0 into 2" read oddly while disabled; the row is now centred and the button says "Grow" until the list is full.


## Revision v2

From the latest learner review and fact-check (batch 03).

- Question defines list, append and the resize; hook no longer presupposes appending is fast.
- "Append to 16" jump kept as "Run to 16"; new "Fill, then double" button steps one doubling per press so 1+2+4+8 appears as a process.
- "Per append" is now "Copies per append"; Java ArrayList sentence dropped from the reveal (c4 no longer shown).
- c3 unverified.
