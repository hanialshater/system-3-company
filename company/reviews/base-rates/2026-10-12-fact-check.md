# Fact-check: base-rates

fact-checker · 2026-10-12 · inputs: `src/demos/probability/base-rates/meta.json` (c1-c6),
`artifacts/walkthroughs/base-rates/transcript.md`, and the learner-visible strings in `Demo.tsx`.
The recall card was also read.

**Result: 6 recorded claims verified, 0 disputed, 0 withdrawn. 2 unrecorded claims added as
`unverified` (c7, c8); I wrote them so someone else must verify them. Nothing is wrong.**

## Method

Script `artifacts/scratch/fc-probability.mjs` (node, run 2026-10-12): Bayes for 1 in 1,000, 1 in 100
and 1 in 10 with sensitivity 99% and false-positive rate 1%; the stage's own rounding rule
(`round(sick x 0.99)`, `round((1000 - sick) x 0.01)`); the Harvard question's answer; the recall card.

```
prev 0.001: expected TP 0.99, FP 9.99, PPV 0.0902
prev 0.01 : TP 9.9, FP 9.9, PPV 0.5000
prev 0.1  : TP 99, FP 9, PPV 0.9167
stage towns (per 1000): 1 in 1000 -> 1 TP, 10 FP | 1 in 100 -> 10 TP, 10 FP | 1 in 10 -> 99 TP, 9 FP
Casscells question (1/1000, 5% FP, sens 100%): 1.96%; with sens 99%: 1.94%
recall (1 in 10,000): TP 0.99, FP 99.99 per 10,000, PPV 0.0098
```

## Recorded claims

- **c1 VERIFIED (convention).** The stage uses it consistently: predict text says "catches 99% of sick
  people and clears 99% of healthy ones", and the code uses 0.99 and 0.01. Altman & Bland (1994)
  BMJ 308:1552 is the right reference for sensitivity/specificity (reference confirmed; paper not opened).
- **c2 VERIFIED.** 0.99 true positives and 9.99 false positives per 1,000. Gigerenzer & Hoffrage (1995)
  Psychol Rev 102(4):684-704 is a real match for the natural-frequency framing (reference not opened).
- **c3 VERIFIED.** 9.02%. The reveal's "1 of 11 positives is sick: about 9%" gives 9.09%; both round to 9%.
- **c4 VERIFIED.** 50.00% and 91.67%. The reveal says "about 50%" and "about 92%".
- **c5 VERIFIED (convention).** The code rounds exactly as described; the transcript at 1 in 10 shows
  "108 tested positive. 99 of them are actually sick" (99 + 9), which matches. Partial towns (e.g.
  "100 people. 11 are sick") differ from the expected 10, which is the variation the claim describes.
- **c6 VERIFIED (partly secondary).** The study is Casscells, Schoenberger & Graboys, NEJM 1978;
  299(18):999-1001: confirmed by search. Search results (NEJM CardioExchange commentary, a 2014 JAMA
  Internal Medicine replication summary) give: 60 Harvard medical students, residents and attending
  physicians; 27 of 60 (45%) answered 95%; 11 of 60 (18%) answered the correct ~2%. The question was
  1 in 1,000 prevalence and 5% false-positive rate. I recomputed the right answer as 1.96%, "about
  2%". I could not open the original paper, so the "60", the "95%" and the "most common" rest on those
  secondary reports. Note the original did not state the test's sensitivity (it is taken as 100%);
  the claim says "similar question", which covers this.

## Unrecorded claims found (added as unverified)

| New id | Where the learner sees it | Sentence | My working |
|---|---|---|---|
| c7 | Reveal | "'99% accurate' describes the test. Your chance also depends on how rare the disease is." | Instances c3/c4 (9%, 50%, 92%). True by my computation |
| c8 | Recall card | 1 in 10,000, 99%/1%: "about 1 sick person tests positive, but about 100 healthy people do too" -> "About 1 in 100" | 0.99 TP, 99.99 FP per 10,000, PPV 0.0098. True |

Not claims, or covered: "About 10 in 1,000 will be sick" / "About 100 in 1,000" are the definition of
the settings; "Medical staff fall for this too" is covered by c6 (and by the 2014 replication).

## Fixes routed to demo-builder

- F1. The Harvard figure in the reveal is "the most common answer ... was 95%". The study did not state the test's
  sensitivity, so its "right answer" of about 2% assumes the test catches every case; a learner
  comparing it to this lesson's 99% test could be puzzled. Optional: say the right answer is about 2%
  "if the test catches every case". Not false as written.
- F2. c6 should carry the counts (27 of 60 answered 95%; 11 of 60 correct) in its `source` once someone opens the NEJM paper,
  so the "most common" claim traces to the paper, not to commentary.

Next move: a checker other than the fact-checker verifies c7, c8.
