# Fact-check: prices-sort-the-buyers (2026-10-14)

## Pass NCM-1

Checker: fact-checker (session 2, branch ccr-rnd-ncm). I wrote none of these claims. Walkthrough transcript and Demo.tsx first, then meta.json.

Result: 8 of 8 verified (c1-c8). 0 disputed, 0 withdrawn.

Re-run (my node script copying V, wants() and the group rule from tooMany() in Demo.tsx):
- Smallest-group rule: r0 (0,0,0) wants a,a,a group {a}; r1 (1,0,0) a, a|b, a group {a}; r2 (2,0,0) a, b, a|b group {a,b}; r3 (3,1,0) a, b|c, a|b, no group. The smallest group is unique every round (c2, c3).
- At (3,1,0) the only perfect match inside the wants sets is x-a, y-c, z-b, total 23 (c4).
- Six totals 21, 23, 14, 17, 15, 16; 23 unique max (c5).
- Clearing vectors with prices 0..20: 284, all >= (3,1,0) componentwise, all support only x-a, y-c, z-b; 20 with min 0 and max <= 12 (c6). This holds beyond the grid too: clearing needs z to weakly prefer b to a (pa >= pb + 2) and y to weakly prefer c to b (pb >= pc + 1); with pc >= 0 that gives pb >= 1 and pa >= 3.
- c1 values = V; c8 is a true disclosure.

Reveal and recall vs claims: the reveal path text, "x-a, y-c, z-b, total 23", "lowest prices that clear this market" and "z ends on b although it values a at 7" all match c3-c6. The muted line = c7 + c8.

Sources (c7): E&K ch. 10: market-clearing prices exist for any valuations, any perfect matching in the preferred-seller graph at clearing prices has maximum total valuation, and the ascending procedure (raise by 1 the prices of the neighbour set of a constricted set of buyers, renormalise so the lowest price is 0) ends at clearing prices. Confirmed through search-quoted secondary sources (Li and Lin, arXiv 1912.00786, which describes the book's price-based Hungarian algorithm as ending at market-clearing prices); the book PDF is blocked by the proxy. The lesson's rule is the same step. If G is the smallest group whose only-wanters S outnumber it, then N(S) is contained in G and also qualifies, so G = N(S) and S is a constricted set. The lesson skips the renormalisation, but that changes no wants set (they depend only on price differences), so the run is the same. Sections stay in section_unconfirmed (10.3-10.4 per the brief).

Non-blocking notes for the builder (no status change):
1. Recall "why" says "y values b most, yet z gets b". That is true from c1 (b: x 4, y 7, z 5) but no claim records it. Suggest adding it to c4's text.
2. c2's source says "largest group gives a stopping at $4". My re-run agrees (a = 4 at the stop), but under that reading the largest group ties in rounds 0 and 1 ({a,b} and {a,c}). This is not learner-facing, so the result is unaffected.

Confidence: high on c1-c6 and c8 (deterministic re-run plus a proof for c6); medium-high on c7 (standard result, confirmed only through secondary sources).


## Pass NCM-2 (2026-10-14)

Checker: fact-checker (did not write these claims). Scope: every claim still `unverified` after the builder's revision. Method: read the current Demo.tsx (predict, stage text, readouts, reveal and the milestones that gate it) and model files, then re-ran the lesson's own code in node 22 via tsx (Demo.tsx copied to scratchpad with its internals exported, CSS import stubbed; model/abm files imported directly). Reveal check: every number or sentence the reveal prints was traced to a state the milestones guarantee the learner reached, or to a claim. The walkthrough transcript predates this revision (08:4x vs Demo.tsx 09:xx), so the stage was read from code, not from a fresh walkthrough.

| Claim | Verdict | Basis |
|---|---|---|
| c4 | verified | Ran Demo.tsx rest(START): final prices (3,1,0); wants x {a}, y {b,c}, z {a,b}; exactly 1 of the 6 permutations lies inside the wants sets: x-a, y-c, z-b, total 23. b's values x 4, y 7, z 5 from V. |
| c9 | verified | Ran Demo.tsx rest() and said(): 'Raised a; 3 buyers wanted only a.', 'Raised a; 2 buyers wanted only a.', 'Raised a and b together; 3 buyers wanted only a or b.' Own hand check of wants at (0,0,0), (1,0,0), (2,0,0) agrees. |

**Reveal check:** Reveal's raise path prints only if rounds 1-3 were seen, otherwise falls back to the pinned final prices shown on stage; 'compared' is a milestone. No unbacked sentence.

**Result:** 2 verified this pass, 0 disputed, 0 withdrawn. Lesson now: 9 verified.

## Pass NCM-3 (2026-10-14)

Checker: fact-checker (did not write these claims). Scope: every claim still `unverified` after the final-polish revisions, plus a fresh read of every predict, stage label and reveal sentence against the claims. Method: diffed Demo.tsx/model since the NCM-2 record (commit 319d2bda), re-ran the lesson's current code in node 22 via tsx (model files imported directly; Demo-only functions reproduced verbatim or re-implemented independently), and traced each reveal sentence to a milestone-guaranteed state or a claim. No fresh walkthrough: the transcripts predate the v3 commits and a build was not attempted in this shared checkout, so stage text was read from code.

No open claims. Demo.tsx and meta.json unchanged since NCM-2. Re-read predict and reveal against the verified claims; no new learner-visible claim found.

**Result:** 0 status changes.
