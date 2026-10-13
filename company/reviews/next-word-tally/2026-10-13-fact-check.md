# Fact-check: next-word-tally (2026-10-13)

Checker: fact-checker. Method: transcript + Demo.tsx; bigram counts, pair checks and sampler re-built in artifacts/scratch/fc-aiecongeo/nwt.mjs.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Corpus and bigram-only storage match Demo.tsx. |
| c2 | verified | the -> cat 2, mat 1, fish 1, dog 1, rug 1 (6 in all). |
| c3 | verified | 'the dog sat on the mat .' has every pair in the counts and is not in CORPUS. |
| c4 | verified | 'the cat sat on the cat ate the fish .' also has every pair in the counts (and is reachable by the sampler: seed-7 stream produced a similar 'the cat ate the cat sat on the fish.'). |
| c5 | verified | Sampling is proportional to counts: first-word draw from 'the' gives cat 0.334 and the other four 0.166-0.168 over 200,000 Math.random draws (expected 1/3 and 1/6); the lesson's own LCG with sequential seeds gives 0.314/0.17 on first draws only, which is irrelevant because the lesson uses one stream seeded 7, not a fresh seed per draw. Words whose only follower is '.' (mat, fish, rug) end the sentence. |
| c6 | verified | Vaswani et al. 2017 s3: decoder is auto-regressive (consumes previously generated symbols). Brown et al. 2020 (arXiv:2005.14165) s2.1: GPT-3 context window 2048 tokens = 'thousands'. Two distinct papers. |

Seed note: run uses seed 7 only for the 'Let the model pick' button. Nothing the reveal says depends on what that seed produces; across 100,000 sampled sentences 91.6% were new (not in training text), so new-sentence generation is the general case, not a lucky seed. 'Your last sentence ... was/was not in the training text' is computed from the learner's own sentence. Unrecorded claims: none.
