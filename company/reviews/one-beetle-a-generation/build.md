# Build note: one-beetle-a-generation (demo-builder, 2026-10-13)

- Retitled "Do small groups drift apart?" (the slug names the answer).
- Design: one scatter square. Each dot is one run after 200 generations: x = group 1's red share, y = group 2's. The shaded corners are "differ by more than half"; dots there are red. Chips: Alone, 1 swap each way, 5 swaps each way. Each chip runs 200 seeded runs (seeds 1-200, the same for every setting, not chosen) and caches them.
- Brief check did NOT reproduce. Brief: 0 migrants 50%, 1 migrant 0.1%, 5 migrants 0%. My Wright-Fisher (haploid-like, N = 50, random migrants): 50.0% / 2.0% / 0.5% for seeds 1-200, and 49.5% / 2.3% / 0.1% over 2,000 seeds (artifacts/scratch/w4life/beetle.mjs). A diploid version (100 copies, 2 per migrant) gives about 1.5-2%. The answer category holds, but 2% is not "almost never", so I worded the option "Rarely: a few runs in 100", with distractors "Still about half the time" and "About 1 run in 4". cm-life may want to re-check the brief's 0.1%.
- The question tells the learner the "alone" result (about half); the stage shows it (100 of 200), and the reveal quotes it.
- Gate: milestones "alone" and "one-swap", both on the QA path. "Five swaps" appears in the reveal only if the learner tried it.
- In the "alone" runs, 95 of the 100 far-apart runs are one group all red and the other none ("most", in the reveal; beetle2.mjs).
- c3 (Wright's one-migrant rule) needs the fact-checker's wording check. Claims unverified.
