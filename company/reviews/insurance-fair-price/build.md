# Build note: insurance-fair-price

builder: demo-builder · 2026-10-13

- Intent: 10 × 10 houses, each an independent 1% chance a year of a $10,000 loss (mulberry32, seed 1, CHOSEN so year 1 has exactly one loss; disclosed in c4).
- Milestones: one year run, then 50+ years. Buttons +1 year, +100 years, Reset. Average payout hidden while locked.
- Reveal quotes the learner's own longest run (average, zero-loss years, 2+-loss years), computed from the same HISTORY.
- Brief's premium slider dropped (one representation, text budget).

## Revision v2 (wave D r5, 2026-10-14)

Title and hook no longer give $100. Customer's side on stage: an outlined 'your house' (house 1, hit in year 1 under seed 1) shows premiums paid against cover paid. Tally of years with 0 / 1 / 2+ losses on stage. In the reveal the stage shows the longest run and its controls lock (fixes the Reset contradiction). Alt text plural fixed. Reopened c4, c5; added c7.
Edited claims are unverified for the fact-checker. Not run here: build, QA, walkthrough, tsc (shared machine); syntax checked only.
