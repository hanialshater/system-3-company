# Fact-check: a-birthday-like-mine (2026-10-14)

## Pass 19 (2026-10-14)

Checker: fact-checker. Method: read Demo.tsx (stage, reveal, model) against each claim; re-derived by hand or in node (scratch scripts re-implementing or extracting the lesson model); web sources where named.

| Claim | Verdict | Basis |
|---|---|---|
| c5 | **disputed** | 23 x 22 / 2 = 253 and 1/365 per comparison are right, but "you are in only 23 of them" is wrong. The lesson's crowd is 23 OTHER people (pMe(23) = 1-(364/365)^23 = 6.1%), so the 253 pairs are among them and include you zero times; your 23 comparisons are separate. With you, 24 people make 276 pairs, 23 with you; if the 23 included you, you would be in 22. Reveal repeats the sentence. Fix (builder): "23 other people make 253 pairs among themselves, but you take part in only 23 comparisons; each matches with chance 1 in 365." Retracts pass-8 verification of this wording. |
| c6 | verified | node: 1-(364/365)^253 = 0.50048; ln 2 / -ln(364/365) = 252.65, so about 253. |
| c7 | verified | node: (364/365)^253 = 0.49952, about 50%; stage "Nobody matches you" shows 50.0%. Independence of misses holds in the uniform model (c1). |
