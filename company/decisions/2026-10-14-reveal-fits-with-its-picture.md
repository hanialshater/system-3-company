# Decision: on a phone, the reveal fits with its picture (budget plus per-lesson fixes; no inner scroll, no hidden controls)

owner: design-lead
date: 2026-10-14
status: decided; craft rule adopted with changes by head-of-product (W-263, 2026-10-14); amended 2026-10-14 by design-lead (W-330): option (a) comes back in a restricted form, "fold at the reveal" (see the section of that name); spec revised with the interaction designer's five W-335 changes (W-347). Not built.

## Context
Board W-259. At 390×844, once the reveal opens, the card body scrolls so the reveal's last line is on
screen (W-135, `useRevealFit` in `src/components/DemoCard.tsx`). When stage + reveal is taller than the
card body, that scroll pushes the top of the stage, usually the picture, above the card. Commit 1a879c6
now shrinks control-free stage pictures to as little as 40% of their natural height before it scrolls.
Some lessons are still cropped, by these amounts (from `company/engineering/notes/2026-10-14-reveal-stage-crop.md`):

| lesson | crop left after the fit | what the reveal points at |
|---|---|---|
| every-second-seat-out | 275 px | the circle, the table |
| a-star-heads-for-goal | 200 px | "the line under the table" |
| midnight-sun-line | 99 px | "the orange gap on the globe" (off screen) |
| one-odd-loop-blocks-two-camps | 45 px | the loops |
| bending-frontier | 33 px | "the fields under the chart" |

In a random sample of 29 lessons, 10 are still cropped (median 112 px, max 319 px). A reveal line on a
phone holds about 9 words and is about 23 px tall, so a 112 px crop is about 5 lines, or 40 to 45 words.
The reveals named here run from about 90 to 115 words. Two budgets disagree: `demo-standard.md` allows
120 words and `company/design/system.md` allows 90.

When content is taller than the card, something has to be off screen. The question is what, and who
gets to decide. The rule of this decision: **what the reveal names must be on screen when the reveal
opens.** A reveal that says "look at the globe" while the globe is off screen points at nothing.

## Options considered
- **(a) Collapse or hide stage controls at the reveal (kit level, platform-engineer). Rejected for now.**
  Stage controls are written by each lesson and sit in different places: in rows, in tables, and inside
  svgs (the `[data-qa="control"]` elements that the picture fit already skips). The kit cannot tell
  "a control row it can hide" from "a control that is part of the picture". The reveal often quotes
  control state ("your 41 circle", the active chip), the learner can keep exploring after the reveal,
  and hiding controls would reflow all 638 lessons to fix about a third of them. That is the
  "redesigning working lessons" failure mode. It also does not solve the two worst cases: in
  every-second-seat-out and a-star-heads-for-goal most of the height is the picture, the rule line
  and the table, not the controls.
- **(b) A reveal-length budget (craft rule for builders). Chosen, in a stronger form.** A word count
  alone is not the right budget, because what has to fit is stage + reveal. The budget is a fit
  test: at the reveal, both the stage top and the reveal's last line are on screen. A word target
  goes with it.
- **(c) Let the reveal scroll inside itself (relaxes W-135). Rejected.** An inner scroller with no
  visible scrollbar on mobile is exactly the original W-135 symptom: about 245 of 509 lessons
  showed text ending mid-word at the footer, and one learner review marked it fatal. The principal
  engineer's W-135 review shows the same thing coming back after a rotation. Two nested scrollers
  on a phone card in a vertical swipe feed also compete with the feed swipe. This would undo a
  measured fix to save a measured, smaller defect.
- **(d) Fix each lesson. Chosen, as the way (b) gets applied.** The five lessons named above plus
  whatever the full sweep finds (W-264). Small crops (under about 50 px) need a text trim. Large
  ones (200 px and up) need a compact stage, which is a design change.

## Decision
**(b) + (d).** The kit's scroll order stays as it is (the reveal's last line stays on screen), and
the reveal does not become an inner scroller. Each lesson is made to fit, and a rule stops new
lessons from overflowing.

