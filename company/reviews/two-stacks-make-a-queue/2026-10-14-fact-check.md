# Fact-check: two-stacks-make-a-queue (2026-10-14)

## Pass 19

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (predict, stage text, readouts, reveal) first, then re-derived or re-ran each number in my own scripts (scratchpad fc19b6) or checked the source.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node sim of the rule: 1 pour, moved {1:1,2:1,3:1,4:1}, left 1 2 3 4; matches simulate() and the reveal. |
| c2 | verified | Derivation: items move only in->out, so moves <= adds (own random sim of 100,000 ops confirms). CLRS 3e exercise 10.1-6 and ch. 17 accounting method (4e: ch. 16). |
| c3 | verified | Direct from the rule; stage note 'out not empty: no pour' on removals 2-4. |
| c4 | verified | Both are the accounting method (CLRS 3e 17.2, dynamic tables 17.4); lesson list-doubling-copies exists in src/demos/cs. |

**Result:** all claims in this pass verified; no disputes.

## Pass 22

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (predict, stage text, readouts, reveal) first, then re-ran each number in my own node scripts (copies of the lesson's logic plus independent re-implementations) or checked the source. Sources marked "not opened" were checked against my own knowledge only; Easley & Kleinberg chapter titles were confirmed through web-search results (library-catalogue tables of contents), as the book's host and mirrors are blocked.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node trace of the v3 tape: pours at tile 3 (moves 2 then 1) and tile 7 (moves 4 then 3); moved {1:1,2:1,3:1,4:1}; 4 moves; left 1 2 3 4. |
| c2 | verified | Derivation: items move only in->out, so moves <= adds (own random 100,000-op sim). CLRS 3e ex. 10.1-6 and ch. 17 from my knowledge, not opened; the sentence rests on the derivation. |
| c5 | disputed | Own trace: at the second pour (the 3rd removal, tile 7) both 1 and 2 have already LEFT; out is empty, which is why it pours. So '(1 has left, 2 is in out)' is false at that moment, and the reveal's 'they were already in out' reads as if they sat in out during the pour. Fix (builder): 'The second pour never touched 1 or 2: they had already crossed to out and left.' |

**Result:** 2 verified, 1 disputed, 0 withdrawn. Disputed claims block publishing until the builder fixes the sentence and the claim is re-checked.

## Pass 23 (2026-10-14)

Checker: fact-checker (wrote none of these claims; the two new claims are builder sentences recorded word for word). Method: read Demo.tsx (stage, every reachable branch, reveal, predict, plus the meta.json hook and recall card for new lessons) before claim sources; re-ran the numbers with my own node copies of the lesson logic (scratchpad fc23/). Sources: every scholarly host (cornell.edu, arxiv, journals, crossref, openalex, semantic scholar, Wikipedia, UPenn, UVM) was unreachable through the proxy, so no paper or book was opened. A claim that rests only on such a source is HELD as unverified, not verified; claims verified by derivation or simulation say so in their row.

| Claim | Verdict | Basis |
|---|---|---|
| c5 | verified | Own node trace of the tape. Tile 3 pours 2 then 1, and 1 leaves. Tile 6 pops 2, no pour. Tile 7 pours 4 then 3, and at that moment 1 and 2 have both already left, so out is empty and holds only 3 and 4 after the pour. 'Crossed to out and left' is true for both: each crossed in the first pour. The reveal (line 246) uses the pass 22 wording word for word. |

**Result:** every claim in this lesson is now verified.
