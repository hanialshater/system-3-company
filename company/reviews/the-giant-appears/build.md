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
