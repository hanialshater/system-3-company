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
