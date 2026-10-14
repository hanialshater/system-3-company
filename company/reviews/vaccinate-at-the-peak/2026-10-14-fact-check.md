# Fact-check: vaccinate-at-the-peak, 2026-10-14

## Pass 11 (2026-10-14)

Checker: fact-checker. Scope: claims still unverified after wave C revisions. Method: re-derived in node from the Demo.tsx model code, compared claim text with the stage/reveal code, checked cited sources.

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c6 R0 = 3 means that, early on, each sick person infects 3 others on aver... | verified | R0 = beta/gamma for SIR; 0.6/0.2 in node = 2.9999999999999996, Demo.tsx rounds to 3 (line 18). |

Result: 1 verified, 0 disputed.

## Pass 26 (2026-10-14, batch 2, wave G revisions)

Checker: fact-checker (wrote and built none of these claims). Method: read Demo.tsx first (every learner-visible string, every reachable branch, Reset/Start over where it exists, reduced motion where it applies; this lesson has no motion-dependent text), then the build.md Pre-flight; re-ran the numbers in my own node ports of the lesson's logic (scratchpad fc26-b2/). No builds. No sentence below is verified on an unopened source; external hosts failed DNS this pass.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Own node port of simulate(): none 0.9407, day 0 0.7031, peak day round(19.19) = 19 0.7566, day 40 0.9359; whole percents 94, 70, 76, 94; 94 - 76 = 18, 94 - 70 = 24, round(100·18/24) = 75; unrounded 18.41 of 23.75 points = 0.775. Seen row lists none always, day 0 and day 19 once their milestones are hit (both needed for the reveal); peak clause "Day 19: 35% not yet infected." |
| c7 | verified | Own node: S at day 22 = 20.49%, day 23 = 17.57%; S only falls, so every day from 23 to 60 is capped (vax < DOSE) and gets the capped line. Day 40: S = vaccinated = 6.41%, final 93.6%; the generated line is exactly "Day 40 (after the peak): only 6% not yet infected, so only 6% vaccinated. Final: 94% infected." |

**Result:** 2 verified, 0 disputed, 0 held unverified.
