# Build note: cluster-stops-the-cascade (demo-builder, 2026-10-14)

Kept from evaluators until they report.

Built from brief 3 in `company/domains/briefs/math.discrete.md` and the spec `company/design/specs/cluster-stops-the-cascade.md`. Where they differ, the design review wins: `company/design/reviews/2026-10-14-design-review-ncm-specs.md` §4 (binding changes 1 to 5, and the legend-swatch rule for all five specs). The network-stage rules and amended condition 3 come from `company/design/reviews/2026-10-14-design-lead-ncm-rulings.md` §1 and §2.

## What the stage does
- Graph: 12 people, **14 edges** (path 0–7, bridge 7–8, K4 on 8–11). Positions come from the spec, shifted down 14 px. `viewBox` is 340 × 290 (review change 2). The outline is x 140–268, y 156–284.
- Rule: q = 1/2 with **synchronous** rounds. Every not-yet person is tested against the previous round's state, and adopters stay adopted. `simulate()` in Demo.tsx is the same code as the node check.
- States (review change 1):
  - Started: a filled disc with an inner `--bg` ring at r 10, 1.5 px (bullseye), with no outer ring.
  - Adopted: filled.
  - Not yet: hollow.
  - New: a 3 px `--accent` ring at r 21, shown for that round only.
  - Holdouts: a dashed rounded rectangle, plus a legend entry. That entry's space is reserved with `visibility: hidden`, so nothing jumps.
