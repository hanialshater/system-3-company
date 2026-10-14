# Spec: contact-order-matters

owner: interaction-designer (Rafael) · 2026-10-14 · status: draft, for design review · brief: `company/domains/briefs/life.health-epidemiology.md` #1 (NCM batch 1) · wireframe: `contact-order-matters.svg` (4 frames: predict, E→A at day 4, A→E at day 4, QA end)

**Design review (design lead, 2026-10-14): approved with changes. The A/E buttons, the Overlap drawing and the two-way milestone with E are accepted.** Changes: each pair's link gets a fixed ±6 px x offset, so Overlap rungs do not join into one line; future links are muted *and* have hollow end dots; "first case" uses the shared bullseye; person buttons are ≥ 44 CSS px native buttons. Details in `company/design/reviews/2026-10-14-design-review-ncm-specs.md` §5.

**Format: Storyboard / scrub.** Time is the axis and the payoff is a direction: infection can only travel forward in time. The one representation is a **dated contact timeline**, with one row per person (A to E, top to bottom) and one column per day (0 to 4). Each contact is a short vertical link between two neighbouring rows, drawn in the column of the day it happens. Infection spreads **rightward along a person's row** and **across a link only at its day**, never leftward. The order chips move the links between columns, and the scrubber moves a cursor through the days. This is not a network stage (no node-link graph is tapped), but it follows that stage's colour, motion and tap-target rules.

## Brief check (node, 2026-10-14, the exact rule below)
| Order | First A, by day 0·1·2·3·4 | Reached from A | Reached from E |
|---|---|---|---|
| E→A (D-E day 1, C-D 2, B-C 3, A-B 4) | 0·0·0·0·1 | **1** (B, day 4) | 4 |
| A→E (A-B day 1, B-C 2, C-D 3, D-E 4) | 0·1·2·3·4 | **4** | 1 (D, day 4) |
| Overlap (every pair meets on each of days 1–4) | 0·1·2·3·4 | **4** | **4** |

All 24 one-at-a-time orders from A give 1 person in 12 orders, 2 in 8, 3 in 3 and 4 in 1, which matches the brief. **The brief's answer (B, 1) and its claims 2 and 3 hold.**

## The rule (on the card, and identical in code, `meta.json` and the fact-check)
Days 1 to 4, and the first case is infected on day 0. In **A→E** and **E→A** each of the four contacts happens on one day. In **Overlap** every pair meets on **each** of days 1 to 4. On day d, a contact infects the other person if one of the pair was infected **on an earlier day** (by the end of day d − 1). Every such contact transmits: a deliberately certain toy rule (claim 5 says real contacts are not). There is no relay on the same day, so even in Overlap infection moves at most one link per day.
Rule line on the stage (13 words, two lines): **"Infection crosses a contact whenever one side was infected on an earlier day."**

## Stage at 390×844 (about 430 px at predict, about 470 px in explore)
1. Rule line (muted).
2. **Scrubber row**: slider "Day" 0–4 (step 1, starts at 0), with the **Day 4** button at its right end.
3. **Order chips**: "A→E" · "E→A" · "Overlap". The `aria-label`s read "Order A to E" and so on.
4. **Timeline**: SVG `viewBox="0 0 340 244"`, scaled to the card width. Rows A, B, C, D, E at y = 28, 72, 116, 160, 204. Person discs (r = 16, letter inside, ≥ 13 px) at x = 24. Day columns 0–4 at x = 76, 132, 188, 244, 300, with axis numbers under them (y = 236). Each row is a thin dashed `--line` track from x = 44 to 326. A contact is a 2.5 px `--fg` vertical link with 4 px end dots. Overlap draws each pair's link in all four columns (16 links). The cursor is a 2 px `--accent` line at the current day. Everything to the right of the cursor is dimmed (links in `--muted`, tracks unchanged), so the future is visible but plainly not yet played.
5. Legend (4 words): "◉ first case · ● infected · ○ healthy".
6. Readout: "Reached 1 of 4" (people other than the first case who are infected by the current day).

### States of a person (never colour alone)
| State | Drawing |
|---|---|
| First case | filled disc, heavy 4.5 px rim, and the row thick (5 px `--fg`) from day 0 to the cursor |
| Infected by the cursor day | filled disc, and the row thick from the day of infection to the cursor |
| Healthy (so far) | hollow disc, thin dashed row |

A and E have a dashed 44 px hit ring (r = 22), which is the visual cue that they can be tapped. Their `aria-label`s are "Make A the first case" and "Make E the first case", with `aria-pressed` on the current first case. B, C and D are not buttons. A at y = 28 and E at y = 204 are 176 px apart.

## Controls, in DOM order (7)
The controls sit **above** the timeline, so the person buttons come last in the DOM. That ordering lets the QA path reach every milestone (see below).
| # | Kind | Label | Behaviour |
|---|---|---|---|
| 1 | Slider | "Day" 0–4, step 1 | moves the cursor; links and rows redraw to that day (scrub back allowed) |
| 2 | Control | "Day 4" | sets the day to 4. Disabled at day 4 |
| 3–5 | Control chips | "A→E" · "E→A" · "Overlap" | start: **E→A active** (disabled, `className="active"`), the question's own order. A chip re-dates the links (they slide between columns, ≤ 300 ms, instant under reduced motion) and **keeps the current day** |
| 6–7 | Person buttons | "A" · "E" | make that person the only first case and **keep the day and the order**. The current first case is disabled. Start: A |

