# Fact-check: insurance-fair-price (2026-10-14)

## Pass 22

Checker: fact-checker (did not write these claims). Scope: the claims left unverified after the wave D wording reopen. Method: read Demo.tsx (and model.ts where used) against each sentence, then re-ran the numbers in my own node ports of the lesson's logic (scratchpad fc22-5); sources opened where reachable, otherwise marked as not opened.

| Claim | Verdict | Basis |
|---|---|---|
| c4 | verified | Own node with the kit's mulberry32 (fc22-5/ins.mjs): seed 1 year 1 losses = [house 1]; first 101 years: 98 losses, average $99.01 (rounds to $99); tally 36 / 37 / 28 (sum 101). Source extras also reproduce: 2,000 seeds mean $100.02, 2.5-97.5% $80.2-$119.8; seed 1 averages from 50 to 1,001 years lie in $87.7-$107.1. The seed is disclosed as chosen. |
| c5 | verified | Verified by derivation and the stage, not by the cited book: in the model a customer pays $120 every year and is paid $10,000 when hit (swap of a small sure cost for a rare large loss). Pooling: per-customer yearly payout SD is sqrt(0.01 x 0.99) x $10,000 = $995 for one house and $99.5 averaged over 100 independent houses; the stage's average settles near $100. Mankiw not opened; the cited title is inexact (web search: the section is 'The Markets for Insurance' inside ch. 27 'The Basic Tools of Finance', edition-dependent). Non-blocking citation fix for the builder. |
| c7 | verified | Same script: house 1 (YOURS) is the only house hit in year 1 and loses in 2 of the first 101 years: premiums 120 x 101 = $12,120, cover 2 x $10,000 = $20,000. Stage message 'Your house (outlined): paid $12,120; cover paid it $20,000.' at 101 years; house drawn with the thicker outline (mine). |

**Result:** every claim in this pass verified.
