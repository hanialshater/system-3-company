# Fact-check: draw-a-table-knot

Date: 2026-10-16. Checker: fact-checker (wrote none of these claims). Board W-1589 (W-1582 on the builder's branch). Lane: this one slug, src/demos/math/draw-a-table-knot, claims c1 to c8. Base: main ccr-4c6c7654-ew9ko1 at 5b5341c6.

Method: read meta.json and every learner-visible string in Demo.tsx (hook, predict and its key, stage caption, readout, Seen line, both reveal branches, recall and its key) before reading build.md or the brief's reveal notes. Dumped the kit's PD codes for 3_1, 4_1, 5_2, 6_1 and all 11 single switches, and ran the kit's identify, simplify and crossingCount on them (run.mjs). Then re-derived without kit code (check.py): my own Kauffman bracket and Jones polynomial from the PD codes, Gauss words for alternation and nugatory crossings, and a geometric count of extra crossings in the drawn SVG paths on the stored layout (draw.mjs, gap 0). gap.mjs checks which strand is cut at a switched crossing. tab.mjs checks every kit table entry's crossing count. Scripts: company/reviews/draw-a-table-knot/fc-2026-10-16/ (paths inside are absolute to the worktree; data goes to a scratch dir passed as argv). I did not compare with knots-check.mjs K1 to K21 until my own numbers were written. No walkthrough transcript was run.

Result: 8 claims: 7 verified, 1 disputed (c5, rendered wording only), 0 withdrawn. No unrecorded claim.

## Independent numbers

| diagram | crossings | alternating | nugatory | own Jones (span) | identified (published Jones, up to mirror) |
|---|---|---|---|---|---|
| kit 3_1 | 3 | yes | none | -t^-4 + t^-3 + t^-1 (3) | 3_1 |
| kit 4_1 | 4 | yes | none | t^-2 - t^-1 + 1 - t + t^2 (4) | 4_1 |
| kit 5_2 | 5 | yes | none | span 5 | 5_2 |
| kit 6_1 | 6 | yes | none | span 6 | 6_1 |

Single switches (crossing index as in the PD code, which is the stage's tap index):
- 6_1: 0, 2, 3, 5 give Jones span 4 equal to 4_1; 1, 4 give Jones 1. Crossings stay 6.
- 5_2: 0, 2, 4 give span 3 equal to 3_1 (the mirror of the kit's own 3_1 entry, in my convention and in the kit's identify); 1, 3 give Jones 1. Crossings stay 5.
- Kit identify gives the same names (6_1: 4_1 x4, 0_1 x2; 5_2: 3_1 mirror x3, 0_1 x2); kit simplify reaches 4, 3 or 0 crossings.

Why the Jones match is a proof here: a switched diagram has at most 6 crossings, so its knot has crossing number at most 6. Every knot with crossing number at most 7 is alternating (the first non-alternating knots have 8, PMC5582600 names 8_19), and for an alternating knot span V = crossing number (Kauffman, Murasugi, Thistlethwaite). So span 4 means crossing number 4, which is only 4_1; span 3 means 3_1 (either hand); Jones 1 (span 0) means crossing number 0, the unknot. This does not depend on my memory of the 5_1, 6_2 or 6_3 polynomials.

Picture: on the stored layout at default relax, size and margin, the 6_1 and 5_2 drawings and all 11 switched drawings have 6 (or 5) crossing centres, 12 (or 10) edges and 0 path intersections away from the crossing centres. At each switched crossing the two edges that were cut short (under) become continuous and the other two become cut (gap.mjs, all 11).

Kit table: all 21 entries have crossingCount(pd) equal to their tabulated c (0_1 0, 3_1 3, ... 10_8 10, granny and square 6).

## Sources opened

- PNAS 2022, Symmetric tangled Platonic polyhedra, doi 10.1073/pnas.2110345118, PMC8740703 (full text, PMC OAI): "label X_i^L indicates a knot (no superscript) or L-component link that can be drawn on the page with no fewer than X crossings, and i is an arbitrary index to distinguish different knots or links with minimal crossing number X."
- Fielden, Leigh, Woltering, Molecular Knots, Angew Chem Int Ed 2017, doi 10.1002/anie.201702531, PMC5582600: "every knot is denoted in the form X_Y, where X corresponds to the number of crossings and Y is an index that distinguishes the knot from others with the same number of crossings. Y was originally determined by sorting the knots for a given number of crossings by increasing torsion number." "A trivial knot has no crossings ... the unknot, denoted 0_1." "The simplest representation of a knot ... is one depicting the fewest number of crossings. Further crossings can be introduced by twisting ... nugatory crossings." "one of the most commonly used versions today is the Rolfsen knot table."
- The braid index of DNA double crossover polyhedral links, PMC7015418: "The crossing number of a link L, denoted by c(L), is defined as the least number of crossings in any regular diagram of the link."
- Nature Communications 2019, doi 10.1038/s41467-019-08879-7, PMC6384881: "Since each of these links has a reduced alternating link diagram of 12 crossings, its crossing number is exactly 12" (Tait's first conjecture applied; cites Adams, The Knot Book).
- Polymers, PMC10611388: "Originally, Rolfsen's table does not distinguish the knots based on their chirality" (supports the 5_2 switch being named 3_1 although it is the mirror).
- Crossref metadata only (full text blocked, Elsevier and AMS hosts refuse CONNECT): Kauffman, State models and the Jones polynomial, Topology 26(3) 395-407 (1987), 10.1016/0040-9383(87)90009-7; Murasugi, Jones polynomials and classical conjectures in knot theory, Topology 26(2) 187-194 (1987), 10.1016/0040-9383(87)90058-9; Thistlethwaite, A spanning tree expansion of the Jones polynomial, Topology 26(3) 297-309 (1987), 10.1016/0040-9383(87)90003-6. Rolfsen, Knots and Links, AMS Chelsea reprint, 10.1090/chel/346, with chapter 10.1090/chel/346/14 "Table of knots and links". Boninger, On the cosmetic crossing conjecture for special alternating links, Proc AMS Ser B (2023), 10.1090/bproc/184 (abstract opened: it proves, for a family including special alternating knots, that no non-nugatory crossing change preserves the knot; the general case is the open conjecture).
- Not reachable: arxiv.org, en.wikipedia.org, katlas.org, knotinfo, archive.org, sciencedirect, ams.org.

## Claims

| id | status | basis |
|---|---|---|
| c1 | verified | Predict key "The fewest crossings any drawing of it can have", reveal "The first number in a name is the fewest crossings any drawing of that knot can have" and recall key "Some drawing of it has 5 crossings, and none has fewer" all state the crossing-number convention, matching PNAS 2022 and PMC7015418 word for word in meaning. The recall scenario (a 9-crossing drawing of 5_2) is possible (add kinks), and its two distractors are false. Rolfsen's own wording not opened; confidence high. |
| c2 | verified | Own count and geometry above: 6 and 5 drawn crossings, 0 extra, own Jones matches 6_1 and 5_2. Predict "This drawing of 6_1 has 6 crossings" and readouts "Crossings drawn: 6 · Name: 6_1", "5 · 5_2" are true. Confidence high. |
| c3 | verified | "4_1 can be drawn with 4 and never with fewer", "3_1 ... with 3": upper bound from the kit drawings; lower bound from span V(4_1) = 4, span V(3_1) = 3 and span V <= crossings in any diagram (KMT 1987; equivalently Tait's first conjecture for these reduced alternating drawings). 3 is also the minimum for any nontrivial knot (PMC5582600: "Nontrivial knots have at least three crossings"). The 1987 papers are confirmed by Crossref only; the theorem is applied in PMC6384881. Confidence high on the mathematics, medium on the attribution wording in the source field (not learner-visible). |
| c4 | verified | "The second number is only its place in the table": PNAS 2022 "an arbitrary index to distinguish different knots ... with minimal crossing number X"; Angew 2017 the same, with its historical torsion-number ordering, which does not change that the number is a position only. Confidence high. |
| c5 | **disputed** | The switch results are right (above). The rendered sentence is not: the reveal opens "A switch makes a new knot." In general present tense this is false: switching a nugatory crossing (a kink) never changes the knot (PMC5582600 on nugatory crossings), and whether any other crossing change can keep the knot is the open cosmetic crossing conjecture (Boninger 2023). The lesson's own recall puts a 9-crossing drawing of 5_2 in front of the learner, which must carry such extra crossings. **Exact fix (Demo.tsx, Reveal, first sentence):** replace "A switch makes a new knot." with "Your switch made a new knot." (6 words for 6, the 67-word count is unchanged). Update the claim text's quote to match; the rest of c5's text can stay. Re-verify by a fact-checker who did not draft the new wording. |
| c6 | verified | Reveal "its name became 0_1, a plain loop", "a plain loop can be drawn with none", readout "Name: 0_1, plain loop": convention, PMC5582600. The 0_1 states are proved unknots by Jones 1 on at most 6 crossings (argument above); kit simplify also reaches 0 crossings. Confidence high. |
| c7 | verified, with caveat | Predict "Knot tables name each knot with a number, like 6_1" (PNAS 2022, PMC5582600). Reveal "The table draws each knot with that fewest, so 6_1 had exactly 6" (or 5_2 had exactly 5: r.drawn is the switched drawing's count, which equals the chip's, c5): the stage part is derived. The general clause rests on the kit's 21 entries, derived from Rolfsen and KnotInfo DT codes, all having exactly c crossings, and on the naming sources; Rolfsen's Appendix C pictures were not opened. If a later checker opens Appendix C and finds a tabulated picture with more crossings than its name, reset to unverified. Confidence medium-high. |
| c8 | verified | Caption "Switch: top strand goes under": gap.mjs shows the over strand becoming the cut (under) one at the switched crossing in all 11 switches, and the under strand becoming continuous. Standard crossing change. Confidence high. |

## Rendered text checked with no separate claim

- Hook "Knot tables give every knot a number. Is it something you can count in the picture?": c7's naming clause.
- Seen line "Seen on 6_1: 6 drawn, name 4_1": c2 and c5 values.
- Reveal fallback (no switch recorded) is 6_1, 6 drawn, 4_1: a reachable state (c5).
- aria-label "Knot drawing with 6 crossings, name 6_1": c2.

## Non-blocking notes

- The source field of c3 attributes Tait's first conjecture to all three authors; the minimality result is usually credited to Kauffman, Murasugi and Thistlethwaite independently (1987), which matches. The research note's line 100 credits all three with the writhe conjecture too, which is usually credited to Murasugi and Thistlethwaite; that note is not learner text and not in this lane.
- c5's mirror detail ("the mirror image, listed under 3_1") is right; the stage shows only the name, so nothing visible needs it.

## After reading build.md and the brief

Read after the verdicts above were written. build.md's reveal text from its QA run is the pre-W-1586 script (it still has "So the first number in a name is not what one drawing shows"); the current Demo.tsx is the 67-word one I checked. The brief (company/domains/briefs/math.discrete.md, Knots batch 1 #1) fixes "A switch makes a new knot." as script; the fix above is wording for cm-math-discrete to accept and demo-builder to make. Nothing in either changes a verdict. The builder's node re-run of the switches agrees with mine index by index.

## W-1591 re-verify of c5 (2026-10-16, second fact-checker)

Checker: fact-checker, a different instance from the one above. I did not write c5 and did not draft "Your switch made a new knot."; the lane rule (company/qa/fact-check-lanes.md, fresh checker for drafted wording) puts the re-verify here. Base: main ccr-4c6c7654-ew9ko1 at 5c5c719e. Lane: this claim only, plus tricolour-check (its own record).

What changed (git show 67207577): Demo.tsx Reveal first sentence "A switch makes a new knot." became "Your switch made a new knot."; c5's quote updated to match; nothing else in the claim or the stage logic.

What the sentence now claims: the particular switch the learner made produced a knot different from the one drawn. I checked it against every state that can reach the reveal, not only the quoted example.

- Reachable states (Demo.tsx): the reveal unlocks only after milestone "switched" (minInteractions 1, the only interact call is reach("switched") in tap). tap() calls record() before reach(), and does nothing while locked, so seen is set whenever the reveal opens; the fallback {6_1, 6, 4_1} is unreachable. Only one crossing is ever switched: crossingChange(base, i) is always applied to the unswitched base. The recorded switch is the last one tapped, even if the learner later switched it back or pressed Reset, so "Your switch" always names a switch the learner made. So the set of reveal states is exactly the 11 single switches of 6_1 (6) and 5_2 (5).
- Own check with no kit code (company/reviews/tricolour-check/fc-2026-10-16/own.py on the kit PD codes dumped to pds.json): own arcs, colouring-matrix determinant (any first minor) and Kauffman bracket span.

| drawing | det | Jones span | switches (index: det, span) |
|---|---|---|---|
| 6_1 | 9 | 6 | 0: 5, 4; 1: 1, 0; 2: 5, 4; 3: 5, 4; 4: 1, 0; 5: 5, 4 |
| 5_2 | 7 | 5 | 0: 3, 3; 1: 1, 0; 2: 3, 3; 3: 1, 0; 4: 3, 3 |

All switched diagrams are one component with 6 (or 5) crossings. The determinant is a knot invariant (PMC12398458, Kılıç et al. 2025: "By taking any (n-1)-minor of the Alexander matrix, we get another knot invariant", the Fox colouring matrix at t = -1), and every switched determinant (5, 1 or 3, 1) differs from the original (9 or 7). So each of the 11 switches makes a different knot: the sentence is true in every reachable state, independently of how the results are named. The names (4_1, 3_1, 0_1) agree with the first check's argument (span = crossing number for knots of at most 6 crossings, all alternating) and with det 5, 3, 1.
- "A new knot" for the 0_1 cases: the reveal then says "its name became 0₁, a plain loop"; the trivial knot is a knot in the table's sense (PMC5582600: "A trivial knot has no crossings ... the unknot, denoted 0_1"), so "new knot" is not false there.
- The general-case objection that disputed the old wording (nugatory crossings, cosmetic crossing conjecture) no longer applies: the sentence is past tense about the learner's own switch on a reduced alternating drawing, which has no nugatory crossing.

Verdict: c5 **verified**. Confidence high. Read build.md's W-1591 section only after this was written; it says the same change was made and nothing else, which matches git.
