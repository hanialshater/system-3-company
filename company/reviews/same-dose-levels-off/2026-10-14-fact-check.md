# Fact-check: same-dose-levels-off (2026-10-14)

Board: W-677. Lesson: src/demos/life/same-dose-levels-off/ (status draft, version 1).

Checker: fact-checker. I did not write these claims. Method: I read Demo.tsx on every reachable path before reading the claims: locked state, presets in any order, Reset, seeds, the milestones that gate the reveal, and the reveal's dynamic strings. Then I re-ran every number in node 22 (--experimental-strip-types) from copies of the lesson's own code. CS lessons use a copy of model.ts. Life lessons use the non-JSX top of Demo.tsx cut out with sed, plus a copy of src/kit/random.ts. Independent loops cross-check where noted. Scripts: artifacts/fact-check-wave-j/wj-cs-life/. I did not use the dev server. No walkthrough transcript exists for this slug yet, so the stage was read from code. Web: only PyPI, npm and GitHub raw are reachable, and every source verdict below names the file I opened.

Unrecorded claims: I compared the hook, question, options, stage text, reveal and recall against the claims list and found none unrecorded.

Reachable paths covered: 6 h, 12 h and 3 h in any order. The reveal sets 6 h as current, and its 'other' branch prefers 3 h, then 12 h. The check script E5 section was re-run and matches. Two wording advisories (c1, c3) are non-blocking; demo-builder or cm-life may take them.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Re-ran course() copied from Demo.tsx: 100, 150, 175, 187.50, 193.75 -> r0 100, 150, 175, 188, 194; the 40th is 199.99999999982 -> 200. Check script E5 (re-run) agrees. Advisory, not blocking: the reveal's 'then stayed at 200' skips the next three values, 197, 198 and 199 (rounded); r0 first shows 200 at the 9th addition (48 h). Wording such as 'then crept up to 200 and stayed there' would match the stage exactly. |
| c2 | verified | Derivation: L(n) = 100(1 - f^n)/(1 - f) with f = 0.5, 0.25 and 0.7071 gives 200, 133.33 and 341.42. course(): 199.99999999982 (40), 133.33333333321 (20), 341.4213562370 (80) -> 200, 133, 341. The reveal branch picks 3 h when it was drawn (twice as often, higher), otherwise 12 h (half as often, lower), and both texts are true. |
| c3 | verified | At 200 just after an addition, 100 remain after 6 h, and the addition restores 200: last(six)/2 renders 100. 'About a day in' is approximate: after 4 additions (18 h) the level is 93.75% of 200, and after 5 (24 h) it is 96.9%. Advisory, not blocking: strictly, the level keeps rising after day 1, by 6 more units, and in and out balance only in the limit. 'Nearly stops rising about a day in' would be exact. |
| c4 | verified | Convention: the stage and the reveal say 'A made-up substance' and disclaim real medicines; no dosing claim appears. |

**Result:** verified 4.
