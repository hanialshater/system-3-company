# Fact-check: city-poll-nation-poll (2026-10-14)

## Pass 19

Checker: fact-checker (did not write these claims). Demo.tsx read against each claim; numbers re-derived in own node scripts. Network to primary sources blocked this pass; source claims corroborated by search snippets as noted.

| Claim | Result | Basis |
|---|---|---|
| c6 | verified | fpc = sqrt((N-n)/(N-1)) ~ sqrt(1 - n/N); at n/N = 1% it is 0.995 (> 0.99). The stage sentence is followed by the 2,000 exception, so the qualifier is on the stage. |
| c8 | verified | Own node: 6.198 (n=250) and 1.5495 (n=4000) at N=3e8; Demo m2() prints toFixed(2): 6.20 and 1.55. |
