# Fact-check: checking-is-not-finding (2026-10-14)

Board: W-657. Lesson: src/demos/cs/checking-is-not-finding/ (status draft, version 1).

Checker: fact-checker. I did not write these claims. Method: I read Demo.tsx and model.ts on every reachable path before reading the claims: locked state, presets in any order, Reset, seeds, the milestones that gate the reveal, and the reveal's dynamic strings. Then I re-ran every number in node 22 (--experimental-strip-types) from copies of the lesson's own code. CS lessons use a copy of model.ts. Life lessons use the non-JSX top of Demo.tsx cut out with sed, plus a copy of src/kit/random.ts. Independent loops cross-check where noted. Scripts: artifacts/fact-check-wave-j/wj-cs-life/. I did not use the dev server. No walkthrough transcript exists for this slug yet, so the stage was read from code. Web: only PyPI, npm and GitHub raw are reachable, and every source verdict below names the file I opened.

Unrecorded claims: I compared the hook, question, options, stage text, reveal and recall against the claims list and found none unrecorded.

Reachable paths covered: Check, Search 9, Search 13, Add a 7th number and Reset in any order; the trace survives Reset, and all four milestones gate the reveal.

Advisory (not blocking, cm-cs's call): the predict answer 64 is the count for blind enumeration, the stage's stated method. Pruning (skip any group with 34 in it) or meet-in-the-middle proves 'no 13' with fewer checks. If the question should mean 'how many groups are there', saying so would close that reading.

Sources: CLRS 3e 34.5.5 and Karp (1972) were not opened. walkccc/CLRS docs/Chap34/34.5.md has only exercises: 34.5-4 solves subset sum in polynomial time when the target is in unary (consistent with the pseudo-polynomial caveat), but nothing confirms the section number or NP-completeness.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Derivation: each number in or out, 2^n groups; 2^6 = 64, 2^7 = 128. The stage grid is 2^nums.length squares. |
| c2 | verified | Re-ran search() and an independent enumeration of all 64 sums: first sum 9 at index 20 (21st tried) = {4, 5}; groups with sum 9: {4,5} and {3,4,2}; no group sums to 13 (13 is not among the 64 sums), so 64 tried. The reveal's hard-coded '21st' matches FIND9.tried = 21. |
| c3 | verified | Derivation: a group of k numbers needs k - 1 additions; {4, 5} needs 1. |
| c4 | disputed | The phrase 'without a search that grows this fast' is wrong as the stage frames it. 'This fast' points at the doubling the learner just saw (64 -> 128). Meet-in-the-middle (split the numbers into two halves, list each half's sums, match them) finds a group or proves there is none using 2^(n/2) + 2^(n/2) sums: 16 instead of 64 here, 24 instead of 128 with seven numbers. That grows by about 1.41x per number, not 2x. I re-derived and ran it (artifacts/fact-check-wave-j/wj-cs-life/mitm.mjs); it agrees with brute force on 2,000 random cases. The search is still exponential, so 'exponentially' would be true. Fix: '...yet nobody knows a method that finds one quickly in every case.' (or 'without a search that grows exponentially'). Separately held: NP-completeness of subset sum (CLRS 3e 34.5.5) and Karp (1972) were not opened. walkccc/CLRS has only exercises for 34.5 and does not confirm the section number. So after the rewrite, c4 still needs an openable source. |

**Result:** verified 3, disputed 1.
