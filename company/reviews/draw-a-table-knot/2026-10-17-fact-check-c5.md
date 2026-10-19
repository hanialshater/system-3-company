# Fact-check: draw-a-table-knot c5 (lane draw-a-table-knot, 2026-10-17)

checker: fact-checker · built from: a10dedf1 (Demo.tsx last changed at 271183ea, lesson v2) · scope: math.draw-a-table-knot.c5 only

Independence: I did not write this claim, the v2 reveal wording (cm-math-discrete, 271183ea) or any earlier candidate wording. No builder notes were read before the findings below; the claim's own source/note fields were read only to know what is asserted.

## Verdict: VERIFIED

## What the learner sees (Demo.tsx at a10dedf1)

Reveal, first paragraph, template: "Your switch made a new knot. Your {chip} still had {drawn} crossings drawn, but its name became {name}{, a plain loop}." The claim's quote, "Your switch made a new knot. Your 6₁ still had 6 crossings drawn, but its name became 4₁", is that template exactly for chip 6₁ and a 4₁ switch. The other reachable fillings are 6₁/6/0₁ ", a plain loop", 5₂/5/3₁, and 5₂/5/0₁ ", a plain loop". All four are true by the derivation below.

- The reveal is gated: minInteractions 1, and the only call to interact is reach("switched") inside tap(), which runs record() just before. So seen is never null at the reveal and the 6₁ to 4₁ fallback cannot render. Reset and chip changes do not clear seen.
- Each switch is crossingChange(base, i) from the unswitched table drawing, so at most one crossing is ever switched.
- drawn is crossingCount(next). name is identify(next)[0].name. The mirror flag is not shown, so the stage writes 3₁ for the mirror trefoil, as the claim says ("listed under 3₁").
- No walkthrough transcript exists for this slug, and this worktree has no node_modules or dev server, so the check is against the source at a10dedf1, not a rendered page. A qa-tester walkthrough is the confirmation if one is wanted.

## Derivation (own code, no kit maths)

Inputs: the kit's base PD codes for 6_1, 5_2 and 3_1, dumped once (fc-2026-10-17/kit.json). Everything after that is my own Python (fc-2026-10-17/own.py, reduce.py; outputs own.out, reduce.out).

1. Own crossing change: the incoming over edge becomes the new first slot. It matches the kit's crossingChange output on all 11 switches; the kit was used for comparison only.
2. Unknot switches: 6_1 switches 1 and 4, and 5_2 switches 1 and 3. An own Reidemeister reducer, which takes an R2 only on a bigon face found by own face tracing with an Euler check (F = n + 2) at every step, reduces each one to 0 crossings: one R2, then R1s. That is a constructive proof of the unknot. Their determinant is 1 and their Jones polynomial is 1.
3. 4_1 switches: 6_1 switches 0, 2, 3 and 5 each reduce by one R2 to a 4-crossing diagram. Each has determinant 5 (so it is knotted) and Jones span 4. Span ≤ crossing number ≤ 4, so the crossing number is 4, and the only knot with crossing number 4 is 4_1. As a cross-check, the Jones polynomial equals my own computation from the Knot Atlas 4_1 PD, t^-2 - t^-1 + 1 - t + t^2.
4. Trefoil switches: 5_2 switches 0, 2 and 4 each reduce by one R2 to a 3-crossing diagram with determinant 3 (knotted), so it is a trefoil. Its Jones polynomial is the t to 1/t reciprocal of my Jones polynomial for the kit's own 3_1 entry, and the kit's entry is not amphichiral, so the result is the mirror image of the listed entry.
5. Counts: 4 of 6 give 4_1 and 2 of 6 give 0_1; 3 of 5 give the mirror 3_1 and 2 of 5 give 0_1. A crossing change keeps the number of PD crossings: 6 and 5 in my code. The kit's crossingCount and draw().crossings.length, read for comparison, are also 6 and 5 for every switch.
6. "A new knot": each result differs from the knot it came from. The determinants are 5 and 1 against 9 for 6_1, and 3 and 1 against 7 for 5_2, and the determinant is a knot invariant.

The Jones normalisation was checked inside the script before use: an R1 kink gives 1, 4_1 comes out symmetric, and the trefoil has integer exponents.

Premises used: the Rolfsen table lists only 3_1 at crossing number 3 and only 4_1 at crossing number 4, and span V ≤ crossing number (Kauffman, Murasugi and Thistlethwaite 1987). The earlier records on this slug cite these as well.

## Sources opened

- PMC1976442 (Liu et al., Nucleic Acids Res 2007, "Local selection rules that can determine specific pathways of DNA unknotting by type II DNA topoisomerases"), full text through the PMC OAI API. It says random passages in 5_2L knots "result in roughly equal proportions of unknots and 3 1L knots", that is, a single strand passage (crossing change) on 5_2 gives the unknot or a trefoil. This supports the 5_2 outcomes. The 3-of-5 and 2-of-5 split belongs to the kit's drawing and is derived above.
- PMC7043919 (Sci Adv 2020, grid diagrams and topoisomerase simplification), full text. It says "A single action of a type II topoisomerase corresponds to performing a crossing change in the diagram" and "For the 5 1 and the 5 2, we consider passages toward the 3 1 and toward the 3 1 and the unknot, respectively."
- No source was found for 6_1 to 4_1 or 0_1. That result rests on the derivation, which is constructive for 0_1 and uses invariants plus the table for 4_1.

## Dependence on W-1602 (concurrent stage readout change)

The verdict covers the switch results, which are fixed by the kit's PD and do not depend on wording, and the reveal sentence at a10dedf1. The claim's parenthesis also cites the "stage readout and Seen line". The current readout ("Crossings drawn: N · Name: X, plain loop") and Seen line ("Seen on 6₁: 6 drawn, name 4₁") state the same results and are true. If W-1602 changes the reveal-time readout so that it states something new, such as a mirror flag, a different count or a different name source, that new text is not covered here, and the claim should go back to unverified for a checker who did not draft it. A pure layout or visibility change does not affect the verdict. If W-1602 changes the reveal paragraph itself, c5 must be reset.

## Fix owed

None.
