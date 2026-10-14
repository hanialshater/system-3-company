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

## Pre-flight v2

Revision for r6 (knows-binary-search): the reveal's "halving costs about as many again" contradicted the 6 halvings on stage. Now a dashed outline marks the gap doubling found, labelled "gap 513–1023: 511 wide, up to 9 halvings", and the reveal says "can need nearly as many again", points at that label, and names this target's 6 as an early midpoint hit. log2 is glossed as "the number of doublings it takes, here 11". The finished run is recorded when "found" fires; a "Finished run" readout and the dashed last gap survive Start over. c4 reworded, c6 added.

1. **Title and hook.** "Binary search with no end in sight" / "Binary search starts from both ends. What if the list has no end you can see?" No count or size word; a learner cannot pick 500/100/20 from them.
2. **Options.** "About 500", "About 100", "About 20": all numbered, same wording.
3. **Locked stage.** Line 0–1024 with ticks 0/256/512/768/1024, a dashed "target" marker at 1000, note "Find 3007. Probe position 1, 2, 4, … until you pass it.", readouts Comparisons 0, Scan would need 1,001, Finished run "—". No 17 or 20 anywhere.
4. **Reveal values.** 11 doublings, 1 to 1024, gap 513–1023, 6 halvings, 17: from the `run` record set when milestone "found" fires (shown in the "Finished run" readout and the dashed gap label). 511 wide, up to 9: computed from the recorded gap (maxHalves), shown on the gap label. 1,001: the constant "Scan would need" readout. "34 for one million": told context, claim c5, not quoted as seen.
5. **QA path.** Double the probe (dot at 1), Double until past ("passed"; gap label appears), Halve the gap (768), Halve until found ("found"; Finished run 11 + 6 = 17), Start over. Both milestones. After Start over the dashed "last gap 513–1023: 511 wide, up to 9 halvings" and "Finished run 11 doubled + 6 halved = 17" stay on stage.
6. **Reset.** Start over last, then reveal: "You probed 11 times by doubling, from 1 to 1024, and the 11th probe passed the target. That left the gap 513–1023, and 6 halvings found it: 17 comparisons, not 1,001. Doubling reaches the target's gap after about log2(position) probes: the number of doublings it takes, here 11. That gap is about as wide as the last jump, so halving it can need nearly as many again: its label said 511 wide, up to 9 halvings. This target sat on an early midpoint and took 6. So the cost grows like twice log2 of the position: for position one million, 34 comparisons." Matches the record on stage.
