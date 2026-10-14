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
