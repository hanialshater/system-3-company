# Build note: insertion-by-hand (demo-builder, 2026-10-12)

- Design intent: 5 cards, the glowing card slides one place per tap and a 'slid N' badge sits under each card, so reversed 5-4-3-2-1 visibly costs 1+2+3+4 = 10. Four starting hands (reversed, shuffled, nearly sorted, sorted) are labelled by their sequence, not by words.
- Reveal gate (minInteractions 2): interact() fires only when a hand with a not-yet-finished start is completed, so the learner must finish two different hands and see two different slide counts.
- 'Finish this hand' does the remaining slides at once but leaves every per-card badge, so the count is still visible card by card.
- After screenshots: the finished-hand tally '54321 · 10' was cryptic; now '54321 → 10' with the label 'Hands (→ slides):'.
