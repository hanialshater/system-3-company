# Report: mailbox 20261016T154559740Z-evaluation-steward-49b534bf (fact-checker)

Brief: FC Wave J v3, 9 claims, 3 lessons (lane 10, SO-10-2, [project:wave-j]). HEAD bf6fde8 contains 169e88d. All 9 listed claims were present and unverified. I read code and meta.json only (no walkthrough, no builder notes). No claim needed a text change.

| Claim | Verdict |
|---|---|
| ai.calibrated-but-unequal-alarms.c3 | verified |
| ai.calibrated-but-unequal-alarms.c4 | verified (v3 two-level wording; the only exception besides the perfect label is the label that is wrong about everyone, a = 0, b = 1, which 'high/low' excludes) |
| ai.calibrated-but-unequal-alarms.c7 | verified |
| probability.small-gap-big-extremes.c1 | verified (135 / 621 per 100,000, 82%, 4.6) |
| probability.small-gap-big-extremes.c2 | verified (3 / 23 per 100,000, 88%, 7.3) |
| probability.small-gap-big-extremes.c3 | verified (overlap 0.80259) |
| probability.small-gap-big-extremes.c5 | verified (folds 42.62, 26.69) |
| physics.tug-of-war-scale.c1 | verified (OpenStax m58303 re-opened) |
| physics.tug-of-war-scale.c5 | verified |

Records: company/reviews/calibrated-but-unequal-alarms/2026-10-16-fact-check-v3.md, company/reviews/small-gap-big-extremes/2026-10-16-fact-check-v3.md, company/reviews/tug-of-war-scale/2026-10-16-fact-check-v3.md (node commands and output inside). npm run check passed.

Open items (non-blocking, cm-ai owns text): c4 claim text could add '(or is wrong about everyone)'; c7 recall why 'has more people labelled high' is true as a share, 'a larger share of its people' would be exact. Not done: no rendered walkthrough of v3 this pass; a QA/walkthrough pass would confirm the strings render as the code says.
Next: evaluation-steward closes the brief; the lessons' next gate belongs to their CMs.
