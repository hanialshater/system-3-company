# Fact-check: empty-ponds-still-left (2026-10-14)

Board: W-677. Lesson: src/demos/life/empty-ponds-still-left/ (status draft, version 1).

Checker: fact-checker. I did not write these claims. Method: I read Demo.tsx on every reachable path before reading the claims: locked state, presets in any order, Reset, seeds, the milestones that gate the reveal, and the reveal's dynamic strings. Then I re-ran every number in node 22 (--experimental-strip-types) from copies of the lesson's own code. CS lessons use a copy of model.ts. Life lessons use the non-JSX top of Demo.tsx cut out with sed, plus a copy of src/kit/random.ts. Independent loops cross-check where noted. Scripts: artifacts/fact-check-wave-j/wj-cs-life/. I did not use the dev server. No walkthrough transcript exists for this slug yet, so the stage was read from code. Web: only PyPI, npm and GitHub raw are reachable, and every source verdict below names the file I opened.

Unrecorded claims: I compared the hook, question, options, stage text, reveal and recall against the claims list and found none unrecorded.

Reachable paths covered: drains 30/50/70 in any order and New seed (1 -> 12 -> 1, which re-runs every tried drain). Both reveal branches were checked on all 12 seeds: 30 tried, or only 50 tried, alongside 70. The check script E3 section was re-run and matches (seed 1: 33 / gone 67 / gone 23; 1,000 seeds: 0 / 496 / 996 extinct).

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Re-ran runPonds() copied from Demo.tsx with the kit's mulberry32: drain 70, seed 1, start 19, extinct year 23. Seeds 1-12: 23, 21, 14, 19, 23, 24, 35, 21, 16, 29, 33, 60. Seeds 1-1,000: 996 extinct by year 100. All match the claim and check script E3 (re-run). |
| c2 | verified | Checked every seed 1-12, as the reveal can quote any seed New seed reaches (it cycles 12 -> 1). Drain 30 at year 100: 33, 8, 6, 26, 18, 26, 16, 28, 19, 12, 20, 29, never extinct. Drain 70: extinct in all 12, so the reveal's 'gone by year {extinctYear ?? 100}' never falls back to 100. Drain 50: extinct in 67, 83, -, -, 32, 45, -, 66, -, 45, 43, - (5, 6, 9, 8, 7 left otherwise). The reveal branch for a 50-only learner ('frogs until year 67' or 'frogs in 5 ponds') is true for each seed. Seeds 1-1,000: drain 30 never extinct, mean 25.84. |
| c3 | verified | Model rule read in runPonds (refill 1 - 0.995^n with n counted at the start of the year). refill(): 60 -> 26%, 42 -> 19%, 19 -> 9% (0.0908). 0.2 x 19 = 3.8 losses against 0.0908 x 11 = 1.0 gains. |
| c4 | verified | Derivation re-done: dp/dt = c p (1 - D - p) - e p gives p* = 1 - D - e/c. With e = 0.2 and c = 0.005 x 100 = 0.5, e/c = 0.4: p*(0) = 0.6, which matches the 60 ponds that start occupied, and p* = 0 at D = 0.6. 'The simplest version' is the deterministic Levins analogue, as the source says. Levins (1969) and Nee and May (1992) are not on the card and were not opened. |
| c5 | verified | Convention: the stage rule text matches the code (DIE 0.2, COL 0.005). 'Habitat can outlast its species' is a summary of c1 and c4 inside the model, flagged 'Toy model'. |
| c6 | verified | drainedAt(): 37 is coprime with 100, so drains 30/50/70 remove exactly 30/50/70 ponds, of which 18/30/41 were occupied. That leaves 42/30/19 occupied, and 19 of 30 good ponds at drain 70 (node). |

**Result:** verified 6.
