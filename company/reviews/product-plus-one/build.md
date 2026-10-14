# Build note: product-plus-one (demo-builder, 2026-10-13)

- Intent: toggle primes 2-13 into a list; card shows product + 1 and its prime factors (trial division), all outside the list. Lists 2..11 give primes 3, 7, 31, 211, 2311; the full list gives 30031 = 59 x 509.
- Key state: a list of 4+ primes and a composite product + 1 (QA reaches both by toggling in order).
- After screenshots: factor chips wrap under their label on phone; readable, left as is.
- All numbers recomputed with node; all claims unverified, for the fact-checker.

## Revision v2 (batch 02, 2026-10-14)

Each listed prime's remainder (30031 / p) is now computed on the stage. The reveal quotes 30031, so the second milestone is now the full list of six (before, any composite list unlocked it). "Composite" replaced by plain words. Question links to the hook ("could these be every prime?"); the reveal adds why a prime factor must exist.
Edited claims are unverified for the fact-checker. QA and walkthrough run after this edit.
