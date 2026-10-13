# Build note: same-average-different-ride (demo-builder, 2026-10-13)
- Intent: 20 seeded players' wealth over 100 plays on one fixed axis. Lines that end below $0 are red. Game Y's fan is far wider. '1,000 players each' gives 15% vs 32% behind (exact 13.6% vs 32.1%).
- Gate: 2 milestones, switch to Game Y, then the 1,000-player count.
- The brief's numbers re-computed exactly (exactBehind in model.ts): X is behind iff wins <= 44, Y iff wins <= 8. Batches of 20 are noisy (1-3 behind for X, 5-11 for Y), so the count of 1,000 carries the claim.
