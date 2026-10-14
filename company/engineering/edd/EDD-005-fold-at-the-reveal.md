# EDD-005: Fold at the reveal (per-row opt-in control fold)

author: platform-engineer (Noor) · reviewers: principal-engineer + interaction-designer (W-351) + accessibility-reviewer (W-336) · tier: 2 · status: implemented (review pending) · date: 2026-10-14

Board: W-332 (EDD + build), W-348 (constraints from the W-335 design review), W-349 (net-saving rule; the
re-sweep side stays in W-333). Spec: `company/decisions/2026-10-14-reveal-fits-with-its-picture.md`,
"Amendment, W-330", items 1 to 8. Design note: `company/design/system.md`, "Fold at the reveal".

## Problem and why now

At the reveal on a phone (390x844), stage + reveal is taller than the card body in about a third of
lessons, so the fit (`useRevealFit` in `src/components/DemoCard.tsx`) scrolls the stage top off the card.
After W-287 the fit no longer shrinks labelled pictures below 10 px, so more lessons crop (W-264 sweep:
217 of 624 on build 5; W-287 probe: lessons that fully fit 398 -> 176). Control rows are the tallest
stage block in 56% of the cropping lessons. The design lead decided (a2): a lesson may opt individual
`Row`s in to folding, and the kit folds them behind one toggle when, and only when, that pays.

## Goals / non-goals

Goals
- One prop per `Row`, nothing else for the builder. A lesson that does not opt in renders byte-identical DOM.
- The fold is decided once, in the layout pass that first shows the reveal, before it paints; it runs
  before the W-287 picture fit.
- Fold only if it saves at least the toggle's own height after paying for the toggle.
- Focus and scroll rules of spec item 5; `display: none` only (item 6); reset on leaving the reveal (item 7).
- No change to `src/kit/Lesson.tsx` or `tests/qa/**` (item 8).

