# Fact-check: birthday-paradox, claims c10 and c12 (2026-10-13)

Checker: fact-checker (independent of the 2026-10-12 checker who added c10 and c12). Stage text from the walkthrough transcript.

| Claim | Result | Basis |
|---|---|---|
| c10 | verified | n(n+1)/2 - n(n-1)/2 = n; 22 -> 23 people goes from 231 to 253 pairs. Re-computed. |
| c12 | verified | (364/365)^253 = 0.49953 (exp(-0.6941)); the exact no-match chance for 23 people is 0.4927. The "about 50%" holds for both. |

Non-blocking wording note for demo-builder: the reveal says "the chance that all 253 miss is only about 50%" without saying that treating the pairs as independent is an approximation (the exact figure is 49.3%, the same to the precision shown). The claim c12 states the approximation; the learner-visible sentence does not, but nothing it asserts is wrong at "about 50%".

c1-c9, c11 were already verified or withdrawn and were not re-opened.
