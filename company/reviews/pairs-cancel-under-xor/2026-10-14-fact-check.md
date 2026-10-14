# Fact-check: pairs-cancel-under-xor (2026-10-14)

## Pass 21 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including computed ones) before the claim sources, then re-ran the lesson's own logic in my own node scripts (scratchpad fc21/). Sources were opened where egress allowed, otherwise corroborated by web search or marked as not opened.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | node: 7^3^5^4^5^3^4 = 7 = 0b111; 200 seeded reshuffles (Demo's shuffled(), seeds 1001+) all give 7. |
| c2 | disputed | Algebra true, mechanism sentence false on the stage's own order. Trace of 7 3 5 4 5 3 4: 3 turns lamps 2 and 1 OFF (111->100) and its partner turns them back ON (000->011); the first 5 turns 4 off and 1 on. So 'the bits it switched on switch back off' (and the reveal's 'the lamps it had switched on switched back off') misdescribes what the learner watches. Fix (builder): 'the lamps it flipped flip back' / 'its partner flips the same lamps again'. |
| c3 | verified | XOR is commutative and associative; stage reshuffle uses mulberry32(1000 + k), k = 1, 2, ... (seeds 1001, 1002, ... as stated); all 200 orders tried give 7. |
| c4 | verified | node: 4^1^2^1^2 = 4; Demo.tsx OTHER_RESULT computes it. |
| c5 | verified | node: 5 5 5 7 7 -> 5; 5 5 5 7 2 2 -> 2. Derivation (result = XOR of odd-count values) holds. |
| c6 | verified | One XOR per element, one running value; no sort, no counts (true of Demo.tsx xorAll and of the method). |

**Result:** disputed: c2. Builder fix needed before publish (see basis).

## Pass 23 (2026-10-14)

Checker: fact-checker (wrote none of these claims; the two new claims are builder sentences recorded word for word). Method: read Demo.tsx (stage, every reachable branch, reveal, predict, plus the meta.json hook and recall card for new lessons) before claim sources; re-ran the numbers with my own node copies of the lesson logic (scratchpad fc23/). Sources: every scholarly host (cornell.edu, arxiv, journals, crossref, openalex, semantic scholar, Wikipedia, UPenn, UVM) was unreachable through the proxy, so no paper or book was opened. A claim that rests only on such a source is HELD as unverified, not verified; claims verified by derivation or simulation say so in their row.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | The reveal (line 168) and the Demo header now use this wording. A number flips exactly the lamps where it has a 1 (r XOR (r XOR v) = v). The partner flips the same set again, which cancels the flip whatever lies between them, because toggles commute. Own trace of 7 3 5 4 5 3 4: each fold flips the lamps of v's bits (3 flips 2,1; 5 flips 4,1; 4 flips 4), and the end is 111. The pass 21 objection (on versus off) no longer applies: the text says 'flips', not 'switched on'. a XOR a = 0 and a XOR 0 = a hold bitwise. |

**Result:** every claim in this lesson is now verified.

## Pass 24 (2026-10-14)

Checker: fact-checker (wrote none of these claims; builder demo-builder). Scope: claims reopened by the v3 wave E revision. Method: read v3 Demo.tsx (stage messages, twin and history rows, Start over, New order, reveal) before the sources, then re-ran the numbers in my own node port (scratchpad fc24/xor.mjs, own mulberry32 copy).

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Running 5,6,5,1,6,3,7; final 111 = 7; sum 31. |
| c2 | verified | Fold to next twin stops on the second 3; 6 XOR 3 = 5, the value before the first 3; ringed lamps are 2 and 1. Other paths quote the twin actually seen (e.g. second 4: 5 -> 1), still true. |
| c3 | verified | shuffled(BASE, 1) = 7 3 4 5 4 3 5 -> 7; next four reshuffles and all 5,040 permutations give 7. |
| c5 | verified | 5 5 5 7 7 -> 5; 5 5 5 7 2 2 -> 2; result = XOR of odd-count values. |

**Result:** every claim open at this pass is now verified.
