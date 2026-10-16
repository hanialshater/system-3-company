# Design review, 2026-10-14: schelling-on-new-york spec v3 (before build)

reviewer: design-lead (Ines) · session 2, branch `s2-rebuild` · spec by interaction-designer (Rafael): `company/design/specs/schelling-on-new-york-v3.md`
read first (artifact before account): `artifacts/walkthroughs/schelling-on-new-york/` (`03-step-2.png`, `11-reveal.png`, sheet, transcript), then `company/reviews/schelling-on-new-york/2026-10-14-learner-review.md`, then the spec.
against: `company/design/formats.md`, `company/product/demo-standard.md`, `company/design/system.md`, ABM format rules (`company/design/reviews/2026-10-13-design-lead-decisions.md` §1), `src/components/DemoCard.tsx` (reveal-fit scale, floor 0.4) and `tools/reveal-fit.mjs` (the W-135 "thumb" test), the v2 `styles.module.css` (group colours).
limits: no v3 mockup exists yet, so heights below are estimates from the v2 phone frames (390 × 844, reveal text about 2.5 CSS px of height per word including line gaps). The builder measures; where a measurement disagrees with an estimate, the measurement wins and the acceptance tests below decide. Content and wording are not reviewed here (learning designer, cultural reviewer).
independence: the ABM rules are mine, and this record adds design choices of mine (one-SVG pair, slider removal, counting rule). So the **build-time design review of v3 is chaired by the visual designer (Kiri) with the accessibility reviewer, not by me.**

## Verdict: **approved with changes** (D1 to D12 below; "D" numbers are mine, "R" numbers are the cultural rulings)

Option D (two settled mixes, clumps in different places) is the right picture. It is the first fix in this lesson's history that changes what the learner *sees* instead of adding text, and it answers the probe's actual failure (frame 11 shows one sorted New York, and the disclaimer is only text). The artifact analysis in spec §1 matches what I see in the frames: in `03-step-2.png` the slider sits at the stage's bottom edge and the "Not modelled" line is below the fold, and in `11-reveal.png` the map has been scaled to about 120 CSS px.

The builder may start once the interaction designer has folded D1 to D12 into the spec (as v3.1), or by following this record directly, citing it in `build.md`.

---

## Open risks assigned to me

### D1. Risk 1, the pair above the reveal text: **objection upheld; the pair goes where the spec puts it**

The catalogue's "comparison pairs go in the reveal, below the text" rule is about **illustration files placed in the `reveal` slot**: a third picture that would otherwise sit beside a live diagram. v3's pair is not an illustration. It is **the stage itself, pinned at the reveal** to two of the learner's own runs. It replaces the live grid, so there is still one representation on the card. That makes it the ABM pin (format rule 8) applied to two runs. The stage sits above the reveal in every lesson, and that is the kit's layout, not a choice. The objection's reason also holds on the evidence: in `11-reveal.png` the image the learner meets first is the sorted city, and a pair below about 120 words is where P2 and P5 never get to.

Builder:
1. Render the pair **in the stage** (the `children` render prop at `phase === "reveal"`), never in the `reveal` slot. Nothing else in the stage is pictorial at the reveal: no live grid, no hero, no illustration.
2. Draw both frames as **one `<svg>` with one `viewBox`**: both grids side by side with a gap of 2 cells, filling the stage width (about 2 × 154 px at 390). This keeps ABM rule 9 (one path per group, not 1,600 nodes). It also makes `tools/reveal-fit.mjs` measure the pair as one picture. Two separate 160 px SVGs would each measure at about 50 % of the stage width and be reported as "thumb" at any scale.
3. P is on the left with a bold caption and a 2 px `--fg` frame. Q has a 1 px `--line` frame. Do **not** frame P in `--domain`: it is a pastel at 1.1 to 2.4:1 on light (system.md), and the frame is the only cue for which map the text quotes.
4. Keep the spec's static-readout treatment (v2's `.still`) in place of the controls at the reveal. No live control at the reveal.

I have added this distinction to `company/design/formats.md` ("Illustrations" rule), so the next lesson does not need a review to use it.

### D2. Risk 2, about 110 px frames with about 3 px cells: **set a floor on the rendered size; the fix order is size first, then tone, then never more colour**

