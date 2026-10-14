# Build note: doubling-finds-the-edge

builder: algo2-b1 (demo-builder) · 2026-10-14 · status: draft · kept from evaluators until they report

## What was built
Single card. A number line 0-1100 (positions). The list is value(i) = 3i + 7, so the target is 3007 at position 1000, marked "target". Doubling probes are dots on the line, turning red once one passes the target. The surviving gap is a shaded band, and the halving probes sit just below the line. Controls in DOM order: Double the probe, Double until past, Halve the gap, Halve until found, Start over. Milestones: passed, found.

## Answers re-run in node
- Probes 1..1024 = 11 comparisons; open gap 513-1023; halvings 768, 896, 960, 992, 1008, 1000 = 6; total 17. Position 1e6 -> 34; 4000 -> 19 (recall).
- The brief says 18. I could only reproduce 18 by also probing position 0 and halving the closed gap 512-1024. The lesson uses 17 under its own counting rule, which claim c1 states. The answer "About 20" is unchanged.

## Known gaps
- Probes 1-64 crowd at the left end of the linear axis; only the last probe gets a label.
- The Bentley-Yao citation (c4) comes from the brief and has not been opened. All claims are unverified.
