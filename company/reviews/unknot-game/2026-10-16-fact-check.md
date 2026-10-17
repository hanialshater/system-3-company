# Fact-check: unknot-game

Date: 2026-10-17 (file name as the dispatch named it). Checker: fact-checker (wrote none of these claims). Lane: this one slug, src/demos/math/unknot-game, claims c1 to c7. Base: main ccr-4c6c7654-ew9ko1 at 1885929e.

Method: read meta.json and every learner-visible string in Demo.tsx (title, hook, predict and key, explore hint, readout, caption, tally, reveal, recall and its key) and the reveal gate (Lesson minInteractions = 2 with milestones firstFree and allThree, so the reveal unlocks only at Trefoil 3 of 3, and the tally never decreases). Re-derived without kit code in fc-2026-10-16/own.py: my own PD parse of the kit table strings, my own crossing change, Gauss words, a descending-diagram test, face tracing with an Euler check (faces = n + 2), and Kauffman bracket / Jones polynomial. Then ran the kit only to read what the stage computes (simplify status, the first R2 and the tinted edge, draw output with gap 0.5) and compared. Read company/reviews/unknot-game/2026-10-16-qa.md for the rendered text; no walkthrough transcript exists and I did not build one (no node_modules in this worktree). Read build.md only after the verdicts below were written.

Result: 7 claims: 7 verified, 0 disputed, 0 withdrawn. No unrecorded claim (the recall premise was checked, see below). Two non-blocking source-field swaps for the builder.

## Independent numbers (own.py, no kit code)

Kit strings: 3_1 '142536415263' gives X(1,4,2,5) X(3,6,4,1) X(5,2,6,3); 4_1 '4152647385162837' gives X(4,1,5,2) X(6,4,7,3) X(8,5,1,6) X(2,8,3,7). KnotAtlas convention: slot 0 incoming under, slots 1 and 3 over.

| diagram | crossings | faces (Euler n + 2) | own Jones (t) | descending base point |
|---|---|---|---|---|
| 3_1 unswitched | 3 | 5 (3 bigons, 2 triangles) | -t^-4 + t^-3 + t^-1 | none; Gauss word alternates O/U |
| 4_1 unswitched | 4 | 6 (2 bigons, 4 triangles) | t^-2 - t^-1 + 1 - t + t^2 | none; Gauss word alternates O/U |
| 3_1 switch 0, 1, 2 | 3 | same | 1, 1, 1 | yes, yes, yes |
| 4_1 switch 0, 1, 2, 3 | 4 | same | 1, 1, 1, 1 | yes x4 |

A descending diagram (each crossing first met as an over-pass from some base point) is the unknot, so all 7 single switches free the knot without relying on Jones. Jones not 1 proves both unswitched drawings knotted.

Over-at-both bigon edges after each switch (own face tracing; the partner edge is under at both): 3_1 sw0 edge 1 (also 2), sw1 edge 4 (also 3), sw2 edge 5 (also 6); 4_1 sw0 5, sw1 7, sw2 1, sw3 3.

## What the stage computes (kit, read only)

- simplify status: 3_1 and 4_1 unswitched 'minimal' (readout "Still a knot"); all 7 switches 'unknot' (readout "Plain loop"). The kit crossingChange tuples equal mine.
- Tint: the first R2 of moves(q), edge in an over slot at both crossings: 3_1 1, 4, 5; 4_1 5, 7, 1, 3. Each is one of my over-at-both bigon edges.
- Drawn picture (draw(q, layout L, gap 0.5)): the tinted path starts and ends exactly on both crossing centres (gap 0.00), and the partner bigon edge is cut at both ends (6.15 to 6.32 units). So the tinted strand is the one visibly on top at both crossings.
- QA record (rendered): reveal reads "Your prediction held. Each crossing you switched freed the trefoil on its own: 3 of 3." with the count matching the tally.

## Sources opened

- PMC6158496: Nucleic Acids Res 2018, doi 10.1093/nar/gky559 (PMC OAI full text). "In a diagram a crossing change can be made at a crossing of the diagram. In this case, the segments at that crossing are passed through each other resulting in moving the under-segment to the over-segment and vice versa."
- PMC5582600: Fielden, Leigh, Woltering, Molecular Knots, Angew Chem 2017, doi 10.1002/anie.201702531. "One characteristic of knots is their 'unknotting number', which refers to the minimum number of crossings that have to be inverted to give the unknot from a given knot. The unknotting number for some knots can be easily determined: the unknotting number of a twist knot is always 1 ... and for a torus knot T(p,q) is 1/2(p-1)(q-1)." The formula cites ref 52: "P. B. Kronheimer, T. S. Mrowka, Topology 1993, 32, 773-826". Figure 14: "the pentafoil knot 5_1 ... So the unknotting number is 2".
- PMC4354144: Sci Rep 2015, doi 10.1038/srep08928. "The figure-eight knot, 4_1, is a twist knot having unknotting number one, as does 3_1 ... Thus one crossing change can change directly either of them to the unknot." "The unknotting number of the 5_1 knot is two".
- Crossref 10.1016/0040-9383(93)90051-v: Kronheimer and Mrowka, "Gauge theory for embedded surfaces, I", Topology 32, 773-826, October 1993 (metadata only; no abstract; the paper itself not opened).
- Not opened: Adams, The Knot Book (c6 source field). Brittenham and Hermiller, arXiv 2506.24088 (c7 source field): arxiv.org, export.arxiv.org, Semantic Scholar and the UNL news page are blocked; a web search summary gives only the title "Unknotting number is not additive under connected sum" and the (2,7) torus knot example. Nothing in this record rests on it.

