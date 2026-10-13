# Build note: few-survivors (demo-builder, 2026-10-13)

- Design: one jar of 1,000 gene copies (10 red = 1%). "Squeeze" keeps 20 copies (10 survivors) drawn without replacement; the jar is redrawn as the regrown population (each kept copy founds 50), so a lost red is visibly gone and a kept one comes back at 5% or 10%. Top row = the 20 kept copies. Running tally "lost in L of N jars".
- Brief answer checked: 0.99^20 = 0.818; the stage's own model (without replacement) gives 0.816; both round to 82%, and the option text is computed from the stage model (P_LOST).
- Seeds: jar n uses mulberry32(n), untuned. 16 of the first 21 jars lose red; 81.7% over 100,000 (artifacts/scratch/w3life/check2.mjs). The reveal quotes the learner's own tally and then gives the exact probability, without generalising from the run.
- Reveal gate: milestones "one-jar" (first squeeze) and "many-jars" (20 or more jars). "Squeeze 1 jar" and "Squeeze 20 jars" are the first two controls.
- Brief said the learner taps 10 dots from the jar; 1,000 tappable dots do not fit a phone, so a squeeze button draws them. No text-free exploration: one short line of stage text.
- Not used: cheetah / elephant seal facts. After the first screenshots I labelled the top row ("20 copies (top row)").
- All claims unverified.
