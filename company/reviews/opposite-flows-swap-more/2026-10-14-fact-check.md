# Fact-check: opposite-flows-swap-more (2026-10-14)

Board: W-677. Lesson: src/demos/life/opposite-flows-swap-more/ (status draft, version 1).

Checker: fact-checker. I did not write these claims. Method: I read Demo.tsx on every reachable path before reading the claims: locked state, presets in any order, Reset, seeds, the milestones that gate the reveal, and the reveal's dynamic strings. Then I re-ran every number in node 22 (--experimental-strip-types) from copies of the lesson's own code. CS lessons use a copy of model.ts. Life lessons use the non-JSX top of Demo.tsx cut out with sed, plus a copy of src/kit/random.ts. Independent loops cross-check where noted. Scripts: artifacts/fact-check-wave-j/wj-cs-life/. I did not use the dev server. No walkthrough transcript exists for this slug yet, so the stage was read from code. Web: only PyPI, npm and GitHub raw are reachable, and every source verdict below names the file I opened.

Unrecorded claims: I compared the hook, question, options, stage text, reveal and recall against the claims list and found none unrecorded.

Reachable paths covered: Same/Opposite crossed with 1/4/10 sections in any order. The results row is seeded with 'same 10' on the first press. The reveal opens on opposite 10. The check script E4 section was re-run and matches. c3's closed form was re-derived independently of the brief's heat-exchanger analogy.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Re-ran exchanger() copied from Demo.tsx: same way 50.000 at S = 1, 4, 10; opposite 50.000, 80.000, 90.909 (r0 -> 91). The results row format and sort ('same' first) match. Check script E4 (re-run) agrees. |
| c2 | verified | Steady-state arriving levels, 10 sections, opposite: blood 0, 9, 18, 27, 36, 45, 55, 64, 73, 82; water 18, 27, ..., 91, 100; gap 18.18 in every section. Same way: blood 0, 50, 50, ...; water 100, 50, 50, ... (gap 0 from section 2 on). |
| c3 | verified | Derivation re-done for the model, not by analogy. At steady state both streams leave section i at m_i = (b_i + w_i)/2, and b_{i+1} = m_i, w_{i-1} = m_i, so m_i = (m_{i-1} + m_{i+1})/2 and m is linear. With b_0 = 0 (m_{-1} = 0) and w_{S-1} = 100 (m_S = 100), m_i = 100(i+1)/(S+1): out = 100S/(S+1) and gap = 200/(S+1) (18.18 at S = 10). Simulation agrees at S = 2 and 20 (66.667, 95.238). Same way: section 1 equalises both streams at 50, so later sections change nothing. The heat-exchanger NTU formula is in the source field only, not on the card, and was not checked against a text. |
| c4 | verified | Convention: the stage text 'In each section the two level off halfway' matches k = 0.5 with equal flows; 'Toy model' in the reveal. No gill sentence is on the card. |
| c5 | verified | Same-way at 10 sections = 50 (c1); the locked text matches the model (water 100, blood 0, 10 sections, halfway). |

**Result:** verified 5.