Proposed craft rule. This is the text for `company/product/demo-standard.md`. I have **not** edited
that file: the Head of Product owns it, and I did not get their agreement in this session. Adopting
it, or refusing it with an objection in this record, is W-263.

> `*` **The reveal fits with its picture.** On a 390×844 phone, when the reveal opens, the top of the stage and the last line of the reveal are both on screen (stage-top crop 0 px in `tools/reveal-fit.mjs`), and anything the reveal names ("look at the globe") is visible. Aim for a reveal of 90 words or fewer when the stage has a table or more than one row of controls. Fix it in this order: cut told context (or move it onto the stage caption), then fold stage text and tables into the picture, then merge control rows. Never fix it by shrinking text or tap targets. (Decision `company/decisions/2026-10-14-reveal-fits-with-its-picture.md`.)

> Pre-flight 7. **Phone fit.** At 390×844, after the reveal opens, is the stage top on screen, and is everything the reveal names visible? (Quote the measured crop in px.)

Until the rule is adopted, the board items below cite this decision directly, so builders still see it.

### Who does what (board)
- **W-263, head-of-product:** adopt or refuse the rule text above in demo-standard.md, and reconcile the 120-word and 90-word budgets.
- **W-264, platform-engineer (after W-242, which makes reveal-fit measure stage-top crop):** a full 390×844 crop sweep, on the feed and on `/d`, published as a list, with one builder item per category.
- **W-265, demo-builder:** bending-frontier (33 px) and one-odd-loop-blocks-two-camps (45 px), each with a trim of about 2 lines.
- **W-266, cm-geography:** midnight-sun-line (99 px, about 40 words over). Which told sentences go (the Tropic of Cancer contrast, the no-air caveat) is a teaching choice, so the category manager makes it, then a builder applies it.
- **W-267, demo-builder (cm-cs for reveal content):** compact stages for every-second-seat-out (275 px) and a-star-heads-for-goal (200 px). After that, a design review by the design lead, then a learner re-review.
- **W-259 is done** (the decision is made). W-242 stays with platform-engineer.

## Amendment, W-330 (2026-10-14, design-lead): fold at the reveal

**Trigger.** The W-264 sweep (`company/engineering/notes/2026-10-14-reveal-crop-sweep.md`, build 5, `/d`
only) meets the revisit trigger: 217 of 624 measured lessons (35%) crop the stage top; control blocks are
the tallest stage block in 121 of them (56%), and hiding control blocks alone would close the crop in 174
(80%). Two things make the case stronger, not weaker, and one makes the 174 an upper bound:
- **W-287 (in progress) raises crops.** The 10 px floor for picture labels (`company/design/system.md`,
  W-289) means the fit stops shrinking most labelled pictures. That section estimates the fit fully resolves
  about 44 shrunk lessons at 10 px against 261 today, so on the order of 200 more lessons may crop after
  W-287. Folding unquoted control rows *before* any picture shrink also means pictures shrink less, so it
  helps legibility as well as the crop.
- **The 174 is an upper bound.** A sweep "controls block" is any non-picture block holding a control,
  including the labels and readouts in it, which a lesson may quote. And the 174 was measured against
  pictures shrunk below the new floor. The real number is known only after a re-sweep on a W-287 build.

