# Fact-check: half-life

fact-checker · 2026-10-12 · inputs: `src/demos/chemistry/half-life/meta.json` (c1–c5), `artifacts/walkthroughs/half-life/transcript.md`, `Demo.tsx` strings, recall card.

**Result: 5 recorded claims verified, 0 disputed. 2 unrecorded claims found and added as `unverified` (c6, c7). One of them (c7) is true on average but visibly false for single late steps in the stage; see F1. Because source pages were unreachable (egress proxy blocked them), c1, c2 and c5 rest partly on my own working.**

## Method

`artifacts/scratch/fc2-half-life.mjs` re-implements the lesson's generator (mulberry32, seed 1009 + 7919 * run, geometric decay step per atom) and runs 2,000 runs; `fc2-half-life-memoryless.mjs` checks the exponential law analytically.

```
run 0 step 1: 98 of 200 = 49% ; run 1: 95/200 = 48% ; run 2: 95/200 = 48%   (reproduces the transcript)
c3: (1/2)^2 = 0.25, (1/2)^3 = 0.125 ; 200/8 = 25
share decaying, mean over 2,000 runs, step 1..8: 50.0 49.9 50.0 50.2 50.1 50.1 50.5 49.6 %
share sd (points): 3.5 5.1 7.1 10.1 14.8 21.9 32.6 40.5
runs outside 33-67%: 0.0 0.1 1.9 8.9 22.7 34.8 51.3 66.6 %
atoms before step: mean 200 100 50.1 25.1 12.5 6.2 3.3 2.0
survivors after 3 half-lives, run r vs r+1: identical in 0 of 200 pairs; mean Jaccard 0.065 (independent expectation 0.067)
pooled P(decay | alive at start): 0.4998 0.4987 0.4999 0.5020 0.5018 (half-lives 1-5)
n=200: sd of share 3.5 points; n=1e12: 5e-5 points
exponential law: P(survive next half-life | alive at age s) = 0.5 for s = 0, 0.5, 1, 3, 5, 10, 25
```

## Recorded claims

- **c1 (decay is random per nucleus; likelihood, not when or which): VERIFIED.** Standard physics (constant decay probability per nucleus). Krane, Introductory Nuclear Physics (1988) ch. 6.1 not opened; a search shows "The Radioactive Decay Law" as a section in Krane, but I could not confirm it is 6.1 in the 1988 edition. The verdict rests on the physics, not on the section number.
- **c2 (50% chance per half-life regardless of age): VERIFIED.** From N(t) = N0 * 2^(-t/T) the conditional survival over one half-life is exactly 1/2 at every age (computed above). Rutherford & Soddy (1903) not opened.
- **c3 (a quarter after 2, an eighth after 3): VERIFIED.** Recomputed.
- **c4 (few hundred atoms wander, trillions very close to 50%): VERIFIED.** Binomial: sd of the share = 0.5/sqrt(n); 3.5 points for n = 200 (the lesson's size; the simulated sd at step 1 was 3.5), 5e-5 points at n = 1e12.
- **c5 (carbon-14 half-life about 5,700 years): VERIFIED.** True for either evaluated value: 5,700 +/- 30 y (NUBASE2020, as cited) or 5,730 +/- 40 y (Godwin, Nature 195, 984, 1962; the Cambridge value). They differ by 0.5%, so "about 5,700" fits both. The Godwin figure and citation were confirmed from search results (secondary); the NUBASE2020 table entry could not be opened. Suggested citation hygiene in F3.

## Unrecorded claims (added to meta.json as `unverified`)

| id | Where the learner sees it | Sentence | My working |
|---|---|---|---|
| c6 | Stage message; reveal | "Fresh atoms. Different ones will survive this time." / "a new run keeps different ones" | 0 of 200 consecutive run pairs share the same survivors; overlap equals the independent expectation |
| c7 | Reveal | "Each half-life, roughly half of whatever was left decays, even the long survivors." | True on average at every step; single runs wander (numbers above) |

Checked and not claims: the predict premise "After 3 half-lives about 25 are left" is c3 applied to 200 atoms (expected 25; a single run varies, sd about 4.7); "Atoms do not age" is c2; "the count halves to a quarter, an eighth" is c3. The shares and counts in the live messages and history chart are computed from the same arrays and agree with the transcript.

## Fixes routed to demo-builder (problems, not tests)

- **F1 (stage vs sentence, c7).** The lesson allows 8 waits, but from the 5th wait on only about 12 atoms or fewer remain, and in single runs the share decaying is often far from half: at the 6th, 7th and 8th wait 35%, 51% and 67% of runs show a share below 33% or above 67%, and often exactly 0% or 100%. A learner who keeps waiting sees "100% decayed" under a reveal that says "roughly half ... even the long survivors". That looks like the "overdue" idea the lesson is meant to remove. The explore hint asks for four waits, where the share is within 33-67% in 91% of runs. The reveal's "With so few atoms the share wanders" partly covers it but does not say a step can be 0% or 100%.
- **F2 (wording).** "the count halves to a quarter, an eighth" reads as if halving gives a quarter in one go. The claim is that after two half-lives a quarter remain and after three an eighth. Minor.
- **F3 (citation hygiene, optional).** c1 cites Krane ch. 6.1 and c5 the NUBASE2020 value. Neither was opened. Confirm the section and the table entry, or describe them as further reading.
- **F4.** c6 and c7 are my additions and need a checker other than me.
