# Fact-check: true-text-false-claims (2026-10-13)

Checker: fact-checker. Method: transcript + Demo.tsx; nextWords() and ask30() re-run in artifacts/scratch/fc-aiecongeo/ttf.mjs.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Corpus and memory sizes 1, 2, 5 as in Demo.tsx; picks in proportion to counts. |
| c2 | verified | k=1,2,3,4 each give France 1, Italy 1, Spain 1 (so 2 in 3 false); the claim is right that 2 words gives the same options (and so do 3 and 4). |
| c3 | verified | k=5 gives only Italy; 'Rome is the capital of Italy' is a training sentence. |
| c4 | verified | Seed 2024 successive presses at k=1: 22, 20, 17, 20, 25 false of 30, matching the record. Fresh-random check, 20,000 presses: mean 19.98 false of 30 (expected 20), sd 2.59, so 22 is typical. Seed 2024 is not selected for the result; the claim says 'close to the expected 20'. |
| c5 | verified | Ji et al. 2023, ACM Computing Surveys 55(12), article 248, 'Survey of Hallucination in Natural Language Generation'. |

Stage check: 'Every sentence it wrote was equally fluent' is true by construction (every word pair seen in training). Reveal's 'The model picks plausible next words, not true ones' is the lesson's framing of the toy. Unrecorded claims: none.
