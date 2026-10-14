# Design review, 2026-10-14: NCM batch-1 specs (S2-20)

reviewer: design-lead (Ines) · session 2, branch `ccr-rnd-ncm` · specs by interaction-designer (Rafael)
specs: `company/design/specs/{new-road-slower-trip, prices-sort-the-buyers, same-songs-different-hits, cluster-stops-the-cascade, contact-order-matters}.{md,svg}`
against: `company/design/formats.md`, `company/product/demo-standard.md`, `company/design/reviews/2026-10-14-design-lead-ncm-rulings.md` (§1 cascade, §2 network stage), `company/design/reviews/2026-10-13-design-lead-decisions.md` §1.6 (comparison default), `company/design/system.md`, and the QA harness `tests/qa/contract.spec.ts` (read, not edited).
limits: the wireframe SVGs could not be rendered here (no SVG rasteriser on this machine). Geometry was checked from the coordinates written in the specs. The accessibility checks each spec lists are not done here: they go to the build-time design review, which the visual designer (Kiri) chairs with the accessibility reviewer for every network-stage lesson, because §2 is my rule set. Content (rules, numbers, reveal text) is not reviewed here. I checked only that the brief fixes each spec asked for are now in the briefs (they are: cs.systems N1 check line, economics.markets #4 "smallest set" wording, math.discrete #3 edge count 14, life epidemiology claim 3 Overlap rule).

## Verdicts

| Spec | Verdict |
|---|---|
| new-road-slower-trip | **Approved with changes** (3) |
| prices-sort-the-buyers | **Approved with changes** (4). Grid departure accepted |
| same-songs-different-hits | **Approved with changes** (2). QA skip of disabled controls confirmed |
| cluster-stops-the-cascade | **Approved with changes** (5). Start chips and the final-state chip rule accepted |
| contact-order-matters | **Approved with changes** (4). A/E buttons, Overlap drawing and the two-way milestone accepted |

Builders may start once their spec's changes are folded in, either by the interaction designer or by the builder following this record. Each build note cites this file.

## Rule that applies to all five: legend swatches

Legends in the cascade (◉ ● ○ ◌ ⬚), contact-order (◉ ● ○) and prices (● ■ ┅) use Unicode glyphs. Two problems: (1) ◌, ⬚ and ┅ fall back to different fonts on phones, and some render as tofu; (2) the glyph does not match the drawn state (the cascade's "started" is a filled disc with a heavy rim, not ◉; "new" is an accent ring, not a dotted circle). **Change: every legend entry is a small inline SVG swatch (12 to 14 px) drawn with the same code that draws that state on the stage, followed by its word.** Words are unchanged, so the word counts hold. I am routing a proposal to add this to `company/design/system.md` to the visual designer, who owns that file.

## 1. new-road-slower-trip: approved with changes

Format: Before / after toggle with Step + Run in the "after" view, on the network stage (4 display-only nodes, 5 roads with value pills). This fits the catalogue. The after state persists into the reveal (the pin). The Step + Run pair replaces the brief's slider: QA gives a slider two arrow presses, which would land on 1,000, so this is the right call. It also keeps the step-button rule.

Checked and fine: node spacing (128 px minimum); pill centres ≥ 80 px apart (the closest pair, S→A and A→B, is 82 px); the hero box (x ≥ 244, y ≤ 96) clears the A→E edge, which is at y ≈ 127 at x = 244; Before is active and disabled at start, the same pattern as herd-immunity (see §3), so QA skips it; the QA path ends on the state the reveal describes; 23 stage words; ▲ plus bold marks "faster", so colour is not the only cue.

Changes:
1. **The new link must not be drawn "solid" in After.** The rule line says "Solid roads: cars ÷ 100 min". A solid link that takes 0 minutes contradicts the line the learner reads to check the numbers. Draw A→B **dotted in both modes**: `--line` in Before (ghost), `--fg` in After. It keeps the width-by-traffic rule. Its "0" pill names its cost, so no words are added.
2. **Arrowheads at every width.** Busy roads grow to 6 px. Arrowheads stay ≥ 8 px *beyond* the stroke width (a fixed marker sized for the 6 px case, `markerUnits="userSpaceOnUse"`), and they end at the node rim (r 16) at every width. The builder checks this at s = 4,000.
3. **The readout keeps one shape.** The spec gives three versions ("–", "?", numbers). Use "?" only while locked and "–" in Before during explore, as written, but keep the three label positions fixed so nothing jumps when Before and After are flipped (reserve the width of "4,000" in the first slot).

## 2. prices-sort-the-buyers: approved with changes

**Ruling on the departure: the 3 × 3 grid is accepted. The node-link fallback is rejected.** The lesson needs the learner to read value minus price on all 9 buyer–house pairs. As node-link at 340 px, that means 9 edge pills, with three edges meeting at every node. That breaks §2.5 (pills never collide) at the ends, or it moves the values into a table beside the graph, which breaks the demo standard's `**` rule "one representation on a phone". The grid is K3,3's adjacency with the edge values in place: rows and columns are the two sides, and wants and gets are edge states. Everything else in §2 still applies, and the spec keeps it (1-letter discs, pills ≤ 4 characters, ≤ 3 states, a set outline instead of a second colour, no moving nodes, ≤ 300 ms).
Scope of the ruling, now in `formats.md`: a **bipartite graph whose every pair carries a value the learner must read** may be drawn as a matrix (one side as rows, the other as columns, values in the cells). It is a network-stage variant, not a new format. It does **not** count toward the network-stage rule of two (§3 of the rulings), because it shares none of the node-link constants.

Checked and fine: cell geometry (68 × 58 px cells on 80 / 70 px pitch, so 12 px gaps; the grid ends at y ≈ 289 ≤ 300); 3 cell states carried by fill and border; Restart comes first and is disabled at round 0, so QA skips it; Compare opens once and then disables, so the reveal state cannot be hidden; QA ends on (3,1,0), the match, 23, and Compare open; 23 stage words; a visually hidden table for screen readers.

Changes:
1. **Fix the missing coordinates.** The spec gives column x and row y but not where the discs sit. Houses: discs at y = 28, price pills centred at y = 62 (≥ 11 px text), all above the grid top at y = 91. Buyers: discs at x = 44, left of the grid's left edge at x = 96. The "too many want" outline is drawn 4 px outside the cells, from y = 87 down, so it never touches a price pill.
2. **Cell type sizes.** The muted sum line ("12 − 3") is ≥ 11 px and the surplus is ≥ 18 px bold. The ● "wants" dot sits in the cell's top-right corner so it never overlaps either number. Check the cells with two-digit sums at 390 px.
3. **The dashed group in the rule line becomes a swatch.** Replace "(┅)" in the rule line with an inline dashed-box swatch (see the rule above). The legend becomes "[dot swatch] wants · [filled-cell swatch] gets", drawn from the stage code.
4. **Compare panel placement.** Directly under the grid, replacing the legend row while open (the legend is not needed once the match is filled). This keeps the stage at or under its stated 470 px, and it means the six totals are read *after* the grid, not beside it. The market's pill uses the same fill and 3 px border as a "gets" cell.

Content note (not a change, for the learning designer): the rule line's "smallest group too many want" shortens "buyers who want only houses in the group outnumber its houses". Whether the shortening is accurate enough is a content call, not a design one.

## 3. same-songs-different-hits: approved with changes

Format: simulation run, small multiples (8 worlds, 2 × 4). This is not ABM, per the boundary test. Small multiples are one representation (one row of finishes read together), and the fixed song order across panels is what makes it read.

**QA skip confirmed.** `tests/qa/contract.spec.ts` (step 3) skips any control that is hidden or disabled when its turn comes: `if (… || (await c.isDisabled())) continue;`. herd-immunity uses exactly this pattern: the active share chip is `className="active"` and `disabled={locked || p === immunePct}` (`src/demos/life/herd-immunity/Demo.tsx`, the shares group). Its QA records pass on phone and desktop (`company/reviews/herd-immunity/2026-10-13-qa.md`). So "On" (active, disabled) is skipped and "Off" is pressed, as the spec's QA path says. Two consequences the builder must keep: the chip is disabled **by attribute** (`disabled`, not only styled or `aria-disabled`), and all 4 controls exist at first paint so the indices do not shift between presses.

Checked and fine: the panel arithmetic (8 bars at 8.6 px pitch is 66.7 px inside 80; 4 panels plus 3 gutters is 347 of 366 px); one 0–50% scale shared by all panels and both modes; song 8 is marked by ▲, by its fixed rightmost slot and only then by hue; nothing on the stage before the prediction gives the answer; replay ≤ 400 ms, under the 450 ms QA wait, with the milestone fired on press; the summary line keeps the copying-on result after switching off; 23 stage words.

Changes:
1. **Minimum text size 11 px.** The world number (9 px) and the second rule line (10 px) are below the 11 px floor I use for anything the learner must read (§2.5 of the rulings, applied to all stages). The reveal names "world 3", so the learner has to find it. World number 11 px muted (it fits in the 80 × 70 panel; the builder shortens the bar area to make room and keeps the shared 0–50% scale); second rule line 11 px.
2. **Chip names for screen readers.** The visible "On" / "Off" stay, inside a `role="group"` with `aria-label="Copy others"`. Each chip also gets `aria-label="Copying on"` / `"Copying off"` and `aria-pressed`, as herd-immunity does. Without the group label, "On" alone is meaningless when announced.

Kept as written, with a reason: in "off" mode four panels get the dashed lowest-finish frame (worlds 1, 3, 5, 7, all 2nd). That is the rule applied the same way in both modes, and "half the worlds tie for the lowest, and it is only 2nd" is itself the picture of copying off. No change.

## 4. cluster-stops-the-cascade: approved with changes

Format: single card with Step on the network stage, per my §1 ruling. The spec meets conditions 1, 2, 4, 5, 6 and 7 as written.

**Ruling on departure (a), start-set chips instead of threshold chips: accepted.** Condition 3 named threshold chips because I assumed the threshold was the lever. The brief fixes q = 1/2 and the misconception is "too few seeds", and what the lesson teaches is not mine to change. What condition 3 was protecting holds with start chips: at most 3 chips; they carry the values the question and the reveal name; the sets are fixed by the brief and never tapped onto nodes (condition 1); the QA path ends on the stopped run. I have amended condition 3 in the rulings to read "parameter chips (threshold or start set)".

**Ruling on departure (b), a chip pressed after a finished run shows that set's final state: accepted.** This is not only the ABM default (2026-10-13 decisions §1.6). herd-immunity, a simulation run, already does it ("an outbreak that was over stays over") and passes QA. It is the only way 16 presses reach both milestones and still end on the stopped run. Conditions: the readout says "· final" so the jump is labelled, and the last round's joiners carry the "new" ring, so the learner can see where that run ended.

Checked and fine: 12 people with closest centres 68 px apart (≥ 48); hit r = 22; DOM order 0–7, 9, 10, 11, 8, so focus ends on the bridge person; QA path traced (16 presses, both milestones, end on the 0,1 final with "1/4"); counts only on the tapped person; 24 words at the final state; no Reset.

Changes:
1. **"Started" and "new" must differ by shape, not by colour.** As specified, "started" has an outer ring and "new" has an accent ring at r = 21, so they differ mainly by hue. Started: a filled `--fg` disc with an **inner `--bg` ring** at r ≈ 10, 1.5 px (a bullseye), and **no outer ring**. New: the outer 3 px `--accent` ring at r = 21, one round only. The legend swatches are drawn from these. contact-order-matters' "first case" uses the same bullseye, so the product has one "where it started" mark.
2. **Make room for the top-row pills.** Top-row pills at (0, −30) put the pill centre at y = 6, which clips at the viewBox top and touches the r = 21 ring. Shift every node down 14 px (rows at y = 50, 118, 186, 254) and use `viewBox="0 0 340 290"` (≤ 300). The holdout outline moves with the nodes.
3. **Pills must sit outside the holdout outline.** At the QA end state, the "1/4" pill on 8 at (−38, 0) lands at x ≈ 117–147, across the outline's left edge at x = 140. The 9 and 11 pills at (+38, 0) cross its right edge at 268. The 6 pill below (0, +30) touches its top edge. New anchors: persons 0–4, 6 and 7 **above** (0, −32); person 5 **below** (0, +32), clear of the 4–5 edge; persons 8 and 10 **left** (−52, 0); persons 9 and 11 **right** (+52, 0). The outline is x 140–268, y 156–284 after the shift. The builder checks every focus position against the outline in the 0,1 final at 390 px.
4. **The active chip as Restart: label it, and lock it at reveal.** When the active chip is enabled (the run is past round 0), its `aria-label` becomes "Watch start 0,1 again" (or "Watch start 8,9 again"); the visible text is unchanged. In the reveal phase, Step, To the end and both chips are disabled and the stage is pinned to the 0,1 final, so nothing can empty or change the stage the reveal describes (formats.md, "No reset that empties it"). Person focus stays enabled, because it does not change the run.
5. **The 16-control cap is now full.** QA presses only the first 16 controls, and this spec uses exactly 16. No control may be added to this lesson without removing one. Person buttons are native `<button data-qa="control">` overlays sized at **≥ 44 × 44 CSS px whatever the SVG scale**, so the hit area is not scaled down on narrow cards.

## 5. contact-order-matters: approved with changes

Format: storyboard / scrub (a dated timeline, slider plus key-frame button). This is the right format: the payoff is a direction in time, and a node-link drawing would hide the dates, which are the point. It follows the network stage's colour, motion and target rules, as the spec says.

**Ruling on the person buttons A and E: accepted.** The brief's own reachability note needs a way to choose the first case. Two buttons on the two end discs (176 px apart, 44 px targets, a dashed hit ring as the affordance) is the smallest way to do it. They come last in the DOM, so the QA path reaches the answer state on its second press. 7 controls is within budget.

**Ruling on the Overlap rule (each pair meets on each of days 1–4, no relay on the same day): accepted as a drawing.** The rule itself is content. The CM has already put it in claim 3, which is where it is owned. The drawing has to show "no relay on the same day" (change 1).

**Ruling on the two-way milestone with E as the first case: accepted.** From A, Overlap looks the same as A→E, so without E the concurrency point is never seen. Three milestones (`minInteractions=3`) is the most I would allow in a 60-second card. The QA path reaches all three with 7 presses. The final stage (Overlap from E) is the reveal's last idea, so no pin is needed. The learning designer still confirms that this is the intended payoff and owns the reveal text.

Checked and fine: the predict state (one undated "?" column) shows the misconception's picture without the answer; the slider gets 2 arrow presses to day 2; Day 4 is disabled at day 4; the E→A chip is active and disabled at start and enabled again after A→E (QA presses it, and the stage changes); 24 stage words; infection is shown by disc fill plus row thickness.

Changes:
1. **Overlap links must not join into one line.** In a day column, the 4 Overlap links A–B, B–C, C–D and D–E meet end to end and draw one continuous line from A to E. That *looks* like a same-day relay, which the rule forbids. Give each pair a fixed x offset inside its day column: A–B and C–D at −6 px, B–C and D–E at +6 px, in **every** order and in the predict column. That way stacked links read as separate rungs. Columns are 56 px apart, so ±6 px stays clear of the neighbouring column.
2. **The future is not shown by colour alone.** Past links: `--fg` with filled end dots. Links right of the cursor: `--muted` **and hollow end dots**. The accessibility reviewer checks the pair at 390 px.
3. **"First case" uses the shared bullseye** (cascade change 1): a filled disc with an inner `--bg` ring, not a heavier rim. The legend swatch is drawn from the same code.
4. **Person buttons:** native `<button data-qa="control">` overlays of ≥ 44 × 44 CSS px at any SVG scale, disabled while locked. Each is disabled while it is the current first case (the QA path then skips A, as the spec says).

## Objections and what happened to them

- **Rafael: "the node-link fallback for prices would be the two-places problem."** Agreed, and it decided the ruling (§2).
- **Rafael: "start chips, not threshold chips, or the lesson teaches something else."** Agreed. The amended rulings condition 3 records it, so the next cascade-like lesson does not need another exception.
- **A possible objection to cascade change 3 (my anchor numbers): "the designer should choose the anchors, not the reviewer."** The numbers are the minimum that clears the outline. If the builder finds a better placement that passes the same check (≥ 4 px clear of the outline, the edges and the rings at 390 px), they may use it and record it in the build note.
- **A possible objection to the swatch rule: "glyphs are cheaper."** They are. But glyph fallback on phones is a known defect class ("overlapping labels" and tofu are listed as known gaps in `system.md`), and swatches drawn from the stage code cannot drift from the drawing.

## Routing (I do not own these steps; the caller is asked to put them on the board)

- **builders** (one per lesson): build to the spec plus this record's changes; cite this file in `build.md`.
- **interaction-designer:** optionally fold the changes into the five specs. Not blocking: this record is the binding text.
- **visual-designer + accessibility-reviewer:** chair the build-time design review of new-road-slower-trip, prices-sort-the-buyers and cluster-stops-the-cascade (network-stage lessons; §2 is mine), and run the accessibility checks each spec lists (the cascade's bullseye vs filled at 390 px, the dashed outline vs the K4 diagonals, the "1/4" pill; the 16-link ladder and past/future links in contact-order; ▲ and the dashed frame at 80 × 70 in same-songs). Also: consider adding the legend-swatch rule to `company/design/system.md`.
- **learning-designer:** confirm the contact-order two-way payoff and the reveal lines; check the prices rule-line shortening.
