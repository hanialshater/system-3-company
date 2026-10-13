# Fact-check: pennies-dont-add-up (2026-10-13)

Checker: fact-checker. Method: re-computed in artifacts/scratch/fc-cschem/; read walkthrough transcript and learner-visible text.

| Claim | Result |
|---|---|
| c1 | Verified: exact long division by doubling gives 000110011001100110011001 (block 0011 repeats after the first 0). |
| c2 | Verified: sums of the 12 switches are k/4096; 10k = 4096 has no integer solution (and no k/2^n for n up to 40 equals 1/10); nearest are k=410 (0.10009765625, over) and k=409 (0.099853515625, under); the stage's exact() and gapText() functions reproduce those strings. |
| c3 | Verified: 1/3 has no finite decimal form (3 divides no power of 10). |
| c4 | Verified: binary64 has 53 significant bits (Python sys.float_info.mant_dig = 53); round-to-nearest-even is the IEEE 754 default. |
| c5 | Verified by running Node and Python: 0.1 = 0.1000000000000000055511..., 0.2 = 0.2000000000000000111022..., both above the decimal value. |
| c6 | Verified: Node and Python both print 0.30000000000000004 and the equality with 0.3 is false. |
| c7 | Verified as a statement of common practice (integer minor units for money is the standard way to avoid binary-fraction rounding; the Money-library docs say so). Source note for the builder: Fowler's PoEAA Money pattern is cited for 'floating point cannot represent decimal fractions exactly'; I could not read the book or the catalogue page from this environment (no network to martinfowler.com) and only confirmed his rounding-pennies motivation second-hand, so the source string should be softened or replaced by one that can be checked (e.g. the Python decimal documentation or the Stripe/ISO 4217 minor-unit convention). Not disputed because the claim itself is true. |
| c8 | Verified: Node prints 0.7999999999999999 for 0.1+0.7. |

Wording notes, not disputes: (1) 0.7 is stored slightly BELOW 0.7 (0.69999999999999995559...), so the recall 'stored rounded' is right but a learner should not generalise 'a hair above' from 0.1 and 0.2 to 0.7. (2) The exact sum of the two stored values is exactly halfway between two doubles and rounds to even, giving 0.30000000000000004; 'the hairs add up' is a fair gloss. Deterministic, no seeds. No unrecorded claims.
