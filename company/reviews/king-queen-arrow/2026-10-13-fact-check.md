# Fact-check: king-queen-arrow (2026-10-13)

Checker: fact-checker. Method: transcript + Demo.tsx; arithmetic re-run in artifacts/scratch/fc-aiecongeo/iid.mjs (second half). Deterministic.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Coordinates equal the WORDS table. Labelled 'placed by hand' in the reveal. |
| c2 | verified | king + (woman - man) = (1,1); queen 0.0, crown 0.6, prince 1.5; woman + (king - man) = (1,1); nearest word skipping input words is queen both ways. |
| c3 | verified | Mikolov, Yih & Zweig 2013 (NAACL-HLT) report analogy accuracy well below 100%; Rogers, Drozd & Li 2017 (*SEM) catalogue the failures. Two distinct papers. |
| c4 | verified, with a caveat | Answer = nearest word to vec(b) - vec(a) + vec(c), cosine, input words excluded. I did not re-read the NAACL paper for the exclusion detail; it is documented in the word2vec evaluation code and discussed by Levy & Goldberg 2014 and Linzen 2016. The claim as written ('nearest word to a computed point is the answer') does not depend on it. The toy's straight-line distance vs cosine is disclosed. |

Stage check: reveal states the map was hand-placed and real analogies are only roughly true, so the toy is not presented as a finding. Unrecorded claims: none.
