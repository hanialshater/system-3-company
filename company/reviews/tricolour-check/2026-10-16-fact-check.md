# Fact-check: tricolour-check

Date: 2026-10-16. Checker: fact-checker (wrote none of these claims). Board W-1540. Lane: this slug and draw-a-table-knot c5 only. Base: main ccr-4c6c7654-ew9ko1 at 5c5c719e.

Method: read meta.json and every learner-visible string in Demo.tsx (hook, predict and key, explore hint, counter, seen and census lines, aria text, reveal, recall and why) before build.md. Dumped the kit PD codes for 3_1 and 4_1 (and for draw-a-table-knot, 5_2, 6_1 and their switches) and then re-derived with no kit code (fc-2026-10-16/own.py on fc-2026-10-16/pds.json, run with python3 -I): own arcs (merge the over-strand edges at each crossing), brute-force colouring count with a + c - 2b = 0 mod 3, colouring-matrix determinant, Kauffman bracket span. Compared with the kit's colourings(pd, 3) and arcs(pd) afterwards. Also checked the drawn picture: each arc path (two kit edges chained as Demo.tsx does) is continuous and its two free ends stop about 6 units from a crossing (the gap), on both knots. No walkthrough transcript exists for this slug; none was run.

Result: 8 claims: 8 verified, 0 disputed, 0 held. No unrecorded claim. The proof (c5) is sourced and stays.

## Independent numbers

| diagram | arcs | crossings | obey / all | one colour | two | all three | det |
|---|---|---|---|---|---|---|---|
| kit 3_1 | 3 | 3 | 9 / 27 | 3 | 0 | 6 | 3 |
| kit 4_1 | 4 | 4 | 3 / 81 | 3 | 0 | 0 | 5 |
| plain loop | 1 | 0 | 3 / 3 | 3 | 0 | 0 | 1 |

Kit colourings: 3_1 9, 4_1 3, empty PD 3. Same. Every trefoil crossing meets three different arcs (kit arcs crossings [1,0,2], [0,2,1], [2,1,0]; my all-three count of 6 = 3! says the same), so any colouring using all three colours ticks all three crossings.

Staggered cycle (K16): step(k) = 1 + (k mod 2), so arc 1 (index 0) moves by 1 and arc 2 (index 1) by 2. From (A,A,A), tapping arcs 1 and 2 once gives (B,C,A), 3 of 3 OK. Steps 1 and 2 are both non-zero mod 3, so every tap changes the colour, and every colouring is reachable. The trefoil3 milestone fires, and the Seen line is written, only when 3 colours are used and all crossings are OK, so 'Seen on 3₁: 3 colours, 3 of 3 OK' is fixed text in practice.

Plain loop chip: an SVG circle with one label; a tap recolours the whole loop; Check all runs census(null, 1): 3 of 3, all one colour; counter 'No crossings'.

Reveal: minInteractions = 3 milestones (trefoil3, loopOne, eightAll), so both the trefoil record and the 4₁ census exist at the reveal; the reveal prints 'all three colours', '81' and 'three' from them, and the stage shows the 4₁ census line at the reveal whichever chip is open.

## Sources opened

