# Fact-check: hash-bucket-pileup (2026-10-13)

Checker: fact-checker. Method: re-computed in artifacts/scratch/fc-cschem/; read walkthrough transcript and learner-visible text.

| Claim | Result |
|---|---|
| c1 | Verified: 1 x 0.9 x 0.8 x 0.7 = 0.504. |
| c2 | Verified: 0.504 x 0.6 = 0.3024; collision probability 0.6976 at 5 keys and 0.496 at 4 keys, so 5 is the first count where a collision is more likely than not. |
| c3 | Verified: 5 keys with a shared slot occupy at most 4 slots, at least 6 of 10 empty. The reveal's phrase 'half the slots still empty' is also true for any 5 keys (at most 5 occupied). |
| c4 | Verified: chaining is the CLRS 11.2 collision-resolution method. |
| c5 | Verified: Java HashMap default load factor 0.75, resize when entries exceed load factor x capacity (Java SE docs). Reveal says 'resizes when it is 75% full': accurate in effect (the resize triggers just past 75%). |
| c6 | Verified, and generalised across seeds. Re-ran the lesson's own slotOf/firstCollision for tables 1..200, 1..1999, 2001..4000: collision by key 5 in 68.0%, 70.7%, 69.0% (exact 69.76%); mean first collision 4.82, 4.63, 4.69 (exact 4.66); slot counts over 2,000 tables x 12 keys are roughly uniform (2299-2479 per slot). The first 20 tables a learner sees give 80% by key 5, a plausible small-sample spread; the reveal prints the learner's own tally, not a claim about it. Seeds are fixed per table number, not chosen to flatter the result. |

No unrecorded claims.
