# Fact-check: patience-piles (2026-10-14)

## Pass 10 (2026-10-14)

Checker: fact-checker (did not write these claims; any claim marked 'recorded by the fact-checker' is a quote of the builder's stage text). Method: no walkthrough transcript exists for this lesson yet, so I read Demo.tsx as rendered text (every learner-visible string, including dynamic ones) before the claim sources, then re-derived every number in my own node scripts (own copies of mulberry32 and of each algorithm; scratchpad fc10/a.mjs, b.mjs, c.mjs, d.mjs) and checked citations. Egress to most publisher pages is blocked, so book passages I could not open are said so per claim.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node deal: [3,1,1] [4,2] [5] [9,6]. |
| c2 | verified | Own O(n^2) DP: LIS = 4; 1 4 5 6 and 3 4 5 9 are both increasing subsequences in order (node). |
| c3 | verified | Follows from c2: 3 4 5 9 is maximal and starts at 3, not the minimum 1. |
| c4 | verified | Piles are non-increasing; a strictly increasing run cannot take two cards from one pile (equal 1s included). |
| c5 | verified | Back-pointer argument re-derived; own node check: piles = LIS length on 20,000 random sequences with repeats. Aldous and Diaconis, Bull. AMS 36(4) (1999). Stage trace from pile 4 gives 1 4 5 6. |

**Result:** all claims in this pass verified.

## Pass 22 (2026-10-14)

Checker: fact-checker (wrote none of these claims; builder demo-builder). Method: read Demo.tsx learner-visible text (predict, stage captions/readouts, reveal) before the claim sources, then re-derived each number with my own node scripts (session scratchpad fc22/: bm.mjs, kn.mjs, kmp.mjs, nash.mjs, bid.mjs, sg.mjs, apply.mjs) or by hand. All external source hosts were blocked by the proxy (403); where a row cites a paper or book, only web-search snippets were seen and the row says so. Verdicts rest on the re-derivation, not on the unopened citation.

| Claim | Verdict | Basis |
|---|---|---|
| c5 | verified | Pass 22 re-check of v3: own deal: piles [3,1,1] [4,2] [5] [9,6]; every card's back-link (top of pile k-1 when it landed) is smaller and earlier (asserted in node). Reveal wording matches stage: arrows drawn only along the traced run. Aldous & Diaconis 1999 not re-opened (carried from pass 10). |
| c6 | verified | Pass 22: own deal captions: 3 new (no piles yet), 1 on 3, 4 new, 1 on 1, 5 new, 9 new, 2 on 4 (1 on pile 1 was smaller), 6 on 9 (5 on pile 3 was smaller). Matches why() in Demo.tsx. Note: the first card uses a fourth template, "3 → a new pile (no piles yet).", which the claim does not list; it is true. |
| c7 | verified | Pass 22: own back-links: pile 4 traces 6 -> 5 -> 4 -> 1 (the first 1, card 2), pile 3 5 -> 4 -> 1, pile 2 2 -> 1, pile 1 just its top. Caption strings match traceFrom() in Demo.tsx. |

**Result:** every claim in this lesson is now verified.
