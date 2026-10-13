# Fact-check: background-shortcut (2026-10-13)

Checker: fact-checker. Method: transcript + Demo.tsx; TRAIN/TEST rebuilt in artifacts/scratch/fc-aiecongeo/bg.mjs (deterministic, no seeds).

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Recomputed: background right on 19/20, shape on 16/20; 2 humped cows, 2 hump-less camels. |
| c2 | verified | 19 >= 16 so LEARNED = background (Demo.tsx rule). |
| c3 | verified | TEST: 5 cows on sand, 5 camels on grass; background 10/20, shape 16/20. |
| c4 | verified | Beery, Van Horn, Perona 2018 (ECCV) is about camera-trap classifiers failing at new locations; Geirhos et al. 2020, Nat. Mach. Intell. 2:665-673 discusses shortcut learning including cows-in-unusual-places. Two distinct papers. |

## Added (unverified)
- c5: the reveal's general sentence that a model takes the cheapest clue and same-source test photos share the shortcut. Sourced to Geirhos 2020; wording "cheapest" is informal.

Stage check: models labelled as a toy ("This toy uses one clue at a time"). Shape "held 80% on both sets" confirmed (16/20 both).

## Fact-check pass 2 (independent second check, 2026-10-13)

Checker: fact-checker. Method: re-derived numbers by extracting the model code from Demo.tsx and running it in node; compared each claim to the stage text; checked cited sources.

| Claim | Verdict | Basis |
|---|---|---|
| c5 | verified | Geirhos et al. 2020 (Nat. Mach. Intell. 2:665-673) defines shortcut learning as decision rules that score well on in-distribution test sets but fail under shift; same-source test photos sharing the shortcut is exactly the in-distribution point. 'Cheapest' is informal (simplicity bias) and the sentence is unhedged; advisory for builder: 'tends to take the easiest clue'. Not a blocker. |

Stage check: reveal says 'a model takes the cheapest clue that works', while the toy picks the highest-training-score clue; consistent for this toy (background 95% > shape 80%).
