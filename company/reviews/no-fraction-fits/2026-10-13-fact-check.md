# Fact-check: no-fraction-fits, 2026-10-13

Checker: fact-checker (did not write any of these claims; claims c5+ below were added by this checker and are not verified by it). Method: read the walkthrough transcript, re-ran every number with node (scripts in artifacts/scratch/fc-mathphys/).

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c1 The diagonal of a 1-by-1 square is √2. | verified | 1^2+1^2=2. |
| c2 A fraction p/q equals √2 only if p² = 2 × q². | verified | p/q = sqrt2 => p^2 = 2q^2. |
| c3 2 × 12² = 288 and 17² = 289, off by 1; the misses are exactly 1 at q =... | verified | For q=1..100000 no 2q^2 is a perfect square (0 exact). Miss exactly 1 for q<=70 occurs only at 1,2,5,12,29,70. 2*12^2=288 vs 17^2=289. Stage readouts for q=4,5,8,12,15,29 re-derived (off by 4,1,7,1,9,1; (p/q)^2 = 2.25,1.96,1.8906,2.0069,1.96,1.9988). |
| c4 If √2 = p/q in lowest terms then p is even, so q is even too, a contra... | verified | Parity descent as written in the reveal is valid (p^2 even => p even; p=2k => q^2=2k^2 => q even; contradiction with lowest terms). The proof can be checked by reading, so the source is a locator, not an authority. Aristotle Prior Analytics I.23 and Hardy sec. 14 are the correct places for this argument; books not reachable from this sandbox, pinpoints not re-read. Note: claim is typed "source" but is really a derivation. |

Disputed: none. Withdrawn: none.

The reveal says "In the N values of q you tried"; N is the live count of distinct q the learner visited (Demo.tsx seen.length), so it is true by construction. The recall card (million-digit p and q cannot give exactly sqrt2) follows from c2 and c4.

## Learner-visible statements not previously recorded (added as unverified)

None found.

## Fixes routed to demo-builder

None.

## Result
4 verified, 0 disputed, 0 added unverified.
