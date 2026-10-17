# Fact-check v2: left-or-right, claims c1, c5, c6 (after W-1608)

fact-checker · 2026-10-17 · lane: left-or-right only, claims c1 c5 c6 · base aae6d2d6 (lesson v2) · I wrote none of these claims and did not draft c5's W-1608 wording (that came from the earlier fact-check, company/reviews/left-or-right/2026-10-17-fact-check.md, a different run).

## Verdict

| claim | status | one line |
|---|---|---|
| c1 trefoil chiral, Dehn 1914 | verified | PMC5582600 sec. 2.4 + ref 30 and PMC9948535 ref 4 cite Dehn, Math. Ann. 75 (1914) 402-413; Crossref confirms; own Jones of the trefoil differs from its mirror's |
| c5 sign / hand convention | verified | own vector proof that the new wording equals PMC2853108 Fig. 2E's rotation rule; PMC2853108 ties negative writhe to the left-handed trefoil; own kit 3_1 signs -,-,- |
| c6 turning over is a move | verified | own rotation-family argument; own turn-over keeps the trefoil's Jones; PMC5582600 sec. 2.4 + glossary, PMC8199745 definition |

Only the claims array of src/demos/math/left-or-right/meta.json changed (status, checkedBy, checkedOn, note, with history kept in each note). id, text, support and source are byte-identical to aae6d2d6 (checked by script).

## Method (artifact first)

1. Read Demo.tsx (v2) before any builder note, and git diff of the lesson since the last fact-check commit ad93e395: v2 changed only the 'turned' milestone (W-1606) and unmounts the Turn over / Mirror row at reveal (D2). No reveal, predict or recall text changed. No walkthrough transcript exists and this worktree has no node_modules or server, so rendered strings were read from the JSX (Reveal lines 362-373, predict 385-389, hand()/fmt() lines 39-40) and meta.json recall; build.md quotes the same reveal text from the reveal-fit run.
2. Own script, no kit code: fc-2026-10-17-v2/own.py (output own.out). Inputs: the kit's 3_1 and 4_1 PD codes pasted in, and fc-2026-10-17-v2/kinked.json (the kit's addKink of 3_1, four ways) used only as test diagrams.
   - Crossing geometry from the PD convention in src/kit/knots/index.d.ts (X[i,j,k,l] counter-clockwise from the incoming under-strand): under runs south to north; the over runs west to east or east to west by which of j, l is incoming.
   - Two sign rules computed separately: (a) PMC2853108's rotation rule, positive iff o_x u_y - o_y u_x > 0; (b) c5's wording, positive iff the over vector points from the traveller's left to right, o . (u_y, -u_x) > 0. These are the same expression, and the script asserts they agree on every crossing of both knots, their turn-overs and mirrors.
   - Own turn-over (reverse the cyclic order, then switch every crossing) and own mirror (switch every crossing). Own Kauffman bracket and Jones, V = (-A^3)^(-w) <D> at t = A^-4. Checked by R1 invariance on four kinked trefoils (both kink signs).

Results (own.out):

- 3_1: front -,-,- (sum -3); turned over -,-,- (-3); mirror +,+,+ (+3). Jones front t^-1 + t^-3 - t^-4 = turned; mirror t + t^3 - t^4 = front at 1/t, not equal to front. Own signs equal the kit's signs().
- 4_1: front -,+,-,+; turned -,+,-,+; mirror +,-,+,-; all sums 0; Jones t^-2 - t^-1 + 1 - t + t^2 for all three.
- Kinked trefoils (4 crossings): Jones unchanged, so the smoothing and sign rule are consistent.

## Per claim

