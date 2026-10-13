# Fact-check: two-bets-split (2026-10-13)

Checker: fact-checker. Method: transcript + Demo.tsx; exact binomial outcomes (plus a 200,000-run Monte Carlo for n = 2 and 4) in artifacts/scratch/fc-aiecongeo/bets.mjs. No seeds shown to the learner.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | n=2: P(loss) = 25.0% (Monte Carlo 24.97%), the loss is -10%. |
| c2 | verified | One up, one down (2 of 4 cases): (20-10)/2 = +5%. |
| c3 | verified | Average +5.000% for n = 1..6. |
| c4 | verified | P(all fall) = 50, 25, 12.5, 6.25, 3.125, 1.5625 %. |
| c5 | verified | P(loss) = 50, 25, 12.5, 31.25, 18.75, 10.94 % for n = 1..6 (n=4: Monte Carlo 31.2%); n=3, k=1 returns exactly 0%, not a loss. |
| c6 | verified | Chip 'Model: independent coin-flip bets'; reveal 'truly independent bets, made-up numbers. Real investments often fall together. Not advice.' Diversification limits (systematic risk): Mankiw ch. 27; the toy fact stands on its own arithmetic. |

Also confirmed: spread falls as 15/sqrt(n) (15.0, 10.6, 8.7, 7.5, 6.7, 6.1), which supports 'the bars bunch around +5%'.

## Added (unverified)
- c7: 'the losses left are small ones' is true from 4 bets on only. See the claim.

## Fact-check pass 2 (independent second check, 2026-10-13)

Checker: fact-checker. Method: re-derived numbers by extracting the model code from Demo.tsx and running it in node; compared each claim to the stage text; checked cited sources.

| Claim | Verdict | Basis |
|---|---|---|
| c7 | disputed | node: exact loss chance 50, 25, 12.5, 31.25, 18.75, 10.94% for n=1..6; the average loss when there is a loss is -10% for n=1,2,3 and only -4.0, -5.0, -5.7% for n=4,5,6. So 'the losses left are small ones' is false at 2-3 bets (the loss is the full -10%) and 'small' is unanchored. Fix: restrict to 4+ bets or say 'and the big loss gets rarer: 50%, 25%, 12.5%'. |
