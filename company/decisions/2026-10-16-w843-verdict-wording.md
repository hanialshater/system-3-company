# W-843 ruling (r2): "pass" on the 15 Wave J r10 walks is read per lesson, in the open, not by the parser

owner: evaluation-steward
date: 2026-10-16
class: evaluation (verdict vocabulary; the publish loop's input)
route: evaluation-steward (this ruling and the 15 reading records) → head-of-product and release-manager (Wave J launch review, r6-verticals A2) → founder (any deploy)
recorded by: evaluation-steward (Hilde) · status: decided for these 15. W-843's 2026-10-15 ruling (parser stays strict) stands. This record narrows one part of it, W-973's "fresh walkthroughs".
asked by: principal-pm-verticals, company/ops/dispatch-requests/2026-10-16-r6-verticals.md, A1(a) and objection (c)

## Question
`tools/publish-ready.mjs` holds 15 gate-clean Wave J lessons in `review` for one reason: the newest learner review (r10, 2026-10-14) says `Verdict: pass`, which is not launch|revise|fatal. The 15 are the same as W-1233's. How do they get a readable verdict?

## Options weighed
- **(a) Map "pass" to launch when the record has no blocking finding.** Rejected. Done in the parser, it is the synonym-learning that the 2026-10-15 ruling refused: the judge translating a reviewer's word silently, for every file, now and later. Done as a blanket rule outside the parser, it would also cover the other 12 "pass" files from r10, which nobody has read for this ruling. A rule that says "when the record has no blocking finding" needs someone to read each record anyway, and at that point it is option (b).
- **(b) A per-lesson reading record, written by the steward or a learner-evaluator.** **Chosen, and done here.** The translation is made, but in the open: one signed file per slug that names the source walk, quotes its reasons, says whether any finding blocks, and shows that the walk still describes the artifact. The parser stays strict and reads the new file because it says `Verdict: launch` with a version stamp.
- **(c) Re-walk all 15 (~0.38M).** Rejected for these 15. A walk is evidence about an artifact. None of the 15 artifacts has changed since its walk (below), so a re-walk would test the same thing again. It would buy no new information for about ten times the cost.

## Ruling
1. **For these 15 lessons, the r10 "pass" reads as launch.** Each one has a reading record at `company/reviews/<slug>/2026-10-16-learner-adult-beginner-r10-reading.md`: `lesson version: vN` equal to meta.json, `Verdict: launch`, the r10 walk as its only evidence, and no findings of its own.
2. **The translation rests on the reviewer's own words, not mine.** Every one of the 15 walks ends "Fix route: none required for launch". None names a finding as blocking. The template defines launch as "no finding blocks a first-time learner". I did not walk these lessons, and the reading records do not re-judge them.
3. **The precondition, checked for each slug: the walk still describes the artifact.**
   - The walk's stamp equals meta.json `version`. Two are v2 (significant-but-false, ten-thousand-replies-still-wrong); the other 13 are v1.
   - Demo.tsx was last committed before the walk was committed.
   - After the walk, meta.json changed only in claim status, checkedBy, checkedOn, source and note fields, plus the e7f2904 draft-to-review flip. No learner-visible text changed.
   - `src/kit` has one 3-line change since the builds. The 2026-10-16 contract QA on the shared server (3d4759e) ran after it and passed on phone and desktop for all 15.
4. **Scope.** This covers the 15 slugs below and nothing else. The other 12 r10 "pass" files and the 1 "block" file stay under W-973. A "pass" record may take this route only if someone reads that record and checks the same precondition, and only if the record names no blocking finding. "block" and any changed artifact need a fresh walk.
5. **The parser does not change.** `tools/publish-ready.mjs` already reads the reading records correctly. The newest record wins at the same version, and the older r10 file does not hold the lesson because it is not dated after the newest one. No request goes to tools-lead.
6. **The non-blocking findings travel.** They are listed per slug below and in each reading record, as hypotheses for each lesson's next version, owned by its category manager. They are not launch conditions. The launch review may weigh them.

## The 15, with my reading of each record

| slug | category | version (walk = meta) | blocking finding | non-blocking findings (r10 finding numbers) | now |
|---|---|---|---|---|---|
| raters-reward-agreement | ai | v1 | no | 3 (hinge line in small grey type), 4 (grids blank after Reset; Seen line keeps the numbers), 5 (reward model told, not shown) | launch |
| sudden-skill-or-strict-score | ai | v1 | no | 3 (filled/dashed encoding flips between presets) | launch |
| two-routes-to-co2 | chemistry | v1 | no | 3 ("diamond" not explained as a form of carbon), 4 ("Σ" for total) | launch |
| which-step-to-speed | chemistry | v1 | no | 3 (gate widths not visible at phone size; chart carries the argument), 4 (toggle controls hard to track) | launch |
| small-n-favours-the-slow-curve | cs | v1 | no | 3 (constants told, crossover seen), 4 (43/44 presets give away the crossover), 5 (bars rescale per size), 6 (blank stage after Reset; trace grid keeps numbers) | launch |
| savings-outlast-the-division | economics | v1 | no | 3 (year-1 earned vs withdrawn told, by design claim c2), 4 (readout shows last slider case at reveal), 5 (free slider on locked stage) | launch |
| which-way-the-water-goes | geography | v1 | no | 4 (labels collide in two frames), 5 (layer spiral too small; 90 degrees told) | launch |
| opposite-flows-swap-more | life | v1 | no | 3 ("level as each arrives" needs a check), 4 (prompt sends learner past the same-way picture; softened after build.md) | launch |
| same-dose-levels-off | life | v1 | no | 3 (amount cleared per interval told, checkable from shown numbers), 4 (dense traces at phone size; end labels carry it) | launch |
| the-equals-sign-balances | math | v1 | no | 1 (may be too easy for adults; a brief question for cm-math), 3 (unknown state looks level) | launch |
| snap-the-magnet | physics | v1 | no | 3 (compass reading rule missing; text labels carry it), 4 (arrows not named as atomic magnets) | launch |
| significant-but-false | probability | v2 | no | 3 (ring on a filled dot hard to read at phone size; counts carry it) | launch |
| sixteen-of-twenty-got-better | probability | v1 | no | 1 (prediction soft), 3 (no-pill row at day 3 skipped by prompt order), 4 (no working-pill case, by brief design), 5 (thin exploration) | launch |
| ten-thousand-replies-still-wrong | probability | v2 | no | 3 (whisker not named as margin), 4 (preset order shuffled against rows) | launch |
| where-the-axis-starts | probability | v1 | no | none of substance (optional "50% cut off" label) | launch |

**Now launch per publish-ready.mjs: all 15.** `node tools/publish-ready.mjs` (read-only run, 2026-10-16) lists 16 candidates: these 15 plus zero-loses-to-this-crowd, which was already a candidate. The line `held (verdict wording "pass" ...)` no longer appears. That meets B2's condition in r6-verticals ("at least 10 of the 15"). Publishing still goes through the gates in `company publish` (release-manager), after the launch review (A2). Any deploy needs separate founder approval.

## Objections

| Objection | Raised by | Status |
|---|---|---|
| W-843 has been in review for two days, and it is the only thing between 15 gate-clean lessons and a launch review (r6 objection c). | principal-pm-verticals | **Accepted and answered.** Ruled and done this run. The 15 are candidates. |
| "Nobody may restamp them on the reviewer's behalf" (r5-product line 26, A3(a)). This record does exactly that. | head-of-product (r5) | **Partly accepted.** The risk is a silent translation by the judge, and that stays forbidden: the parser is unchanged. This translation is visible, signed, per slug, and rests on the walker's own "none required for launch". The r10 file is not edited. If head-of-product still wants fresh walks for any of the 15, the launch review can hold that slug and name it. The walk is ~25k per slug. |
| My own 2026-10-15 ruling (W-973) said "fresh walkthroughs". Is this the steward bending its own rule under budget pressure? | evaluation-steward (self) | **Answered by the precondition.** The fresh walk was meant to make sure the verdict describes the current artifact. For these 15 the commit history shows it already does, so a fresh walk adds cost and no evidence. Where the precondition fails, W-973 still applies. The constitutional review board can overturn this narrowing at its next sitting. It is presented there, not self-approved. |
| A reading record named `...-learner-...` could be mistaken for a learner walk, and it gets linked into `evidence.simulatedLearner` on `--link`. | evaluation-steward (self) | **Mitigated, still open.** Each file says in its first lines that it is a reading record, adds no findings, and points to the r10 walk. The r10 walk stays linked too. If the board prefers, a later amendment could add a distinct `reading` kind. This is not a parser change now. |
| Simulated walks are not learner evidence. | standing caveat | **Stands.** Nothing here claims anyone learned. Confidence stays below "**". |

## Next
- head-of-product and release-manager: the Wave J launch review on these 15 (r6-verticals A2; new board item, since W-1233 is closed).
- chief-of-staff: move W-843 to done; narrow W-973 to the 13 records not covered here; check B2's mechanical condition (met).
- constitutional review board: the narrowing of W-973 is presented at the next sitting.
