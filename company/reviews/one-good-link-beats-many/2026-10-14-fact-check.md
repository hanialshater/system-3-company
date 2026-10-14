# Fact-check: one-good-link-beats-many (2026-10-14)

## Pass NCM-1 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (predict, stage text, readouts, reveal, recall) and model.ts first, then re-ran the lesson's own model.ts in node 22 (type-stripping, `@/kit/random` repointed to a copy of src/kit/random.ts; scratchpad `fc/`) or my own re-typed rule where there is no model.ts. No walkthrough transcript exists yet for this slug (artifacts/walkthroughs/ empty for it), so the stage was read from code. Web: the egress proxy 403s/DNS-fails cornell.edu, berkeley.edu, wikipedia.org, arxiv.org, repec, nowpublishers and the Brin-Page mirrors; sources were checked through web-search results (quoted abstracts, catalogue records, secondary summaries), as each row says. Easley and Kleinberg: chapter numbers confirmed from library catalogue records; no section number could be confirmed from a reachable source, so every section stays `section_unconfirmed`.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | `inLinks()` on the lesson's LINKS: X 3, Y 1, H 5. Reveal "H, which five pages link to" matches. |
| c2 | verified | Lesson's ROUNDS: r1 X 0.270, Y 0.100, H 0.440; r2 Y 0.389, X 0.053, H 0.223, A 0.245; total 1.000000 each round. Stage rule line matches S = 0.85, FREE = 0.015. |
| c3 | verified | X equal to its r2 value within 1e-12 for r2-51; Y > X for r2-51; X leads only at r1. Reveal "X never moved again" holds. |
| c4 | verified | r51: Y 0.374, X 0.053, H 0.422, A 0.060; max change r50-51 0.000151; 3-dp identical at r50/r51. 2,000 further rounds give the fixed point Y 0.3741, X 0.0533, H 0.4224, so "settled" is right to the shown precision. |
| c5 | verified | 0.85 x 0.015 = 0.01275; `toFixed(3)` of the float (0.012750000000000003) renders "0.013". |
| c6 | verified | Brin & Page 1998, Computer Networks and ISDN Systems 30(1-7): 107-117, DOI 10.1016/S0169-7552(98)00110-X (bibliographic records via search). Formula PR(A) = (1-d) + d(PR(T1)/C(T1) + ... ) reproduced by secondary sources: a linker passes its rank split over its out-links. Primary PDF unreachable. E&K ch. 14 = link analysis and web search (catalogue); 14.3 stays unconfirmed. |
| c7 | verified | Scale remark; makes no claim about ranking practice. |

Recall item checked: "likely" is hedged correctly under the lesson rule.

**Result:** 7 verified, 0 disputed, 0 withdrawn.


## Pass NCM-2 (2026-10-14)

Checker: fact-checker (did not write these claims). Scope: every claim still `unverified` after the builder's revision. Method: read the current Demo.tsx (predict, stage text, readouts, reveal and the milestones that gate it) and model files, then re-ran the lesson's own code in node 22 via tsx (Demo.tsx copied to scratchpad with its internals exported, CSS import stubbed; model/abm files imported directly). Reveal check: every number or sentence the reveal prints was traced to a state the milestones guarantee the learner reached, or to a claim. The walkthrough transcript predates this revision (08:4x vs Demo.tsx 09:xx), so the stage was read from code, not from a fresh walkthrough.

| Claim | Verdict | Basis |
|---|---|---|
| c4 | verified | Ran model.ts ROUNDS: round 51 Y 0.374, X 0.053, H 0.422 (A 0.060, others 0.015, sum 1.000); max change 50 -> 51 is 0.000151; equal to round 51 at 3 dp from round 40 on. |
| c5 | verified | passed(2, 'P') = 0.85 x 0.015 = 0.01275, rendered 0.013 by f3 (float 0.012750000000000003). Matches reveal paragraph 2. |
| c8 | verified | score(1, 'H') = 0.015 + 0.85 x 0.5 = 0.440; passed(2, 'H') = 0.374; Y round 2 = 0.015 + 0.374 = 0.389. passed() = S x score(round-1, from) / outDeg, as the claim says; arrows into X and Y are labelled with it. |
| c9 | verified | Round 1: X 0.270 > Y 0.100 (hint 'X leads so far'); rounds 50 and 51 equal at 3 dp (hint at 51 'The scores have stopped changing'). Y > X in every round 2-51. |

**Reveal check:** Reveal quotes rounds 1 and 2 (round-two milestone) and round 51 only when the learner is at round 51 (`r51`). No unbacked sentence.

**Result:** 4 verified this pass, 0 disputed, 0 withdrawn. Lesson now: 9 verified.

## Pass NCM-3 (2026-10-14)

Checker: fact-checker (did not write these claims). Scope: every claim still `unverified` after the final-polish revisions, plus a fresh read of every predict, stage label and reveal sentence against the claims. Method: diffed Demo.tsx/model since the NCM-2 record (commit 319d2bda), re-ran the lesson's current code in node 22 via tsx (model files imported directly; Demo-only functions reproduced verbatim or re-implemented independently), and traced each reveal sentence to a milestone-guaranteed state or a claim. No fresh walkthrough: the transcripts predate the v3 commits and a build was not attempted in this shared checkout, so stage text was read from code.

| Claim | Check | Result |
|---|---|---|
| c1 | inLinks() on current model.ts (tsx): X 3 (P, Q, R), Y 1 (H), H 5 (A, B, C, D, Y). | verified |
| c4 | Numbers right (round 51: Y 0.374, X 0.053, H 0.422). **Reveal wording wrong:** "At round 51 the scores had stopped changing: Y 0.374, X 0.053, the same as at round 2." comes right after "By round 2, Y had 0.389". Read naturally, "the same as at round 2" covers both scores; Y's is not (0.389 vs 0.374, and it swings 0.205, 0.518, 0.252 in between). Only X is unchanged (c3). | **disputed** (was verified) |

**Fix (demo-builder):** reveal paragraph 1, replace ", the same as at round 2." with ". X has not moved since round 2, and Y has stayed ahead." (or just drop the phrase). Then set c4 to unverified for re-check.

**Reveal check:** round 1 (0.270 v 0.100) and round 2 (0.389 v 0.053) are reached (milestone round-two); round 51 sentence shows only if r51. Paragraph 2: passed(2, P) 0.013, passed(2, H) 0.374 (c5, c8). Paragraph 3 = c6; footer = c7.

**Result:** 1 verified, 1 disputed. Lesson now: 8 verified, 1 disputed (c4).
