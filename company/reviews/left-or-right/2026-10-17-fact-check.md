# Fact-check: left-or-right, claims c1-c8 (W-1605)

fact-checker · 2026-10-17 · lane: left-or-right only · base d5235af7 · I wrote none of these claims (all builder-written).

## Verdict

| claim | status | one line |
|---|---|---|
| c1 trefoil chiral, Dehn 1914 | verified | own Jones differs from mirror's; PMC5582600 + PMC9948535 cite Dehn, Math. Ann. 75 (1914) 402-413; Crossref confirms |
| c2 figure-eight amphichiral | verified | PMC8199745, PMC5582600 Fig. 6c |
| c3 trefoil marks/sums on 4 states | verified | own PD signs + own screen geometry; QA r4 glyphs agree |
| c4 figure-eight marks/sums | verified | same |
| c5 sign convention | **disputed** | the rule sentence is reversed (see below); everything rendered is right |
| c6 turning over is a move | verified | PMC5582600 / PMC8199745 definitions + own rotation argument + own invariants |
| c7 turned picture = turned-over knot | verified | own over/under exchange check on the kit drawings + own screen signs |
| c8 stage labels | verified | Demo.tsx strings and transforms; own identification of 3_1 and 4_1 |

## Method (artifact first)

1. Read Demo.tsx and card.ts before any builder note: every learner-visible string (hook, predict, explore hint, readout, seen line, aria label, reduced-motion label, reveal both branches, recall). No walkthrough transcript exists (artifacts/walkthroughs/left-or-right/ absent); the QA record company/reviews/left-or-right/2026-10-16-qa.md (r4, Chromium) supplies the rendered sign glyphs, readouts and screen positions on all 4 rest states of both knots.
2. Own code, kit-free except for the input dump: fc-2026-10-17/own.py on fc-2026-10-17/kit.json (PD codes and the kit's drawings, dumped once). Output: fc-2026-10-17/own.out.
   - Sign: positive when (t_over x t_under) points at the viewer, i.e. the over arrow turns counter-clockwise onto the under arrow. Derived from a right-handed double helix (X = sin t, Z = cos t, Y = ct and its half-turn copy: over runs SW to NE, under SE to NW, cross product z = 2c > 0) and matched to PMC2853108 Fig. 2E ("If that rotation is clockwise, the crossing is negative and it is positive otherwise") and PMC6698734 Fig. 1B.
   - PD sign rule from that (X[a,b,c,d], a incoming under at S, ccw): over entering at b is negative, at d positive. Own turn-over = reverse cyclic order (planar reflection) then switch every crossing; own mirror = planar reflection, and separately switch-all (both give the same signs).
   - Own Kauffman bracket and Jones. The integer exponents of V confirm the sign rule and the smoothing are consistent.
   - Screen geometry: signs from the drawn cubic end tangents, y flipped to y-up, on each rest state's mapping (front; back face x -> 100-x; front x -> 100-x; back face). The QA probe measured those mappings in the browser.

Results (own.out):

- 3_1 PD signs: front -,-,- · turned -,-,- · mirrored +,+,+ · mirrored+turned +,+,+. Screen geometry identical. Jones front -t^-4 + t^-3 + t^-1, mirror t + t^3 - t^4, turned = front.
- 4_1 PD signs: front -,+,-,+ · turned -,+,-,+ · mirrored +,-,+,- · mirrored+turned +,-,+,-. Screen geometry identical. Jones t^-2 - t^-1 + 1 - t + t^2 for front, mirror and turned (palindromic).
- Back face vs front, both knots: same crossing points; the over edge at every crossing in front is the under edge in back. So the turned state shows a reflection with every crossing switched (the half-turn), as c7 says.

## Sources opened (PMC OAI full text)

- PMC5582600, Fielden, Leigh, Woltering, "Molecular Knots", Angew. Chem. 2017. §2.4: "The trefoil knot 3 1 is topologically chiral, as one mirror-image form cannot be continuously deformed into the other (Figure 6a). Although this is clearly true from simple observation, the topological chirality of a trefoil knot was only proven mathematically in the early 20th century. [30]" Ref 30: "M. Dehn, Math. Ann. 1914, 75, 402-413." Fig. 6c: "The figure-eight knot 4 1 can be transformed into its mirror image ... thereby making it topologically achiral." "Positive crossings describe a right-handed helix, negative crossings a left-handed helix." Glossary: "Chiral knot: A knot that cannot be continuously deformed into its mirror image." Also "the trefoil knot 3 1, the figure-eight knot 4 1".
- PMC9948535, "Can Polymer Helicity Affect Topological Chirality of Polymer Knots?", ACS Macro Lett. 2023: "The closed 3 1 knot is topologically chiral because it cannot [1,4,5] be continuously transformed into its mirror image"; ref 4 = Dehn M., Die beiden Kleeblattschlingen, Math. Ann. 1914, 75, 402-413, doi 10.1007/BF01563732.
- Crossref api.crossref.org/works/10.1007/BF01563732: title "Die beiden Kleeblattschlingen", M. Dehn, Mathematische Annalen 75, 402-413, issued 1914-09. Dehn's own text not opened (Springer host).
- PMC8199745, "DNA-Topology Simplification by Topoisomerases", 2021: "An amphichiral knot is, by definition, topologically equivalent to its mirror image, i.e., the knot can be continuously deformed into its own mirror image. The lowest-order amphichiral knots are the unknot, 0.1, and the figure-eight knot, 4.1."
- PMC2853108, "DNA supercoiling and its role in DNA decatenation and unknotting": sign rule above; "the right-handed crossings score as +1 and left-handed crossings as −1"; "the Wr of a torsionally relaxed left-handed trefoil knot is of ∼−3.41".
- PMC6698734, "Closing the DNA replication cycle...": "Crossing has negative sign if the direction arrow that is closer to the observer would need to be turned in a clockwise direction to overly it with the direction arrow that is further from the observer. If that direction of turning is counter-clockwise, the crossing has positive sign."
- Blocked: en.wikipedia.org, knotinfo, arxiv (proxy 403). Adams' Knot Book not opened. Web search summary only (not relied on): Wikipedia "Writhe" states positive when, travelling along the diagram, "the strand underneath goes from right to left", which agrees with the finding on c5.

## Per claim

- **c1 verified.** Reveal paragraph 1, the closing "So a trefoil comes in a left and a right version", predict key "No, never". Own: V(3_1) differs from V(mirror), so no deformation joins them. Dehn 1914 attribution from two citing papers plus Crossref. Non-blocking: source field still names unopened Wikipedia; swap to PMC5582600 + PMC9948535.
- **c2 verified.** Both reveal branches. "summed to 0 both ways": own sums are 0 on all four states.
- **c3 verified.** Own signs and sums on all four states; strings from fmt/hand/seenText ("Sum −3" "Left-handed", "Sum +3" "Right-handed", "Trefoil: turned over −3 · mirror +3").
- **c4 verified.** Own signs; aria label "Figure-eight, front. Marks minus, plus, minus, plus. Sum 0." from ariaLabel().
- **c5 disputed.** The claim says a mark is plus "when the over-strand passes from right to left as seen travelling along the under-strand". With the sources' sign, a plus crossing has under heading north and over heading east: travelling north along the under-strand, the over-strand passes from **left to right**. (Equivalently: travelling along the over-strand, the under-strand passes from right to left.) The stated rule therefore labels every crossing the opposite way to the lesson's own numbers. The numbers themselves follow the sources: the table 3_1 is -,-,-, Jones -t^-4 + t^-3 + t^-1, the left-handed trefoil (PMC2853108: left-handed trefoil writhe about -3.41). So nothing the learner sees is wrong; the claim record is. The rest of c5 checks ("plus (right-handed)", sum below 0 called left-handed, the table's trefoil left-handed). **Fix for demo-builder, claim text only:** "a crossing mark is plus (right-handed) when the over-strand passes from left to right as seen travelling along the under-strand". Re-verify by a fact-checker who did not draft the wording.
- **c6 verified.** Turning over is the rotation by s·π about an axis in the page, s from 0 to 1: a continuous family of rigid motions, so a deformation in the sources' sense; a reflection reverses the orientation of space and lies in no such family. Own: turn-over keeps every sign and V(3_1); mirror changes V. Recall key "A right-handed trefoil" is right. Non-blocking: the source names unopened Adams; swap to PMC5582600.
- **c7 verified.** Over/under exchanged at every crossing between front and back faces at identical crossing points; turned state = half-turn of the front; own screen signs equal the readout on all 4 states of both knots; same knot as front (equal V).
- **c8 verified.** "Turned over" (reduced motion), "Turn over" = rotateY(180deg) on the card, "Mirror" = scaleX(-1) on the wrapper (own: page reflection flips every sign), chips Trefoil -> 3_1, Figure-eight -> 4_1 (own Jones spans 3 and 4 with the trefoil and figure-eight polynomials).

## Unrecorded claims

None found. Hook and predict are questions; the explore hint is an instruction; every factual reveal, recall and stage sentence maps to c1-c8.

## Off-lane (not fixed here)

- src/lab/knots/README.md line 37 (Conventions, "Handedness") has the same reversed sentence as c5, while the kit's sign() follows the sources. Not a lesson claim; for the knots library owner (R&D lead) to reword.

## Next

- demo-builder: reword c5's rule sentence (claim text only), then a fresh fact-checker re-verifies c5. Optional source-field swaps on c1 and c6.