All 7 render at first paint, disabled while `locked`. There is no reset, because the slider takes the learner back to day 0.

### QA path (each enabled control once, in DOM order; re-run in node)
| Press | Stage after |
|---|---|
| Slider (2 arrow presses) | E→A, first A, day 2: D-E and C-D have happened, nobody reached. "Reached 0 of 4" |
| Day 4 | E→A, first A, day 4: **only B**, on day 4. Milestone `one-way` (the answer) |
| A→E | A→E, first A, day 4: B, C, D, E, one per day down the staircase. Milestone `forward` |
| E→A | back to the answer state (the chip is enabled again because it is no longer active) |
| Overlap | Overlap, first A, day 4: all four reached |
| A | disabled (already the first case), skipped |
| E | **Overlap, first E, day 4: D, C, B, A all reached, one per day upward. "Reached 4 of 4"**. Milestone `two-way` |

**End state:** Overlap reaching everyone from the *other* end, which is the reveal's last idea (overlap opens both directions). The answer state was the second press, and it is also where every learner starts: the default order is the question's.

## States
- **Predict (locked):** this is the brief's "diagram with no dates". All four links are stacked in **one undated column** marked "?" (they join into one line from A to E). There is no day axis and no cursor. A is filled and ringed. Readout "Reached ?". The order is only in the question, so the answer is not on the stage.
- **Unlock:** the links slide out of the "?" column to their E→A days (D-E on day 1 … A-B on day 4), forming a staircase that climbs **up** to the right. Cursor at day 0.
- **Scrubbing E→A from A:** nothing happens until day 4. By then every link B could have used is behind the cursor, so only B lights.
- **A→E from A:** the staircase runs **down** to the right, and infection follows it one row per day.
- **Overlap:** a full ladder in every column. From either end it moves one rung per day and reaches everyone by day 4.
- **Reveal:** no pin. The stage keeps the learner's last state (on the QA path, Overlap from E).

Milestones (`minInteractions=3`): `one-way` (E→A, first A, day 4: reached 1), `forward` (A→E, first A, day 4: reached 4), `two-way` (Overlap, first E, day 4: reached 4). Call `interact()` only for these. Suggested explore hint (the learning designer owns the text): "Take each order to day 4, then tap E."

## What the reveal may quote
Always (all are milestones): "In the order E→A, A met B only on day 4, after the other contacts were over, so only B was reached. In the order A→E all four were. With Overlap, all four were reached from E too." **Only if reached:** "From E, A→E reached only D" (A→E, first E, day 4). The brief's 1/k! result (and "12 of 24 orders reach only one person") cannot be reached on this stage. Keep it out of the reveal, or state it as told arithmetic with its own claim, not as something the learner saw. The reveal ends on the payoff and the claim 4 and 5 caveats, with no disease named and no advice.

## Shown, not told
The learner's own scrub shows the infection waiting on A's row while the links it needed slide past the cursor in the wrong order. The two staircases (up-right and down-right) are the same four links. The undated column at predict is the misconception's picture, and the dated timeline is the correction.

## Stage word count (≤ 25, numbers not counted; single letters counted as words)
| Item | Words |
|---|---|
| Rule line | 13 |
| Slider label "Day" · button "Day 4" | 1 + 1 |
| Chips "A→E" · "E→A" · "Overlap" | 3 |
| Legend "first case · infected · healthy" | 4 |
| Readout "Reached … of …" | 2 |
| Predict column mark "?" | 0 |
| **Total** | **24** (predict and explore) |

## Colour and access
`--fg` for links, discs and infected rows. `--accent` for the cursor only. Dimmed future in `--muted`. Infection is shown by disc fill plus row thickness, not hue. Chips are 108 × 44 px. Person targets are 44 px (r = 22) and 176 px apart. SVG `aria-label`: "Order E to A, first case A, day 4: reached 1 of 4, B". The accessibility reviewer checks that the 16-link Overlap ladder reads at 390 px, and that the dimmed future links are distinct from the past without colour.

## Brief problems (for cm-life-health-epidemiology and the learning designer; I did not change the lesson)
1. **The Overlap timing was not defined.** The brief's node check uses months and intervals. This spec fixes the rule: each pair meets on each of days 1 to 4, with no relay on the same day. Every number the brief quotes is unchanged. Claim 3 must cite this rule. A same-day-relay rule would reach everyone on day 1, which changes the days but not the counts.
2. **From A, Overlap looks the same as A→E** (4 reached, one per day). The concurrency point only shows when E is the first case. So `two-way` (Overlap from E) is a required milestone, and the QA path ends on it. The learning designer should confirm this is the intended payoff (it is in the brief's payoff line).
3. **A missing control.** The brief lists "three order chips plus a scrubber", but its own reachability note ("chips apply to whichever end the learner marks infected") needs a way to mark the end. The spec adds two person buttons (A, E), so there are 7 controls in all.
4. The 1/k! stretch is not reachable on the stage (see "What the reveal may quote").

## Claims this spec adds or depends on
The day-by-day reach for the three orders and both ends (table above) is simulation from the rule (claims 2 and 3). It is re-run by the builder from the rule text, not from this table.
