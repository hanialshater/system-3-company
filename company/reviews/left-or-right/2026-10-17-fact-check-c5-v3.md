# Fact-check: left-or-right v3, claim c5 only (lane left-or-right only)

fact-checker · 2026-10-17 · base ccr-4c6c7654-ew9ko1 at da5fb903 (lesson v3, draft; W-1651 commit 1d06150f included) · lane: left-or-right, c5 only
Independence: I did not write c5, did not draft the W-1651 quote, and did not run `2026-10-17-fact-check-v3.md` or either earlier left-or-right check. I read Demo.tsx, card.ts and the claim before build.md; the previous c5 note was read only after my own derivation was done.

## Verdict
| Claim | Verdict |
|---|---|
| c5 | **verified** (the claim as a whole: rule, hand names, table trefoil left-handed, and every quoted string including both reveal openers) |

Only the claims array of `src/demos/math/left-or-right/meta.json` changed (c5 status, checkedBy, checkedOn, note; previous note kept after "History:"). Script: `fc-2026-10-17-c5/set_status.py` (textual edit; asserts every other claim and every non-claims field is unchanged).

## 1. The sign rule, own derivation (kit-free, `fc-2026-10-17-c5/own.py`, output `own.out`)
- Rule as worded: plus when the over-strand passes from left to right as seen by a traveller along the under-strand. With screen x right, y up, under direction u and over direction o, the traveller's right hand is (u_y, -u_x); plus iff o . (u_y, -u_x) > 0.
- Handedness anchored in geometry, not in a table: two strands of a double helix (cos t, sin t, ct) and (-cos t, -sin t, ct), seen side-on. c > 0 (right-handed helix by the right-hand rule) gives +1 at all 6 crossings; c < 0 gives -1 at all 6. So "plus = right-handed" in the claim agrees with helix handedness.
- PD rule: X[i,j,k,l] counter-clockwise from the incoming under-edge i (i south, under heading north; j east, l west). Over runs j->l (east to west) when l follows j, giving minus by the rule; else plus.
- Kit 3_1 code `142536415263` (`src/kit/knots/table.mjs` line 11, data only), own mirror (switch every crossing) and own turn-over (planar reflection then switch):

| state | signs | sum | hand() |
|---|---|---|---|
| front | -,-,- | -3 | Left-handed |
| turned | -,-,- | -3 | Left-handed |
| mirrored | +,+,+ | +3 | Right-handed |
| mirrored, turned | +,+,+ | +3 | Right-handed |

- A 3-D torus trefoil, its reflection in the page and the 180-degree rotation of each, projected and signed by the rule: -3, +3, -3, +3 (rotation keeps the sum, reflection flips it).
- Comparison only, after the above: the kit's `signs()` through `card.ts` `logicalPd` on the four states gives the same rows for 3_1 (and 0 in every state for 4_1).

## 2. Sources opened (WebFetch of pmc.ncbi.nlm.nih.gov; the OAI and Europe PMC hosts were 403 from the proxy this run)
- PMC2853108, Witz and Stasiak, "DNA supercoiling and its role in DNA decatenation and unknotting", Nucleic Acids Res 38(7), 2010. Fig. 2E: "If that rotation is clockwise, the crossing is negative and it is positive otherwise" (the rotation, at most 180 degrees, that brings the over-segment's arrow onto the under-segment's). Check against the claim's rule: under north, over west; turning west onto north is clockwise, so minus; the claim's rule also gives minus (over passes right to left). Over east: counter-clockwise, plus; the rule gives plus. Fig. 3B: "If that rotation is clockwise the crossing is left-handed and it is right-handed otherwise." Text: "the Wr of a torsionally relaxed left-handed trefoil knot is of ~-3.41", so the negative-sum trefoil is the one called left-handed.
- PMC5582600, Fielden, Leigh and Woltering, "Molecular Knots", Angew Chem Int Ed 2017, sec. 2.1: "Positive crossings describe a right-handed helix, negative crossings a left-handed helix." Sec. 2.6: "all reduced representations of an alternating knot have a constant writhe" (the 3-crossing trefoil drawing is reduced alternating, so naming it by its sum is consistent; the claim calls the Sum a property of the drawing on show).
- Not opened: src/lab/knots/README.md (named in the source field as a reversed in-house sentence, not as support).

## 3. What the learner sees (Demo.tsx at da5fb903)
- `hand()` line 40: "Left-handed" below 0, "Right-handed" above 0, "" at 0; shown under "Sum" (lines 277-278). Badges line 318: "+" when the sign is > 0, else "−". Predict question line 393 matches the quote.
- Reveal lines 367-369. The branch "…so its hand stayed right." renders when `seen.turned === undefined`; the standard "…so its hand stayed left." otherwise.
- When is the branch reachable? The reveal needs 2 interactions (`minInteractions={2}`); the only `interact` calls are the two milestones "turned" and "mirrored", each counted once (`src/kit/milestones.tsx`). "turned" fires on any trefoil rest state with the card turned (line 172), but `record("turned")` only on the plain turned state (line 173). So `seen.turned` undefined at the reveal means every trefoil turn-over the learner rested on was the mirrored one: marks +,+,+, sum +3, `hand` "Right-handed", which the opener calls "right". Otherwise the learner rested on plain turned, -,-,-, sum -3, "left". Both quotes use c5's naming correctly on the path where they render. If a settle lands after "Show me why" (a press in flight), `seen` can gain "turned" and the opener re-renders to the standard one, which is then also true of what was shown; not a factual problem.
- Browser: `company/reviews/left-or-right/v3-opener-probe.mjs` run unchanged against a running next-server on port 38422 whose source worktree has a Demo.tsx and card.ts byte-identical to this base and whose static chunks contain "its hand stayed right". mirror-then-turn: branch, seen "Trefoil: mirror +3"; turn-then-mirror and mirror-turn-x2: standard, seen "Trefoil: turned over −3 · mirror +3"; ok on all three at 390x844 and 360x740 (`fc-2026-10-17-c5/opener-probe-390x844.log`, `fc-2026-10-17-c5/opener-probe-360x740.log`).

## Off-lane / non-blocking
- c5's source field still ends "Builder-written; unverified." Builder may trim; not a factual issue.
- src/kit/knots/index.d.ts line 36 still states the sign rule reversed ("right to left"); doc only, `signs()` is right (already reported in the v2 record).
