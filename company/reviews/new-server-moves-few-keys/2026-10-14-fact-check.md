# Fact-check: new-server-moves-few-keys (2026-10-14)

## Pass 21 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including computed ones) before the claim sources, then re-ran the lesson's own logic in my own node scripts (scratchpad fc21/). Sources were opened where egress allowed, otherwise corroborated by web search or marked as not opened.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own copy of owner() (scratchpad fc21/ns.mjs): mod scheme moves keys 4-19 (16), keeps 0-3; matches reveal and table. |
| c2 | verified | Own copy of owner() with RING_POS: ring moves keys 0-3, all A->E, nothing else; E ends with 4 = 20/5 (A keeps 1, B-D 5 each). Designed layout is disclosed in the reveal ('E's spot was picked'). |
| c3 | verified | Derivation re-checked; holds for any insertion point (only keys between the new point and its predecessor change owner, all from the successor). |
| c4 | verified | CRT argument re-checked; enumeration n = 2..9 over 7 blocks gives exactly 1/(n+1) kept each time. |
| c5 | verified | Re-implemented 32-bit FNV-1a ring: 1,000 points '<s>#<i>', keys 'key-<k>' -> 20.415% moved, all to E; '-' and bare keys -> 18.28%; 100 points -> 22.74%. All match the builder; 'about 20%' fair. |
| c6 | verified | Paper not opened (cs.brown.edu, Wikipedia blocked). Title, authors, STOC '97 pp. 654-663 and that the paper introduced the term 'consistent hashing' corroborated by web-search results (Wikipedia 'Consistent hashing' snippet, course mirrors of the STOC PDF). |

**Result:** all open claims verified; the lesson has no unverified or disputed claims.
