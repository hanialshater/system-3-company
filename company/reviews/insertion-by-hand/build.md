# Build note: insertion-by-hand (demo-builder, 2026-10-12)

- Design intent: 5 cards, the glowing card slides one place per tap and a 'slid N' badge sits under each card, so reversed 5-4-3-2-1 visibly costs 1+2+3+4 = 10. Four starting hands (reversed, shuffled, nearly sorted, sorted) are labelled by their sequence, not by words.
- Reveal gate (minInteractions 2): interact() fires only when a hand with a not-yet-finished start is completed, so the learner must finish two different hands and see two different slide counts.
- 'Finish this hand' does the remaining slides at once but leaves every per-card badge, so the count is still visible card by card.
- After screenshots: the finished-hand tally '54321 · 10' was cryptic; now '54321 → 10' with the label 'Hands (→ slides):'.

## Revision v2 (batch 02, 2026-10-14)

Hook no longer states 10. A "Pairs out of order" readout falls by one with every slide, and the finished message says how many pairs the hand began with, so the pair-counting payoff is seen. Title changed.
Edited claims are unverified for the fact-checker. QA and walkthrough run after this edit.

## Revision 2026-10-14 (wave D r5, demo-builder)

v3. Review: locked stage showed PAIRS 10 next to option 10; lockstep seen once. Changes: Slides and Pairs read "?" while locked; "Finish this hand" now plays the remaining slides one every 0.38 s so both counters are seen falling together (result recorded at the press so QA order still unlocks). No claim text changed.
