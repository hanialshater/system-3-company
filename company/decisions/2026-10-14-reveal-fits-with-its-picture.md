# Decision: on a phone, the reveal fits with its picture (budget plus per-lesson fixes; no inner scroll, no hidden controls)

owner: design-lead
date: 2026-10-14
status: decided; craft rule adopted with changes by head-of-product (W-263, 2026-10-14)

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

## Rests on
- `company/engineering/notes/2026-10-14-reveal-stage-crop.md`: the measurements after 1a879c6, and the statement that the remaining crop cannot be fixed in the kit.
- `company/engineering/notes/2026-10-14-W-135-reveal-fit.md` and `company/rituals/records/2026-10-14-eng-review-W-135.md`: why an inner scroller is the W-135 defect.
- A read of the five lessons' `Demo.tsx` reveals (2026-10-14): about 90 to 115 words, with the stage made up of a rule line, a picture, controls and, in two lessons, a table. Px-per-line is an estimate (about 23 px and 9 words per line at 390 px). I did not measure it in a build, because no builds were allowed in this session.

## Revisit if
- The W-264 sweep finds more than about 15% of lessons cropped, *and* most of those crops are mainly control rows. Then a kit-level compact control row at the reveal (option a, restricted to `Row`s outside the picture) is worth an EDD from the platform engineer.
- Human learners scroll the stage back into view without trouble and recall no worse. Then the crop costs less than we assume, and the rule becomes guidance rather than a fix list.
- The kit gets the focus-to-reveal amendment (W-135 follow-up 4) and `useRevealFit` is retired. Then check again that the replacement keeps the reveal's last line on screen.

## Consulted
- **head-of-product (W-263, 2026-10-14): adopted with changes.** The rule and Pre-flight 7 are now in `company/product/demo-standard.md`. Changes from the proposed text, and why:
  1. **One budget: the reveal ≤ 90 words, for every lesson.** The proposal had "aim for 90 when the stage has a table or more than one row of controls" next to a 120-word cap. That leaves two numbers and a judgement call about which applies. The reasoning: the reveals in this record run 90 to 115 words, and a 112 px median crop is about 40 to 45 words. So a 120 cap allows the very reveals that crop, and 90 removes most of the small crops. The Reveal row in the shape table already says "two or three short paragraphs", which fits 90. `company/design/system.md` already said 90, so both files now say 90 and point at each other. **Limit:** the px-per-line figures are estimates, not build measurements.
  2. **Not retroactive by word count alone.** The 90-word budget binds new lessons and new versions. A published lesson that passes the fit test is not reopened only because it is over 90 words. The fit test is what the learner sees; the word count stands in for it. Reopening lessons that already fit would be the "redesigning working lessons" failure mode this record rejects for option (a).
  3. **Pre-flight 7 works before W-242 lands.** `tools/reveal-fit.mjs` does not yet report stage-top crop (W-242 is in the backlog), so "quote the measured crop in px" could not be answered today. Until W-242 lands, builders attach a 390×844 screenshot of the open reveal and name what the reveal points at. After that, they quote the px. Builders also quote the word count.
  4. **"Names" is spelled out** as the stage element the reveal points at (a shape, line, row or readout). Two lines are added: no inner scroller (option c, rejected here), and the category manager, not the builder, chooses which teaching sentence goes (this record's second objection).
- **Follow-on:** the Learning Designer's org data (`tools/org/roles.mjs`) still says "reveal script ≤ 120 words". That is on the board for the chief of staff to change to 90 and regenerate.

## Objections
| Objection | Raised by | Kind | Status |
|---|---|---|---|
| Per-lesson fixes don't scale: about a third of 638 lessons could be cropped, and a kit fix (a) would fix them all at once. | platform-engineer (in effect: their note frames a/b/c as the remaining options) | purpose | **Rejected for now, with a revisit trigger.** The kit cannot tell which controls are safe to hide, and the two worst cases are picture and table height, not controls. The W-264 sweep measures the real share. If control rows dominate, (a) comes back as an EDD. |
| Cutting reveal sentences removes teaching. In midnight-sun-line, the Tropic of Cancer sentence answers a likely wrong option. | design-lead (anticipated for learning-designer and cm-geography) | purpose | **Accepted, routed.** The design lead does not choose which sentences go. W-266 gives that choice to cm-geography. The rule also allows moving context onto the stage caption instead of deleting it. |
| A fit rule tied to one viewport (390×844) will be gamed or will drift on other phones. | design-lead (anticipated for qa-tester) | evidence | **Accepted as a limit.** 390×844 is the measured reference, and the same one W-135 uses. The rotation and landscape case stays with W-135 follow-up 2. If a second reference size is needed, it goes into reveal-fit, not into this rule. |
| The rule is a design-lead proposal in a file the Head of Product owns. | design-lead (ownership in `demo-standard.md`) | purpose | **Accepted, closed by W-263.** The Head of Product adopted it with changes (see Consulted), and the rule is now in demo-standard.md. |
| Two reveal budgets (120 in demo-standard, 90 in system.md, plus "aim for 90" in the proposal) leave builders to pick one. | head-of-product (W-263) | purpose | **Accepted, resolved.** One number, 90, now in both files. The fit test is the binding check, and the word count is its target. Not applied to lessons that already fit (Consulted, item 2). |
| A 90-word cap could cut teaching from reveals that fit today, and could push sentences that answer wrong options out of the reveal. | head-of-product (anticipated for learning-designer) | purpose | **Accepted, limited.** Lessons that already fit are not reopened for word count. In new work, told context can move to the stage caption. Revisit the number if the W-264 sweep shows reveals of 90 words or fewer still cropping often (then 90 is too loose), or if learner reviews mark 90-word reveals as missing the why (then 90 is too tight). |
| Nobody was consulted live. The views of the platform engineer and the principal engineer come from their written records. | design-lead | evidence | **Open.** The platform engineer, principal engineer and head of product are consulted through their records (the crop note, the W-135 review, the 2026-10-14 reveal decision). Each of them owns a board item above and can object in this table. *2026-10-14, head-of-product:* has now answered in writing (Consulted, W-263). The platform engineer and principal engineer are still open. |
