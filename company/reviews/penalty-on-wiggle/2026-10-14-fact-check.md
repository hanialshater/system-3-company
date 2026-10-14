# Fact-check: penalty-on-wiggle (2026-10-14)

## Pass 22 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including computed ones and reachable fallback branches) against each claim, then re-ran the numbers in my own node scripts (scratchpad fc22/). Network to primary sources is blocked (Wikipedia, Google Patents, NIST, Cornell and other hosts return 403); where a claim rests on a source, the basis says whether it was corroborated by search snippets, taken from my own knowledge (Easley & Kleinberg chapter placement), or not checked.

| Claim | Verdict | Basis |
|---|---|---|
| c5 | verified | Own re-run of the extracted model, seeds 1-500: lambda 10 held-out miss worse than none in 441/500 (88%, 'usually loses'), worse than the best moderate penalty in 500/500. Reveal branches on big.held > big.none, and big is set by every visit to 10 (slider, button or New data at 10); the gate (too-much) guarantees a visit. Independence: the claim was first recorded by fact-checker (2026-10-13), but the sentence verified here is demo-builder v4 wording, checked fresh this pass. |
| c6 | disputed | Mod branch checked: own re-run seed 1 at 0.001 gives 0.41 vs 0.44 none; mod keeps the visit with the smallest held - none. But the stage makes a different sentence on a reachable path: from penalty 0, pressing 'Penalty 10' (or End on the slider) reaches both milestones without visiting 0.0001-1, so mod is null and the fallback prints '{none} with no penalty, {now} now' with now = penalty 10 (seed 1: '0.44 with no penalty, 0.72 now') as 'the other story', the bug the v4 change meant to remove. Fix (builder): gate the reveal on a moderate visit, or in the fallback compute and quote the best moderate penalty on the current data set (and record that sentence). |

**Result:** 1 disputed claim(s); lesson cannot publish until the builder fixes the stage or the wording and a fact-checker re-checks.
