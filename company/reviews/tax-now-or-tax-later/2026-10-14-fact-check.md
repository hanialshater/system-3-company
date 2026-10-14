# Fact-check: tax-now-or-tax-later (2026-10-14)

## Pass 35 (2026-10-14, batch 3)

Checker: fact-checker (fresh instance; drafted none of this wording). Artifact: economics/tax-now-or-tax-later v1. Method: read Demo.tsx first, tracing every reachable path, Reset (where present) and reduced motion; re-ran the numbers in node/Python with independent re-implementations; checked how-chosen notes. Web sources could not be opened from this host (web fetch DNS failure, proxy 403), so nothing here is verified on an unopened source. No screenshots: the dev server at localhost:3530 did not respond. Scripts: scratchpad fc35-3/.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node: A = 10,000 × 0.75 × 4 = 30,000 (tax 2,500 up front, 7,500 grows to 30,000); B = 10,000 × 4 = 40,000, tax 10,000 (a quarter), keeps 30,000. Reveal needs milestone question (×4, 25%); q = accA(4) = 30,000. |
| c2 | verified | (1 − t) × G = G × (1 − t) for any G: equal flat rates tie at every growth. Stage ×2 at 25% shows A $15,000 and B $15,000. |
| c3 | disputed | Numbers hold (own node: ×4 at 35% B = 26,000, at 15% 34,000; ×2 at 35% B = 13,000 vs A 15,000). But the claim says the reveal quotes the learner's recorded rate and growth, and it prints only the rate: 'at a {rec.later}% later rate, B ended at {rec.b} against A's {rec.a}'. rec is the latest state with a later rate ≠ 25%, at whatever growth was set. The stage opens at ×2, and a learner who moves the slider at ×2, or switches growth after moving it, gets e.g. 'at a 35% later rate, B ended at $13,000 against A's $15,000'. That comes right after 'Both ended at $30,000 … $10,000 × 0.75 × 4', with no ×2 shown, so it reads as if A were $15,000 at ×4. Fix (builder): print the growth in the reveal (e.g. 'at ×{rec.g} and a {rec.later}% later rate'), or record the rate milestone only at ×4. Blocks publishing. |
| c4 | verified | Stage chip reads 'Model: made-up flat tax. Today 25%. Later: slider.'; the reveal ends 'Not advice about any real account.'; accA/accB contain no limits, fees or penalties; no real account named. Convention. |

Dispute c3 is on the board as W-500 (demo-builder). After the fix, a fact-checker re-checks it.
