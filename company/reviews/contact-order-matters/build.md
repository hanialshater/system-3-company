# Build note: contact-order-matters (demo-builder, 2026-10-14)

Kept from evaluators until they report.

- Built from the brief (`company/domains/briefs/life.health-epidemiology.md`, NCM batch 1, #1), the spec `company/design/specs/contact-order-matters.md`, and the binding changes in **`company/design/reviews/2026-10-14-design-review-ncm-specs.md` §5** (the review wins over the spec). All four review changes are in:
  1. Pair x offsets inside every day column and in the predict "?" column: A–B and C–D at −6, B–C and D–E at +6, so Overlap rungs never join into one line (no same-day relay picture).
  2. Future links (right of the cursor): `--muted` stroke **and hollow end dots**; past links `--fg` with filled dots.
  3. First case = shared bullseye (filled `--fg` disc, inner `--bg` ring at r = 10, 1.5 px), no heavy rim. Legend entries are inline SVG swatches drawn by the same `Disc` component (review's swatch rule), not glyphs.
  4. Person buttons A and E are native `<button data-qa="control">` overlays fixed at 44 × 44 CSS px, disabled while locked and while they are the current first case; dashed r = 22 hit ring drawn as the affordance.
- Controls in DOM order (7): Day slider, Day 4, chips A→E / E→A (start, active and disabled) / Overlap in a `role="group"`, person buttons A, E. Chips and person buttons keep the day; chips keep the first case. Links slide between columns with a 300 ms CSS transform (none under reduced motion).
- Milestones (`minInteractions=3`): `one-way` (E→A, A, day 4), `forward` (A→E, A, day 4), `two-way` (Overlap, E, day 4). The reveal's optional sentence "From E, A→E reached only D." appears only if that state (A→E, first E, day 4) was reached.
- **1/k! result is not shown.** The brief's 24-order distribution (1 person in 12 orders, 2 in 8, 3 in 3, 4 in 1; P(reach ≥ k) = 1/k!) is not reachable on the stage. It is not in the reveal and not in meta.json claims (a claims entry would show in the learner-facing trust sheet). Builder re-ran it in node with the lesson's `spread()`: {1:12, 2:8, 3:3, 4:1}, matching the brief. Record kept here only.
- Node re-run (2026-10-14, `spread()` copied verbatim from Demo.tsx): E→A from A reached by day 0..4 = 0·0·0·0·1 (B day 4); from E 0·1·2·3·4. A→E from A 0·1·2·3·4; from E 0·0·0·0·1 (D day 4). Overlap from A and from E 0·1·2·3·4. Matches the spec table and brief claims 2 and 3.
- **Section unconfirmed:** references carry easley-kleinberg-2010 ch. 21 §21.6, which the brief marks "§ unconfirmed" (book fetch blocked). Someone with the PDF should confirm.
- Claim c6 (Morris and Kretzschmar 1997, AIDS 11(5)) **needs a human source check by the fact-checker, including citation details**. The disease is not named to learners; no health advice.
- owner.categoryManager is `cm-life` (the check requires the domain CM; the brief file belongs to cm-life-health-epidemiology).
- Format `storyboard-scrub`; interactions choice-before-reveal, scrubber-timeline, preset-buttons, milestone-gate. Recall question written by the builder. Explore hint is the spec's suggestion; the learning designer owns it and the reveal text, and is asked (by the review) to confirm the two-way payoff.
- Stage words: as the spec counts, 24 (rule 13, Day, Day 4, 3 chips, legend 4, "Reached of"). The spec does not count the five disc letters A–E; if single letters count, the stage is 29. Flagged for the learning designer, not changed.
- Seen on phone: in Overlap the four thick infected rows plus 16 rungs are busy at day 4; it reads, but the accessibility reviewer's 16-link ladder check (review routing) should look at it. In the reveal phase the kit's stage shrinks and the lesson body scrolls so the timeline (not the controls) is in view; the final state is visible.
- Not done: no illustration (brief says none).

## Revision v2 (demo-builder, 2026-10-14)

Light revision after the fact-check (NCM-1) and the static-diagram learner review. Version 1 -> 2.

- **c5 (fact-check dispute):** "overstates" -> "can overstate" in the reveal and the claim text. c5 is now `unverified` (checkedBy/On removed); fact-checker to re-check.
- **Overlap (learner finding 7):** the reveal no longer lists Overlap as another ordering. It has its own paragraph: "Overlap is a different change, not another order: every pair meets every day, and from E all four were reached." The citation line now says "Partnerships that overlap in time (concurrency) can spread infection further than the same ones in sequence (Morris and Kretzschmar, 1997)"; c6 text unchanged. The reveal still quotes only states the learner reached.
- **Legend (finding 1):** added swatches for "meeting done" (filled rung), "meeting to come" (hollow rung) and "infected stretch" (thick bar), drawn like the stage marks. Stage words rise by about 6; learning designer to judge the budget.
- **Title/hook (findings 3, 4):** title "Who can catch it, and when?"; hook "Four meetings link A to E in a line. A is infected. Who can catch it?"
- **Predict options** reordered to ["1","0","4"], answer 0 (correct first).
- Not changed: finding 6 (tap-E affordance), recall options, references (section_unconfirmed stays). spread() untouched, so no numbers changed.
- QA: QA_ONLY=contact-order-matters, port 3751, own dist .next-com2: lesson specs passed on phone and desktop; 2 failures in the feed spec ("subject chips filter the feed", phone and desktop) are not this lesson (not investigated). Walkthrough phone frames all viewed: legend fits, reveal fits.

## Revision v3 (demo-builder, 2026-10-14)

Polish after learner review r2 (static-diagram learner). Version 2 -> 3. spread() untouched, no numbers changed.

- **Reveal pin:** when the phase becomes reveal, the stage is set to A first, meetings run E to A, day 4 (1 of 4), the state paragraph 1 describes. Walkthrough frame 08 shows it. Caveat: the kit scrolls the lesson body in reveal, so rows A and B are cropped in the phone frame (C, D, E, "Reached 1 of 4" visible); that is kit layout, not changed.
- **Notation:** chips now read "A to E" / "E to A" / Overlap with a "Meetings run" label; the stem adds "(meetings run E to A)"; reveal says "When meetings run E to A ... When they run A to E".
- **Concurrency line:** paragraph 3 now says here every pair meets on each of days 1 to 4 (so infection can run both ways); the muted line begins "In real populations, partnerships that overlap in time (concurrency) ...", wording of c6 unchanged.
- **Tap E:** a "tap E" cue under the E disc (shown while E is not the first case) and hint "then tap the E circle to start from E".
- Claims: no claim text changed, so none reset to unverified. The reveal sentences for c3/c4 are reworded; fact-checker may want to re-read them. 
- QA: QA_ONLY=contact-order-matters port 3921, dist .next-ncm3: lesson specs pass on phone and desktop (10 passed); the same 2 feed-spec failures ("subject chips filter the feed") as v2, unrelated. check passes; tsc --noEmit clean (npm run typecheck was OOM-killed by shared memory; ran tsc directly). Phone frames 01, 03, 08 viewed.
