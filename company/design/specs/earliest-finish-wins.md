# Spec: earliest-finish-wins

owner: interaction-designer (Rafael) · 2026-10-14 · status: draft, for design review · brief: `company/domains/briefs/cs.algorithms.md` #8 · wireframe: `earliest-finish-wins.svg`

**Format: Side-by-side comparison (three lanes, stacked).** The misconception is that "any sensible greedy rule" behaves the same. Three rooms, the same four talks, one rule per room, one shared step: the difference sits in the rows, at the same moment. On a 390 px phone the lanes stack vertically and share one time axis, which is the comparison format's "panels sharing one control".

## Answer check (designer node run, 2026-10-14)
Talks as half-open intervals [start, end): A 0–10, B 1–4, C 3–5, D 4–7.
- Earliest start: A booked; B, C and D clash. **1.**
- Shortest (C 2 h; B and D tie at 3 h, A 10 h): C booked; B, D and A clash. **1.**
- Earliest finish: B (ends 4) booked; A and C clash; D (starts 4) booked. **2.**
- Maximum over all 16 subsets: **2.** The answer (C) holds.

**Brief problem: the answer depends on an unstated rule.** B ends at 4 and D starts at 4. With closed intervals (touching talks clash), earliest finish also books only 1 talk and all three rules tie. The question must say that touching is allowed. This spec puts "A talk may start the minute another ends" on the stage, and the question text should carry it too. cm-cs to add this to the brief and claim 1.
**Minor:** the slug names the answer, and it shows in the lesson URL `/d/earliest-finish-wins`. The card title does not ("Three rules, one room"). cm-cs may want a neutral slug before build.

## Stage at 390×844 (~500 px)
1. Rule line (muted, 2 lines, 15 words): "Same four talks, one room per rule. / A talk may start the minute another ends."
2. **Book next in every room**: full width.
3. Three lanes, each 350 × 118 px: lane name ("Earliest start first", "Shortest first", "Earliest finish first") and "Booked: ?" on the left, the lane's own **Book next** (110 × 44) on the right. Below are four bar rows (A, B, C, D in fixed alphabetical order in every lane, so row order hints at nothing). Each bar is labelled "B 1–4".
4. A shared axis, 0–10, labelled "hour" (32 px per hour). The axis limits are the talks' span, not the answer.

## Controls, in DOM order (4)
| # | Kind | Label | Behaviour |
|---|---|---|---|
| 1 | Control | "Book next in every room" | each lane that still has an open talk books the next one by its rule. The booked bar fills `--domain`, and every bar that now clashes turns grey, dashed, with "clash" in its label. Disabled when no lane has an open talk |
| 2 | Control | "Book next" (lane 1, aria "Book next: earliest start") | the same step, for this lane only. Disabled when the lane is full |
| 3 | Control | "Book next" (lane 2, aria "…: shortest") | same |
| 4 | Control | "Book next" (lane 3, aria "…: earliest finish") | same |

All three lanes get their own button, so no lane is singled out on the locked stage. There is no "book all", and every press is one booking. All four controls render at first paint, disabled while `locked`.

QA path: shared (lanes 1 and 2 are full at 1, so their buttons disable; lane 3 has B booked with "D still fits"; milestone 1) · lane 1 and lane 2 skipped (disabled) · lane 3 (D booked, A and C grey; lane 3 full at 2; milestone 2). A learner may also use only the lane buttons. They reach the same end state in 4 presses.

## States
- **Predict:** all bars open (white, outlined), "Booked: ?" in each lane, all buttons disabled. No rule order is shown, because the learner must imagine each rule.
- **After the shared press:** lane 1 is all grey except A ("Booked: 1 · full"). Lane 2 is all grey except C ("1 · full"). Lane 3 has B booked, A and C grey and D still white ("1 · D still fits"). This frame is the lesson: two rooms are full after one talk, one is not.
- **After lane 3's press:** D books. "Booked: 2 · full".
- **Reveal:** the stage stays as left (all lanes full). Lane 3 gets a 2 px `--fg` outline. The reveal quotes it:
  > Earliest start took A (0–10) and the room was full: 1 talk. Shortest took C (3–5), which clashed with B and D: 1 talk. Earliest finish took B, which ended at 4, so D (4–7) still fit: 2 talks. A clashes with every talk and B, C, D overlap in pairs, so no room holds 3. Ending first leaves the most day for what is left, and swapping it into any schedule never makes it worse. (≈ 75 words)

Milestones (`minInteractions=2`): `first-picks` (every lane has booked at least one talk), `all-full` (no lane has an open talk).

## Shown, not told
The learner watches A's long bar grey out a whole room, and C's short bar sit across both B and D. B's early end leaves D white, the only open bar on the stage. The reveal points at bars they greyed themselves. The exchange argument gets one clause, as the brief's payoff, sourced to CLRS 16.1.

## Colour and access
Booked: `--domain` fill with `--fg` bold label. Clash: `--bg-3` fill, dashed `--muted` outline, and the word "clash" (never colour alone). Open: white with an `--fg` outline. Lane counts are text. Lane buttons are 110 × 44 and the shared one full width × 44, using `.tap`. No illustration.

## Claims this spec adds
"A talk may start the minute another ends" (the convention: a derivation the claim must state). "No room holds 3" (simulation over the subsets, brief claim 1). The swap sentence is brief claim 2.
