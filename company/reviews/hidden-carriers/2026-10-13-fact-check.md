# Fact-check: hidden-carriers (2026-10-13)

Checker: fact-checker (independent). Inline node arithmetic plus a random-mating check (1,000,000 offspring at q = 0.1). Stage text from the walkthrough transcript; Demo.tsx read (counts() = round(10,000 x q^2), round(10,000 x 2q(1-q)), q = sqrt(1/oneIn)).

| Claim | Result | Basis |
|---|---|---|
| c1 | verified | Hardy-Weinberg proportions q^2, 2pq, p^2 follow from random union of gametes; the simulation gives 0.0101 and 0.1795 against 0.01 and 0.18 at q = 0.1. |
| c2 | verified | 1 in 10,000 -> q = 0.01, carriers 2 x 0.99 x 0.01 = 0.0198, 198 of 10,000; 198 per affected person (198/1). 1/0.0198 = 50.5, so the carrier share is "about 1 in 50 or 51". |
| c3 | verified | q = 0.02: 4 affected, 392 carriers (98 per affected); q = 0.05: 25 and 950 (38); q = 0.1: 100 and 1,800 (18). Counts are expected values, as the source says. |
| c4 | verified (convention) | Assumptions are exactly those stated in the reveal ("random mating, no selection, migration or new mutations, large population; the trait is made up"). |

Non-blocking wording inconsistency for demo-builder: the ledger text of c2 says "about 1 in 50" while the predict option and reveal say "about 1 in 51". The exact value is 1 in 50.5; both round correctly, but pick one so the ledger matches the stage. (Demo.tsx's own comment says 50; the code rounds 10,000/198 = 50.5 to 51.) No unrecorded claims found.
