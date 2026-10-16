# Build note: tricolour-check (math:knot-tricolouring), v1 draft

builder: demo-builder (run tricolour-w1540) · 2026-10-16 · board W-1540 · kept from evaluators until they report

**Inputs.** Brief: `company/domains/briefs/math.discrete.md`, "Knots, batch 1", brief 2 (as revised W-1569/W-1577). Design note: `company/reviews/tricolour-check/design.md`. Pictures: `company/design/reviews/2026-10-16-knots-batch1-contact-sheet.md` (S1 to S4, T1 to T4, T3a, ticks). Colours: `company/design/reviews/2026-10-16-knots-colour-ruling.md` (W-1580) and the design lead's decision W-1583 in `company/design/reviews/2026-10-16-knots-specs-review.md` (T3-letters).

## What was built
- Files: `src/demos/math/tricolour-check/{Demo.tsx,styles.module.css,meta.json}`; registry files regenerated.
- Chips ○ | 3₁ | 4₁ (3₁ first). Imports only from `@/kit/knots`. `layout` is called once per knot inside one `useMemo`; `draw(pd, { layout: L, gap: 0.5 })`; viewBox `-8 -8 116 116`; no `size`, `margin` or `relax`. ○ is a plain SVG circle (r 40), not kit `draw`.
- T1: each arc is one `<path>`: the arc's edges from `arcs(pd).edges[k]`, chained end to start into one continuous path (all edges chained on both knots; the colour changes only at gaps). S2: stroke 2, `stroke-linecap: butt`.
- T3-letters (W-1583): each arc's label ring is stroked in its colour and shows the colour's letter A/B/C in `var(--fg)` on `var(--bg-3)`; aria-label "Arc k, colour X". Colour sets are one constant, `ARC_SETS` in Demo.tsx (A `#56B4E9`/`#0072B2`, B `#D55E00`/`#C24E00`, C `#F0E442`/`#6B6B6B`, dark/light), passed as custom properties; the theme picks the set in CSS.
- T3a: label positions are computed from the drawing: on the arc, at least 12 units from every crossing centre, clear of other arcs, and at least 20 units from other labels (so the 44 px buttons never overlap down to a 260 px stage). Measured: 3₁ labels 35.8 to 40.0 units from the nearest crossing; 4₁ 17.0 to 36.0. Closest label pair 4₁ arcs 1-2: 69 px at 290, 62 at 260.
- Crossings: a ring of radius 9, never filled (solid `--good` when OK, dashed `--bad` when not), and a tick or cross glyph 15 units out, placed where it is clearest of every stroke (10.0 to 13.2 units clearance), inside the view and out of the text bands. Crossings are not tap targets.
- Arc taps: a 44 px HTML button on each label (QA and keyboard; 4 slots always rendered, unused ones hidden and disabled, so the DOM order of controls is fixed), plus a 12-unit transparent stroke along the whole arc for fingers. Staggered cycle K16: arc k steps by 1 + (k mod 2). The picture never moves on a tap: only stroke colours, letters, rings and glyphs change.
- Stage text is inside the picture's empty bands (fit fix, below): counter "Crossings OK: n of N" (or "No crossings") top right; "Seen on 3₁: 3 colours, 3 of 3 OK" and the census line ("3₁: 9 of 27 obey: 3 one colour, 6 all three", "4₁: 3 of 81 obey: all one colour", "○: 3 of 3 obey: all one colour") along the bottom, at 4.6 units (12.7 px at 320 px).
- Check all: count from the kit's `colourings(pd, 3)`, breakdown by enumerating every assignment with `colouringOk`. It is disabled once its chip's line is shown. Reset clears the colours of the knot on show to A, keeps the seen lines, and is disabled when that knot is all A (so it never presses without changing the picture; an all-chips reset would change nothing visible on 4₁ at the end of the QA path).
- Milestones (minInteractions 3): `trefoil3` (a tap on 3₁ giving three colours with every crossing OK; records {colours, ok, of}); `loopOne` (opening ○, a tap on it, or Check all on it); `eightAll` (Check all on 4₁; records the census).
- Draw time (EDD-004 C4 style, desktop node, not a phone): layout 3₁ 8.9 ms (first call, includes warm-up), 4₁ 1.4 ms; draw 0.2 ms. Once per mount.

