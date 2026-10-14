# EDD-006: Multi-card sequence (`<CardSequence>` / `<SubCard>` in the explore stage)

author: design-engineer (Tomoko) · reviewers: principal-engineer + interaction-designer (affected role) + accessibility-reviewer (stepper semantics) · tier: 2 · status: implemented on branch `design/multi-card-sequence`, awaiting principal-engineer review · date: 2026-10-14

Spec source: `company/design/formats.md` row "Multi-card sequence" (🔴 needs kit support: "a stepper inside
explore; no contract change if predict/reveal stay single"), `company/design/concepts/multi-card-sequence.md`,
`company/product/demo-standard.md`, decision `company/decisions/2026-10-14-reveal-fits-with-its-picture.md`.
Requested for the Book Summaries category (2-4 sub-cards, one idea from a book each, each with its own
picture); also proofs in steps and recipes with stages.

**Lesson.tsx verdict: no change needed.** The sequence is a stage component: it lives entirely inside the
`children` render prop, uses only `phase`, `locked` and `interact` from `StageContext`, and earns the reveal
through the existing `minInteractions` count. Predict and reveal stay single. No test id, no QA contract line
and no `Lesson` prop changes.

## Problem and why now

Some ideas need 2 to 4 separate pictures in order (a book's three ideas, a proof's steps, a recipe's stages).
Today a builder would hand-build a stepper per lesson, and the obvious hand-built stepper (tabs or dots on
top, a shared Back / Next bar below) **fails the QA contract**: the contract presses the first 16 enabled,
visible stage controls once each in DOM order, so a dot for the current step is a "control that changed
nothing", and a shared Next bar after all the cards is pressed once, so cards 3 and 4 are never reached.
Book Summaries is about to brief lessons in this format, so the kit needs one component whose DOM order
*is* a QA path that reaches every sub-card.

## Goals / non-goals

Goals
- One API, two components: `<CardSequence>` with 2-4 `<SubCard>` children, inside the explore stage.
- Milestones declared per sub-card; the lesson's `minInteractions` is their sum.
- Step and swipe navigation where pressing each control once in DOM order reaches every sub-card and every
  milestone; every control at least 44 px tall (contract floor 24 px).
- The reveal can quote several sub-cards, and what it quotes is on the stage when the reveal opens.
- Phone fit at 390x844 under the reveal-fit decision; reduced motion; keyboard; screen reader.

Non-goals
- Any change to `src/kit/Lesson.tsx`, `tests/qa/**` or the lesson contract.
- A multi-step *predict* or *reveal* (that would be a contract change; route to the evaluation steward).
- Book Summaries content (category manager), the feed's own swipe (platform engineer), the final visual look
  of the trail (visual designer).

## Current state (with measurements)

- No kit stepper. `rg -l "CardSequence|SubCard" src/demos` before this change: 0 lessons. The HQ Design
  inspector detected the format only by `meta.format` (0 lessons).
- QA contract (read 2026-10-14): controls = `[data-testid=stage] [data-qa=control]`, indices 0..min(n,16)-1,
  re-queried each step; skipped if not visible or disabled; each pressed must change the stage fingerprint
  (innerText, input values, svg attributes, element count); tap targets measured only where
  `offsetParent !== null`.
- Kit `.control` is about 34 px tall; system.md asks 44 px.

## Options considered

| Option | Cost | Risk | Reversibility |
|---|---|---|---|
| Do nothing (hand-built per lesson) | about 1 day per lesson, every lesson a one-off | high: the natural layouts fail QA (dead current dot, unreachable cards) | n/a |
| A. Dots / tabs on top + shared Back / Next bar after the cards | small | **fails QA**: the active dot changes nothing; one Next press reaches card 2 only | easy |
| B. Multi-step explore inside `Lesson.tsx` (a `steps` prop) | moderate | protected path, needs an amendment; changes the contract for every lesson | hard |
| C. **Stage component: a trail of steps first (all disabled when QA reaches them), then each sub-card with its own controls followed by its own Next** | about 230 lines + CSS module | swipe vs vertical feed; trail space on a phone (measured below) | easy: a lesson that does not import it is unchanged |

**Chosen: C.**

## Proposal

### API (`src/kit/sequence.tsx`)

```tsx
import { CardSequence, SubCard, useSubCard } from "@/kit/sequence";

<Lesson minInteractions={4} …>               {/* = sum of all sub-cards' milestones */}
  {({ phase, locked, interact }) => (
    <CardSequence label="Euclid's proof in three steps" phase={phase} locked={locked} interact={interact}
                  revealCard="divide" /* optional; default: the last sub-card */>
      <SubCard id="multiply" title="Multiply" milestones={["all-six"]} trace={`${k} primes`}>
        {({ reach, reached, active, locked, phase, index, count }) => <>{/* picture + controls */}</>}
      </SubCard>
      <SubCard id="add" title="Add 1" milestones={["added"]} trace={`${N}`}>…</SubCard>
      <SubCard id="divide" title="Divide" milestones={["divided", "factored"]} trace="59×509">…</SubCard>
    </CardSequence>
  )}
</Lesson>
```

- `CardSequence` props: `label` (accessible name, not shown), `phase`, `locked`, `interact` (straight from
  `StageContext`), `revealCard?` (sub-card id shown when the reveal opens; default last).
- `SubCard` props: `id` (unique, kebab-case), `title` (one or two words; stage text), `milestones?`,
  `trace?` (string, <= 12 characters, the step's recorded result), `children` (nodes or a render prop
  receiving `SubCardContext`). `useSubCard()` gives the same context to components deeper in the sub-card.
- `SubCard` renders nothing by itself; `CardSequence` reads its props. Use direct children only.
- All sub-cards stay mounted; hidden ones carry the `hidden` attribute (`display: none`), so their state is
  kept and the contract's visibility and tap-target checks skip them.

### Milestones per sub-card

- Each sub-card's `reach(name)` accepts only names in its own `milestones`; they are namespaced
  `<id>:<name>`, counted once, ignored while locked, and each calls the lesson's `interact()` once. Nothing
  else in the sequence calls `interact()`: Next, the trail and swipes never count, so the reveal unlocks only
  when every sub-card's milestones are reached. Set `minInteractions` to the total.
- A sub-card with all milestones reached shows a tick and its `trace` in the trail. A sub-card with no
  milestones counts as done once visited (allowed, but then it earns nothing; prefer at least one).
- The question's own case must be a milestone on some sub-card (demo-standard). Record quoted values when the
  milestone fires if Reset could change them (lesson state, as today).

### DOM order, controls and the QA path

```
stage
  sequence (role=group, aria-roledescription="card sequence", aria-label)
    trail <ol>: step 1 … step n            each a kit Control, >= 44 px
    viewport
      sub-card 1 (section, hidden unless current)   its controls …, then "Next: <title> →"
      sub-card 2                                    its controls …, then "Next: <title> →"
      …
      sub-card n                                    its controls (no Next)
    live region (visually hidden)
```

- **Trail steps** are enabled only when the step is visited and not current. When QA reaches them (indices
  0..n-1, just after the prediction) the current step is step 1 and no other step is visited, so all are
  disabled and skipped. They exist from the first render and are disabled before the prediction.
  They are the way back (tap a visited step), so there is no Back button: a Back placed before Next in DOM
  would send QA backwards; one after Next would need a visual order different from focus order.
- **Next** is the last control of each sub-card but the last. QA presses sub-card k's controls, then its Next,
  which shows sub-card k+1, whose controls are next in DOM order. So pressing each control once walks every
  sub-card in order and reaches every milestone, provided each milestone is reachable by one press per control
  (the usual rule) within the 450 ms wait.
- **Budget:** `n` trail steps + every sub-card's controls + `(n - 1)` Next buttons <= 16 (the contract presses
  only the first 16). For 4 sub-cards that leaves 9 controls in total; for 3, 11. A dev-only console warning
  fires above 16 and outside 2-4 sub-cards.
- Sizes: trail steps and Next have `min-height: 44px`; lesson controls should add their own 44 px class as
  today (`formats.md`, tap targets).

### Swipe and step

- Step: Next buttons (forward) and visited trail steps (any direction).
- Swipe: on the sub-card viewport, touch and pen only (`pointerType !== "mouse"`), horizontal travel >= 48 px
  and > 1.5x the vertical travel; left = next, right = previous **visited** step. A gesture that starts on a
  control or input (`button, input, a, [data-qa=control], [data-no-swipe]`) is ignored, so sliders and drags
  inside a picture never change cards. The viewport sets `touch-action: pan-y`, so vertical swipes still
  scroll the card and move the vertical feed. Swipe is an accelerator only: every state is reachable without
  it, and QA does not use it.
- Disabled while locked (predict).

### How the reveal quotes several sub-cards

The reveal is a render function of `{ prediction, correct }`, so quoted values come from the lesson's own
state (held in the Demo component), as in every lesson today. The kit adds one rule and one place to show them:

1. **What the reveal may quote:** (a) the `trace` of any sub-card, and (b) anything in the picture of the
   `revealCard` sub-card. Nothing else from a hidden sub-card.
2. **The trail is the stage trace.** A completed step shows its `trace` (tick + value) in the trail, which is
   always on screen, so a value quoted from sub-card 1 is visible while sub-card 3 is showing. This meets
   demo-standard "the quoted state is still visible on the stage (a trace, a row or a readout)".
3. **At the reveal the sequence shows `revealCard`** (default: the last sub-card, which is also where the QA
   path ends). It is set in a layout effect in the same commit that renders the reveal, so it is decided
   before the reveal's first paint and the stage does not jump afterwards. The learner can still tap visited
   steps after the reveal opens.
4. Pre-flight question 4 for this format: for each value the reveal names, name the sub-card and whether it is
   that sub-card's `trace` or in the reveal card's picture.

Example (`math/euclid-three-steps`): the reveal quotes the list (trace 1 "6 primes", and in the reveal card's
rows ÷ 2 … ÷ 13), product + 1 (trace 2 "30031", and the reveal card's last line) and its factors (trace 3
"59×509", and the reveal card's last line).

### Phone fit (decision 2026-10-14-reveal-fits-with-its-picture)

- Only one sub-card is displayed, so at the reveal the stage is: trail (44 px + 8 px gap) + one sub-card
  (picture, caption, its control rows; the last card has no Next row). Budget the reveal card like a single
  card with one extra 52 px row: keep the reveal <= 90 words and the reveal card to one control row.
- Hidden sub-cards have zero height, so `useRevealFit`'s picture shrink (it measures svgs >= 60 px tall) only
  ever considers the reveal card's picture, and its W-287 text floors apply as usual.
- `<Row foldAtReveal>` (EDD-005) works inside a sub-card unchanged; the trail must never fold (it holds the
  traces the reveal quotes), so it is not a `Row`.
- `tools/reveal-fit.mjs` `named` checks quoted labels for visibility; labels inside hidden sub-cards count as
  hidden, which is the right failure: quote them through `trace` instead.
- Measured on the reference lesson: see "Measurements" below.

### Reduced motion, keyboard and screen reader

- Motion: a newly shown sub-card slides 16 px and fades in over 180 ms (direction from the move). Under
  `prefers-reduced-motion: reduce` there is no animation (module rule, on top of the global rule). No motion
  carries meaning; QA's 450 ms wait covers it.
- Keyboard: everything is a native `<button>`; Tab order is trail, then the current sub-card's controls, then
  its Next. Hidden sub-cards are `display: none`, so they are out of the Tab order. After Next or a trail step,
  focus moves to the newly shown sub-card (`tabIndex=-1`, `preventScroll`), because the button that had focus
  is now hidden; focus would otherwise fall to `<body>`. No arrow-key shortcuts (they would fight sliders).
- Screen reader: the sequence is a `group` with `aria-roledescription="card sequence"` and the `label`; each
  sub-card is a `group` with `aria-roledescription="step"` and the name "Step k of n: <title>", which is read
  when focus lands on it. Trail steps read "Step k <title>, done: <trace>" and the current one has
  `aria-current="step"`; each has `aria-controls` naming its sub-card. A polite live region announces
  "Step k of n: <title>" only after a swipe (focus does not move on a swipe); button moves are announced by
  the focus change, so nothing is read twice.

## Measurements that will show it worked (committed before implementation)

- Contract QA on the reference lesson, phone and desktop: target 2/2 pass. Command:
  `QA_PORT=3570 QA_ONLY=euclid-three-steps npx playwright test` against `next start -p 3570` on
  `NEXT_DIST_DIR=.next-cards`.
- QA path reaches every sub-card: target, in the phone `2-explore` screenshot the last sub-card shows and all
  three trail steps carry a tick (all 4 milestones reached).
- No regression: contract QA on 10 random lessons, phone and desktop, target 20/20 (the kit change touches
  no existing lesson; `src/lib/hq-design.ts` is read-side only).
- Phone fit: `node tools/reveal-fit.mjs --url http://localhost:3570 euclid-three-steps --strict`: target
  `phoneFit` true (crop 0, hiddenBelow <= 2, namedHidden 0).
- would_be_wrong_if: a builder's sub-card needs two presses of one control to reach its milestone (then the
  "press once" path does not cover sub-cards any better than single cards, and the format needs a contract
  amendment for a step-through); or learners in the first Book Summaries reviews do not find the way back
  (the trail), in which case add a Back after Next and accept the focus-order cost, or ask the steward for a
  contract change.

### Results (2026-10-14, build `.next-cards` from this branch, `next start -p 3570`; machine load average 23 to 38 from other agents)

- Contract QA, `euclid-three-steps`: **2/2 pass** (phone 39.7 s, desktop 38.2 s; a first phone run timed out at 45 s after spending 36 s on the cold page load, before the first control). Phone `2-explore`: sub-card 3 showing, all three trail steps ticked with traces "6 primes", "30031", "59×509".
- Contract QA, 10 random lessons (shuf seeded 20261014: lh-standby-days-add-up, true-text-false-claims, scoops-in-three-cups, call-stack-depth, lh-align-price-units, momentum-sweet-spot, weight-spread-on-table, which-answer-wins, london-december-noon-sun, few-shortcuts-shrink-the-world), phone + desktop: **20/20**. 17 passed on the first run (3 workers); 3 phone runs timed out under load and passed when re-run with 1 worker (25 to 30 s). None of them import the new code.
- `node tools/reveal-fit.mjs --url http://localhost:3570 euclid-three-steps --strict`: **phoneFit true**, verdict fit, crop 0 px, hiddenBelow 0, namedHidden 0, reveal 63 words / 8 lines, stage 314 px (picture 242, controls 44), window 618 px.
- Behaviour probe (scratch script, not committed): after the prediction the trail is `disabled* disabled disabled`; after Next, sub-card 2 shows and focus is on "Step 2 of 3: Add 1", and Tab goes to its "Add 1"; trail step 1 goes back with state kept; touch swipe left goes to the next card, swipe right to the previous visited card, a 30 px swipe is ignored; the live region says "Step 2 of 3: Add 1" after a swipe; `animation-name` is `none` under reduced motion and `seqInFwd` otherwise; every visible stage control is 44 px tall (trail steps 110x44, chips 51 to 70 x 44, Next 120x44); no page or console errors.
- `npx tsc --noEmit` and `npm run check` pass; `next build` passes.

## Rollout and rollback

- Ships in `src/kit/sequence.tsx` + `src/kit/sequence.module.css`; HQ Design inspector detects
  `<CardSequence>`; concept file `company/design/concepts/multi-card-sequence.md` points here. One draft
  reference lesson, `src/demos/math/euclid-three-steps` (under math because the books domain did not exist on
  2026-10-14; move or copy it once it does).
- Builders may use it after: principal-engineer review of this EDD; design review of the reference
  (interaction designer, since the design lead wrote the format spec); accessibility review of the stepper;
  design lead flips the formats.md row to 🟡/✅.
- Rollback: delete the two kit files and the draft lesson; no other lesson depends on them.

## Open questions and objections

1. **Duplicate concept.** The reference teaches `math:infinitude-of-primes`, which `product-plus-one` already
   covers (published). It is a format reference, in draft; cm-math decides whether it ships, merges or stays a
   reference. Its claims are all `unverified`.
2. **No Back button.** The way back is the trail (visited steps) or a right swipe. Chosen for the QA path and
   for matching visual and focus order. Interaction designer to confirm in design review.
3. **Feed swipe conflict.** The feed is vertical; the sequence takes horizontal swipes only and leaves
   `pan-y` to the browser. Not tested on a real phone; platform engineer to confirm on the feed.
4. **Contract coverage gap.** The contract never presses a trail step (they are disabled when it reaches them)
   or swipes, so "going back works" is checked only by this EDD's manual test, not by CI. Like EDD-005, closing
   the gap in the contract is the evaluation steward's call.
5. **Trail text on 390 px with 4 steps.** About 78 px per step; titles must be one or two short words and
   traces <= 12 characters, or they wrap to a third line and the step grows past 44 px. The kit allows wrap
   (never clips); the brief should keep titles short.
