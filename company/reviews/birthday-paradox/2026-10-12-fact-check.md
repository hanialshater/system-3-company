# Fact-check: birthday-paradox

fact-checker · 2026-10-12 · inputs: `src/demos/probability/birthday-paradox/meta.json` (c1-c8),
`artifacts/walkthroughs/birthday-paradox/transcript.md`, and the learner-visible strings in `Demo.tsx`
(prediction, reveal, stage text, readouts). The recall card was also read.

**Result: 8 recorded claims verified, 0 disputed, 0 withdrawn. 3 unrecorded claims found and added as
`unverified` (c9-c11). I wrote c9-c11, so someone else has to verify them. One of them (c9, "far more
than most people guess") has no source at all. Nothing recorded is wrong.**

## Method

Script `artifacts/scratch/fc-probability.mjs` (node, run 2026-10-12). It computes the product formula
(also with BigInt for n = 23), searches for the smallest n above 50%, copies the demo's own
`room()` generator and runs 200,000 rooms at four sizes, and runs a Monte Carlo for a non-uniform
year (+/-20% sinusoidal). Output used below:

```
n=22 0.47570  n=23 0.50730  n=26 0.59824  n=29 0.68097  n=30 0.70632  n=50 0.97037  n=70 0.99916
smallest n with >50%: 23     pairs 23: 253, 30: 435
1-(364/365)^22 = 0.05857
demo rooms n=23 0.5075 (exact 0.5073) | n=26 0.5985 (0.5982) | n=29 0.6813 (0.6810) | n=50 0.9711 (0.9704)
non-uniform year n=23, MC 0.5158 > uniform 0.5073
rooms 1..21 at n=26: 12 matches  (transcript shows 12/21 for that same sequence)
```

## Recorded claims

- **c1 VERIFIED.** 50.73% for n = 23 (rounds to 50.7%). Rests on my computation. I did not open Feller
  (1968); the section reference is unchecked.
- **c2 VERIFIED.** n = 22 gives 47.57%, n = 23 gives 50.73%, and no smaller n is above 50%. Same note on Feller.
- **c3 VERIFIED.** 23 x 22 / 2 = 253.
- **c4 VERIFIED.** 1 - (364/365)^22 = 5.86%, "about 6%". The claim says "at least one of the other 22
  shares your birthday", which is the formula used.
- **c5 VERIFIED.** n = 50 gives 97.04%; n = 70 gives 99.916%, which rounds to 99.9%.
- **c6 VERIFIED (sentence), source not opened.** The statement is the known result that the uniform
  distribution minimises the chance of a match, so any unevenness can only raise it. My Monte Carlo
  agrees (51.6% vs 50.7% for a mildly uneven year). I could confirm only the bibliographic details
  of Bloom (1973) and Munford (1977) from reference lists; I could not open either note, and the
  attribution of the result to them comes from secondary sources (Wikipedia, a Cornell notes page,
  a SAS blog). The verdict rests on my own working plus those secondary pages. Related stage wording:
  "a little uneven" is a size judgement the claim does not make; fine as an approximation.
- **c7 VERIFIED.** I replicated the demo's xorshift generator exactly (`room(index)`), ran 200,000
  rooms at n = 23, 26, 29 and 50: observed shares match the exact chance to within 0.0007. The 12/21
  seen in the transcript is reproducible (rooms 1-21 at n = 26 give 12 matches). Modulo bias of
  `% 365` on 2^32 values is about 1e-7, negligible.
- **c8 VERIFIED.** n = 30 gives 70.63% ("about 71%"); 30 x 29 / 2 = 435. Also the recall card's answer
  (some two share) is right.

## Unrecorded claims found (added as unverified, not verified by me)

| New id | Where the learner sees it | Sentence | My working |
|---|---|---|---|
| c9 | Reveal, to learners who guessed wrong | "a coin flip, far more than most people guess" | No source. The 50.7% is right; what people guess is an empirical claim about human estimates. Needs a survey citation, or reword/remove |
| c10 | Reveal | "People grow by one; pairs grow by the whole room." | n(n+1)/2 - n(n-1)/2 = n. 22 -> 23 people adds 22 pairs. True |
| c11 | Reveal | "The trap is asking 'does anyone share my birthday?'" | The 6% is c4. That people actually reason this way is a statement about psychology with no source. It is the lesson's teaching hypothesis; record it as such or cite |

Checked and not claims: "every line on the ring" (the stage draws a chord for each pair, so
253 chords at n = 23); date labels ("Shared: Mar 14") are computed from the seeded rooms.

## Fixes routed to demo-builder (problems, not tests)

- F1. The reveal puts the learner's own tally ("You drew 21 rooms of 29; 13 had a shared birthday")
  right next to "For 23 people the exact chance is 50.7%". The two figures are for different room
  sizes (29 vs 23), so a learner can read the tally as a test of the 50.7%. Nothing is false, but the
  stage makes a comparison the numbers do not support.
- F2. "far more than most people guess" (c9) and "The trap is..." (c11) are stated as facts about
  people with no source. Either cite a study of people's estimates, or phrase them as the lesson's
  framing.
- F3. c1, c2, c5 cite "Feller (1968), ch. II.3". I did not open it. The verdicts do not depend on it.
  Confirm the section, or call it further reading.

Next move: a checker other than the fact-checker verifies c9-c11 (or the builder rewords c9/c11).
