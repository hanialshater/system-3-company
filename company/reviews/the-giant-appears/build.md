# Build note: the-giant-appears (demo-builder, 2026-10-14)

Session 2 (branch ccr-rnd-ncm), Networks, Crowds, and Markets batch 1. Brief: `company/domains/briefs/probability.chance.md` item 1. Network-stage rules: `company/design/reviews/2026-10-14-design-lead-ncm-rulings.md` §2.6 (texture graph).

- Intent: one fixed world of 200 dots. Chips 0.5 / 1.0 / 1.5 / 2.0 / 3.0 average friends each reveal the first 50 / 100 / 150 / 200 / 300 links of one seeded random sequence, so links are only ever added, never redrawn. The biggest group is filled (r 4.5, others hollow r 3) and its share is printed in a readout; the learner reads the readout, not the drawing (no names, no taps, edges 1 px).
- Rule used (re-run in node, reproduces the brief): mulberry32(1); each link is a random pair a != b not already linked; biggest group by union-find. Seed 1: 9, 36, 110, 148, 183 people at 50..300 links. Seeds 1-20 means 3.9 / 16.8 / 59.1 / 79.4 / 94.0 %.
- Initial state is 100 links (1.0 friends each), so the stage matches the question's 36 people (18%) before the prediction. Chips are locked until the prediction. The 148 (74%) state is not on stage before it.
- Gate (earn-the-reveal): two milestones, chip 1.5 and chip 2.0. The reveal quotes the 36 and 148 of the question plus every chip the learner actually pressed. The QA path presses chips in ascending DOM order, so it ends on 3.0 (183, 92%); the reveal lists every pressed value and does not claim 3.0 is the picture.
- Layout: jittered 20 x 10 grid with its own seed (77), positions are constants computed once, so adding links cannot move a dot.
- Seed shown ("Random world, seed 1"); the seed was the first tried and is disclosed in claim c1, with the 20-seed spread in c2.
- Words on stage (excluding numbers): legend + seed 8, readout labels 4: under 25. Seed line merged into the legend and the dot grid made 170 tall so the chips are not clipped in the locked predict screen (found in the first walkthrough sheet).
- Section 2.2 of Easley and Kleinberg ch. 2 is **unconfirmed** (brief says so; the fact-checker confirms against the free PDF). The Erdős-Rényi threshold is not derived in ch. 2 (c3) and needs the fact-checker's citation check.
- Rounding on stage: 9/200 = 4.5% shows as "5%", 183/200 = 91.5% shows as "92%". The brief's 4.5 / 91.5 are in c1.
- Not done by me: no claim marked verified; claims c1-c6 are `unverified`.
- Node modules were copied from a sibling worktree for building (not committed).

## Revision v2 (polish, 2026-10-14, demo-builder)

From learner r2 (`2026-10-14-learner-adult-beginner-r2.md`). Version 1 to 2.
- Merging on stage: the second-biggest group is drawn green (dots and edges) beside the gold giant, with a "Second" readout (9, 12, 23, 21, 3, 3 people at 50, 100, 125, 150, 200, 300 links). The learner watches the green group shrink to 3 as the giant swallows it. Explore hint says "Watch the green group". New claim c7 (unverified).
- 1.25 chip added (125 links: 76 people, 38%; 36 to 76 in 25 links). 6 chips. c1 and c4 updated; claims c1, c4, c5, c7 now unverified. Re-run in node (tsx on model.ts). Label formatting: 1.25 shown with two decimals, others one.
- Hairball: non-giant, non-second edges are 0.6 px at 45% opacity; giant and second edges 1.4 px in colour. Still a dense picture at 2.0+; the readouts carry the numbers.
- Hook rewritten to not leak "not doubling": "Add random friendships among 200 people. How big does the biggest friend group get?" (86 chars).
- Reveal: about 80 words at worst case (all six chips pressed); sizes list shortened. "seed 1" jargon removed from legend; legend now "Gold: biggest group · Green: second biggest"; stage graph max-height 17dvh so the six chips are not clipped when locked on a phone.
- QA: contract spec for the-giant-appears passes on phone and desktop (QA_PORT 3881, own dist .next-giant). Walkthrough frames read on phone. The feed spec (not this lesson) failed in an unfiltered run; not investigated.
