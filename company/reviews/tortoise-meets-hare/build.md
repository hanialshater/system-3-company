# Build note: tortoise-meets-hare

Builder: algo-pair-06 · 2026-10-14 · from brief #10 and spec `company/design/specs/tortoise-meets-hare.md`.

- Format storyboard-scrub as the spec says: tick tape of 8 tiles where only the next tile is live (one press = one tick); played tiles scrub back; no jump button. Toggle for the last arrow carries the tick across, capped at the halt tick (3 for "nowhere").
- Answer check re-run in node (scratchpad th.mjs): tail 2 / loop 5 meets on box 6 at tick 5; slow 2,3,4,5,6, fast 3,5,7,4,6; gap 3,2,1,0 from tick 2; no-loop list halts at tick 3 with fast on 7; all 110 tails 0-10 x loops 1-10 meet. Brief and spec confirmed, no brief problem.
- Milestones: `met` (tick 5 on the loop list) and `no-loop` (fast at the end on the nowhere list), `minInteractions=2`. QA path: tiles 1-5, tiles 6-8 disabled, toggle.
- At the reveal the stage pins the loop run at tick 5 ("Your run: tick 5, box 6") and controls are disabled. The reveal quotes the gap 3, 2, 1 which is guaranteed by the gate (tiles must be pressed in order).
- Ideas from TheAlgorithms/Python floyds_cycle_detection.py used only for how the algorithm works; no code copied.
- All 6 claims `unverified`. Reveal sentences map to c2, c3, c4, c5, c6.
- Known: feed-chips QA failures (W-136) are not this lesson.

## Revision 2026-10-14 (wave D r5, demo-builder)

v3. Review: "Gap" undefined and read as contradicting the picture; tick tape clipped; toggle read as a label. Changes: gap drawn as a green arc inside the ring from fast forward to slow, with its count; readout says "boxes fast must run to reach slow", "slow not in the loop yet" or "no loop here"; tape in one row of 8; legend merged into the model line; toggle phrased as an action; duplicated reveal line removed. Reopened c2, c3; new c7.
