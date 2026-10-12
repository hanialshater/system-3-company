# Fact-check: natural-selection

fact-checker · 2026-10-12 · inputs: `src/demos/life/natural-selection/meta.json` (c1-c7),
`artifacts/walkthroughs/natural-selection/transcript.md`, and the learner-visible strings in `Demo.tsx`.
The recall card was also read.

**Result: 7 recorded claims verified, 0 disputed, 0 withdrawn. 3 unrecorded claims added as
`unverified` (c8-c10); I wrote them so someone else must verify them. Two source-line defects to fix
(c4 arithmetic, c5 chapter number); neither changes the claim.**

## Method

Scripts `artifacts/scratch/fc-life.mjs` and `artifacts/scratch/fc-ns-extra.mjs` (node, run 2026-10-12).
I ran the recursion p' = p w / (p w + 1 - p) generation by generation (not only the closed form)
and a Wright-Fisher haploid simulation for c7.

```
1.1^100 = 13780.6   odds = 139.198   p(100) = 0.99287 (recursion and closed form agree)
p(24)=0.0905 p(25)=0.0986 p(26)=0.1075 | p(47)=0.4711 p(48)=0.4949 p(49)=0.5188
first generation >= 10%: 26  | first generation > 50%: 49
1% edge: 1.01^100 = 2.7048, odds = 0.027321 (source line says 0.0274), p(100) = 0.02659
1% edge: first generation > 50%: 462   5% edge: 95
Wright-Fisher haploid N=1000, s=0.1, one new copy: fixed in 18% of 4,000 runs (Haldane 2s = 20%)
```

## Recorded claims

- **c1 VERIFIED.** With the stated assumptions (offspring keep the parent's colour, very large
  population, dark leaves a fixed factor (1+edge) more young) the odds are multiplied by (1+edge) every
  generation: p'/(1-p') = w p/(1-p). Re-derived and checked by iteration. The textbook chapter
  numbers (Gillespie ch. 3, Hartl & Clark ch. 5) were not opened; the verdict rests on the
  derivation. One assumption is implicit and not in the claim: generations do not overlap. The
  reveal's "ignores chance" covers the finite-population part.
- **c2 VERIFIED.** 99.29%, "about 99%". The reveal and prediction use "about 99 in 100".
- **c3 VERIFIED.** p(25) = 9.86% (under 10%), p(26) = 10.75%; p(48) = 49.5%, p(49) = 51.9%. So "stay
  under 10% for the first 25 generations" and "pass half at about generation 49" are right. (The
  claim's own source line says the same numbers.)
- **c4 VERIFIED, source line has an arithmetic slip.** 1.01^100/99 = 0.02732, not 0.0274; p = 0.0266.
  "About 3%" is true (2.7%). The slip is in the `source` text, which learners can read. See F1.
- **c5 VERIFIED on substance, citation defect.** Selection changes populations through who leaves
  offspring, not through individuals changing; Bishop & Anderson (1990), J Res Sci Teach 27(5):415-427
  is the right paper for the student misconception (reference confirmed in standard listings; I did
  not open it). But the `source` cites Futuyma & Kirkpatrick (2017) "ch. 12". A table of contents I
  found places natural selection in ch. 3 and ch. 12 as a different topic (only one listing, so not
  certain). The chapter number is probably wrong. See F2. Claim text is limited to the model's
  beetles; it is not a claim about every animal's colour change in life (some animals do change
  colour, but not by selection).
- **c6 VERIFIED (secondary sources).** Searches confirm: carbonaria first recorded in Manchester in
  1848 (R. S. Edleston, reported 1864), 98% in Manchester by 1895 (several secondary pages), and
  Cook (2003) QRB 78(4) is the right paper (page range given as 399-417 or 399-418 in different
  listings). "Roughly one generation per year": I could not confirm this from my search, but the
  peppered moth is univoltine in Britain (my knowledge). I did not open Cook or Majerus. Nothing the
  lesson says contradicts these.
- **c7 VERIFIED.** A new beneficial copy is lost by chance with high probability: Wright-Fisher at
  s = 0.1 fixed it in 18% of runs (Haldane's 2s = 20%), so most new copies are lost. The claim says
  only that chance can remove a rare variant, which holds. Gillespie ch. 3 was not opened.

## Unrecorded claims found (added as unverified)

| New id | Where the learner sees it | Sentence | My working |
|---|---|---|---|
| c8 | Reveal | "1.1^100 is about 14,000" | 13,780.6 |
| c9 | Reveal | "selection needs time, not a big edge" | 1% edge needs 462 generations to pass half; 5% needs 95. True as framing |
| c10 | Recall card | 5% survival edge, A starts rare -> becomes common, no plant changes type | Same recursion with w = 1.05; passes half at generation 95 |

Checked and not claims: the premise in the prediction ("dark beetles leave 10% more young than pale
ones") is the model's assumption, not an assertion about real beetles; the stage's per-generation
percentages follow c1.

## Fixes routed to demo-builder (problems, not tests)

- F1. c4's `source` shows odds 0.0274 and p = 0.027; the correct values are 0.0273 and 0.0266. The
  conclusion ("about 3%") stands, but a trust-sheet reader recomputing it would not get the printed number.
- F2. c5's `source` cites Futuyma & Kirkpatrick "ch. 12", which appears to be a different chapter.
  Confirm the chapter or drop the number; the claim does not rest on it.
- F3. The reveal's "Real case" paragraph puts the peppered moth next to the lesson's 10% edge, which
  invites a reader to think the moth's selective edge was about 10%. The 1848-1895 rise (about 47
  generations from rare to 98%) implies a per-generation edge near 20% in this model's terms
  (my computation; real moths are diploid with a dominant allele, so it is only a rough comparison).
  Nothing is stated false, but the stage does not say the two are different. Consider noting the moth is only an
  illustration.
- F4. c1 should state that generations do not overlap (the recursion needs it), alongside "very large
  population".

Next move: a checker other than the fact-checker verifies c8-c10.
