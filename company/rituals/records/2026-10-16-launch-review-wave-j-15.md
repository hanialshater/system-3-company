# Launch Review: 2026-10-16, Wave J (W-1457): fifteen lessons cleared under W-843

chair: head-of-product (Priya) · slot hop-wj-launch-15 · board W-1457 · executes: head-of-product via `node tools/company.mjs publish <slug>` (the gates run inside it) · no deploy

Brief: the 15 Wave J lessons that the evaluation steward cleared under W-843 (ruling `company/decisions/2026-10-16-w843-verdict-wording.md`, commit a40bdea). Read at HEAD 0901216, main checkout, clean tree.

## Readings applied

- **Floor:** `node tools/publish-ready.mjs` (read-only). It lists 16 candidates: these 15 plus zero-loses-to-this-crowd. **cut-the-busiest-link is not listed**, so it is not on this slate (the brief adds it only if listed). zero-loses-to-this-crowd is a candidate but not in this brief. It is not reviewed here and not published (objection 6).
- **Artifact before account:** I read each `artifacts/walkthroughs/<slug>/sheet.png` frame by frame, from predict to reveal, before reading the steward's per-slug notes. I also checked the reveal arithmetic against the frames (for example 20.1 years at 5% and $40k; 64·44·log2 44 = 15,374; 45/125 = 36%; peaks of 200, 133 and 341 for a 6 h half-life; (56-50)/(52-50) = 3.00).
- **Sheet is current:** every sheet file is dated after its lesson's last `Demo.tsx` commit (the newest is sudden-skill-or-strict-score, b6dea73 at 2026-10-14 18:06Z, sheet at 18:54). Most sheets still show the `DRAFT` badge and older "claims checked" counts. Those are status chrome from before the fact-check, not lesson content. A learner sees the live values.
- **Gates (read, then enforced again by `company publish`):** every claim is verified by fact-checker, or withdrawn. The withdrawn ones are the c5 context citations in significant-but-false and ten-thousand-replies-still-wrong, which were never in learner text. No builder checked its own claims. Each lesson has a 2026-10-16 QA record written by qa-tester (3d4759e) on the current kit. The learner verdict is the r10 walk, read as launch through the steward's per-slug reading record at the same version (v2 for significant-but-false and ten-thousand-replies-still-wrong, v1 for the rest).

## Per-lesson decisions

Hold only for a reason a learner would hit. Everything else is a note for the category manager (objection 2).

| Lesson | CM | Decision | One line of reason |
|---|---|---|---|
| raters-reward-agreement | cm-ai | **launch** | The 50% and 30% presets turn the tie into a loss for honesty in front of the learner, and the reveal's 60 to 40 matches the frame. |
| sudden-skill-or-strict-score | cm-ai | **launch** | Whole-answer bars sit near zero and then jump, while per-token bars climb evenly. The learner can see the mirage, and the p¹⁰ figures add up. |
| two-routes-to-co2 | cm-chemistry | **launch** | All three routes land on the same −393.51 line in view. The claim the reveal makes is one the learner already drew. |
| which-step-to-speed | cm-chemistry | **launch** | The curve barely moves for step 2 ×10 (7.03 to 6.94 s) and jumps for step 1 ×10 (0.80 s). The bottleneck is visible. |
| small-n-favours-the-slow-curve | cm-cs | **launch** | The trace keeps 20/43/44/100 side by side and shows the 43 to 44 crossover. Every number checks. |
| savings-outlast-the-division | cm-economics | **launch** | The 20.1-year curve, the never-running-out $25k line and the 12.5-year 0% line are all on one chart. The learner sees the division fail. |
| which-way-the-water-goes | cm-geography | **launch** | Net-flow arrows sit at right angles to the wind in both hemispheres, and the ocean view builds the gyre the reveal names. |
| opposite-flows-swap-more | cm-life | **launch** | Same-way stalls at 50 and opposite-way reaches 91, with per-section numbers. The 1/4/10 sections show the trend. |
| same-dose-levels-off | cm-life | **launch** | Three schedules plateau at 200/133/341 on one chart. The levelling-off is seen, not told, and the reveal says the substance is made up. |
| the-equals-sign-balances | cm-math | **launch** | The beam tips for 12 and 17 and levels for 7. The equals-as-balance idea is carried by the picture. |
| snap-the-magnet | cm-physics | **launch** | The compasses at the break show the new poles, and the turned half pushes apart. Each quarter is labelled N + S. |
| significant-but-false | cm-probability | **launch** | At 10% true the counts (80 real, 45 flukes, 36%) are printed beside the dots, and the 50%/1% contrasts sit in the readout. |
| sixteen-of-twenty-got-better | cm-probability | **launch** | The no-pill row fills to 16 of 20 too, so the missing comparison is the thing the learner discovers. |
| ten-thousand-replies-still-wrong | cm-probability | **launch** | 1,000/10,000/100,000 web bars all sit near 33% with shrinking whiskers. The 1,000 random calls bar lands at 48.7%. |
| where-the-axis-starts | cm-probability | **launch** | The bar ratio goes 1.08× → 1.33× → 3.00× while the value ratio stays 1.08×, both on screen. |

