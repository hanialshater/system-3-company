# Spec: any-start-same-tree

owner: interaction-designer (Rafael) · 2026-10-14 · status: draft, for design review · brief: `company/domains/briefs/cs.algorithms.md` #30 · wireframe: `any-start-same-tree.svg`

**Format: Side-by-side comparison.** The misconception is that starting in a different place gives a different network. Two networks grown at once, the learner's from A and a friend's from E, on the same towns and cables, keep "same map, different start" true on the stage. The difference the learner sees is the order (the numbers on the cables). The set of cables is the same.

## Brief check (node, 2026-10-14)
Cables AB 4, AC 1, BC 2, BD 5, CD 8, CE 10, DE 2, BE 6. Prim from A adds AC, BC, BD, DE, for a total of 10. From E it adds DE, BD, BC, AC, total 10. From B it adds BC, AC, BD, DE; from C, AC, BC, BD, DE; from D, DE, BD, BC, AC. There is no tie at any choice. The answer (C, the same) is **correct**.

**Brief problem (route to cm-cs-algorithms / learning designer):** the payoff and claim 3 say "with distinct costs the cheapest network is unique", but these costs are **not distinct**: BC = DE = 2. The cited theorem (CLRS ex. 23.1-6) therefore does not cover this graph. The tree is still unique: of the 40 spanning trees, only AC BC BD DE costs 10 (the next costs 11). Either (a) keep the costs, and change claim 3 to "only one network here costs 10 (all 40 checked)", a simulation claim; or (b) change DE to 3. The tree stays the same, the total becomes 11, it is unique (the next costs 12), and the question's numbers change. This spec works with either. The reveal text below assumes (a) and must not quote the distinct-costs theorem for this graph.

## Stage at 390×844 (~300 px at predict, ~500 px in explore)
1. Model line (muted): "Grow from your start: always add the cheapest cable to a new town." (12 words)
2. **Two panels** side by side, each ~175 × 160 px, same layout: A on the left, B at the top middle, C at the bottom middle, D at the top right, E at the bottom right. All 8 cables are drawn thin with their cost. The header reads "You: from A" / "Friend: from E". Each panel shows:
   - grown towns filled, the others hollow, so the cut is visible;
   - cables crossing the cut (grown to not grown) dashed in the accent colour, which shows the learner's candidates;
   - added cables thick, with a small order badge (1 to 4);
   - "Total ?" under the panel at predict, then a live total.
3. Message line (≤ 10 words) for refusals. Then the cable keys, then the friend's start chips.

## Controls, in DOM order (12)
| # | Kind | Label | Behaviour |
|---|---|---|---|
| 1–8 | Control chips (`.tap`, ~84 × 44, two rows of 4) | "AB 4" · "AC 1" · "BC 2" · "BD 5" · "CD 8" · "CE 10" · "DE 2" · "BE 6" (the question's order, **not** sorted by cost) | Adds that cable to **your** network if it is the cheapest cable leaving your grown towns. Otherwise it is refused, with a message naming the cable ("AB 4: a cheaper cable leaves your towns" / "CD 8: both towns already joined"), so every press changes the stage. Each accepted cable also grows the **friend's** network by one step (their own cheapest cable from E's side). Accepted chips are disabled with `className="active"`. All 8 are disabled once your network is complete |
| 9–12 | Control chips (`.tap`, ~84 × 44) | "B" · "C" · "D" · "E" (group "Friend starts at"; E is active and disabled at the start) | Regrows the friend's network from that town to the same number of cables you have. After you finish, it shows the friend's complete network from the new start, with its own order badges |

No hint names the cheapest cable, because finding it is the learner's job. No "auto-grow" button, so nothing lands on the finished trees for the learner. All 12 controls render at first paint, disabled while `locked`.

QA path (checked in node): AB refused · AC accepted (1) · BC accepted (2) · BD accepted (3) · CD refused · CE refused · DE accepted (4: both networks complete, milestone 1) · BE disabled, so QA skips it · B · C · D (friend complete from another start: milestone 2) · E (back to the question's friend).

## States
- **Predict:** both panels show all 8 cables thin with costs. A is filled on the left, E on the right. No dashed cut lines, no badges, "Total ?" twice. Every chip is disabled.
- **During growth:** after each accepted cable, both panels add one thick cable, the grown set widens and the dashed cut lines move. You go AC, BC, BD, DE while the friend goes DE, BD, BC, AC. The badges show the orders are reversed.
- **Complete:** both totals read 10. A muted line under the panels says "Same 4 cables" only once both are complete. This is a comparison the learner can check by eye, not a verdict.
- **Friend start B / C / D:** the right panel regrows with new order badges. The cables are the same and the total is still 10.
- **Reveal:** the stage stays as left (both complete). The reveal quotes the learner's own orders and only the friend starts they actually tapped: "You added AC, BC, BD, DE. Your friend from E added DE, BD, BC, AC. Same cables, total 10 [, and the same again from B, C and D]." Then the idea: whatever towns you have grown, the cheapest cable across the dashed line is always part of the cheapest network (the cut property). So the start changes only the order. Here only one network costs 10.

Milestones (`minInteractions=2`): `both-complete` (your 4th cable accepted) and `another-start` (a friend chip pressed after completion).

## Shown, not told
The dashed cut lines are the learner's real candidate list at every step, so the cut property is something their hands used before the reveal names it. The identical thick cables with reversed badges are the answer, read off two panels.

## Answer hygiene
The locked stage shows no trees and no totals. Chip order is the question's order, not sorted by cost. The title avoids "same" (for example "Start somewhere else"). "Same 4 cables" appears only after both networks are complete.

## Colour and access
Cables `--line`; added cables `--fg` at 3 px with numbered badges. Cut cables are dashed `--domain` at 2 px. Dashes and badges carry the meaning, so colour does not. Grown towns are filled `--domain` with `--bg` ink and the others hollow with an outline. Cost labels are 11 px `--fg` on a `--bg-2` halo so they never collide with lines at 175 px. The visual designer checks label placement at 390 px. `aria-label` per panel: "Friend from E: DE, BD, BC, AC, total 10".
