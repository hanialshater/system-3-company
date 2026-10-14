# Build note: enemy-of-my-enemy

builder: demo-builder · 2026-10-14 · session 2 (NCM batch 1, brief 2 in `company/domains/briefs/math.discrete.md`) · kept from evaluators until they report.

- **Rules followed:** interim network-stage rules, `company/design/reviews/2026-10-14-design-lead-ncm-rulings.md` §2. This is the second hand-built network stage of the rule-of-two pair, alongside `news-comes-from-acquaintances`. That lesson was not in my worktree, so I could not copy its constants. Mine are node r 16, handle r 12 (24 px drawn), hit target 44 × 44, accent ring r 16 on the last-flipped handle, and a legend line under the stage. Design review should reconcile the two lessons before the concept is written.
- **Geometry (§2.1):** K5 on a circle of R = 135 around (170, 152), in a viewBox of 340 × 284. In node, handle centres are at least 49.0 px apart and at least 79.4 px from any node centre. The tap targets are HTML buttons (`data-qa="control"`, `aria-label` "Pair A–B, friends", `aria-pressed`). They are overlaid on a fixed-aspect board, so they keep their 44 px on screen and are real disabled buttons while locked. I did not need the brief's fallback gesture ("tap two people").
- **State (§2.3, §2.4):** friends are a solid 3 px line with a filled `--good-fill` "+" handle, and enemies a dashed 2 px line with a hollow "−" handle. Unbalanced trios get a soft `--bad-fill` tint, which repeats the count shown in the readout ("Unbalanced 3 of 10"), so the cue is never colour alone. Nodes have a single state. **Deviation:** the "+" glyph uses a fixed dark ink #0d0f14 instead of `--bg`, because `--good-fill` keeps the same colour in light theme and `--bg` ink on it would be light-on-light.
- **Start state and QA path:** the stage starts with all pairs enemies (five camps, 10 unbalanced). The DOM order of the edges is AB, BC, AC, DE, then the six cross pairs. QA presses each control once and passes through these states:
  - AB: 4 camps, 7 unbalanced.
  - BC: mixed, 6.
  - AC: **ABC | D | E, 3**. This reaches the "three" milestone.
  - DE: **ABC | DE, 0**. This reaches the "zero" milestone.
  - The six cross pairs end at ABCDE, 0.
  - "All enemies" gives 10.
  - "3 camps" gives **ABC | D | E, 3**, which is what the stage shows at the reveal.

  The node replay is in claim c5.
- **Gating:** two milestones. "zero" means Unbalanced reached 0 by a tap; presets cannot reach it. "three" means any state with exactly 3 camps, whether reached by taps or by the chip. The reveal quotes the camp splits the learner reached at 0 and the fewest unbalanced trios they saw with three camps.
- **Hidden while locked:** the counts, the camps readout and the tints. The all-enemies stage is visible during predict.
- **Checks in node** (scratchpad `eme-check.mjs`, same rule as `unbalancedTrios()`):
  - Of the 1,024 settings, 16 are balanced: 1 is one camp, 15 are two camps, and 0 are balanced without being a camp split.
  - Three camps: a 3-1-1 split leaves 3 unbalanced and a 2-2-1 split leaves 4.
  - By number of camps, the unbalanced count is 1 → 0, 2 → 0, 3 → 3 or 4, 4 → 7, 5 → 10.
  - These match the brief.
- **Sections unconfirmed:** `curriculum.references` cites ch. 5 §5.1 and §5.2, both marked § unconfirmed as in the brief. The fact-checker confirms them against the PDF.
- **Attribution:** "Cartwright and Harary, 1956" appears in the reveal, as the brief's payoff asks. Claim c6 says the attribution is unverified, and the fact-checker should confirm it before publish. If it fails, cut the parenthesis.
- **Owner field:** the brief is from cm-math-discrete, but `company check` requires `owner.categoryManager` = `cm-math` for the math domain, so meta.json says cm-math.
- **Text:**
  - Stage text is about 20 words: rule line, legend, two readout labels, two chips.
  - The reveal is about 87 words on the QA path.
  - In the reveal, camp splits use non-breaking spaces plus word joiners around "|" (a line-break opportunity in Unicode) so "ABC | DE" does not wrap. This was found in the first phone screenshot.
- **Known limits:**
  - On the phone, during predict the chip row is below the fold of the stage, which scrolls. They are locked anyway.
  - In light theme the legend's tint triangle is faint.

## Revision v2 (2026-10-14, session 2, demo-builder)

Inputs: learner review saying-only, fact-check pass NCM-1 (c6 disputed).

- **Reveal jumped from "3 camps never balance" to "one camp or two" (finding 5):** the reveal now says every Unbalanced = 0 setting the learner reached showed clean camps, and that for five people all 16 balanced settings are camp splits (claim c2), before the three-camps argument.
- **"mixed" unexplained (finding 3):** readout renamed "not camps". New third milestone "mixed": the learner must tap into a not-camps setting. The reveal quotes its unbalanced count (QA path: 6) beside the 0-unbalanced states, so the pairing is seen, not told. The explore hint names it.
- **Preset shortcut (finding 7):** the "three" milestone now counts only taps; the 3 camps chip no longer reaches it.
- **Answer hints (finding 2):** hook changed to "What does that force on a whole group?"; predict text shortened. Options unchanged; "At most 2" may still read as the natural pick (open).
- **c6:** claim text and reveal credit Harary (1953) and Cartwright and Harary (1956) in the fact-checker's wording; c6 is now unverified. Other claim texts unchanged (c2 address line extended). curriculum.references untouched.
- **Not done:** finding 4 (overlapping tints) needs a design decision; the count carries it.
- Version 2. Reveal about 100 words. No new numbers (same rule).
- QA: the slug's contract passed on phone and desktop with QA_PORT 3721; the 2 failures in that run are the feed spec "subject chips filter the feed" (not this lesson). Walkthrough (phone, 14 frames) viewed.
