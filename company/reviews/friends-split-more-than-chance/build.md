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
