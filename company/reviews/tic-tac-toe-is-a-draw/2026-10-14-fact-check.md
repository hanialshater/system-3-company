# Fact-check: tic-tac-toe-is-a-draw (2026-10-14)

## Pass 19

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (predict, stage text, readouts, reveal) first, then re-derived or re-ran each number in my own scripts (scratchpad fc19b6) or checked the source.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node minimax (fc19b6/ttt.mjs, not the builder's script): empty board 0; all 9 first moves 0. |
| c2 | verified | Own exhaustive count: 255,168 games (131,184 X wins, 77,904 O wins, 46,080 draws), the published totals. |
| c3 | verified | Hand play-out of all 6 lines on XOXOO..X. plus own minimax: right middle 0, bottom left -1, bottom right -1; matches MIDS in Demo.tsx. |
| c4 | verified | Follows from c3: X-win leaves exist under right middle and bottom right; O's min reply removes each; stage scores draw, O wins, O wins. |
| c5 | verified | Minimax backup as stated is von Neumann 1928 (Math. Ann. 100, 295-320); Russell and Norvig 3e/4e section 5.2 'Optimal decisions in games'. Matches the stage's rule line. |
| c6 | verified | Shannon 1950 (Phil. Mag. ser. 7, 41(314)) estimates about 10^120 chess games (the Shannon number); 'far too many' is a safe reading. |

**Result:** all claims in this pass verified; no disputes.

## Pass 21 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including computed ones) before the claim sources, then re-ran the lesson's own logic in my own node scripts (scratchpad fc21/). Sources were opened where egress allowed, otherwise corroborated by web search or marked as not opened.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own plain minimax (fc21/ttt.mjs, no memo): empty board 0; all nine first moves 0, so corner, edge, centre each draw. Matches Demo.tsx solve() and the v3 bridge row. |
| c2 | verified | Own exhaustive enumeration stopping at the first three-in-a-row or full board: 255,168 games. |
| c4 | verified | Own minimax on START XOX/OO./.X.: right middle -> O bottom left gives X win, O bottom right draw (value draw); bottom left -> O right middle O wins, O bottom right draw (value O wins); bottom right -> O right middle O wins, O bottom left X win (value O wins). Two X moves have a struck X-win leaf. The stage also strikes the draw leaf under bottom left; the sentence does not contradict that. |

**Result:** all open claims verified; the lesson has no unverified or disputed claims.
