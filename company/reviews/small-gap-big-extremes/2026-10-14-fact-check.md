# Fact-check: small-gap-big-extremes (2026-10-14)

## Pass 35 (2026-10-14, batch 3)

Checker: fact-checker (fresh instance; drafted none of this wording). Artifact: probability/small-gap-big-extremes v1. Method: read Demo.tsx first, tracing every reachable path, Reset (where present) and reduced motion; re-ran the numbers in node/Python with independent re-implementations; checked how-chosen notes. Web sources could not be opened from this host (web fetch DNS failure, proxy 403), so nothing here is verified on an unopened source. No screenshots: the dev server at localhost:3530 did not respond. Scripts: scratchpad fc35-3/.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Python math.erfc (independent of model.ts's erfcc): Q(3) = 0.1350%, Q(2.5) = 0.6210% → 135 and 621 per 100,000; B's share 82.14%, ratio 4.600. Stage prints fmt(tail × 100,000), pct(share) = 82%, r1(ratio) = 4.6; reveal needs at-130. |
| c2 | verified | Python erfc: Q(4) = 0.0032% (3 per 100,000), Q(3.5) = 0.0233% (23); share 88.02%, ratio 7.345 → '7.3'. Other cutoffs: 100 cm 58.0% (1.38), 110 66.0% (1.95), 120 74.6% (2.94), 130 82.1% (4.60), 140 88.0% (7.35): the ratio grows monotonically. |
| c3 | disputed | 'At the averages the two batches overlap almost completely' overstates the picture. Two normal curves 0.5 sd apart share 2Φ(−0.25) = 80.3% of their area (Python erfc), so a fifth of each curve is not shared; 69% of B lies above A's mean (Cohen's U3). '5 cm (half a spread)' is correct. Fix (builder; owner decides wording): e.g. 'overlap mostly (about 80% shared)' or 'largely overlap', in the claim and the reveal. Blocks publishing. |
| c4 | verified | model.ts: equal SD 10, equal batch sizes (shares are per 100,000 in each), exact normal density, no sampling; the question's 'spread (10 cm)' is SD. The last sentence (different spreads or shapes change tail ratios) follows: unequal SDs change Q((c − μ)/σ) differently per batch. Convention. |

Dispute c3 is on the board as W-501 (demo-builder). After the fix, a fact-checker re-checks it.