**Launch: 15. Hold: 0.**

## Notes to category managers (not launch conditions)

These are the steward's r10 non-blocking findings (ruling table), plus what I saw on the sheets. They are hypotheses for each lesson's next version, owned by the CM.

- **cm-ai:** raters: the hinge line is in small grey type; grids go blank after Reset while the Seen line keeps the numbers; "reward model" is told, not shown. sudden-skill: the filled/dashed encoding flips between presets (frames 2 and 3 use opposite legends), and this is the one I would fix first.
- **cm-chemistry:** two-routes: "diamond" is not explained as a form of carbon, and "Σ" stands for total. which-step: the gate widths cannot be seen at phone size, and the Undo toggles are hard to track.
- **cm-cs:** small-n: the constants are told; the 43/44 presets give the crossover away; bars rescale per size; the stage is blank after Reset.
- **cm-economics:** savings: year-1 earned vs withdrawn is told (claim c2, by design); the readout shows the last slider case at reveal; the slider stays free on a locked stage.
- **cm-geography:** which-way: labels collide in two frames (the "wind toward west / net flow" overlap in step 2 is visible on the sheet); the layer spiral is small; 90 degrees is told.
- **cm-life:** opposite-flows: "level as each arrives" needs a second look (water reads 18 arriving at the last section and leaves at 9, which is not printed); the prompt sends the learner past the same-way picture. same-dose: the amount cleared per interval is told; traces are dense at phone size.
- **cm-math:** the-equals-sign-balances may be too easy for adults (a brief question for cm-math), and the unknown state looks level.
- **cm-physics:** snap-the-magnet: no compass reading rule; the arrows are not named as atomic magnets.
- **cm-probability:** significant-but-false: a ring on a filled dot is hard to read at phone size. sixteen-of-twenty: the prediction is soft; the day-3 no-pill row is skipped by prompt order; there is no working-pill case; exploration is thin. ten-thousand: the whisker is not named as a margin; preset order is shuffled against the rows; the 10,000-web whisker (32.3%) only just misses the 1/3 line, which an attentive learner could read as "close enough". where-the-axis-starts: optional "50% cut off" label.

## Objections

| # | Objection | Raised by | Status |
|---|---|---|---|
| 1 | The learner verdict for all 15 is a reading of a "pass" walk, not a fresh walk. My r5 line was "nobody may restamp them on the reviewer's behalf". | head-of-product (r5), answered in the W-843 ruling | **Accepted as answered, by evidence I checked myself.** The ruling's precondition is that the walk still describes the artifact. I confirmed it independently: every sheet postdates its Demo.tsx commit, the versions match, and the 2026-10-16 qa-tester record ran on the current kit. I read every sheet before the steward's notes and found nothing that blocks a learner. So I am not naming any slug for a fresh walk. If a later diff touches Demo.tsx or learner text on any of the 15, this launch no longer covers it. |
| 2 | Several notes are real friction (sudden-skill legend flip, which-way label collision, opposite-flows "level as each arrives"). Shouldn't they hold? | chair (self) | **Declined as holds, accepted as v-next work.** In each case the core comparison is still on screen and the reveal matches it, so a first-time learner reaches the idea. Each note goes to the named CM above. If a real-learner note shows one of them stops learners, that slug goes to retirement review. |
| 3 | The sheets show `DRAFT` and pre-fact-check claim counts, so the sheet is not pixel-identical to what ships. | chair (self) | **Accepted, non-blocking.** The badge and counter are kit chrome driven by meta status and claims. Neither is lesson content, and both now read correctly from meta. |
| 4 | Simulated walks are not learner evidence. | standing caveat | **Stands.** Confidence stays below "**". Nothing here claims anyone learned. |
| 5 | No accessibility review is on file for these 15 (same gap as r5 objection 4). | chair (self) | **Open, not a gate.** The constitution's launch gates do not include it, and I may not edit gates. Routed as a recommendation for qa-lead/accessibility owner via the chief of staff's board, not written by me (I do not write board.json in this slot). |
| 6 | zero-loses-to-this-crowd is a publish-ready candidate and was left out. | chair (self) | **Accepted as out of brief.** It is not one of the 15 and has no launch review row here. A launch review must cover it before it publishes. Routed to chief-of-staff to schedule. |
| 7 | The 15 reading records are not linked in `evidence.simulatedLearner`. The list-only run reports 17 unlinked files. | evaluation-steward objection 4 in the ruling | **Left as is.** The gate already passes on the r10 link, and publish-ready reads the reading records directly. Linking them would turn a reading into "learner" evidence, which the steward flagged as still open. |

## Outcome

Published with `node tools/company.mjs publish <slug>`, one at a time, gates enforced per call. The results are in the commit that carries this record. No deploy: no `npm run deploy`, no workflow trigger, no deploy marker in any commit. Going live needs separate founder approval.

## Next

- chief-of-staff: move W-1457 to done; schedule a launch review for zero-loses-to-this-crowd; route accessibility (objection 5).
- category managers listed above: take the notes as v-next hypotheses.
- release-manager → founder: the deploy decision for these 15.
