# Fact-check: gradient-descent (2026-10-12)

Checker: fact-checker. Inputs: meta.json claims, walkthrough transcript, Demo.tsx (read only to extract learner-visible sentences and re-run the model).
Script: `artifacts/scratch/fc-gradient-descent.mjs` (plain loop x ← x − η·2x from x = 4, not the closed form; closed form compared).

## Per-claim verdicts

| Claim | Verdict | Working |
|---|---|---|
| c1 update rule x ← x − η·f′(x) | verified | Definition of gradient descent; the stage's "Each hop = step size × slope" says the same. Section pointer (GBC §4.3) not re-read: deeplearningbook.org was unreachable from this sandbox. |
| c2 factor (1 − 2η) on x² | verified | x − η·2x = (1 − 2η)x; loop and closed form agree to 1e-12. |
| c3 0.05 and 0.95 both end 1.39; 0.45 within 0.04 after 2 steps | verified | Loop: 0.05 gives 1.3947, 0.95 gives 1.3947 (signs alternate, so it zigzags), 0.45 gives 0.0400 after 2 hops (exactly 0.04, so "within 0.04" is inclusive). The UI shows 1.39 (toFixed 2). The source line prints 1.395, which would round to 1.40; harmless. |
| c4 above 1 every hop lands farther; 1.05 ends 10.4 away | verified | 1.05: 4, −4.4, 4.84, … 10.375 after 10; strictly growing. η = 1 does not grow (bounces). |
| c5 same trade-off in real nets; learning rate often most important setting | verified (substance) | Widely stated (Bengio 2012 "Practical recommendations", which the search tool surfaced, says the same for SGD). The verbatim quote and §8.3.1/§11.4.1 numbering in the source field were not read; primary text unreachable. A person with the book should confirm the quote. |
| c6 NNs trained by gradient-descent variants updating all parameters, millions of them | verified (substance) | Standard; "millions" understates modern networks, which makes the claim safe. Pinpoint sections not re-read (same reason). |

Disputed: none. Withdrawn: none.

## Learner-visible statements not previously recorded (added to meta.json as unverified)

- c7 "Bouncing between the same two spots forever" at step size exactly 1 (script: 4, −4, 4, −4 …; true).
- c8 "Fast is where 1 − 2 × step size is near zero" (true on x²; best slider value is 0.5, which lands on the bottom in one hop).
- c9 Message "Close to the bottom in a few hops." appears for factors 0 < f ≤ 0.6 including after hop 1 at step size 0.2 with FROM BOTTOM 2.40 (transcript step 2). The sentence describes a future the learner has not yet seen and sits beside a number that contradicts it. Not a numeric falsehood (0.2 reaches 0.02 by hop 10) but the stage asserts it before it is true.

I wrote these three records, so they stay unverified for another checker.

## Fixes routed to demo-builder (phrased as problems)

1. At step size 0.2 the stage message says "Close to the bottom in a few hops" while the readout reads 2.40 from a start of 4.00; the sentence is false at the moment it is shown. Also the message bands (factor > 0.6 "Crawling", else "Close...") ignore how many hops have been taken.
2. The source string in c3 prints 1.395 while the stage prints 1.39; make them agree.
3. c1, c5, c6 cite section numbers and a verbatim quote that nobody has read against the book in this audit; the quote in c5's source should be confirmed or dropped.

## Result
6 verified, 0 disputed, 3 added unverified. Nothing blocks launch from this check; claims c7–c9 need an independent check before attestation.
