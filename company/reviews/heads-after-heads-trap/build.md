# Build note: heads-after-heads-trap (demo-builder, 2026-10-13; sonnet build, EXP-003)
- Retitled "After a head, how often is a head next?" ("trap" gave the answer).
- 16 tiles, one per 4-flip sequence, are the first 16 controls so QA's 16 presses open all of them. Gate: one milestone, "all-read" = all 14 sequences with a flip after a head open (TTTT and TTTH have none and are not needed). Readouts hidden until a tile is open.
- No randomness: full enumeration. 17/42 = 0.4048 and pooled 12 of 24 recomputed in node from model.ts, the same code that draws the tiles.
- Question reuses the exact brief wording about averaging; "share" defined on stage as heads among flips right after a head.
- Miller and Sanjurjo citation recorded as claim 5 (unverified, wording to check). No claim about whether the hot hand exists.
