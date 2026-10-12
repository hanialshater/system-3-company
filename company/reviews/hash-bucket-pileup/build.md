# Build note: hash-bucket-pileup (demo-builder, 2026-10-12)

- Design intent: 10 slots, keys drop one at a time into seeded-random slots and chain upward; the first shared slot turns red. A small histogram underneath tallies which key caused the first collision across tables (+20 tables at a time).
- Reveal gate (minInteractions 2): interact() on a table's first visible collision and on '+20 tables', which stays disabled until one collision has been seen.
- Seed check: 201 seeded tables give 67.7% collided by key 5 (exact 69.76%); the first table collides at key 4, a typical case, not a cherry-picked extreme.
- After screenshots: the histogram axis was unlabelled; it now says 'Key that caused the first collision, N tables'. Trimmed the reveal to stay under 120 words.
