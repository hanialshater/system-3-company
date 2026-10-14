# Spec: cluster-stops-the-cascade

owner: interaction-designer (Rafael) · 2026-10-14 · status: draft, for design review (the design lead approves it; the review is chaired by the visual designer with the accessibility reviewer) · brief: `company/domains/briefs/math.discrete.md` #3 · wireframe: `cluster-stops-the-cascade.svg` (4 frames: predict, round 3, QA end, the other start's end)

**Format: Single card with Step on the interim network stage**, per the design-lead ruling `company/design/reviews/2026-10-14-design-lead-ncm-rulings.md` §1 (not ABM) and §2 (network stage). The payoff is a place on the graph: the learner steps the rule round by round, sees it stall at one group, and taps a person in that group to read why.

## Brief check (node, 2026-10-14, the exact rule below)
- Graph: path 0-1-2-3-4-5-6-7, link 7-8, and 8, 9, 10, 11 all linked to each other. That is **14 edges** (7 on the path, 1 bridge, 6 in the group). The brief's Check line says "7 + 6 = 13 edges", which leaves out 7-8. The adjacency it describes is right; only the count is wrong (see "Brief problems").
- Start 0,1: one person joins per round (2, 3, 4, 5, 6, 7) and the run stops at **round 6 with 8 of 12** adopted. Holdouts are {8, 9, 10, 11}. Person 8 has 1 of 4 friends adopted, and 9, 10 and 11 each have 0 of 3. Inside the group, 8 has 3 of 4 friends and the others 3 of 3.
- Start 8,9: round 1 adds 7, 10 and 11, then 6, 5, 4, 3, 2, 1, 0. **All 12 by round 8.**
- The "iff" check: over all 298 seed sets of size 1 to 3, there are 132 incomplete cascades and 0 contradictions. **The brief's answer (8) and its claims 2 to 5 hold.**

## The rule (on the card, and identical in code, `meta.json` and the fact-check)
Threshold q = 1/2. Round 0 is the start pair. In each round, every person who has not yet adopted is tested **against the state at the end of the previous round** (synchronous update). That person adopts if (adopted friends) / (friends) ≥ 1/2. Adopters stay adopted. A run is **final** when a round would add nobody. The brief's round counts assume this synchronous rule, so a builder who updates one person at a time gets different rounds.

Rule line on the stage (8 words): **"Anyone joins once at least half their friends have."** This is the question's own wording, with the threshold in words (ruling condition 2).

## Stage at 390×844 (about 470 px at predict, about 560 px in explore)
1. Rule line (muted).
2. **Graph**: SVG `viewBox="0 0 340 276"`, scaled to the card width. Positions are hand-placed constants and never move (§2.1):
   `0 (34,36) · 1 (102,36) · 2 (170,36) · 3 (238,36) · 4 (306,36) · 5 (306,104) · 6 (238,104) · 7 (170,104) · 8 (170,172) · 9 (238,172) · 10 (170,240) · 11 (238,240)`.
   The path snakes along the top row and back along the second, then drops from 7 into the group as a square with both diagonals. The closest centres are 68 px apart (rule: ≥ 48). Discs have r = 16 and a hit circle of r = 22. Names are the digits inside the disc, ≥ 13 px. Edges are 2 px `--fg`. No edges are tappable.
3. Legend, one line (6 words): "◉ started · ● adopted · ○ not yet · ◌ new · ⬚ holdouts". The "holdouts" entry appears **only** while the outline is drawn. Its space is reserved, so nothing jumps.
4. Readout: "Adopted 2 of 12 · round 0". The word "· final" is added once the run is final.
5. Controls, row 1: **Step** · **To the end**. Row 2: **Start 8,9** · **Start 0,1** (chips). Every control is ≥ 44 px tall (`.tap`).

