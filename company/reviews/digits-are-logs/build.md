# Build note: digits-are-logs (demo-builder, 2026-10-12)

- Intent: 2^n written as a strip of digit cells (exact BigInt). Ticks under the strip mark its length after 10, 20, ... doublings; they land evenly, 3 cells apart, which is the logarithm made visible.
- Controls: doublings slider (0..100), "+10 doublings" (step) and "Run to 100" (play, 28 ms per doubling). The reveal unlocks only when the strip reaches 2^100.
- Locked stage shows 2^0 = 1; the first version also drew a dashed 31-cell track, which would have given away the answer. Removed.
- After screenshots: the title read "2^30 = 10 digits", which looks like 2^30 equals 10. Now "2^30 has 10 digits".
