# Build note: sixteen-of-twenty-got-better (demo-builder, wave-j-probability, 2026-10-14)

Brief: `company/domains/briefs/probability.md` Round 4 item 57. Status draft, version 1. Claims c1-c3 unverified.

- Stage: one SVG, two rows of 20 person icons (head + body). Top "Took the pill · better: n of 20"; bottom "Took nothing", dashed outlines and "not shown yet" until the one-way Show button. Icons hollow while ill, filled (var(--good)) from their recovery day. Both rows use the brief's day list in two fixed orders (no randomness).
- Presets in DOM order: Day 3, Day 7, Show the no-pill group (disabled once shown, so it never presses without effect). Caption "Day d. Invented cold, invented pill. Filled = feels better."
- Milestones: day7 (day 7 shown), compare (no-pill row shown while the day is 7, in either order). Counts at day 7 recorded when compare fires; if the learner goes back to day 3 the caption keeps "(Day 7: 16 and 16.)".
- Departure from the brief: the per-row readouts are SVG labels next to each row (one picture, fewer blocks).

## Pre-flight v1
1. **Title and hook.** "16 of 20 got better. Did the pill work?" / "Most people who took a new pill felt better within a week. What does that tell you?" Neither names a comparison group.
2. **Options.** "More people taking the pill" / "How fast each of the 16 recovered" / "How many get better with no pill": none numbered, similar length.
3. **Locked stage.** Both rows hollow at day 0, bottom row dashed "not shown yet", buttons disabled.
4. **Reveal values.** "16 of 20 ... with the pill" and "{n} of 20" for nothing: (b) milestone compare, recorded at day 7 (16 and 16).
5. **QA path.** Day 3 (3 of 20) -> Day 7 (16 of 20, day7) -> Show (16 of 20, compare). At the reveal both rows are on stage at day 7 with "better: 16 of 20" each.
6. **Reset.** No reset control. Reveal on the QA path: "By day 7, 16 of 20 felt better with the pill. The group that took nothing: 16 of 20, the same. In this model colds clear up by themselves, so getting better after the pill was going to happen anyway. More pill-takers or faster stories would not change that. Only the comparison row shows what the pill added, and here it added nothing." (63 words)
7. **Phone fit.** See "Measurements" below.