## Verdicts

- **c1 verified.** Hook and predict text "Switching a crossing makes its top strand go under" matches PMC6158496's definition (under-segment to over-segment and vice versa). Convention support is right.
- **c2 verified.** 3 and 4 tuples in my parse; 3 and 4 hit targets drawn; tally rows "of 3" and "of 4" come from the arrays of length 3 and 4. The general sentence "The trefoil has 3 crossings" also holds (reduced alternating, Jones span 3).
- **c3 verified.** All 7 single switches are unknots (descending base point, own Jones 1); both unswitched drawings are knotted (own Jones not 1). The reveal's "3 of 3" is the gated tally, and "No crossing was special" follows from 3 of 3.
- **c4 verified.** In every switched state the stage tints an edge that bounds a bigon face, is over at both of its crossings, and is drawn uncut at both; the partner edge is under at both, so an R2 removes the pair. "In a row" holds because the edge runs directly from one crossing to the next. Unswitched drawings are alternating, so no edge is over at both ends, and the stage shows no tint there (the switched flag gates it).
- **c5 verified.** An R2 on a bigon face removes exactly its two crossings; the trefoil drawing keeps 1 crossing, and a one-crossing knot diagram (Gauss word aa) is a kink that R1 removes. The reveal clause is in the trefoil sentence only.
- **c6 verified.** Definition: PMC5582600 ("minimum number of crossings that have to be inverted to give the unknot from a given knot": a property of the knot, so minimised over its drawings, as the claim's "over all drawings" says). Values: PMC4354144 (4_1 and 3_1 unknotting number one), and derived here (one switch suffices, c3; both are knotted, so at least one is needed). **Builder fix, non-blocking:** the source field still names the unopened Adams; replace with PMC5582600 and PMC4354144.
- **c7 verified.** "Some knots need more than one": PMC5582600 and PMC4354144 both give 5_1 unknotting number 2. The checker example: T(2,7) = (2-1)(7-1)/2 = 3 by the PMC5582600 formula, which cites Kronheimer and Mrowka 1993 (bibliography confirmed on Crossref). The builder's pointer is correct as a citation. **Builder fix, non-blocking:** the source field names Brittenham and Hermiller (unopened); replace with PMC5582600 and PMC4354144, keeping Kronheimer and Mrowka 1993 as the original proof, or keep Brittenham and Hermiller only once someone opens it. Since this sentence is now checked, the brief's cut order (cut it first if unchecked) does not apply.

## Learner-visible text without a claim (checked, not recorded)

- Recall: "A knot drawing has 5 crossings. Switching any one of them gives a plain loop. How many switches did you need to free it?" (key "1"). The answer follows from the premise. I also checked that the premise can happen: an exhaustive search over all 945 five-crossing Gauss chord diagrams, every local orientation and over/under choice (fc-2026-10-16/exhaust.py, planar = faces n + 2, kinks excluded) finds knotted 5-crossing drawings in which every single switch gives the unknot (20 hits, all figure-eight; controls: 3 crossings finds only the trefoil, 4 finds the figure-eight and 4-crossing trefoil drawings). For 5 crossings, Jones 1 implies unknot because 3_1, 4_1, 5_1 and 5_2 all have Jones not 1. No claim needed; the "why" is reasoning.
- Title and explore hint carry no factual content beyond c1 to c3.

## After reading build.md

- build.md "The tint" lists "3_1 switch 0 -> edge 4". The stage, the c4 source field and my check all give edge 1 for switch 0 (edge 4 is the partner, under at both). This is a typo in the build note only; nothing learner-facing changes.
- Nothing in build.md changes a verdict.

## Reproduce

python3 -I company/reviews/unknot-game/fc-2026-10-16/own.py (table, Jones, descending base, bigons); python3 -I company/reviews/unknot-game/fc-2026-10-16/exhaust.py 5 (recall premise, about 20 s; run with 3 and 4 as controls). Kit comparison was done inline with node on src/kit/knots/index.mjs: crossingChange, simplify(q).status, moves(q) first R2, draw(q, layout L, gap 0.5) path end points against crossing centres.
