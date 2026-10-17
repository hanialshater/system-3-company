# Fact-check: left-or-right v3, claims c3 and c6 (lane left-or-right only)

fact-checker · 2026-10-17 · base main 8a67fe3e (lesson v3, draft) · lane: left-or-right only
Independence: I did not write c3 or c6, and I did not draft either reveal opener (the branch wording is cm-math-discrete's, `company/domains/briefs/rulings/2026-10-17-left-or-right-opener.md`). I read the lesson code and the claims before the build notes.

## Scope
- c3 and c6 were reset by demo-builder (W-1619, v3) because they now quote the new reveal branch opener
  "Turning the mirrored trefoil over left every mark plus: turning over is a way of moving it, so its hand stayed right."
  (shown when `seen.turned === undefined`, i.e. the learner mirrored and then turned over without ever resting on plain turned).
- Open question from build.md "v3 round": must c5 carry "its hand stayed right"?
- Changed since the v2 check (729022c6): Demo.tsx (Reveal takes `seen`, the branch), styles.module.css (D3 margin), meta.json c3/c6. Kit unchanged.

## Verdicts
| Claim | Verdict |
|---|---|
| c3 | **verified** |
| c6 | **verified** |
| c5 | not re-checked for status (stays verified); **ruling: yes, c5 must carry the quote "its hand stayed right"**. Text untouched by me. |

## c3: signs of the trefoil states
Own computation, two ways, no kit code imported (`fc-2026-10-17-v3/own.py`, output `own.out`):
- A. Kit 3_1 PD `[[1,4,2,5],[3,6,4,1],[5,2,6,3]]` (data only). Own sign rule from PMC2853108 Fig. 2E (turn the over-arrow o onto the under-arrow u; positive iff o_x u_y - o_y u_x > 0), own mirror (switch every crossing), own turn-over (planar reflection then switch every crossing).
  front -,-,- (-3); turned -,-,- (-3); mirror +,+,+ (+3); mirrored then turned +,+,+ (+3).
- B. Kit-free 3D torus trefoil, rotated 180 degrees about an in-page axis (turn over) and/or reflected in the page (mirror), projected, crossings found and signed numerically: the same four lists.
- Comparison only: kit `signs()` gives the same on pd, turnOver(pd), mirror(pd), turnOver(mirror(pd)); the stage readout on the mirrored-turned rest state is `signs(turnOver(mirror(pd)))` (`card.ts` logicalPd), so the learner on the branch path saw Sum +3, Right-handed, before and after the turn.
- The branch quote "Turning the mirrored trefoil over left every mark plus" is true, and true of what that learner saw. The standard quotes and readout strings are unchanged from v2.

## c6: turning over is a move
- Own argument: turning over is the rotation by 180 degrees about an axis in the page; rotations by s in [0, 180] are a continuous family of rigid motions, so the knot is carried without the strand passing through itself. A reflection reverses the orientation of space and lies in no such family. Own B above shows it on a concrete trefoil: rotation keeps every sign, reflection flips every sign.
- Branch sentence: mirrored trefoil +3, turned over still +3; `hand(+3)` is "Right-handed" (Demo.tsx), so "its hand stayed right" holds.
- Opened PMC5582600 (PMC OAI full text, fetched today): sec. 2.4 "knot projections can be deformed as much as desired (without the strand passing through itself) and knots are only topologically chiral if they cannot be deformed continuously to superimpose with their mirror image"; glossary "Chiral knot A knot that cannot be continuously deformed into its mirror image"; sec. 2.1 "Positive crossings describe a right-handed helix, negative crossings a left-handed helix". PMC8199745 not re-opened (quoted in the v2 record, unchanged).
- Recall answer index 0 "A right-handed trefoil" and "turning one over never swaps them" unchanged.

## Rendered text on each path
- `fc-2026-10-17-v3/render.cjs` (output `render.out`): slices `fmt`, `seenText` and `Reveal` from the committed Demo.tsx, transpiles them unchanged (TypeScript), renders with react-dom/server. The seen state for each press sequence comes from my own reading of `settle()`/`record()`: `turned` fires on any trefoil turned rest; the "turned over" segment is recorded only on plain turned; the first value of each segment is kept; chip changes reset to front.
- Every Turn over / Mirror sequence of up to 6 presses that unlocks the reveal: 114 sequences; branch opener in 15, each with seen line "Trefoil: mirror +3"; standard opener in the other 99, each with seen turned -3; 0 mismatches against the rule "branch iff the learner never rested on plain turned".
- The ruling's three paths: Mirror, Turn over -> branch (seen "Trefoil: mirror +3"); Turn over, Mirror -> standard; Mirror, Turn over, Mirror, Turn over -> standard (seen "Trefoil: turned over −3 · mirror +3"). With eightMirror the branch is followed by the figure-eight branch, unchanged.
- **Not run in a browser by me.** The two running servers (ports 3818, 34418, other worktrees' `.next-qa1611` / `.next-qa17`) serve builds without the branch text (grep of their static chunks), and the two-server cap barred starting a third. The builder's Chromium run of `v3-opener-probe.mjs` (build.md "v3 round") reports the same three openers; no log file of that run is committed. A qa-tester v3 record is owed anyway (build.md Open) and can carry the browser confirmation.

## Ruling on the open question: c5 must carry "its hand stayed right"
Yes. Reasons:
1. The branch names a hand in reveal text. Naming +3 "right" is c5's convention (sum above 0 = right-handed), not c6's: c6's sources (chirality, deformation) do not establish which sign is called right. c5 already quotes the parallel "its hand stayed left" for that reason.
2. Without the quote, a later edit to the branch's hand word would reset c6 but not the claim that owns the convention.
3. The claim owner's ruling (item 1) asked for it; the build departed from it.
The substance is true by my check (`hand(+3)` "Right-handed"; PMC5582600 positive crossings right-handed; own signs +3), but per my brief I left c5's text untouched. **Next:** demo-builder adds 'its hand stayed right' to c5's quoted reveal text and resets c5 to unverified; a fact-checker other than this run re-verifies it. This does not block c3 or c6.

## Non-blocking
- c3 quotes the seen line "Trefoil: turned over −3 · mirror +3"; on the branch path the learner sees "Trefoil: mirror +3", a sub-string. Builder may add it to c3's quotes at the c5 edit if they like (it would reset c3).

## Files
- `company/reviews/left-or-right/fc-2026-10-17-v3/own.py`, `own.out` (signs), `render.cjs`, `render.out` (rendered openers), `set_status.py` (textual meta.json edit; asserts only c3/c6 status, checkedBy, checkedOn, note change).
- meta.json: claims array only, c3 and c6.