Non-goals
- Opting any lesson in (builders, after head-of-product adds the fold to demo-standard's fix order, W-337).
- The toggle's final look (visual-designer, W-350). This build ships a placeholder that already uses kit
  Control styling, a chevron, full width and 44 px.
- reveal-fit fold simulation, expand check and re-sweep (W-333; W-349's simulation rule is written below
  so the tool and the kit charge the same cost).
- A QA-contract amendment (evaluation-steward, W-334).

## Current state (with measurements)

- `Row` (`src/kit/controls.tsx`) is a bare `<div class="row">` (flex, wrap, gap 8, margin-top 8).
- `useRevealFit` watches `data-phase` on `[data-testid="lesson"]` with a MutationObserver (Lesson.tsx is
  protected, so the card watches from outside), then on `requestAnimationFrame` and again at 400 ms runs
  `scaleStage` (W-287 picture shrink with legibility floors) and scrolls the reveal into view. Re-fits also
  run from a ResizeObserver on body, stage and reveal.
- At the reveal `.stage` is `flex: none` (content-sized), so stage height is a direct measure of what a
  fold frees. `.card-body` is the scroller.
- Sweep numbers are build 5 (pre-W-287) and are an upper bound for the fold (W-335 worked examples:
  gradient-descent folds nothing, midnight-sun-line one row, roughly the toggle's own height).

## Options considered

| Option | Cost | Risk | Reversibility |
|---|---|---|---|
| Do nothing (W-326 per-lesson compaction only) | 120 to 174 hand redesigns | none to the kit | n/a |
| A. Imperative fold in DemoCard: set `hidden` on opted rows and insert a DOM button | small | a DOM node React does not own inside a React tree (reconciliation can drop or misplace it); toggle state outside React | easy |
| B. Kit store + context: `Row` reads fold state from a per-card store; DemoCard measures and writes the store with `flushSync` inside the MutationObserver callback, so React renders the fold before paint | moderate (about 150 lines) | flushSync from a microtask; one context read per opted row only | easy: remove the prop handling, rows render as before |
| C. Fold inside `Lesson.tsx` (phase-aware) | small | protected path: needs an amendment | hard |

**Chosen: B.** It keeps every node React-owned, needs no protected path, and costs nothing for rows that
do not opt in (they never call a hook).

## Proposal

### 1. API (opt-in)

```tsx
<Row foldAtReveal>…</Row>
```

- `foldAtReveal?: boolean` on the kit `Row`. Name per spec item 1's example; it says when, not just whether.
- Without the prop, `Row` renders exactly today's `<div class="row">`. With it, it renders the same div
  plus `id` and `data-fold-row` (and, when folded, `hidden` + inline `display: none`, because `.row`'s
  `display: flex` would otherwise beat the `hidden` attribute).
- Outside a `FoldScope` (any host other than `DemoCard`), an opted row never folds.
- The builder still owns the evidence test, spec item 1 (b) and (c). The kit enforces (a) and the
  structural rules: a row containing `[data-qa="readout"]`, a row inside an `svg`, and a row nested in
  another opted row never fold. A refused row carries `data-fold-refused="readout|picture|nested"` so
  reveal-fit (W-333) can report it. Other opted rows of the lesson still fold together.

### 2. Where the decision runs: once, before first paint, before the picture fit

Order of events when the learner taps "Show me why":
1. React commits `data-phase="reveal"` and the reveal DOM (one commit).
2. The card's MutationObserver callback runs as a microtask after that commit, before the browser paints.
   In it, `decideFold()` runs synchronously:
   - `over = body.scrollHeight - body.clientHeight`; if `over <= 1`, nothing folds (spec item 2).
   - Eligible rows = `[data-fold-row]` in the stage, minus refused ones. None: stop.
   - Label: "Show more controls" if any stage `[data-qa="control"]` outside the eligible rows is rendered
     (`getClientRects().length > 0`), else "Show controls" (item 4). Decided here, once.
   - Measure `stage.getBoundingClientRect().height`, then `flushSync` the store to folded (React hides the
     rows and renders the toggle before the first eligible row in DOM order), and measure again.
   - Net-saving rule (item 2, W-349): `saved = before - after` already pays for the toggle (it is in
     `after`). Keep the fold only if `saved >= max(44, toggle border-box height)` (the toggle's margin is charged inside `saved`, not added to the bar, as item 2 and W-348 word it); otherwise `flushSync` back to
     unfolded. Both renders happen before paint, so the learner never sees either.
   - Focus: if `document.activeElement` was inside a folded row, focus the toggle (`preventScroll`). If
     focus already fell to `<body>` (a lesson that disables its controls in the reveal commit), the card's
     last `focusin` target inside the body stands in for it (found in testing on natural-selection).
3. Then, as today, `requestAnimationFrame(bringIntoView)` runs the W-287 picture shrink on the folded
   layout, then scrolls. So the fold is the first step of the fit, and pictures shrink less.
4. Re-fits (400 ms timer, ResizeObserver, rotation, content growth) call only `bringIntoView`. They never
   call `decideFold`, so they never fold or unfold (item 3).

Why the measurement is stage height, not `scrollHeight`: `scrollHeight` is clamped at the body's
height, so it under-counts a fold that frees more than the overflow. The stage is content-sized at the
reveal, and only stage children fold.

### 3. The toggle

One `<button type="button" class="control fold-toggle" data-qa="control" data-fold-toggle>` rendered by
the first folded row, immediately before it. `aria-expanded`, `aria-controls` = ids of all folded rows.
Labels: "Show more controls" / "Show controls"; expanded: "Hide controls". Chevron span `aria-hidden`,
rotates on expand. CSS: full stage width (`width: 100%`, `box-sizing: border-box`, so it cannot widen the
stage), `min-height: 44px`. Look is a placeholder for W-350.

### 4. Focus and scroll (item 5, W-348)

- Fold: focus inside a folding row moves to the toggle. Tab order follows DOM order, so the toggle sits
  between the controls before and after it.
- Expand: the handler records the toggle's `top`, `flushSync`s the store to expanded, then corrects the
  nearest scroll container by the toggle's movement, so the toggle keeps its on-screen position, rows open
  below it and the reveal moves down. `overflow-anchor: none` on a card body that holds a toggle stops
  browser scroll anchoring from moving the card against that. Focus stays on the toggle (explicit
  `focus({preventScroll: true})`, since Safari does not focus buttons on click).
- Hide: same position rule; focus inside a now-hidden row returns to the toggle.
- Any press marks the store `touched`: the fit stops re-running and scrolling until the reveal phase ends
  (item 6, "expanding counts as learner intent").
- No live announcement on the automatic fold (item 5); W-336 confirms.

### 5. Reset (item 7)

When `data-phase` leaves `reveal`, or the card unmounts, the store resets: rows unhide, toggle removed.

### 6. QA-contract implications (tests/qa is protected; no change made)

- Steps 2 and 3 run before the reveal; no row folds and no toggle exists then, so every control is still
  pressed once. Step 4 unchanged.
- Step 5 runs after the reveal: hidden rows are `display: none`, so `offsetParent === null` skips their
  controls; the toggle is >= 44 px and full width with border-box, so the tap-target and horizontal
  overflow checks pass. `display: none` is the only hiding used (decision item 6, allowed).
- The contract never presses the toggle (W-334, evaluation steward's call). Until then reveal-fit's expand
  check (W-333) and this EDD's manual test carry it.
- Desktop (1280x800) rarely overflows; when it does not, nothing folds.

## Measurements that will show it worked (committed before implementation)

- Opt-in-free regression: contract QA (phone + desktop) on 20 random lessons on build `.next-pf3`:
  target 40/40, as on the W-287 build. Command: `QA_BASE_URL=http://localhost:3540 QA_ONLY=<20> npx playwright test tests/qa/contract.spec.ts`.
- Test lesson opted in locally (not committed): at 390x844 the toggle is present, rows are `display: none`,
  stage-top crop goes down by at least 44 px vs. unfolded, contract QA passes phone + desktop; pressing the
  toggle restores the rows in order at >= 24 px, the toggle's top moves by <= 1 px, focus stays on it.
- Net-saving rule: a lesson whose opted rows save < 44 px does not fold (checked by forcing a single
  small row on the test lesson).
- would_be_wrong_if: rows visibly vanish after the reveal paints (fold not before paint); a re-fit (400 ms
  or resize) changes the fold state; the contract fails on any non-opted lesson; expanding scrolls the card.

Results (2026-10-14, build `.next-pf3` at :3540, natural-selection opted in locally on its slider row and
button row, Readout moved to its own plain row; not committed):
- Fold: crop 360 -> 309 px at 390x844 (the two rows net 51 px after the toggle); toggle present at the first
  animation frame after the tap; label "Show more controls" (edge controls stay); 44x320 px in a 340 px stage;
  no horizontal overflow; focus moved to the toggle from the slider.
- Expand: toggle moved 0 px, card scrollTop unchanged, focus on the toggle, rows back in DOM order, smallest
  restored control 28 px. Hide: rows `display: none` again, focus on the toggle.
- Net-saving rule: slider row alone (nets about 2 px) does not fold; a row holding a Readout is refused
  (`data-fold-refused="readout"`) and does not fold.
- First build used `toggle + margin` (52 px) as the bar and refused this 51 px fold; corrected to the
  spec's bar (the toggle's own height). The focus fallback was added after the same test.
- Contract QA phone + desktop, 20 random lessons + natural-selection: 42/42. On Pixel 7 (contract phone)
  natural-selection fits, so nothing folded there: the contract did not exercise the folded state (W-334).

## Rollout and rollback

- Ships dark: no lesson opts in. Builders opt in only after the interaction-designer (W-351) and
  accessibility (W-336) reviews of the built toggle, W-333's re-sweep, and demo-standard's fix order (W-337).
- Rollback: revert the commit. Opted rows would then render as plain rows (the prop must be removed from
  lessons too, or `Row` keeps accepting and ignoring it; keep the prop in the type for one release if
  rolling back after builders opt in).

## Open questions and objections

- flushSync from a MutationObserver microtask is outside React's usual entry points. React 19 allows it
  (not during render or effects). If a future React warns, move the decision to a `useLayoutEffect` in a
  kit component that reads the phase from the DOM. Principal engineer to weigh.
- The label decision counts stage controls rendered outside the opted rows, including ones in the
  picture. That matches item 4 ("any other `[data-qa="control"]` on the stage").
- The kit cannot enforce evidence test (b) and (c); that stays a builder check plus reviewer reading.
