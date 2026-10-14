# Fact-check: draw-the-xor-lines (2026-10-14)

## Pass 21 (2026-10-14)

Checker: fact-checker. Method: read Demo.tsx (stage, question, reveal) against each open claim, re-ran the lesson's own model in node (scratch scripts extracting or re-implementing it), and tried each named source. Most source hosts are blocked to fetch; where only a web-search extract was available, the row says so.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Ran the Demo.tsx MODEL block: bestOneLine() = 3, START1 scores 2, 20,000 random lines max 3. Gate 'ceiling' needs one line at bestOneLine(), so bestSingle = 3 at reveal. Midpoint argument re-derived (on side is an open half-plane, off side closed; both convex). |
| c4 | verified | OFFSETS has 3 values, turn in 8 x 45 deg; shading = predict() on a 20 x 20 grid; onMark sits 0.13 inside the on side and stays in view; middle dot fill = predict(l1, l2, 0.5, 0.5). |
| c5 | verified | predict() with two lines is onSide(l1) !== onSide(l2), i.e. exactly one 'on'. startLine2 never starts at a solving position (0 of 24 line-1 settings), 54 solving pairs exist. Independence: the current wording is the v4 builder's; an earlier fact-checker only recorded the stage sentence. |
