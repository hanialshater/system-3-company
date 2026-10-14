# Build note: every-base-fools-fermat

Builder: algo2-b0 · 2026-10-14 · from brief cs.algorithms #69 (single card).

- Brief numbers held in node (BigInt): 320 of 320 coprime bases give 1; base-2 Miller-Rabin chain 263, 166, 67, 1, 1 (composite); 9 strong liars in 2..560 (50, 101, 103, 256, 305, 458, 460, 511, 560 — the count includes 560 = -1, a trivial liar); 22 base-2 pseudoprimes below 10,000 (not used on the stage); 561 is the smallest Carmichael number.
- Chosen bases 2, 5, 7, 10, 13 are disclosed in claim c6: all are caught by the strong test. A liar base (e.g. 50) is not offered; the reveal states the 9-of-320 count instead.
- Tapping a base runs Fermat at once (so QA's one-press-each reaches three bases); "Stronger test on <base>" shows the squaring chain a^35 .. a^560 with the stray square root of 1 in red.
- Milestones `three-bases`, `strong-test`. modPow uses plain numbers (products < 561^2).
- Theorem numbers in c1/c5 are cited by 3rd-edition numbering; the fact-checker should check them against 4e.
- Not run here: build, typecheck, QA, walkthrough. Syntax-only transpile passed. All 7 claims `unverified`.
