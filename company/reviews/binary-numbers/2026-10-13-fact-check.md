# Fact-check: binary-numbers (2026-10-13)

Checker: fact-checker. Method: re-computed in artifacts/scratch/fc-cschem/; read walkthrough transcript and learner-visible text.

| Claim | Result |
|---|---|
| c6 | Verified. 127+1 flips 8 switches (01111111 -> 10000000); for every n in 0..255 the flip count equals trailing ones + 1 (255 wraps to 0 flipping 8); 255+1=256=2^8 needs a ninth switch. Matches the stage messages in Demo.tsx. |
| c7 | Verified: carrying is the same procedure in any base; the stage message '{from} + 1 = {n}: k switches flip, carrying left like 9 + 1 = 10' is true for every start value I tested. |
| c8 | Verified: 2^k = (2^0+...+2^(k-1)) + 1 so 128 = 127 + 1; byte = 8 bits. The 'All N on = n: one less than the next switch' message is correct for n = 3, 7, ..., 255. |

c1-c5 were already verified by an earlier checker; I re-read the visible text against them and found no discrepancy. The walkthrough never unlocked the reveal, so reveal text was read from Demo.tsx. No unrecorded claims found.
