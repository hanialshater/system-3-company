# Fact-check: flour-shock (2026-10-13)

Checker: fact-checker. Method: transcript + Demo.tsx; model re-run in artifacts/scratch/fc-aiecongeo/flour.mjs. Deterministic.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | 100 - 10p = 10p - 20 -> p = 6, q = 40. |
| c2 | verified | 10(p-2) - 20 = 10p - 40 -> p = 7, q = 30. |
| c3 | verified | At $8: demand 20, supply 40. |
| c4 | DISPUTED (source note only; the stage numbers are right) | The claim text is true: price rises c/2 and q = 40 - 5c for c = 0..4 ($1 gives $6.50 and 35). But the source field states the general rule as 'the share passed on is (supply slope)/(supply slope + demand slope) in price-per-loaf terms, 0.1/(0.1+0.1)'. In price-per-loaf slopes the pass-through to the buyer's price is the DEMAND slope over the sum: d/(s+d). Check: demand p = 10 - q/10 (d = 0.1), supply price slope s = 0.3 gives price rise 0.25 per $1 of cost, which equals d/(s+d) = 0.25, not s/(s+d) = 0.75. The formula as written is correct only in quantity-per-dollar slopes (10/(10+10)). This note is shown to learners under 'Why trust this?', so a general rule that is stated backwards should not stand. Fix (demo-builder): say 'in quantity-per-dollar slopes, share passed on = supply slope / (supply slope + demand slope) = 10/(10+10)', or drop the general formula. |
| c5 | verified | 7 - 6 = $1 more for buyers; 7 - 2 = $5 kept by bakers vs $6. |
| c6 | verified | Chip 'Toy bread market: straight lines' and reveal 'A model: straight lines, one market. Here the lines are equally steep'. |

Stage check: 'The price rose $1, not $2' and the unsold-loaves statement at $8 confirmed. Unrecorded claims: none.

## Pass 3 (2026-10-13)

Checker: fact-checker. Scope: claims open (unverified) in this lesson that were not added by a fact-checker, including builder-rewritten claims after claim fixes. Method: re-derived numbers in node from the Demo.tsx model code, compared each claim with what the stage and reveal text actually say, checked cited sources (web search where reachable; the BoE, NASA and UN hosts were not directly reachable from this sandbox).

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c4 On the stage the price rises by half the added cost (for example $1 of... | verified | Re-derived: demand 100-10p = supply 10p-20-10c gives p = 6 + c/2, q = 40 - 5c; c=1 gives $6.50, 35. Pass-through to price = supply slope/(supply+demand slope) in quantity-per-dollar slopes = 10/20; corrected source note is right (and d/(s+d) in price-per-loaf form). |

Result: 1 verified, 0 disputed, 0 added unverified.