- Legend: every entry is an inline SVG swatch drawn by the same `Disc` component as the stage (the review's swatch rule). No Unicode glyphs are used.
- Controls (16, review change 5): 12 person buttons in DOM order 0–7, 9, 10, 11, 8, then Step, To the end, Start 8,9 and Start 0,1.
  - Person buttons are native `<button data-qa="control">` overlays, 44 × 44 CSS px at any scale.
  - Each person has `aria-label` "Person N, <state>, k of n friends adopted" and `aria-pressed`.
  - Chip rule: the active chip is disabled at round 0, and after that it restarts its own run. The other chip goes to round 0 if the run is not final, and to its own final if it is.
  - Review change 4: the active chip's aria-label becomes "Watch start X again" when enabled. In the reveal phase, Step, To the end and both chips are disabled, and the stage is pinned to the 0,1 final. Person focus stays enabled.
- Milestones: `stopped` (0,1 final) and `planted` (8,9 final). `minInteractions` is 2.
- Motion: disc fill transitions in 250 ms and the new ring fades in over 250 ms. Both are off under `prefers-reduced-motion`.

## Departures, each with a reason
- **Pill anchors for 6 and 7 differ from review change 3.** The review allows this if the placement passes the same check (§4, the objection on change 3).
  - The review puts 6 and 7 above at (0, −32). That puts the pill in the 68 px gap between rows, where it clears the r = 21 ring above and below by less than 4 px.
  - I used 7 **left** (−52, 0): empty space, 12 px clear of 7's ring, and above the outline's top.
  - I used 6 **upper-left** (−34, −34): the centre of the empty square 2-3-6-7, at least 6 px clear of every disc and ring and away from all edges.
  - The other anchors are offset 36 instead of 32 (0–4 above, 5 below), so the 18 px pill clears the r = 21 ring by more than 4 px. The top-row pill top is at y = 5.
  - 8 and 10 sit left at (−52, 0), and 9 and 11 right at (+52, 0), as the review says. At the 0,1 final they clear the outline by 5 px (checked in the phone screenshot).
- **The predict question names the pair:** "People 0 and 1 adopt first." The brief says "Two people adopt first". On the stage the bullseye shows which two, but naming them removes a guess that is not the point.
- **`owner.categoryManager` is `cm-math`, not `cm-math-discrete`.** `npm run check` requires `cm-math` for the math domain. cm-math-discrete owns the brief.
- **Claim c1 support is `source`.** The check rejects `definition`. The brief's "support: definition" is recorded in the source text.

## Numbers (node, 2026-10-14, the exact rule of Demo.tsx)
Script: session scratchpad `cascade.mjs`, not in the repo.
- 14 edges. The closest centres are 68 apart.
- Start 0,1: rounds [[0,1],[2],[3],[4],[5],[6],[7]]. The run is final at round 6 with 8 of 12. At the final, the pills are 8 = 1/4 and 9, 10, 11 = 0/3.
- Start 8,9: rounds [[8,9],[7,10,11],[6],[5],[4],[3],[2],[1],[0]]. All 12 by round 8. At the final, 8 = 4/4.
- Inside the group: 8 has 3 of 4 friends inside, and 9, 10, 11 have 3 of 3.
- Iff check: 298 seed sets of size 1–3, 132 incomplete, 0 contradictions.
- All of this matches the brief and spec.

## Claims
There are 9 claims, all `unverified`. Builders never verify their own claims.
- c7 is the theorem: a citation plus the brute-force check.
- c9 backs the recall card, which I wrote.

**Section unconfirmed:** `curriculum.references` gives easley-kleinberg-2010 ch. 19 §19.2 with a note. The brief marks §19.2–19.3 as unconfirmed, because the book page was unreachable. The fact-checker should confirm against the PDF.

## Reveal
The reveal is 89 words in the version that quotes person 8. It quotes only states that are reached on every unlocking path: the 0,1 final and the 8,9 final.
- "Person 8 had only 1 of 4 friends adopted" appears only if the learner focused 8 on the 0,1 final, or still has 8 focused at reveal, when the stage is pinned to that final.
- Otherwise the reveal says "Each has most of its friends inside the group."

The reveal text is the builder's draft. It belongs to the learning designer.

## QA
Pass on phone and desktop (`2026-10-14-qa.md`). I looked at every phone screenshot and the walkthrough sheet.

## Open, for others
- **visual-designer + accessibility-reviewer** (build-time design review, review §Routing):
  - the bullseye vs plain filled at 390 px;
  - the dashed outline vs the K4 diagonals;
  - whether the "1/4" pill reads as adopted friends / friends;
  - the legend swatches at 14 px (the "started" swatch is small).
- **Predict state:** the chip row sits below the stage's scroll fold on a phone. It is rendered and disabled; it becomes visible once predict collapses.
- **Reveal phase:** the kit scrolls the card, so the top row of the graph is off-screen. The outline, the "1/4" pill and the readout stay visible.
- No hero illustration was made.

## Revision v2 (demo-builder, 2026-10-14)
Inputs: learner review `2026-10-14-learner-threshold-rule-only.md`, fact-check Pass NCM-1 (9/9 verified, nothing disputed).
- **Why-it-stops step told, not shown (finding 1, 6).** Tapping a holdout at the 0,1 final now replaces the rule line (sticky at the top of the stage) with "8: 1 of 4 friends adopted; 3 of 4 in the group, so at most 1 (needs 2)." For 9, 10, 11: "0 of 3 friends adopted; 3 of 3 in the group, so at most 0 (needs 2)." Other people get "n: k of d friends adopted." The reveal now spells out the complement step: none inside has adopted, so at most 1 of 4 (or 0 of 3), under half, so none can join first.
- **Predict tests the misconception (finding 2).** "People 0 and 1 adopt first and the idea stops at 8 of 12. What would get it to all 12?" Options: many more starters / nothing, out of reach / two starters somewhere else. Correct is the LAST option (answer 2). Recall options also reordered, correct last (answer 2).
- **Pill key (finding 5).** The focus line states "n of d friends adopted" beside the n/d pill.
- **Title/hook (finding 3).** "Why a spreading idea stops" / "Two people adopt an idea. It spreads friend to friend, then stops short. What fixes that?" (89 chars). While locked, the second chip reads "Another start" instead of "Start 8,9".
- **Reveal** leads with the answer, quotes "Person N had a of d friends adopted" only for a group member the learner focused on the 0,1 final.
- Controls still 16. Stage text with a person focused is about 28 words (rule slot swapped, legend and readout kept); one slot reuse, still over 25 by a few words: flagged for design review.
- Numbers re-run in node with the exact rule: 0,1 final round 6, 8 adopted; 8,9 final round 8, 12 adopted; inside counts 8 3/4, others 3/3; adopted at 0,1 final 8 1/4, others 0/3; needs 2 each.
- Claims now **unverified**: c4, c5, c6 (text changed). c1-c3, c7-c9 unchanged text and still verified. Hook/title are not claims. Predict option texts are covered by c6.
- QA: phone and desktop pass, NEXT_DIST_DIR=.next-casc2, QA_PORT=3711, QA_OUT=test-results-casc2, 0 retries. Walkthrough looked at (predict, 0,1 final with 8 focused, reveal).
- Known: chip row still below the fold in predict (rendered, disabled). Sticky rule line added because the stage scroll clipped the new focus line.