## Decisions a reviewer should check (objections travel)
1. **`loopOne` fires on opening ○.** The brief defines it as "a tap or Check all on ○" and lists the QA path "○ (loopOne)". The contract re-queries controls by index; with arcs first in the DOM, a loop tap or Check all on ○ cannot be reached on the QA path, so opening ○ is what fires it (a tap or Check all on the loop also fires it). If cm-math-discrete wants it to need a recolour or Check all on ○, the QA path cannot reach it without changing the brief's DOM order. Owner: cm-math-discrete.
2. **Reveal text is the brief's payoff, not the design note's variant.** The note's "every crossing ticked" and "Check all tried all 81 ways" were dropped for the brief's "every crossing obeying the rule" and "all 81 ways were checked", because at the reveal the control row steps aside (item 3) and no sentence should point at a button. 87 words by reveal-fit.
3. **At the reveal the control row (chips, Check all, Reset) is hidden**, as in `math/enemy-of-my-enemy` v4 (W-574). Arcs stay tappable. Before this, with the counter and seen lines already folded into the picture, crop was 22 px; first build was 66 px. The stage's other fixes in the standard's order: no told context was mine to cut, stage text folded into the picture, one control row only. The design lead or cm may prefer cutting a reveal sentence instead; that is their call.
4. **At the reveal the census line shows 4₁'s line on any chip** (the reveal quotes "81"), so the quoted state is on the stage whichever chip is open. While exploring, it shows the current chip's line, as the brief says.
5. Title and hook are mine (the brief gives none): "A colour test for knots" / "Can three colours tell a knot from a plain loop?". Questions, no claim.
6. The 4₁ tick at crossing 0 sits at x 102.1 (inside the viewBox, 6 units from the edge).

## Stage word count (decision 2026-10-16-stage-word-budget-counting.md)
Busiest frame, 3₁ after `trefoil3` and Check all: counter 3 (Crossings, OK, of) + seen 5 (Seen, on, colours, of, OK) + census 6 (of, obey, one, colour, all, three) + letters 3 + Check all 2 + Reset 1 = **20**. 4₁ after Check all: 3 + 5 + 5 + 4 + 3 = **20**. Under 25. Chip labels ○, 3₁, 4₁ count 0.

## Pre-flight v1
1. **Title and hook.** "A colour test for knots" / "Can three colours tell a knot from a plain loop?" Neither says whether the trefoil takes three colours: no.
2. **Options.** "Yes" / "No" / "Only with two colours": none numbered, same precision. Yes.
3. **Locked stage.** 3₁ all in colour A (three A labels), three solid rings with ticks, "Crossings OK: 3 of 3", chips and buttons. All-one-colour obeys the rule, which fits every option; nothing shows a second or third colour: no.
4. **Reveal values.** "all three colours" and "every crossing obeying the rule": (b) `trefoil3` record. "81" and "three one-colour ones": (b) `eightAll` census record. "A plain loop has one arc": the ○ picture, (b) `loopOne` on the required path. Nothing hard-coded except the fallback words used before a record exists, which the gate prevents.
5. **QA path.** In DOM order: arc 1 → (B,A,A); arc 2 → (B,C,A), 3 of 3 OK = `trefoil3`; arc 3 → (B,C,B); hidden slot 4 skipped; ○ = `loopOne`; 3₁; 4₁; Check all = `eightAll`; Reset disabled on 4₁ (all A), so the contract skips it. All 3 milestones fire; the contract passed on phone and desktop (reveal unlocked). At the reveal the seen line and the 4₁ census line are in the picture.
6. **Reset.** 4₁ coloured by hand, Check all, Reset pressed last on 4₁, then the reveal (builder run, dark and light): "A plain loop has one arc, so it can only ever be one colour. The trefoil took all three colours with every crossing obeying the rule. Wiggling a knot, without cutting, never changes whether it can be coloured this way, so the trefoil can never be wiggled into a plain loop. The figure-eight (4₁) failed, and all 81 ways were checked: only the three one-colour ones obey the rule. That does not make it a plain loop: this test cannot tell the two apart." Seen lines survive Reset: every sentence still matches.
7. **Phone fit.** `node tools/reveal-fit.mjs --width 390 --height 844`: verdict fit, crop 0 px, hiddenBelow 0, namedHidden 0, phoneFit true, 87 words, picture 320 px at scale 1 (tool commit bc747077, clean). Screenshot viewed (artifacts/reveal-fit/tricolour-check.png, not committed).

## QA (local, builder; not a QA record)
- `tests/qa/contract.spec.ts`, QA_ONLY=tricolour-check, own NEXT_DIST_DIR/QA_PORT/QA_OUT: 2 passed (phone, desktop), on the final build.
- Phone screenshots viewed: QA predict, explore, reveal; plus builder shots at 390x844 in light and dark of trefoil3, 3₁ census, a failing 3₁, ○ after Check all, a failing 4₁, Reset on 4₁, reveal. No overlap of text with strokes, labels or glyphs; letters and colours read in both themes; light C (grey) is named by its letter.
- `npm run check` passed; `npm run typecheck` passed.

## Owed (not mine)
- Fact-check of c1 to c8, all unverified (fact-checker). c5 is the proof: if it is held, the brief says cut the sentence and tell cm-math-discrete the lesson has lost its proof.
- Design review of the walkthrough against S1 to S4, T3-letters and the reveal-time row hide (design-lead, S4).
- QA record (qa-tester), simulated learner walk (learner roles).
