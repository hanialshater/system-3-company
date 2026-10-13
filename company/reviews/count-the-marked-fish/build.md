# Build note: count-the-marked-fish (demo-builder, sonnet build, EXP-003, 2026-10-13)

- Retitled "Counting fish you can't all see" (slug kept; brief title does not state the answer but is fine).
- Design: a pond of 1,000 dots, 100 orange (marked). Buttons: Net a sample, Net 4 more, Throw all back. Nets are fixed seeded samples (seeds 11, 4, 15, 2, 20) so QA reproduces; marked in nets 5, 4, 7, 9, 3 (artifacts/scratch/w5life/fish.mjs).
- Seed 11 was chosen so sample 1 matches the question (5 marked of 50); disclosed in c4. The other four are the next picks, not tuned for spread.
- Gate: milestone "two-nets" (on "Net 4 more"). The estimate list and the true count (1,000) appear on the stage only after the learner has netted; the true count appears at 2+ nets. Locked stage shows no estimate.
- Reveal quotes the learner's own nets (the ones they netted); the 100 x 50 / 5 line comes from the question's constants.
- Claims all unverified.
