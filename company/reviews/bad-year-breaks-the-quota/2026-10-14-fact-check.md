# Fact-check: bad-year-breaks-the-quota (2026-10-14)

Board: W-677. Lesson: src/demos/life/bad-year-breaks-the-quota/ (status draft, version 1).

Checker: fact-checker. I did not write these claims. Method: I read Demo.tsx on every reachable path before reading the claims: locked state, presets in any order, Reset, seeds, the milestones that gate the reveal, and the reveal's dynamic strings. Then I re-ran every number in node 22 (--experimental-strip-types) from copies of the lesson's own code. CS lessons use a copy of model.ts. Life lessons use the non-JSX top of Demo.tsx cut out with sed, plus a copy of src/kit/random.ts. Independent loops cross-check where noted. Scripts: artifacts/fact-check-wave-j/wj-cs-life/. I did not use the dev server. No walkthrough transcript exists for this slug yet, so the stage was read from code. Web: only PyPI, npm and GitHub raw are reachable, and every source verdict below names the file I opened.

Unrecorded claims: I compared the hook, question, options, stage text, reveal and recall against the claims list and found none unrecorded.

Reachable paths covered: the locked state (lines to year 10 only), kill 0 after unlock (readout 'A 600 fish · B 600 fish'), 30% and 50% in either order, with faint traces of the other. When the reveal opens it sets the 50% case, so the empty-in-year-17 and 600 values it quotes are drawn. The check script E2 section was re-run and matches.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Re-ran simulate() copied from Demo.tsx (node strip-types): quota 30% end 588.57 (year 20: 446.4); share 30% 600.00 (587.5); quota 50% empty at t = 16.933 -> yr() 17; share 50% 600.00 (571.6). Stage readouts: 'year 60: A 589 fish · B 600 fish' (30%), 'year 60: A empty · B 600 fish' (50%), and 'A 600 · B 600' with no disease. Matches check script E2 (re-run): quota 0.5 empty at 16.9. |
| c2 | verified | Derivation: 0.5N(1 - N/1000) = 120 gives N = 400 or 600; growthAt(300) = 105 exactly as rendered; growth < 120 at every integer N in 1-399 (node). The 30% case dips to 420 > 400 and recovers, consistent with the tipping point. |
| c3 | verified | Derivation: 0.5N(1 - N/1000) > 0.2N iff N < 600 (checked at every integer N in 1-599); 0.2 x 300 = 60. The share rule's balance points are 0 (unstable) and 600. |
| c4 | verified | Convention: the stage and the reveal describe the model accurately (growth 0.5N(1 - N/1000), catch 120 or 20%, one disease) and disclaim fishing advice. No literature sentence is on the card. |
| c5 | verified | Derivation: growth at 600 = 0.5 x 600 x 0.4 = 120 = quota = 0.2 x 600; both kill-0 runs stay at 600. |

**Result:** verified 5.
