# Fact-check: hanoi-tower-doubles (2026-10-13)

Checker: fact-checker. Method: re-computed in artifacts/scratch/fc-cschem/; read walkthrough transcript and learner-visible text.

| Claim | Result |
|---|---|
| c1 | Verified by argument (the biggest disk moves only with all n-1 others on the third peg, then they return) and consistent with breadth-first search below. |
| c2 | Verified: exhaustive breadth-first search over all legal states gives minimum moves 1,3,7,15,31,63 for n=1..6, equal to 2^n - 1 and to T(n)=2T(n-1)+1. |
| c3 | Verified: 2^10-1 = 1,023; 2^64-1 = 18446744073709551615 (BigInt), about 1.8 x 10^19, i.e. over 18 quintillion. |
| c4 | Verified (convention): Demo.tsx carry() adds 2^(n-1)-1 for the block of disks 1..n-1; it is only enabled when those disks share a peg and the target top is empty or bigger, so the charge is a legal minimum. |

Recall (127 -> 255 for 8 disks) checked: 2x127+1 = 255. Deterministic, no seeds. No unrecorded claims.