What the numbers say:
- N = 40, so a 154 px frame gives 3.75 px cells at scale 1. Shape (square vs circle) is marginal at that size and gone below it.
- The reveal-fit scale is what shrinks the pair. With a 120-word reveal I estimate it at about 0.6 to 0.66 (about 205 px of card left for a stage whose natural height is about 310 px). That gives frames of about 95 to 105 px and cells of about 2.4 to 2.6 px. That is below the spec's own ≥ 0.7 target, and `reveal-fit.mjs` flags it as thumb (picture under 75 % of the width-allowed scale and under 200 px tall).
- Group colours in v2 (`styles.module.css`): A vs B is **1.95:1 (light) and 2.05:1 (dark)**, so lightness alone does not separate the groups at a non-text 3:1. Against land, A is 7.6 / 10.9 and B is 3.9 / 5.3.

Builder:
1. **Acceptance:** at 390 × 844 in both themes, on the QA path, `node tools/reveal-fit.mjs <slug>` reports `fit` or `scroll` and **no thumb**. That means `data-reveal-scale` is ≥ 0.75, and each frame is drawn at ≥ 115 px with cells ≥ 2.9 CSS px. Report the measured scale in `build.md`.
2. If the scale comes in under 0.75, cut **stage height first**, in this order:
   - (a) captions to two lines per frame (`mix 2 · 2×2 0.44→0.76` on one line, then the one-colour line and the k\* line in the same column);
   - (b) S1 to one line at 12 px (shorten the swatch spacing; the words are fixed);
   - (c) S4 directly under the pair at 12 px.

   The target for the reveal stage's natural height is ≤ 270 px. If it is still under 0.75, the **reveal text** is cut (D3). The pair is never shrunk below the floor, and it is never moved out of the stage.
3. Keep squares and circles in the frames, drawn by the same code as the stage. Draw no overlay and no one-colour outlines (the spec already says so).
4. The groups-at-small-size question goes to the **accessibility reviewer**, with this ruling as the default: if shapes do not read at the measured cell size, the fix is the visual designer's neutral group pair (already an open item in the v2 build note) with more lightness separation between A and B. A third hue, a pattern fill, or labels inside the frames are not the fix. Note the constraint the visual designer will hit: in light mode, with A at #005f54, B needs about 3:1 against A, which leaves B at about 2.5:1 against white land. Empty land is not what the pair is read for, so I accept that trade-off if the accessibility reviewer does.

### D3. Risk 6, a 90-word reveal cap (formats.md) against 120 (demo-standard.md): **120 is the cap; 90 is the aim; fit on the phone decides**

`demo-standard.md` is the product standard (owner head-of-product; CLAUDE.md: "Lessons follow demo-standard"), and the learning designer's script limit is also 120. The 90 in `formats.md` and `system.md` was a design aim written as if it were a cap. I own `formats.md` and have changed the line to: the reveal text is ≤ 120 words (the gate); aim for ≤ 90; it must pass `tools/reveal-fit.mjs` at 390 × 844. `system.md` (visual designer) and `concepts/typography-scale.md` still say 90, which is routed below.

For this lesson: the spec's 120 tokens is **allowed by the cap**, but D2's acceptance (scale ≥ 0.75) binds as well. By my estimate, 120 words plus the pair do not fit. So plan on about 100 words. The **learning designer** chooses the cuts, and the cultural reviewer confirms that they stay inside R3. My one design observation for them: paragraph 2 is 76 words, close to the 95-word paragraph P5 gave up on. A cut there buys the most.

---

## D4. Stage word budget and the after-run overrun: **joint decision record** (design-lead with learning-designer)

### D4a. Does the slider label count? **Yes.**

The slider label here **is the model's rule line** (ABM rule 2). It is the only place on the card that states the moving rule, and the learner review shows that a reader without lesson one needs it. The sister lesson counted its rule line (`mild-preferences-sharp-divides/build.md`: rule line 15, 22 in all). If a label stopped counting because it was attached to a slider, any lesson could hide a sentence from the budget that way. So the rule line counts wherever it sits.

The counting rule, now in `formats.md`, is the one every lesson uses. Count every word that contains a letter in:
- captions;
- rule lines, including a rule written as a slider or toggle label;
- legends, axis titles, and headers over controls.

Do not count:
- numerals and values;
- button labels;
- chips that name a value (`2×2`);
- readout labels of ≤ 3 words attached to a number (`Round`, `would move`, `mix`, `one-colour boxes`);
- the explore hint panel.

Under this rule (strings as in spec §4):

| Moment | S1 | S2 | S3 | rule line | S4 | Total |
|---|---|---|---|---|---|---|
| Predict / explore before a finished run | 13 | 5 | 7 | 9 | — | **34** |
| Explore after a finished run | 13 | 5 | 7 | 9 | 11 | **45** |
| Reveal stage (S1 + S4; caption words are readout labels) | 13 | — | — | — | 11 | **24** |

