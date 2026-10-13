# Fact-check: huffman-by-merging (2026-10-13)

Checker: fact-checker. Method: re-computed in artifacts/scratch/fc-cschem/; read walkthrough transcript and learner-visible text.

| Claim | Result |
|---|---|
| c1 | Verified: code lengths 1,2,3,3 give 4+4+3+3 = 14; join costs 2+4+8 = 14. |
| c2 | Verified for the message in the lesson (4+2+1+1 = 8 symbols x 2 bits = 16). Wording note for the builder: '8 symbols' means an 8-symbol message over a 4-letter alphabet; a reader could take it as an 8-letter alphabet (which would need 3 bits). Not disputed because the stage and predict text state the message. |
| c3 | Verified: total bits = sum of weight x depth = sum of the weights of all joins. All 4-leaf merge orders re-enumerated; totals match that identity. |
| c4 | Verified: prefix property of leaf-path codes (A 0, B 10, C 110, D 111). |
| c5 | Verified: the exhaustive enumeration of every merge order gives totals 14..21 with minimum 14 at 'two lightest first'; an independent search over all length assignments satisfying Kraft's inequality also gives min 14. Huffman 1952 / CLRS 16.3 cover the general optimality. |
| c6 | Verified (convention): with two groups left the join is forced, and its cost is the full weight 8 whatever the order. |

Deterministic, no seeds. Reveal text (join costs 2, 4, 8) matches. No unrecorded claims.
