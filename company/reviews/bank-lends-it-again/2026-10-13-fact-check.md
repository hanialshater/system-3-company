# Fact-check: bank-lends-it-again, 2026-10-13

## Pass 3 (2026-10-13)

Checker: fact-checker. Scope: claims open (unverified) in this lesson that were not added by a fact-checker, including builder-rewritten claims after claim fixes. Method: re-derived numbers in node from the Demo.tsx model code, compared each claim with what the stage and reveal text actually say, checked cited sources (web search where reachable; the BoE, NASA and UN hosts were not directly reachable from this sandbox).

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c1 If banks keep 10% and every loan is redeposited, a $1,000 deposit lead... | verified | 1000 x 0.9^(r-1): 900, 810. |
| c2 Total deposits approach $1,000 ÷ 0.10 = $10,000; after 62 rounds they ... | verified | Recomputed: r=44 total 9,903.02 (0.9903 of limit, within 1%), r=43 0.9892 (not within); r=62 9,985.44; limit 10,000. |
| c3 Keeping 20% stops the total at $5,000; keeping 50% at $2,000.... | verified | 1000/0.2 = 5,000; 1000/0.5 = 2,000. |
| c4 The money multiplier is a textbook simplification: real banks lend whe... | verified | McLeay, Radia & Thomas (BoE QB 2014 Q1) is the right source and argues lending creates deposits and is not reserve-constrained (the multiplier account is a misleading textbook description). The BoE page was unreachable here (DNS blocked) and search snippets confirmed only the headline thesis; capital/profitability as the binding constraints is my recollection of the paper (section on limits to money creation), held with moderate-high confidence. Reveal wording "Real banks lend when they find borrowers and are limited by capital rules" is consistent with it. |
| c5 Many central banks set no reserve requirement; the US Federal Reserve ... | verified | Search confirmed the Federal Reserve Board announced on 15 March 2020 reserve requirement ratios cut to zero effective 26 March 2020 (federalreserve.gov/monetarypolicy/reservereq.htm). "Many central banks set none" is the reveal text; Canada, Australia and the UK are standard examples, and the UK has no reserve requirement ratio (only cash ratio deposits). Reveal claims only the US by name: correct. |
| c6 The lesson is a model: every loan is spent and redeposited, no one hol... | verified | Assumptions stated in the stage chip. |

Result: 6 verified, 0 disputed, 0 added unverified.