### Node states (ruling condition 4; never colour alone)
| State | Drawing |
|---|---|
| Started (round 0 pair) | filled disc, heavy 4.5 px rim and an outer ring |
| Adopted | filled `--fg` disc, `--bg` digit |
| Not yet | hollow disc, 2 px `--fg` rim, `--fg` digit |
| Adopted this round | adopted, plus a 3 px `--accent` ring at r = 21, **for that round only** (in the final state: the last round's joiners) |
| Holdouts (final, if any) | dashed 2 px `--fg` rounded rectangle around the people who never adopted (for start 0,1: x 140–268, y 142–270, which clears 7 and 6). Legend entry "⬚ holdouts" |

### Tapping a person (optional, at most one pill on the stage)
Every person is a real `<button>` laid over its disc. The `aria-label` is "Person 8, not yet adopted, 1 of 4 friends adopted" and `aria-pressed` is set when the person is focused. A tap **focuses** that person: their links thicken to 3.5 px, and a pill beside them shows **adopted friends / friends** ("1/4", 3 characters, 0 words). Tapping a different person moves the focus, and tapping the focused person clears it. Focus survives Step, To the end and the chips, and the pill updates live. This is ruling condition 5's "count only on the tapped node": no counts are printed on every node.
Pill anchors (offset from the centre; only one is ever shown, and none overlaps an edge at 390 px): top row (0–4) above (0, −30); 5 and 6 below (0, +30); 7 lower left (−36, +26); 8 and 10 left (−38, 0); 9 and 11 right (+38, 0).

## Controls, in DOM order (16: 12 people, then 4 controls)
| # | Kind | Label | Behaviour |
|---|---|---|---|
| 1–12 | Person buttons, DOM order **0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 8** | digit | focus as above. The bridge person 8 is last, so the QA path leaves the focus on the one holdout who has an adopted friend |
| 13 | Control | "Step" | runs one round (≤ 300 ms fade/ring, instant under `prefers-reduced-motion`). Disabled when final |
| 14 | Control | "To the end" | jumps to the final state with no replay (ruling condition 6). Disabled when final |
| 15 | Control chip | "Start 8,9" | see the chip rule |
| 16 | Control chip | "Start 0,1" | starts active. See the chip rule |

**Chip rule (start sets are fixed by the brief and are never tapped onto nodes, per ruling condition 1):**
- **The active chip** is disabled at round 0. After that it restarts its own run at round 0, which lets the learner watch a run again.
- **The other chip**, if the current run is **not final**, starts that set at round 0. This is the ruling's "returns to round 0".
- **The other chip**, if the current run **is final**, shows that set's **final** state. The pattern is the comparison default the design lead approved for ABM in `mild-preferences-sharp-divides`: after a finished run, the parameter change shows the end. The learner can still watch that run step by step by pressing its chip again, since the active chip restarts it.

The chips are ordered "8,9" then "0,1" because the QA path must end on the stopped run (see below). All 16 controls render at first paint and are disabled while `locked`. There are exactly 16 controls, so QA presses every one of them. No Reset button, because the chips do that job and nothing ever empties the stage.

### QA path (each enabled control once, in DOM order; re-run in node)
| Press | Stage after |
|---|---|
| people 0 … 7, 9, 10, 11, 8 | start 0,1, round 0, 2 of 12. The focus moves each time and ends on 8 with the pill "0/4" |
| Step | round 1, 3 of 12, ring on 2 |
| To the end | **round 6, 8 of 12, final, holdouts 8–11 outlined**, pill "1/4". Milestone `stopped` |
| Start 8,9 | (the run is final) the 8,9 final: round 8, 12 of 12, no outline, pill "4/4". Milestone `planted` |
| Start 0,1 | (the run is final) back to the **0,1 final: 8 of 12, round 6, outlined, focus on 8, pill "1/4"** |

**End state = the run the reveal describes** (ruling condition 3): the stopped cascade, the blocking group outlined, and the bridge person's "1/4" on screen. Step and To the end are disabled. The reveal unlocks (2 of 2 milestones).

## States
- **Predict (locked):** start 0,1 ringed and filled, the other ten hollow. No outline, no "holdouts" legend entry, no pill. Readout "Adopted 2 of 12 · round 0". Nothing hints at where it stops. The learner can trace the rule by eye, which is the prediction.
- **Explore, Step × n:** one person joins per round along the path, with the accent ring on the newcomer. At round 6, 7 joins and Step disables itself. The outline and "final" appear.
- **Start 8,9 from round 0:** round 1 fills 7, 10 and 11 together (it leaves the group at once), then one per round back along the path to 0 at round 8.
- **Reveal pin:** both milestones are required, so the learner has seen both finals. At reveal the stage shows the **0,1 final** (if 8,9 was current, it switches to the 0,1 final, the state they reached). The focus is kept.

Milestones (`minInteractions=2`): `stopped` (start 0,1 reaches final: 8 of 12, outline shown) and `planted` (start 8,9 reaches final: 12 of 12). Call `interact()` for these two only.

## What the reveal may quote (all reached on every path that unlocks the reveal)
"From 0 and 1 it stopped at 8 of 12 in round 6. The four outlined never joined." "Started at 8 and 9, the same two seeds reached all 12 (round 8)." Person 8's "1 of 4 friends adopted" may be quoted **only if** the learner focused 8 on the 0,1 final, which the QA path does. Otherwise the reveal uses the drawing ("each of the four has most of its friends inside the group"). The density sentence (3 of 4, 3 of 3 inside, more than half) is arithmetic on the outlined group the learner sees (claim 4). The iff theorem is claim 5. The reveal is ≤ 90 words and its text belongs to the learning designer.

## Shown, not told
The learner watches the run stall at the edge of the group, with 7 adopted next to 8 and nothing further. One tap shows 8 at "1/4", under the half the rule line names. Then the same number of seeds, planted inside the group, takes everyone. That answers the misconception ("too few seeds" or "too weak") before the reveal says a word.

## Stage word count (ruling condition 7: ≤ 25, numbers not counted)
| Item | Words |
|---|---|
| Rule line "Anyone joins once at least half their friends have." | 8 |
| Legend "started · adopted · not yet · new · holdouts" | 6 (5 before the outline exists) |
| Readout "Adopted … of … · round … · final" | 4 |
| "Step" · "To the end" | 1 + 3 |
| "Start 8,9" · "Start 0,1" | 1 + 1 |
| Pill "1/4" | 0 |
| **Total** | **24** at the final state, 22 at predict |

## Colour and access
`--fg` for nodes and edges. `--accent` only for the this-round ring. The outline is `--fg` dashed with a legend entry. `--domain` is not used on nodes. The SVG `aria-label` states the reveal's counts: "Start 0 and 1, round 6, final: 8 of 12 adopted; 8, 9, 10, 11 never adopted". Each person button is ≥ 44 px (hit r = 22) and the closest pair of centres is 68 px apart. The accessibility reviewer checks: the heavy-ring "started" state against plain filled at 390 px; the dashed outline against the K4 diagonals; and the "1/4" pill read as "adopted friends / friends" (if it does not read, the fallback is the readout row showing "Person 8: 1 of 4" while a person is focused, which is 3 more words, total 27, so the legend's "new" and the readout's "final" would have to go to get back to 25).

## Brief problems (for cm-math-discrete; I did not change the lesson)
1. **Edge count.** The Check line says 13 edges, but the graph it describes has 14 (the 7-8 bridge is missing from "7 + 6"). The numbers, the 298-set check and the claims are all right. Correct the count wherever it is used in `meta.json`.
2. **Brief interaction vs the ruling.** The brief asks for seed chips, Step, Reset, and every holdout's inside fraction printed at the end. The ruling asks for threshold chips, Step, To the end, and no per-node counts. The spec follows the ruling's anatomy (Step, To the end, counts only on a tapped person, no Reset) but uses **start chips instead of threshold chips**. The brief fixes q = 1/2, and the misconception is "too few seeds", not "too weak". Threshold chips would teach that a stronger idea breaks through, which is a different lesson, and I may not change what it teaches. The start sets stay fixed by the brief (condition 1). **The design lead must accept this substitution at design review.**
3. **The ruling's sample readout** "Adopted 7 of 12 · round 3" is a placeholder. The node run gives "Adopted 8 of 12 · round 6".
4. The brief's milestone "run both seed sets to the end" is kept. The chip rule (third case above) is what makes it reachable on the QA path while still ending on the stopped run. This is the one place where the spec goes beyond the ruling's "returns to round 0", and it is flagged for the design lead.

## Claims this spec adds or depends on
The per-round joiners for both starts and the final rounds (6 and 8) are claims 2 and 3, rule "synchronous" (simulation, re-run by the builder from the rule above). The pill values (8: 1/4; 9, 10, 11: 0/3 at the 0,1 final) are a derivation from claim 4. Edge count: 14.
