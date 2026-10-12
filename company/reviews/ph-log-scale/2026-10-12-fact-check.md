# Fact-check: ph-log-scale

fact-checker · 2026-10-12 · inputs: `src/demos/chemistry/ph-log-scale/meta.json` (c1–c6), `artifacts/walkthroughs/ph-log-scale/transcript.md`, `Demo.tsx` strings, recall card.

**Result: 6 recorded claims verified, 0 disputed. 1 unrecorded claim found and added as `unverified` (c7). The cited sources (IUPAC, USGS, FDA, Nature) could not be opened because the egress proxy blocked them; c1, c3, c4, c5 are verified from search-result corroboration plus my own working, as noted below.**

## Method

`artifacts/scratch/fc2-ph-log-scale.mjs` (node), including a re-run of the lesson's `times()` function for pH 2 to 7.

```
pH 2: 1,000x (1000 cells) | pH 3: 100x | pH 4: 10x | pH 5: 1x | pH 6: 1/10 (a tenth) | pH 7: 1/100 (a hundredth)
c2: [H+] pH2/pH5 = 1000 ; pH7/pH5 = 0.01 ; pH4 vs pH7 = 1000
rod 10, flat 100, ten flats = 1000
c6: 10^14 = 100,000,000,000,000 = 100 x 10^12 (a trillion is 10^12) => a hundred trillion
ratio lemon/coffee over the cited ranges: min 178 (coffee 4.85, lemon 2.6), max 1,349 (5.13, 2.0), midpoints 2.3 vs 5.0: 501
c5: sqrt(1.0e-14) = 1e-7 -> pH 7 ; with 1.008e-14 -> pH 6.998
```

## Recorded claims

- **c1 (pH = -log10 of hydrogen-ion concentration, strictly activity; one unit = factor 10): VERIFIED.** The IUPAC definition is pH = -lg a(H+); the factor of 10 per unit follows (10^-p / 10^-(p+1) = 10). Gold Book page not opened; the verdict rests on the definition as I know it.
- **c2 (3 units lower = 1,000 times; 2 units higher = 1/100): VERIFIED.** Recomputed above; the live readout labels at pH 2 to 7 (1,000x, 100x, 10x, 1x, 1/10, 1/100) are right, and the "a tenth / a hundredth of the outlined square" note switches at the right value.
- **c3 (lemon juice roughly pH 2, measured 2.0 to 2.6): VERIFIED.** FDA "Approximate pH of Foods" range 2.00-2.60 was found in two compilations (Clemson Extension; Engineering ToolBox); the FDA and USGS pages were not opened. The claim itself ("roughly pH 2") is uncontroversial.
- **c4 (black coffee roughly pH 5, typical brewed coffee about 4.8 to 5.1): VERIFIED.** The Rao & Fuller abstract (Sci Rep 8:16030, 2018) was confirmed through search results: pH 4.85-5.13 for hot and cold brews. USGS not opened. Secondary pages disagree about the cold-brew subrange; the claim's combined range is the abstract's.
- **c5 (pure water pH 7 at 25 C): VERIFIED.** Kw = 1.0e-14 gives exactly 7 (6.998 with the more exact 1.008e-14). The lesson labels it "pure water (25 °C)", which carries the temperature condition.
- **c6 (pH 0 to 14: a factor of 10^14, a hundred trillion): VERIFIED.** 10^14 = 100 trillion (short scale, trillion = 10^12).

## Unrecorded claims (added to meta.json as `unverified`)

| id | Where the learner sees it | Sentence | My working |
|---|---|---|---|
| c7 | Predict; reveal | Same-sized cups of coffee (about pH 5) and lemon juice (about pH 2): lemon juice has about 1,000 times as many hydrogen ions | 10^3 for the round values; for the cited measured ranges the ratio is 178 to 1,349 |

Checked and not claims: the distractors (2.5, 3, 30 times); "Small pH numbers, enormous differences" (framing); recall answer 1,000 (pH 4 vs 7 = 3 steps, covered by c2). "A sliver too thin to see" is a drawing statement.

## Fixes routed to demo-builder (problems, not tests)

- **F1 (stage sentence vs real liquids, c7).** The question reads as a fact about coffee and lemon juice ("Same-sized cups: black coffee (about pH 5) and lemon juice (about pH 2). How many times more hydrogen ions does the lemon juice have?"). The lesson's own cited ranges make that ratio anywhere from about 180 to about 1,350 times, so "about 1,000 times" is right for pH exactly 5 and 2, and only loosely for real cups. A learner can leave believing a real lemon juice has 1,000 times a real coffee's hydrogen ions. The wording needs to make clear that the 1,000 follows from the round values (for example "if the coffee is pH 5 and the lemon juice pH 2").
- **F2 (hook word "acid").** The hook asks "How much more acid is that?" but the lesson answers in hydrogen ions. Total acid (titratable acidity) is a different quantity and is not 1,000 times; I did not quantify it. The lesson's body says hydrogen ions throughout, so the hook is the only place the ambiguity sits.
- **F3 (citation hygiene, optional).** None of the four external sources was opened. Confirm the USGS and IUPAC pages, or describe them as further reading.
- **F4.** c7 is my addition and needs a checker other than me.
