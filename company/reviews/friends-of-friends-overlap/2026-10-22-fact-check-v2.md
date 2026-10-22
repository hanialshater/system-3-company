# Fact-check: friends-of-friends-overlap (v2)

checker: fact-checker · date: 2026-10-22 · lesson version: v2
Read first: artifacts/walkthroughs/friends-of-friends-overlap/transcript.md and 06-reveal.png, then meta.json claims, Demo.tsx and brief company/domains/briefs/math.discrete.md:219-238. build.md / design.md not read. The earlier record (2026-10-22-fact-check.md) is left unchanged; this file is the v2 check.

## Method
- Ring by hand: with 5 links each side, the people at distance k are ±(5k−4)…±5k, so 10 per step. 1 + 10 + 10 + 10 = 31 within 3. The farthest person is at offset 500, ⌈500/5⌉ = 100 steps. `node company/domains/briefs/checks/math-ncm-wave-j-check.mjs` prints N10 ring {10,10,10,31,maxDist 100} and tree {10,90,810,911}. Demo.tsx RING_DIST is the same BFS (N = 1000, HALF = 5); treeAt(k) = 10·9^(k−1).
- Ringed friend (+3): Demo.tsx ringedLinks = −2…+8 except +3. That is you (0), your friends −2, −1, +1, +2, +4, +5 (6), and new people +6, +7, +8 (3). Screenshot 06 draws 5 arcs each side from the ringed node, which matches. The reveal's "7 land on you or your own friends, only 3 are new" also matches.
- Predict answer 10 = the number at exactly 2 steps in the ring ✓. Recall (qualitative "far fewer than 20 × 19") follows from c4's content.

## Claims

| claim | new status | note |
|---|---|---|
| math.friends-of-friends-overlap.c1 | verified | Hand derivation and the N10 BFS agree: 10/10/10, 31 within 3, farthest 100. |
| math.friends-of-friends-overlap.c2 | disputed | The arithmetic is right (10, 90, 810, 911), but the condition is too weak. "If no two of anyone's friends know each other" (no triangles) does not give 90 at step 2. Two of your friends can share a friend other than you (a 4-cycle, which has no triangle). Counterexample: in K₁₀,₁₀ everyone has 10 friends and no two friends know each other, yet only 9 people are 2 steps away. 810 at step 3 also needs no 6-cycles. Required: state the stage's condition, "no shared friends" (each friend's other 9 friends are new people, nobody reached twice: a tree out to 3 steps), as the chip and the reveal ("With no shared friends every link is new") already do. |
| math.friends-of-friends-overlap.c3 | verified | −2…+8 except +3: 1 you + 6 friends + 3 new; matches ringedLinks and the drawing. |
| math.friends-of-friends-overlap.c4 | unverified | Content holds on this stage (by c1, c3). It is a citation claim, though: E&K ch. 20 Fig. 20.1 ("Pure exponential growth produces a small world" / "Triadic closure reduces the growth rate"). Search snippets show these phrases and E&K ch. 20's text that triadic closure limits how many people short paths reach, but every full text tried was blocked by the proxy (usp.br, ocw.mit.edu, jsums.edu; cornell/berkeley known blocked). Needs a human source check with the book: confirm the chapter and figure. |

## Other findings (not claim status)
- meta.json curriculum.references still names `{"work":"easley-kleinberg-2010","chapter":2,"section_unconfirmed":"2.3"}`, but c4 now cites ch. 20 → the reference should match the chapter the claim cites (ch. 20, figure 20.1, section unconfirmed), or the claim and reference should agree some other way.
- Advisory: the reveal and c4 say "Multiplying 10 × 9 assumes none of your friends know each other". That is true as one assumption among those the product makes, so it is not disputed. The full assumption is the c2 one (no shared friends), and the builder may align the wording when fixing c2.

Verdict: revise (c2 disputed; c4 unverified pending a human source check).