**c1.** Rendered: Reveal 'Mirroring turned every mark plus, and no wiggling gets back: the trefoil is not its own mirror image, as Max Dehn proved in 1914' (JSX joins the line break with a space), 'So a trefoil comes in a left and a right version', predict answer index 1 'No, never'. Sources opened (PMC OAI full text): PMC5582600 sec. 2.4, 'The trefoil knot 3 1 is topologically chiral, as one mirror-image form cannot be continuously deformed into the other (Figure 6 a). Although this is clearly true from simple observation, the topological chirality of a trefoil knot was only proven mathematically in the early 20th century. [30]', ref 30 'M. Dehn, Math. Ann. 1914, 75, 402-413'. PMC9948535 ('Can Polymer Helicity Affect Topological Chirality of Polymer Knots?'): 'The closed 3 1 knot is topologically chiral because it cannot [1, 4, 5] be continuously transformed into its mirror image'; xref rid ref4 = 'Dehn M. Die beiden Kleeblattschlingen. Math. Ann. 1914, 75, 402-413. 10.1007/BF01563732'. Crossref api.crossref.org/works/10.1007/BF01563732: 'Die beiden Kleeblattschlingen', M. Dehn, Mathematische Annalen 75, 402-413, issued 1914-09. Dehn's own text was not opened. Own: the Jones polynomials differ, an independent proof that the trefoil is not its mirror.

**c5.** The rule sentence is not shown to the learner; it is the convention behind the marks and names. Own proof that the new wording equals the published rule is above. PMC2853108 Fig. 2E: 'one checks in which sense one should turn the orientation vector of the overlying segment to have it pointing in the same direction as the vector of the underlying segment, while the rotation can not exceed 180°. If that rotation is clockwise, the crossing is negative and it is positive otherwise.' Fig. 3B: 'If that rotation is clockwise the crossing is left-handed and it is right-handed otherwise', so plus = right-handed. Text: 'the Wr of a torsionally relaxed left-handed trefoil knot is of ∼−3.41', so a negative-sum trefoil is the left-handed one. PMC5582600 sec. 2.1: 'Positive crossings describe a right-handed helix, negative crossings a left-handed helix', and sec. 2.6 'all reduced representations of an alternating knot have a constant writhe', which is why naming the hand from this reduced alternating drawing's sum is safe for the trefoil. Rendered: hand() 'Left-handed' for sum < 0, 'Right-handed' for > 0, empty at 0; badges '+' / '−'; 'Sum'; reveal 'its hand stayed left'; predict 'A left-handed trefoil and its mirror image, the right-handed one'. Own kit 3_1 signs -,-,- confirm 'the table's trefoil is the left-handed one'.

**c6.** Rendered: 'turning over is a way of moving it, so its hand stayed left', 'turning one over never swaps them', recall answer index 0 'A right-handed trefoil' (recall 'why' says the same). Own argument: turning over is the rotation by 180 degrees about an axis in the page; rotations by angle s from 0 to 180 are a continuous family of rigid motions, so the strand never passes through itself (ambient isotopy) and the knot is unchanged; a reflection reverses the orientation of space and lies in no such family. Own computation agrees (turned-over trefoil keeps signs -,-,- and its Jones; the mirror's Jones differs). Sources: PMC5582600 sec. 2.4 'knot projections can be deformed as much as desired (without the strand passing through itself) and knots are only topologically chiral if they cannot be deformed continuously to superimpose with their mirror image'; glossary 'Chiral knot: A knot that cannot be continuously deformed into its mirror image'. PMC8199745: 'An amphichiral knot is, by definition, topologically equivalent to its mirror image, i.e., the knot can be continuously deformed into its own mirror image.'

## Findings handed on (not blocking these claims)

1. Off-lane docs, same reversed rule sentence: src/kit/knots/index.d.ts line 36 ('+1 when the over-strand passes right to left seen along the under-strand (right-handed)') and src/lab/knots/README.md line 37. Not learner-visible; the code (signs()) follows the correct rule. Owner: whoever owns the knots kit docs (tools/kit owner), not this lane.
2. c3 / reveal (not on this lane's list): since W-1606 the reveal opens after Mirror then Turn over. On that path the learner turned a +3 trefoil, the seen line shows only 'Trefoil: mirror +3' (v2-w1606-probe.log line 10), and the reveal opens 'Turning the trefoil over left every mark minus ... its hand stayed left'. The sentence is true of the table trefoil, but narrates a turn this learner did not see. For demo-builder / cm-math-discrete to judge; a fact-checker on c3 should look at it.
