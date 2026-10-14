# Build note: the-middle-voter-decides

builder: ncm-m1 (demo-builder) · 2026-10-14 · status: draft · kept from evaluators until they report
brief: company/domains/briefs/math.discrete.md, "## Course: NCM (2026-10-14)" #1 (accepted version)

## What was built
Single card. A 0-10 line with five voters at 1, 2, 3, 8, 10. Chips pick the position under test (3, 4.8 avg, 5 centre; the active chip is disabled). A slider moves a rival in steps of 0.2. Voters fill with the colour of the position they are nearer to. A dashed "halfway" line marks the split, and a strip shows the tested position against every whole-number rival 0-10 (✓ win, ✗ loss, = tie). The middle voter gets a thick ring and a label once the prediction is in. The halfway line, the colouring and the strip are hidden until then, so the stage does not give the answer away.
The why on stage: the halfway line. A rival right of 3 always leaves 1, 2, 3 on 3's side; a rival left of 3 leaves 3, 8, 10 there. The reveal points at that line.
Milestones: average-loses (any action while 4.8 or 5 is under test) and median-holds (3 under test). QA path in DOM order: Test 3, then 4.8, which reaches both.

## Answers re-run in node (Demo.tsx duel(), extracted and run with strip-types)
- Mean 4.8. Whole-number positions 0..10 beat 4, 6, 8, 10, 8, 6, 4, 3, 2, 1, 0 others: only 3 beats all 10. 3 beats 5 by 3-2, 3 beats 4.8 by 3-2, and 4 beats 4.8 by 3-2. 3 also beats every 0.2-step slider rival.
- Recall (0, 1, 2, 4, 9, 9, 10): the only whole-number majority winner is 4; the mean is 5.

## Known gaps
- Not run: next build, tsc, QA, walkthrough (shared machine, per dispatch). Types were checked by reading only.
- The brief planned claim support "citation". The checker accepts only derivation, simulation, source and convention, so the theorem claim (c6) is "source".
- Equidistant voters abstain, which only matters when the rival sits exactly at a mirrored spot.
- All claims are unverified.
