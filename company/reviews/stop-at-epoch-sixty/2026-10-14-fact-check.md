# Fact-check: stop-at-epoch-sixty (2026-10-14)

## Pass 19 (2026-10-14)

Checker: fact-checker. Method: read Demo.tsx (stage, reveal, model) against each claim; re-derived by hand or in node (scratch scripts re-implementing or extracting the lesson model); web sources where named.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Ran the MODEL block extracted from Demo.tsx with kit/random mulberry32 (node --experimental-strip-types): 0: 0.793/0.751, 67: 0.238/0.299, 100: 0.204/0.320, 1000: 0.177/0.486, 20000: 0.170/0.693 (train/held); best checkpoint = step 67 (neighbours 59: 0.2998, 76: 0.3019); 74 checkpoints. Chart plots both series against checkpoint index (log-spaced). "Lowest at step 67" means lowest among the stage's checkpoints, which is what the learner can see. |
