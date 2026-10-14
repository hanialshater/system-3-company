# Build note: bet-too-much-and-go-broke (demo-builder, 2026-10-13)
- Retitled "How much of your money to bet?" (the slug says "go broke", which gives the answer away).
- The question asks about the middle player (defined in the question and on stage), not "your money": the AVERAGE money grows fastest at a 100% stake ((1 + 0.2f)^100), so the brief's "grows fastest" was ambiguous; the middle player is the typical outcome the brief means.
- Stage: 31 seeded players, same coin flips at every stake, money lines on a x10-per-gridline chart (said on stage); the middle player is bold. Stake buttons 5% (start), 10%, 20%, 40%, 60% in DOM order. Gate: "twenty" and "sixty".
- Seed CHOSEN (disclosed in c1): seed 60, tried first, had a 57-heads middle player for whom 10% beat 20%. Seed 2 is the first with 60 heads (the median over seeds), so its middle player equals the exact typical result. 20% wins for the middle player in 982/1000 seeds.
- Readouts hidden while locked.

## Revision v2

Wave C, builder 11, 2026-10-14, from the latest learner review and fact-check. Stage prints win, loss and win-then-loss multipliers for the chosen stake; 30% stake added between 20% and 40% (x4.37, 21 of 31); reveal frames the Kelly share as a model-coin result, not advice. c1-c4 edited and new c6 unverified; the 982/1000 seed sweep was for the original five stakes.
QA contract: pass (phone and desktop). Claims edited are unverified and need a fact-check pass.
