# Build note: friends-split-more-than-chance

builder: ncm-p2 (demo-builder) · 2026-10-14 · status: draft · kept from evaluators until they report

## What was built
Simulation run.
- **Top:** a class of 30 with 45 friendship lines. There are 20 circles in a ring on the left and 10 squares on the right. Lines that cross groups are thick and drawn in the domain colour.
- **Below:** a histogram of random classes by how many friendships cross groups. A red marker sits at 9 for the real class.
- **Controls, in DOM order:** Draw a random class, Draw 1,000 more, Show the real class, Start over.
- **Readouts:** random classes drawn, average crossing, and how many had 9 or fewer.
- **Milestones:** drew, and many (1,000 or more draws).

The reveal quotes the learner's own tally.

## Model and figures
- In a random class, each of the 45 friendships is an independent uniform pair from the 435. The crossing count is therefore exactly Binomial(45, 200/435), the exact value the strand manager asked for. P(<= 9) = 0.000264, about 1 in 3,800, which the lesson quotes as "about 1 in 4,000". Duplicate pairs can occur; they are drawn on top of each other.
- Seed 41 was not chosen for its result. On the QA path (draw 1, then 1,000 more), the first class has 26 crossing. The 1,001 classes average 20.88 (46%); none has 9 or fewer, and the fewest is 11.
- The real class has 28 links inside A, 8 inside B and 9 across, placed with mulberry32(7).

## Known gaps
- The stage has two pictures, the graph and the histogram, with the histogram as a compact tally strip. If one-representation is enforced, cut the graph down to the "random class #n: x of 45" line.
- References use chapter 4 only. The brief's section 4.1 is unconfirmed, so it was dropped as instructed.
- All claims are unverified.

## Revision v2 (wave E, r6 learner review, fatal)

- r6 FATAL (after Start over the reveal said "Your 0 random classes crossed groups 0% … the fewest was 45"): the reveal no longer reads the live tally. The largest run is recorded when it is drawn (classes, average, number with 9 or fewer, fewest) and Start over does not clear it. A "Your run" row under the readouts shows the record, and the reveal quotes it. The "fewest 45" came from the empty tally's starting min (45 = F); it can no longer reach the reveal.
- r6 revise (the pairs yardstick was told): new first control "Count possible pairs" draws all 200 cross-group pairs on the network ("Possible pairs across: each of the 10 with each of the 20 = 200 of 435") and leaves a row "Pairs across: 10 × 20 = 200 of 435 (46%)". It is a milestone (pairs, drew, many; minInteractions 3). The reveal's yardstick sentence points at those 200 lines.
- c1 and c3 reworded and unverified. Builder node re-run of seed 41: 1,001 classes average 46%, fewest 11, 0 with 9 or fewer.

## Pre-flight v2

1. Title and hook: "Is one in five a lot or a little?" / "One friendship in five crosses groups. Without a yardstick, that number tells you nothing." They say a yardstick is needed, not what it is; 33%, 46% and 20% all stay open.
2. Options: "About 33%" / "About 46%" / "About 20%". Same wording and precision.
3. Locked stage: the real class network with 9 crossing lines, legend, the empty histogram with the red "real class: 9" marker, readouts 0 / – / 0. No 200, 435 or 46% anywhere; the pairs row is empty.
4. Reveal values: "Your 1,001 random classes … 46% on average", "None … had 9 or fewer; the fewest was 11": the recorded run, milestones drew and many (b), in the "Your run" row. "200 of 435 possible pairs (46%)", "10 × 20 = 200 lines you counted": milestone pairs (b), in the pairs row. "The real class crosses 20%": the real network, on stage after "Show the real class" (a). "about 1 in 4,000" and "2 × 2/3 × 1/3, about 44%": told context (c4, c5).
5. QA path: Count possible pairs (200 lines: pairs) → Draw a random class (drew) → Draw 1,000 more (1,001: many) → Show the real class → Start over. Both rows are on stage when the reveal opens.
6. Reset: Start over pressed last; the histogram and readouts empty, both rows kept. Reveal from that run: "Your 1,001 random classes crossed groups 46% of the time on average, close to the 200 of 435 possible pairs that cross (46%). The real class crosses 20%. None of your random classes had 9 or fewer; the fewest was 11. The exact chance is about 1 in 4,000. / The yardstick is pairs, not people: each of the 10 can pair with 20 people in the other group, the 10 × 20 = 200 lines you counted. For large groups of 2/3 and 1/3 it is 2 × 2/3 × 1/3, about 44%. / So the gap between 46% and 20%, not the 20% alone, is the evidence that friends sort by group."