So the overrun is **20 words after a run (9 before)**, not 11. The spec's "25 before a run" holds only because it leaves out the rule.

### D4b. Decision: **a lesson-specific exception for exactly two lines, the rule line (9) and S4 (11). Everything else stays inside 25.**

- **Base budget, binding:** S1 + S2 + S3 ≤ 25 at every frame (it is exactly 25 now). Any new word in these three lines means cutting another.
- **Exempt, verbatim only:** the rule line `Move if fewer than 30% of neighbours are like them` (wording fixed by R6) and S4 `Not modelled: money, prices, history, who was allowed to live where.` (shown only after the first finished run). The exemption covers these strings only. A longer version is not exempt.
- **Caps:** 34 words before a finished run, 45 after, 24 at the reveal stage. These are ceilings, not targets.
- **Conditions, tested at the re-probe (spec §13):**
  - (i) The phone-fit acceptance passes: no stage scroll at 390 × 844 in both themes, with S4 shown.
  - (ii) Probe items 2 and 3 pass, including P2 and P5.

  If P2 or P5 still miss S4 or the rule, the next lever is **fewer words on the stage**, not more emphasis, and the exception comes back here.
- **Why these two lines:** each is a "show the why" carrier (demo-standard, told-vs-shown), and each sits on its object. S4 is inside the map. The rule line is directly over the thing it governs. Neither is read as part of a block. The sister lesson fits 25 with its rule line because it carries no culturally mandated lines. Here R1 and R6 take 20 words, and the learner review asks for the rule to be *more* legible, not less.
- **Options from `build.md` (item 1) considered and refused:**
  - rotate the R6 setting line out after a run (the cultural reviewer forbids it);
  - merge R1 with R6 (no words saved);
  - drop or shorten S4 to meet the budget (the cultural reviewer forbids it; the spec's 9-word fallback is not needed under this exception and is not adopted).

**Objection that travels with this decision (cultural reviewer, cultural review 2, "Exact trims" and fix 3):** "if they grant a recorded exception, grant it for the after-run left-out line only … Do not grant it for the made-up line (R1) or for the setting line (R6)." **Answer:** the exception does not cover the R1 line (S1) or the R6 setting line (S3). Both stay inside the base 25. The second exempt line is the rule line. The cultural review counted without it ("24 before a run and 34 after, without the slider label"), so it was outside the count the constraint was written against. Its wording is fixed by R6 and is not changed. **The cultural reviewer is asked to confirm** that this reading of the constraint is theirs. If they say the rule line must also fit inside 25, then the constraint cannot be met at all without cutting R1 or R6 meaning (S1 + S3 + rule = 29), and the item goes to the category manager as a scope problem, as `company/decisions/2026-10-14-told-vs-shown.md` routes a budget that cannot hold the stand-in (head-of-product informed).

**Learning-designer concerns, and what happened to each.** These are taken from the role and from the record, because there is no learning-designer note on disk for this lesson. Their concurrence is still to be recorded.
- *The objective's third part (what the model leaves out) needs S4 on the stage, not only in the reveal.* Kept. S4 is exempt, never cut.
- *A learner without lesson one meets the rule only in a label.* Kept, and the rule line counts, so no future trim can remove it silently.
- *Reveal script ≤ 120 words.* Kept as the cap (D3). The fit acceptance may force about 100 words, and the learning designer chooses the cuts.
- *Recall and question wording.* Not touched here.

**Status:** the design-lead half is decided. The decision takes effect as the joint record the cultural review requires once the learning designer adds a concurrence line under this heading, or an objection, which then travels here with an answer. The build does not wait for it: only the record changes, not the layout. The head-of-product, who owns the standard, may overturn it.

---

## Catalogue and visual-system findings (ask 3)

### D5. Control count breaks ABM rule 4 (≤ 7): **remove the slider; the rule becomes a static line**
Spec §5 says "7, was 8" but lists 8: Step, Run, New mix, Reset, three chips, and the slider. The slider serves no milestone, no reveal value and no part of the objective (`meta.json`: the objective names the 30% result only). On the QA path it only moves the threshold off 30% just before the reveal. Removing it:
- brings the card to 7 controls;
- recovers about 44 px of stage height, which is most of the phone-fit gap in spec §4 (≈ 470–540 against about 480);
- removes the ABM rule 6 case of a parameter change after a run, which has no role here.

Builder:
- Render the rule line as static text, `--fg` for "30% …" as in v2's bold. Wording verbatim, in the slider's place, with S3 directly above it.
- The QA path loses row 8. Nothing else changes.
- The **cultural reviewer** confirms that R6 holds with the label as a static line (same words, threshold still shown).
- If the **learning designer** shows the threshold must be explorable, keep the slider and bring the request back to me for a recorded exception to rule 4. Do not drop another control to make room.

### D6. ABM rule 3 (New mix first in DOM order): **departure accepted for this lesson**
Order Step · Run · New mix · Reset is needed so that the QA path's New mix lands after a finished run. Rule 3 guards against a QA path that ends on an emptied world. Here the reveal is pinned from seeds (P, Q), so Reset last cannot empty it. Record the departure in `build.md` pre-flight item 5.

### D7. Box lattice and one-colour outlines: two layers, told apart by more than colour
- **Lattice:** 1 px, `--muted` (≥ 5.5:1 on land, so it passes as a 3:1 graphic). Draw it in the cell gutters, **beneath** the marks. Use `vector-effect: non-scaling-stroke`, so it stays 1 px at the 246 px floor and under the reveal scale. v2's 0.07-unit stroke at 0.55 opacity is the bug.
- **One-colour outline:** 2 px, `--fg`, **inset 1 px** inside the box so it never merges with a lattice line, drawn above the marks. Never `--ga`, `--gb`, `--domain` or any semantic colour (R5).
- Risk 3 ("highlighted territories") stays with the cultural reviewer before build. If they object, the design fallback is dashed 1.5 px `--fg`. I do not ask for a fill.

### D8. Text inside the map (S1, S4)
- HTML over the SVG as specified. **12 px minimum**, and no 11 px: on a phone, the glance read matters more than keeping the corner. If S1 + S4 do not fit the corner at 12 px at the 246 px floor, use the spec's fallback (S4 full width under the map, above the R-row).
- Swatches in S1 are **inline SVG drawn by the stage's own mark code** (as in the NCM rule on legend swatches), not Unicode ■ ●.
- `--muted` for S1 and `--fg` for S4, both ≥ 5.5:1 on the land colours.

### D9. Agent state (ABM rule 1, fill vs hollow): **not drawn; accepted**
"Would move N%" has no per-agent mark. Adding hollow movers on top of the lattice and the outlines would put three layers on 6 px cells. The lesson's payoff is the unit, not who moves. Accepted as a departure. Record it in `build.md`.

### D10. Predict state
Lattice drawn, no outlines, no one-colour readout, chips `?` and blank: this follows system.md ("answer readouts as '?' while locked") and the no-answer-before-commit rule. Keep it.

### D11. Phone-fit acceptance (restating spec §4 with D5 applied)
- At 390 × 844, both themes, every QA frame: `stage.scrollHeight <= stage.clientHeight`.
- Controls ≥ 44 px (`.tap`).
- R-row wraps onto at most 2 lines at 12 px.
- The `Fit` shrink never goes below the 246 px floor (6 px cells, ABM rule 1).

### D12. Spec errata (for the interaction designer's v3.1)
- §5 control count: it says 7 but lists 8 (fixed by D5).
- §4 totals table: re-count with the formats.md rule (D4a).
- §10 mock item 3: the reveal target becomes scale ≥ 0.75 measured by `reveal-fit.mjs`, not "≥ 0.7".

---

## Changed in my scope this session
- `company/design/formats.md`: the reveal-cap line (120 is the cap, 90 the aim, reveal-fit decides); the stage-word counting rule; and the illustration rule now says that a pinned two-run stage is the stage, not an illustration pair.

## Routing (I did not touch the board; the caller is asked to add these)
- **learning-designer:** concurrence or objection under D4b; confirm slider removal (D5); reveal cuts if the measured scale is < 0.75 (D3).
- **cultural-reviewer:** confirm the D4b reading of the exception constraint; R6 with the rule as a static line (D5); risk 3 outline style (D7), before build.
- **accessibility-reviewer + visual-designer:** groups at reveal size (D2.4) and the neutral group-pair token; chair the build-time design review of v3; align `system.md` (and `concepts/typography-scale.md`) with the 120 cap and the counting rule.
- **interaction-designer:** fold D1–D12 into spec v3.1; brief the mockup artist with D2 and D5.
- **demo-builder:** build to v3.1 or to this record; report the measured reveal scale, stage word counts per the formats.md rule, and departures D6 and D9 in pre-flight.
- **head-of-product:** for information. A lesson exception to the 25-word stage budget is recorded here (D4b), and formats.md now defers to demo-standard on the reveal cap.