**Options weighed.** (a1) kit-wide: collapse every `Row` at the reveal into one "Show controls" toggle.
(a2) per-lesson opt-in, kit-run: the builder marks which `Row`s may fold, and the kit folds them only when
the card overflows. (a3) per-lesson compaction only (merge rows, today's W-326). **Chosen: (a2).** (a1)
repeats the original problem: the kit cannot tell a row the reveal quotes ("your 41 circle", the active
chip, a Seen readout) from one it does not, and it would hide quoted state in an unknown share of
lessons. (a3) alone is about 120 to 174 hand redesigns, with no product-wide look. (a2) keeps the
judgement with the person who knows what the reveal quotes, keeps one look and one mechanism, and costs
one prop per lesson.

**The design (spec for the platform engineer's EDD; also in `company/design/system.md`, "Fold at the reveal").**
*Revised 2026-10-14 by design-lead (W-347) to take in the interaction designer's five W-335 changes (Consulted).
The changes are marked [W-335 n].*
1. **Opt-in per row, on an evidence test [W-335 1].** `Row` (src/kit/controls.tsx) gets a fold opt-in (name is
   the EDD's; e.g. `foldAtReveal`). The test is whether the learner loses evidence, not whether the reveal
   quotes the row. A builder may opt a row in only if all three hold:
   (a) the row holds no `Readout` (the kit enforces this: a Row containing a Readout never folds, even if
   opted in);
   (b) no sentence in **any** reveal branch summarises the row's state or asks the learner to check
   something with it. The builder checks this by reading the Demo.tsx reveal branches. `tools/reveal-fit.mjs`
   `named` only sees the measured path and misses paraphrase, so it is a floor, not the test;
   (c) the row's current state still shows in the picture (what the learner set is visible without the row).
   So a fold hides only the means of changing the state, never the record of it. Rows inside the picture,
   and controls inside svgs, never fold.
2. **Only when needed, and only when it pays [W-335 5].** Folding happens only in the reveal phase, only when
   stage + reveal overflow the card body (`over > 1`), and only if it saves at least the toggle's own
   height: the folded rows' heights, margins included, minus the toggle's height and margin, must be at
   least the toggle's height (44 px). Otherwise nothing folds. It is the first step of the fit: fold
   opted-in rows, then shrink pictures to the W-287 floors, then scroll. A lesson that fits does not
   change. All opted-in rows of a lesson fold together (no partial folds).
3. **Decided once, before the reveal's first paint [W-335 3].** The fold is decided in the same layout pass
   that first shows the reveal, before it paints, so the learner never watches rows vanish. Later re-fits
   (the 400 ms timer, content growth, ResizeObserver, rotation) never fold or unfold. They may only shrink
   pictures and scroll, as today.
4. **One toggle, in place, that looks like a control [W-335 2].** The folded rows are replaced by one kit
   button at the position of the first folded row (DOM order). Label: **"Show more controls"** when any
   other `[data-qa="control"]` on the stage stays visible, and **"Show controls"** only when none is left.
   Expanded, it reads "Hide controls". It must look like a control, not caption text: kit Control styling
   with a disclosure chevron that flips on expand (the exact look is the visual designer's, W-350), full
   stage width, at least 44 px tall (system.md tap targets; the contract floor is 24 px), `aria-expanded`,
   `aria-controls` naming the folded rows. It carries `data-qa="control"` (it is an interactive element on
   the stage).
5. **Focus and no scroll jump [W-335 4].** If focus is inside a row that folds, it moves to the toggle.
   Folded, the Tab order is: stage controls before the first folded row, then the toggle, then the
   remaining controls, then the reveal. Expanded, the restored rows follow the toggle in DOM order. On
   expand, focus stays on the toggle and **the toggle keeps its on-screen position**: rows open below it,
   the reveal moves down, and the card does not scroll. On hide, focus inside a hidden row returns to the
   toggle. An automatic fold gets no live announcement (it would talk over the reveal); the toggle's name
   and `aria-expanded` in reading order are enough. The accessibility reviewer confirms (W-336).
6. **Expanded means exactly as before.** Pressing the toggle restores every folded row in its original DOM
   order, at its natural size (never scaled), with its state kept: rows are hidden with the `hidden`
   attribute or `display: none`, never unmounted, and never collapsed by height, opacity, transform or
   visibility. The learner can keep exploring; live reveal text updates as today. Expanding counts as
   learner intent: the choice holds until the reveal phase ends, and the fit does not re-run or scroll
   against it.
7. **Reset.** Leaving the reveal phase (replay, a new prediction) unfolds everything and removes the toggle.
8. **No contract change, no `Lesson.tsx` change.** The fold lives in `controls.tsx` and `DemoCard.tsx`
   (`useRevealFit`). If the EDD finds it needs `src/kit/Lesson.tsx` (protected), that is an amendment and
   goes to the evaluation steward first.

**QA contract implications (`tests/qa/contract.spec.ts`, protected).** Read against the file, 2026-10-14:
- Steps 2 and 3 (controls locked before the prediction; the first 16 enabled controls each pressed once and
  must change the stage) run in the predict and explore phases. The fold never fires before the reveal, so
  every control is still pressed once and the toggle does not exist yet. Unchanged.
- Step 4 (reveal unlocks, visible, > 120 characters) is unchanged.
- Step 5 runs after the reveal. The tap-target check filters `offsetParent !== null`, so controls hidden with
  `display: none` are skipped, and the toggle (≥ 44 px) passes. This is why item 6 forbids height, scale or
  visibility collapses: those would leave 0-height controls in the check and fail it, and would break
  demo-standard's "never fix it by shrinking tap targets". Horizontal overflow: the toggle must not widen
  the stage.
- The desktop project does not overflow, so nothing folds there. The phone `3-reveal` screenshot shows the
  folded state, so evaluators see what the learner sees.
- **Conclusion: the design does not force an amendment.** It does open a coverage gap: the contract never
  presses the toggle and never checks that controls come back, in order, at ≥ 24 px, and still work after the
  reveal. Until the evaluation steward decides, `tools/reveal-fit.mjs` (not protected) carries that check.
  Whether to close the gap in the contract is the steward's call (board item below); it is recommended,
  not required.

**Sequence.** W-287 lands -> platform engineer's EDD and build of the fold -> interaction-designer design
review (the design lead may not approve their own design) and accessibility review of the toggle ->
reveal-fit gains fold simulation (charging the toggle, excluding Readout rows, W-349) and the expand check, and a re-sweep on that build -> head of product
adds the fold step to demo-standard's fix order -> builders opt rows in (W-326, still held until then) and
re-measure crop 0 -> learner re-review of a sample with a re-check task.

**Revisit (a2) if:** learner reviews show learners do not find "Show controls", or need a folded row to
check what the reveal says (then quoted-row opt-ins are wrong, or fold by default is wrong); or the re-sweep
on a W-287 build shows fewer than about a third of control-cause lessons close with the fold (then the cost
is not worth a kit mechanism, and W-326 compaction carries it alone).

## Rests on
- `company/engineering/notes/2026-10-14-reveal-stage-crop.md`: the measurements after 1a879c6, and the statement that the remaining crop cannot be fixed in the kit.
- `company/engineering/notes/2026-10-14-W-135-reveal-fit.md` and `company/rituals/records/2026-10-14-eng-review-W-135.md`: why an inner scroller is the W-135 defect.
- A read of the five lessons' `Demo.tsx` reveals (2026-10-14): about 90 to 115 words, with the stage made up of a rule line, a picture, controls and, in two lessons, a table. Px-per-line is an estimate (about 23 px and 9 words per line at 390 px). I did not measure it in a build, because no builds were allowed in this session.

## Revisit if
- The W-264 sweep finds more than about 15% of lessons cropped, *and* most of those crops are mainly control rows. Then a kit-level compact control row at the reveal (option a, restricted to `Row`s outside the picture) is worth an EDD from the platform engineer. *Met 2026-10-14 (W-264); answered by the W-330 amendment above.*
- Human learners scroll the stage back into view without trouble and recall no worse. Then the crop costs less than we assume, and the rule becomes guidance rather than a fix list.
- The kit gets the focus-to-reveal amendment (W-135 follow-up 4) and `useRevealFit` is retired. Then check again that the replacement keeps the reveal's last line on screen.

## Consulted
- **head-of-product (W-263, 2026-10-14): adopted with changes.** The rule and Pre-flight 7 are now in `company/product/demo-standard.md`. Changes from the proposed text, and why:
  1. **One budget: the reveal ≤ 90 words, for every lesson.** The proposal had "aim for 90 when the stage has a table or more than one row of controls" next to a 120-word cap. That leaves two numbers and a judgement call about which applies. The reasoning: the reveals in this record run 90 to 115 words, and a 112 px median crop is about 40 to 45 words. So a 120 cap allows the very reveals that crop, and 90 removes most of the small crops. The Reveal row in the shape table already says "two or three short paragraphs", which fits 90. `company/design/system.md` already said 90, so both files now say 90 and point at each other. **Limit:** the px-per-line figures are estimates, not build measurements.
  2. **Not retroactive by word count alone.** The 90-word budget binds new lessons and new versions. A published lesson that passes the fit test is not reopened only because it is over 90 words. The fit test is what the learner sees; the word count stands in for it. Reopening lessons that already fit would be the "redesigning working lessons" failure mode this record rejects for option (a).
  3. **Pre-flight 7 works before W-242 lands.** `tools/reveal-fit.mjs` does not yet report stage-top crop (W-242 is in the backlog), so "quote the measured crop in px" could not be answered today. Until W-242 lands, builders attach a 390×844 screenshot of the open reveal and name what the reveal points at. After that, they quote the px. Builders also quote the word count.
  4. **"Names" is spelled out** as the stage element the reveal points at (a shape, line, row or readout). Two lines are added: no inner scroller (option c, rejected here), and the category manager, not the builder, chooses which teaching sentence goes (this record's second objection).
- **Follow-on:** the Learning Designer's org data (`tools/org/roles.mjs`) still says "reveal script ≤ 120 words". That is on the board for the chief of staff to change to 90 and regenerate.

- **W-330 revisit (2026-10-14, design-lead):** consulted through records only: the W-264 sweep note (platform engineer), `tests/qa/contract.spec.ts` (read for the contract implications), `company/design/system.md` W-289 floor and its cost estimate (accessibility reviewer), and `src/components/DemoCard.tsx` / `src/kit/controls.tsx` (where the fold can live without touching `Lesson.tsx`). Nobody was consulted live. The platform engineer, evaluation steward, interaction designer, accessibility reviewer, head of product and learner evaluator each own a board item below and can object in this table.

- **interaction-designer (W-335, 2026-10-14): design review of "fold at the reveal": approved with changes.** I reviewed the spec only (Amendment, W-330 and system.md). No EDD or build exists yet, so the built toggle gets a second review (W-351). Read against `src/components/DemoCard.tsx` (`useRevealFit`), `src/kit/Lesson.tsx`, and the Demo.tsx of two control-cause lessons from the W-264 sweep. I measured nothing in a build. Px figures are the sweep's, or my estimates where I say so.
  - **Re-checking what the reveal claims: the opt-in test is too narrow (change 1, W-347).** "The reveal does not quote anything in the row" is a test on text. Re-checking needs the *evidence*: the readout or control the learner uses to confirm a sentence. A reveal can summarise a readout without quoting its label, so the row passes the test and still folds away the proof. Change: a Row may opt in only if (a) it holds no `Readout`; (b) no sentence in **any** reveal branch summarises its state or asks the learner to check something with it (read the Demo.tsx, because reveal-fit `named` only sees the measured path and misses paraphrase, so it is a floor, not the test); (c) its current state shows in the picture. With those rules, folding hides only the *means* of changing the state, never the record of it. One tap brings the means back, so re-checking costs one tap. I accept that cost.
  - **Discoverability and label (change 2, W-347; look, W-350).** The position is right: the toggle sits where the first folded row was, between the picture and the reveal, which is where the learner's eye moves. Two problems. (1) "Show controls" claims that no controls are visible. Many lessons keep some: chips in a plain div, a bare Slider, quoted rows. In those lessons the label is wrong and suggests the folded rows are the only ones. The kit can tell (any other visible `[data-qa="control"]` on the stage), so the label becomes **"Show more controls"** there and "Show controls" only when nothing else is left. "Hide controls" stays. (2) system.md says "text style". Learners skim muted text lines as captions, so a text-style toggle hides the rows a second time. It must look like a control: kit Control styling with a disclosure chevron. That look belongs to the visual designer (W-350).
  - **Focus order (change 4; build constraints in W-348; aria in W-336).** Today pressing "Show me why" unmounts that button (the explore panel becomes the reveal panel), so keyboard focus falls to the body before any fold. That is existing behaviour (W-135 follow-up 4), not this design's, but the fold must not make it worse. Rules: if focus is inside a row that folds, move it to the toggle. Folded, the Tab order is: stage controls before the first folded row, then the toggle, then the remaining unfolded controls, then the reveal. Expanded, the toggle keeps its place and the restored rows follow it in DOM order. When rows are not contiguous (A, unfolded chips, B), the order is toggle, A, chips, B, which matches DOM order and is fine. On expand, focus stays on the toggle, and **the toggle keeps its on-screen position**: rows open below it and the reveal moves down, with no scroll jump. On hide, focus inside a hidden row returns to the toggle. An automatic fold gets no live announcement, because it would talk over the reveal. The toggle's name plus `aria-expanded` in reading order is enough. The accessibility reviewer confirms this (W-336).
  - **Folding a row the learner just used (change 3, W-347/W-348).** State is kept, and with change 1(c) the picture still shows what they set, so nothing is lost in fact. What feels like loss is *watching* the row vanish. `useRevealFit` runs on `requestAnimationFrame`, again at 400 ms, and on every resize. A fold fired from the 400 ms re-fit would remove rows the learner has already seen in the reveal frame, and a tap aimed at the old slider position could land on the toggle or the reveal. Change: the fold is decided once, in the same layout pass that first shows the reveal, before it paints. Later re-fits (timer, growth, ResizeObserver, rotation) never fold or unfold; they may only shrink pictures and scroll, as today. Once expanded, the learner's choice holds until the reveal phase ends.
  - **Net saving (change 5, W-348/W-349).** The toggle is at least 44 px plus a row margin, and a kit Row is about 36 to 44 px plus its 8 px margin. So folding one row saves almost nothing, and folding a row only to replace it with a button of the same height is churn the learner sees for no gain. Fold only if the folded rows minus the toggle free at least the toggle's height. The re-sweep must charge the toggle and exclude Readout rows (W-349). The build-5 "174 of 217" overstates the fold for this reason too.
  - **Example 1, midnight-sun-line (sweep #64: 99 px crop on build 5; controls 143 px; the v5 reveal is about 85 words, fix in flight).** Stage: globe, caption, day strip, a chips `div` (65/70/80°N), Row 1 (latitude and time sliders), Row 2 (Daylight and "Sun sets?" readouts). The reveal says "Your town still saw a sunset at X and none at Y" and "a town whose circle fits inside the gap stays lit all day". Re-checking that means moving the town and reading "Sun sets?". Under the record's quote test, a builder could opt in both Rows: "Sun sets?" is not quoted word for word, and the latitude numbers may or may not match `named` by chance. That folds the readout that proves the first sentence. Under change 1, Row 2 never folds (Readout), and Row 1 may (its state, the town's latitude and the clock, shows on the globe and the strip). The chips stay, so the label is "Show more controls". Folding Row 1 alone frees about one slider row (about 60 px, my estimate) minus the toggle, so under change 5 it probably does not fold. The W-266 trim of about 40 words (about 100 px at the sweep's 22.5 px per line) is the fix that closes this crop. Either way, the fold is not needed for this lesson.
  - **Example 2, gradient-descent (sweep #13: 198 px crop, controls 209 px, named "bottom / step size").** Stage: picture, message, rule line, a bare "Step size" Slider (not in a Row), Row "Run 10 at" presets 0.05 to 0.95, Row Step / Run 10 / Reset with the Hops and From bottom readouts, then the runs list. The reveal quotes the presets ("At 0.45 … 0.50 landed on it"), so that Row may not fold. The last Row holds the "From bottom" readout behind "ended X from the bottom", so it may not fold under change 1. The slider is not a Row. **Nothing folds, and that is the right outcome**: every control block here is evidence for a reveal sentence. The sweep counts this lesson among the 174 that hiding controls would close. Under this design it goes to W-326 compaction (for example, the presets merged into the slider's row), not to the fold. This is the clearest case for why W-349 must re-count.
  - **What I believe:** the mechanism is sound and the restrictions in the record are the right ones (opt-in, overflow only, display:none, state kept, reset on replay). High confidence. With changes 1 to 5 it keeps the reveal checkable by hand at the cost of one tap. Medium confidence, because no learner has used it yet (W-338 tests it). The share of lessons it fixes will be well under 174. Medium-high confidence, from two worked lessons and the toggle-cost arithmetic. W-338's re-check task should use a sentence backed by a Readout, which is the case change 1 protects.

## Objections
| Objection | Raised by | Kind | Status |
|---|---|---|---|
| Per-lesson fixes don't scale: about a third of 638 lessons could be cropped, and a kit fix (a) would fix them all at once. | platform-engineer (in effect: their note frames a/b/c as the remaining options) | purpose | **Rejected for now, with a revisit trigger.** The kit cannot tell which controls are safe to hide, and the two worst cases are picture and table height, not controls. The W-264 sweep measures the real share. If control rows dominate, (a) comes back as an EDD. *2026-10-14, W-330:* **partly accepted.** The trigger is met (35% crop, controls tallest in 56%). (a) comes back as a kit mechanism with a per-row opt-in (Amendment, W-330), not kit-wide, because the kit still cannot tell a quoted row. |
| Cutting reveal sentences removes teaching. In midnight-sun-line, the Tropic of Cancer sentence answers a likely wrong option. | design-lead (anticipated for learning-designer and cm-geography) | purpose | **Accepted, routed.** The design lead does not choose which sentences go. W-266 gives that choice to cm-geography. The rule also allows moving context onto the stage caption instead of deleting it. |
| A fit rule tied to one viewport (390×844) will be gamed or will drift on other phones. | design-lead (anticipated for qa-tester) | evidence | **Accepted as a limit.** 390×844 is the measured reference, and the same one W-135 uses. The rotation and landscape case stays with W-135 follow-up 2. If a second reference size is needed, it goes into reveal-fit, not into this rule. |
| The rule is a design-lead proposal in a file the Head of Product owns. | design-lead (ownership in `demo-standard.md`) | purpose | **Accepted, closed by W-263.** The Head of Product adopted it with changes (see Consulted), and the rule is now in demo-standard.md. |
| Two reveal budgets (120 in demo-standard, 90 in system.md, plus "aim for 90" in the proposal) leave builders to pick one. | head-of-product (W-263) | purpose | **Accepted, resolved.** One number, 90, now in both files. The fit test is the binding check, and the word count is its target. Not applied to lessons that already fit (Consulted, item 2). |
| A 90-word cap could cut teaching from reveals that fit today, and could push sentences that answer wrong options out of the reveal. | head-of-product (anticipated for learning-designer) | purpose | **Accepted, limited.** Lessons that already fit are not reopened for word count. In new work, told context can move to the stage caption. Revisit the number if the W-264 sweep shows reveals of 90 words or fewer still cropping often (then 90 is too loose), or if learner reviews mark 90-word reveals as missing the why (then 90 is too tight). |
| Nobody was consulted live. The views of the platform engineer and the principal engineer come from their written records. | design-lead | evidence | **Open.** The platform engineer, principal engineer and head of product are consulted through their records (the crop note, the W-135 review, the 2026-10-14 reveal decision). Each of them owns a board item above and can object in this table. *2026-10-14, head-of-product:* has now answered in writing (Consulted, W-263). The platform engineer is still open. *2026-10-14, principal-engineer:* answered in writing in the W-237 review (row below). |
| The kit's picture fit (1a879c6) does what this rule forbids: at 390×844 it shrinks svg labels below 9 px in 347 of 433 shrunk lessons (median 4.9 px), so what the reveal names is on screen but unreadable. | principal-engineer (W-237 review, 2026-10-14) | evidence | **Open, routed.** W-237 is approved with changes: a legibility floor (W-287, blocks release, or revert 1a879c6). The minimum text size goes to the accessibility reviewer (W-289). The head of product decides whether 'never shrink text' allows any shrink of labelled pictures. See `company/engineering/reviews/2026-10-14-W-237-reveal-stage-crop.md`. |
| The learner may need the controls at the reveal to re-check what the reveal quotes; folding them hides exactly that. | caller of W-330 (caveat 2) and this record's original objection to (a) | purpose | **Accepted, designed around.** Only rows the reveal does not quote may opt in (checked against reveal-fit `named`); folding fires only when the card overflows; *2026-10-14, W-347:* the quote test is replaced by the evidence test (spec item 1, row below); one tap restores every row in order, at full size, with state kept. The learner re-review after the build includes a re-check task. If it fails, (a2) is revisited (Amendment, Revisit). |
| The sweep ran on build 5, before the W-287 10 px label floor; crops will grow, and "174 of 217 close with controls hidden" was measured against pictures shrunk below that floor. | caller of W-330 (caveat 1) | evidence | **Accepted.** The 174 is treated as an upper bound. The fold runs before any picture shrink, so it also reduces shrink. No builder opts rows in until a re-sweep on a W-287 build with the fold simulated (board, platform-engineer). |
| A fold the contract cannot see: the contract never presses the toggle or checks that controls come back and still work after the reveal. | design-lead (anticipated for evaluation-steward, qa-tester) | evidence | **Open, routed.** The design does not force an amendment (Amendment, QA contract implications). reveal-fit carries the expand check meanwhile. The evaluation steward decides whether to propose a contract amendment (board). |
| The design lead wrote this design and may not approve it in design review. | design-lead (role rule) | purpose | **Accepted, routed.** The interaction designer does the design review of the EDD and the built toggle; the accessibility reviewer reviews the toggle (aria, focus, 44 px). |
| "The reveal does not quote it" is a text test; re-checking needs evidence. A row with a readout the reveal summarises (midnight-sun-line "Sun sets?") passes the test and folds the proof away. | interaction-designer (W-335) | purpose | **Accepted, closed (W-347, design-lead, 2026-10-14).** Spec item 1 is now an evidence test: no Row with a `Readout` folds (kit-enforced); the builder checks every reveal branch in Demo.tsx (reveal-fit `named` is a floor); the row's state must show in the picture. In midnight-sun-line, Row 2 ("Sun sets?") can no longer fold. Cost accepted: fewer lessons can use the fold, and re-checking a folded row's state costs one tap. Built behaviour is re-reviewed in W-351; learners test it in W-338 with a Readout-backed sentence. |
| A 44 px toggle replacing one ~44 px row saves nothing and still makes the stage jump; a fold from the 400 ms or resize re-fit makes rows vanish after the learner has seen them. | interaction-designer (W-335) | evidence | **Accepted; spec closed (W-347, 2026-10-14), build and measure still open (W-348, W-349).** Spec item 2: fold only if the folded rows minus the toggle free at least the toggle's height (44 px), else nothing folds. Spec item 3: the fold is decided once, in the layout pass that first shows the reveal, before paint; the 400 ms, growth, resize and rotation re-fits never fold or unfold. Whether the build meets this (no visible fold frame) is checked in W-351; the real share the fold closes comes from the W-349 re-sweep. |
| Opt-in still costs one edit per lesson, so it does not fix "all at once". | design-lead (anticipated for platform-engineer) | purpose | **Accepted as the price.** One prop per row plus a re-measure, against a redesign per lesson; reveal-fit lists candidate rows (control blocks with no quoted label) to make it mechanical. |
| Folding at any `over > 1` hides controls even when a few px of overflow would be absorbed by the W-287 picture shrink above the 10 px floor; item 2 has no "need" bar. | principal-engineer (EDD-005 review, 2026-10-14, O1) | purpose | **Open, routed to design-lead (W-443).** The build does what item 2 says; this is a spec question. Review: `company/engineering/reviews/2026-10-14-EDD-005-review.md`. |
