# Build note: children-new-mutations (demo-builder, 2026-10-13)

- Retitled: brief slug only; title "How many new typos does a child carry?" does not name the answer.
- Design: the genome as 2 x 31 squares of 100 million letters (copy from mother, copy from father); each new change is a red tick. At the real rate (1.2 per 100 million) a square averages 1.2 ticks, so the rate is visible per square. Controls: "Make a child" / "Another child", rate chips Real 1.2, Half 0.6, Double 2.4.
- Randomness: ticks are a Poisson process with unit exponential gaps from mulberry32(child number), seeds 1, 2, 3... in order (not chosen), stretched by the rate, so changing the rate keeps the same child. Child 1: 67 at 1.2, 35 at 0.6, 140 at 2.4; mean over 2,000 children 74.4.
- Arithmetic: 2 x 3.1e9 x 1.2e-8 = 74.4. The brief's "1 in 80 million" and "1.2 in 100 million" are not the same (1.2e-8 is 1 in 83 million); I used 1.2 in 100 million only. Option "About 70"; the reveal says "about 74" and quotes the measured 60-70 (c5, needs a fact-check of the wording).
- Gate: milestones "child-real-rate" and "other-rate". QA path: Make a child (67), Half (35), Double (140), Real. The reveal quotes the learner's own counts.
- No medical interpretation anywhere. Claims c1-c5 unverified.
