# Fact-check: digits-are-logs, 2026-10-13

Checker: fact-checker (did not write any of these claims; claims c5+ below were added by this checker and are not verified by it). Method: read the walkthrough transcript, re-ran every number with node (scripts in artifacts/scratch/fc-mathphys/).

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c1 2^10 = 1024, which is about 1000. | verified | 1024 exact. |
| c2 2^100 = 1,267,650,600,228,229,401,496,703,205,376, which has 31 digits... | verified | BigInt: 1267650600228229401496703205376, length 31. |
| c3 After 10, 20, ..., 100 doublings the number has 4, 7, 10, ..., 31 digi... | verified | BigInt lengths of 2^(10k), k=1..10: 4,7,10,13,16,19,22,25,28,31. Exactly 3k+1 holds for k up to 33 at least (checked). Stage text says "about 3", reveal says "exactly 3"; both true in range. |
| c4 log10(2^100) = 100 x log10(2) = 100 x 0.301, about 30.1; a whole numbe... | verified | log10(2)=0.30103, 100x = 30.103; digits = floor(log10 N)+1 is the standard identity. |

Disputed: none. Withdrawn: none.

Walkthrough values spot-checked: 2^13 has 4 digits, 2^31 has 10, 2^39 has 12, 2^49 has 15, 2^67 has 21 (all re-computed). The walkthrough never unlocked the reveal, so reveal text was read from Demo.tsx (lines 37-46); it matches c2-c4.

## Learner-visible statements not previously recorded (added as unverified)

None found.

## Fixes routed to demo-builder

None.

## Result
4 verified, 0 disputed, 0 added unverified.
