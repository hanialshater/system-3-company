# Fact-check: insurance-fair-price (2026-10-14)

## Pass 22

Checker: fact-checker (did not write these claims). Scope: the claims left unverified after the wave D wording reopen. Method: read Demo.tsx (and model.ts where used) against each sentence, then re-ran the numbers in my own node ports of the lesson's logic (scratchpad fc22-5); sources opened where reachable, otherwise marked as not opened.

| Claim | Verdict | Basis |
|---|---|---|
| c4 | verified | Own node with the kit's mulberry32 (fc22-5/ins.mjs): seed 1 year 1 losses = [house 1]; first 101 years: 98 losses, average $99.01 (rounds to $99); tally 36 / 37 / 28 (sum 101). Source extras also reproduce: 2,000 seeds mean $100.02, 2.5-97.5% $80.2-$119.8; seed 1 averages from 50 to 1,001 years lie in $87.7-$107.1. The seed is disclosed as chosen. |
| c5 | verified | Verified by derivation and the stage, not by the cited book: in the model a customer pays $120 every year and is paid $10,000 when hit (swap of a small sure cost for a rare large loss). Pooling: per-customer yearly payout SD is sqrt(0.01 x 0.99) x $10,000 = $995 for one house and $99.5 averaged over 100 independent houses; the stage's average settles near $100. Mankiw not opened; the cited title is inexact (web search: the section is 'The Markets for Insurance' inside ch. 27 'The Basic Tools of Finance', edition-dependent). Non-blocking citation fix for the builder. |
| c7 | verified | Same script: house 1 (YOURS) is the only house hit in year 1 and loses in 2 of the first 101 years: premiums 120 x 101 = $12,120, cover 2 x $10,000 = $20,000. Stage message 'Your house (outlined): paid $12,120; cover paid it $20,000.' at 101 years; house drawn with the thicker outline (mine). |

**Result:** every claim in this pass verified.

## Pass 24 (2026-10-14)

Checker: fact-checker (Ingrid). I did not write or build any of these claims. Scope: every unverified or disputed claim after the wave E revisions. Method: read Demo.tsx (predict, stage, every reachable branch, the state after Reset or Start over where the lesson has one, and the reveal gates), then re-ran the numbers in my own node copies of the lesson's logic (kit mulberry32 where seeded). I read the builder's pre-flight only after writing the verdicts. Hosts for primary sources were unreachable (DNS failure), so a row says when a verdict rests on derivation.

| Claim | Verdict | Basis |
|---|---|---|
| c5 | verified | Rests on the model, as in pass 22 (Mankiw not opened): premium every year against a $10,000 payout when hit; the 100-house average settles near $100 (SD of the mean $99.5 against $995 for one house). The v3 reveal sentence matches. |
| c7 | verified | Own HISTORY with mulberry32(1): house 0 is first hit in year 112, so 0 losses in years 1-101; 120 x 101 = $12,120. At 101 years the houses split 40 never / 33 once / 15 twice / 12 three or more, so never-hit is the commonest. The reveal quotes the learner's longest run (from 50 up to 1,001 years) and has a branch for hits (house 0 has 1 hit by 201 years, 13 by 1,001). |
| c8 | verified | Own count, seed 1, years 1-101: 40 / 33 / 27 (15 + 12). The stage line 'Houses hit 0 / 1 / 2+ times' uses the same houseSpread(). Other lengths: 100 y 40/34/26; 50 y 67/23/10. |

**Result:** 3 verified, 0 disputed, 0 held (unverified), 0 withdrawn.
