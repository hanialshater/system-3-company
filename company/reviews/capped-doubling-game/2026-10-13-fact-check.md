# Fact-check: capped-doubling-game (2026-10-13)

## Pass 8 (2026-10-13)

Checker: fact-checker. Method: re-derived numbers in node from the lesson's model/Demo code; checked sources on the web; compared claims with the stage text.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Rules match payout() in model.ts and the stage question (max 20 flips, $2^k on first tails at flip k, 20 heads pays 0). |
| c2 | verified | node: sum_{k=1..20} 2^k (1/2)^k = 20 exactly. |
| c3 | verified | node/derivation: 1/2 + 1/4 = 75%; payouts $2 and $4. |
| c4 | verified | node: seed 2500 run of 550 games gives avg 25.785, median 4, max 8192, 8192/14182 = 57.8% (58%). Re-ran over 4,000 other seed sets of 550 games: median avg $11.6, 10th-90th pct $8.2-$25.2, 15.2% reach $20+ (source says 13.5% from 400 sets; consistent within sampling error). Seed-run claim is honestly disclosed as untuned and atypically high. |
| c5 | verified | node: median 550-game average $11.6 (<$20) over 4,000 seed sets; variance of one payout sum 4^k (1/2)^k = 2,097,150 (about 2.1 million). |
| c6 | verified | Demo.tsx line 47: profit = sm.total - price * n. |
