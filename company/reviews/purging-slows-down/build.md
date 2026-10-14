# Build note: purging-slows-down (demo-builder, 2026-10-13)

- Retitled "How fast does a lethal gene vanish?" (the slug says "slows down").
- Design: 100 people, each a capsule with two gene-copy dots; red = bad copy; people with two bad copies get a dashed red outline ("dies"). Controls: +10 generations, Run until 1%, Start over. Deterministic: q' = q/(1+q), so 1/q rises by 1 per generation.
- Brief check reproduced: 10% to 1% takes 90 generations. The first 10 take it from 10% to 5%.
- Stage text quotes the exact share of bad copies in carriers (1 - q: 90% at the start, 99% at 1%) rather than the rounded picture, which would read 100% at 2 copies of 200.
- Gate: milestones "gen-10" and "one-percent", both on the QA path (+10, then Run until 1%). The reveal quotes 10% to 5.0%, 90 generations, 1 in 100 and 1 in 10,000, all shown on those two states.
- Claims c1-c4 unverified.

## Revision v2

Input: latest learner review (and fact-check). Slowing was told. Added a share-vs-generation curve that draws as generations run and marks 5.0% after 10 and 1.0% after 90; reveal states 10 to 5 took 10 generations, 5 to 1 took 80; reveal shows generation 90. c2 reworded, unverified.
QA: contract passes on phone and desktop; walkthrough sheet looked at. Version bumped to 2, `format` set, edited claims are unverified for the fact-checker.

## Revision v3

Review 2026-10-14 r2: the x-axis ended on the answer 90. The axis now runs to 120 and shows no tick labels (and no 0/5% marks) until the guess is locked.
