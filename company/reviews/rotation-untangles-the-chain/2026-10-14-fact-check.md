# Fact-check: rotation-untangles-the-chain (2026-10-14)

## Pass 22

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (predict, stage text, readouts, reveal) first, then re-ran each number in my own node scripts (copies of the lesson's logic plus independent re-implementations) or checked the source. Sources marked "not opened" were checked against my own knowledge only; Easley & Kleinberg chapter titles were confirmed through web-search results (library-catalogue tables of contents), as the book's host and mirrors are blocked.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node AVL (levels): heights 1,2,2,3,3,3,3, root 4, 4 rotations; plain BST heights 1..7. |
| c2 | verified | Own node log: rotations at 1 (key 3), 3 (key 5), 2 (key 6), 5 (key 7), all single left; after key 3 the root is 2 with children 1 and 3. |
| c3 | verified | x(A,y(B,C)) -> y(x(A,B),C) keeps in-order A x B y C; own node in-order check after every insert. CLRS 4e sec. 13.2 'Rotations' placement correct to my knowledge (not opened). |
| c4 | verified | Own derivation: min nodes for height h is N(h)=N(h-1)+N(h-2)+1, giving h < 1.4405 log2(n+2) - 0.3277 (checked h=1..29 in node); any binary tree has h >= log2(n+1). 'Close to log2' holds within a factor 1.44. Adelson-Velsky & Landis 1962 (Doklady 146) not opened; sentence does not depend on it. |
| c5 | verified | Matches the stage rule line and plainInsert() (BST insertion definition). |

**Result:** 5 verified, 0 disputed, 0 withdrawn.

## Pass 24 (2026-10-14)

Checker: fact-checker (Ingrid). I did not write or build any of these claims. Scope: every unverified or disputed claim after the wave E revisions. Method: read Demo.tsx (predict, stage, every reachable branch, the state after Reset or Start over where the lesson has one, and the reveal gates), then re-ran the numbers in my own node copies of the lesson's logic (kit mulberry32 where seeded). I opened the builder's pre-flight only for count-the-out-of-order-pairs and each-element-pops-once, and only after reading the code. Hosts for primary sources were unreachable (DNS failure), so a row says when a verdict rests on derivation.

| Claim | Verdict | Basis |
|---|---|---|
| c6 | verified | Own AVL trace with the Demo's first-rotation-on-the-path rule: key 3 at 1, up 2 (children 1, 3); key 5 at 3, up 4; key 6 at 2, up 4; key 7 at 5, up 6. Note text 'Key i made X's side too deep: Y lifted up'. After key 3 the edges out of 2 are 2-1 and 2-3. |

**Result:** 1 verified, 0 disputed, 0 held (unverified), 0 withdrawn.

**Out-of-scope observation (not a claim; routed to the builder via the board):** the reveal can become unreachable. If the learner picks Plain first and presses Insert next key 5 times (the plain tree is full), then picks Rotating, switchMode replays the rotating tree to 7 without setting `first`. From then on Insert next stays disabled (i >= 7), every chip switch replays to full, and the first-rotation milestone can never fire. The lesson kit has no reset.