- Kılıç, Nijsten, Pellikaan, Ravagnani, Knot theory and error-correcting codes, Designs, Codes and Cryptography (2025), doi 10.1007/s10623-025-01615-x, PMC12398458 (full text via PMC OAI). Def. 3.1: "A Fox tricoloring of a knot diagram is a coloring of the strands with three colors such that at each crossing, the colors of the strands that meet at that crossing are either all the same or all different." "a Fox tricoloring is called trivial if all strands have the same color. A knot diagram is called Fox tricolorable if it has a non-trivial tricoloring. Tricolorability is another invariant of a knot [51]. This already allows us to distinguish the unknot and trefoil knot, as the latter is tricolorable and the former is not." Ref 51: Przytycki, 3-coloring and other elementary invariants of knots, Banach Center Publ. 42 (1998) 275-295. Thm 2.13 (Reidemeister 1927, via Murasugi): two diagrams are of the same knot iff related by Reidemeister moves. Thm 4.7: equivalent diagrams have Fox colouring codes of the same dimension (proof shown for one move, the rest "in a similar manner"); with q = 3, t = -1 these are the 3-colourings, and Remark 4.6: dimension above 1 iff a non-trivial colouring exists. Strands are the edges left after the breaks, i.e. the lesson's arcs ("the diagram depicted in Fig. 1b has 4 crossings and 4 strands", the figure-eight).
- Fielden, Leigh, Woltering, Molecular Knots, Angew Chem Int Ed 2017, doi 10.1002/anie.201702531, PMC5582600: "The trefoil knot (3_1) is the simplest nontrivial knot"; "The figure-eight knot 4_1 can be transformed into its mirror image"; "Reidemeister moves allow transitions between any two diagrams (i.e. conformations) of the same knot or link."
- Not reachable: arxiv.org and export.arxiv.org (403 at the proxy), so Przytycki 1998 itself was not opened. Wikipedia and Adams were not opened (the builder's sources).

## Claims

| id | status | basis |
|---|---|---|
| c1 | verified | Rule and definition: PMC12398458 Def. 3.1, quoted above; 'rope between gaps' is its 'strands'. Kit colouringOk (2·over = in + out mod 3) gives the same counts as my own rule check. Stage: ringOk is solid with a tick, ringBad has stroke-dasharray with a cross; counter 'Crossings OK: n of 3/4', 'No crossings' on ○. Confidence high. Source field should be swapped to PMC12398458 (Wikipedia and Adams unopened). |
| c2 | verified | One arc, one colour (definition); 3 of 3, all one colour on the stage. PMC12398458: the unknot is not tricolorable. Confidence high. |
| c3 | verified | Own table above; K16 path to (B,C,A) checked; Seen line and reveal wording gated on that state. Confidence high. |
| c4 | verified | Own table above: 3 of 81, all one colour; det 5 is prime to 3, which agrees. Reveal numbers come from the required eightAll census. Confidence high. |
| c5 | verified | PMC12398458 states the invariance and cites Przytycki 1998; Thm 2.13 plus Thm 4.7 give it for 3-colourings; PMC5582600 ties wiggling to Reidemeister moves. 'Coloured this way' in the reveal means with all three colours; for a knot (one closed curve) a colouring that is not one colour must have a crossing whose three arcs differ (a crossing cannot show exactly two), so this is the same as 'more than one colour' and the invariant applies. The conclusion (the trefoil is not a plain loop) is the paper's own example. Confidence high on the mathematics; the primary proof (Przytycki) was not opened, but the theorem is stated and proved in part in an opened peer-reviewed source. The lesson keeps its proof; no hold, nothing to tell cm-math-discrete. |
| c6 | verified | Own counts: both give only one-colour colourings, so the test cannot separate them. The reveal does not claim the figure-eight is knotted; it is (det 5; PMC12398458 calls it non-trivial), so no reading is false. Confidence high. |
| c7 | verified | Demo.tsx: letter LETTERS[col[k]], ring stroke var(--arc{col}), themes in styles.module.css; start and Reset all A; a tap always changes colour. Convention. Confidence high. |
| c8 | verified | PMC5582600 quoted above; the kit drawings are those knots (own det 3 and Jones span 3; det 5 and span 4). Confidence high. |

## Rendered text checked with no separate claim

- Hook 'Can three colours tell a knot from a plain loop?': a question; answered by c2, c3, c5.
- Recall key 'No, never' and why ('A plain loop can only be one colour, and wiggling never changes whether a knot can be coloured with all three'): c2 with c5. Any drawing of a plain loop, not only the circle, allows one-colour colourings only, by the same invariance.
- aria-label 'n of m crossings obey the rule' and the live text 'Arc k is now colour X. Crossings OK: n of m.': same values as c1, c3, c4.

## Non-blocking notes

- c1 and c5 source fields name Wikipedia and Adams as unopened; the builder may swap them to PMC12398458 and PMC5582600 (source field only; no learner text changes).
- fc-2026-10-16/own.py's last print line is a placeholder for the plain loop (it prints '3 by definition'); the table row above is the definition, not a computation.

## After reading build.md

Read after the verdicts above were written. The builder's counts (9 of 27 with 3/6, 3 of 81 all one colour, (B,C,A) at 3 of 3) and the reveal text in build.md pre-flight 6 match what I derived and the current Demo.tsx word for word. Decision 1 (loopOne fires on opening ○) is pedagogy and QA path, not a fact: the reveal's 'A plain loop has one arc' is true whether or not the learner recoloured it. Nothing in build.md changes a verdict.
