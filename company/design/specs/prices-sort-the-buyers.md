# Spec: prices-sort-the-buyers

owner: interaction-designer (Rafael) · 2026-10-14 · status: draft, for design review · brief: `company/domains/briefs/economics.markets.md`, "Networks, Crowds, and Markets, batch 1" #4 · wireframe: `prices-sort-the-buyers.svg` · board: S2-20

**Design review (design lead, 2026-10-14): approved with changes. The 3 × 3 grid is accepted, and the node-link fallback is rejected.** Changes: disc and pill coordinates fixed (houses at y 28, pills at y 62, buyers at x 44); cell text ≥ 11 / 18 px; SVG swatches replace ┅ and the legend glyphs; Compare opens under the grid in place of the legend. Details in `company/design/reviews/2026-10-14-design-review-ncm-specs.md` §2.

**Format: single card with the step-run-button interaction** (`company/design/concepts/step-run-button.md`) on a bipartite buyer–house graph. The graph has 6 named nodes, none tappable, and is deterministic, with no seed. It falls under the network-stage rules (`company/design/reviews/2026-10-14-design-lead-ncm-rulings.md` §2), but this spec departs from them on one point: it draws the bipartite graph **as a 3 × 3 grid**, not as node-link. The departure is argued below and the design lead rules on it in review.

**Why this interaction:** the learner presses Raise and watches the price climb on exactly the houses that too many buyers want. Then the raising stops on its own, and every buyer is holding a different favourite. The learner never picks who gets what. The Compare button then shows that the market's assignment has the highest total of all six, which is the payoff the learner did not plan.

## Brief problem (for cm-economics-markets; I did not change the lesson)
**The question's wording changes the answer.** It says "raise by $1 the price of **any** group of houses that more buyers want … than there are houses in the group". At round 0 three groups qualify: {a}, {a, b} and {a, c}. My node run of the alternatives:
- **Smallest group** (the brief's own check): (0,0,0) → (1,0,0) → (2,0,0) → (3,1,0). The smallest group is unique in every round. **a stops at $3.**
- **Largest group:** (1,1,0) → (2,2,0) → (3,2,1) → (4,2,1). **a stops at $4** ((3,1,0) only after subtracting the lowest price).
- **Every qualifying group:** all three prices rise together every round and never stop.

So the question must say "**the smallest** group". The card's rule line in this spec does say so. Answer B ($3) holds under that rule. The other brief numbers re-run exactly:
- Final match x–a, z–b, y–c, total 23. It is the only perfect match in the final "wants" graph.
- All six totals: 21, 23, 14, 17, 15, 16. 23 is the maximum and only one assignment reaches it.
- 20 whole-dollar clearing vectors with lowest price 0 and prices ≤ 12. (3,1,0) is the lowest.

## The rule (disclosed on the card, identical in code, meta and fact-check)
- Buyer values: x (a 12, b 4, c 2), y (8, 7, 6), z (7, 5, 2). Prices start at (0, 0, 0).
- A buyer **wants** every house with the largest value minus price. Ties all count.
- A group of houses is **wanted by too many** if the buyers who want only houses in that group outnumber the houses in it.
- Each round (**Raise**): raise by $1 every house in the smallest such group.
- When no group is wanted by too many, each buyer gets a different house they want. Here that happens at round 3, and the match is unique.

Designer's node check of this exact rule (2026-10-14):

| Round | Prices | Wants | Too many want |
|---|---|---|---|
| 0 | (0,0,0) | all want a | {a} |
| 1 | (1,0,0) | x a; y a, b; z a | {a} |
| 2 | (2,0,0) | x a; y b; z a, b | {a, b} |
| 3 | (3,1,0) | x a; y b, c; z a, b | none. Match x–a, y–c, z–b, total 12 + 6 + 5 = 23 |

The builder re-runs this and records the numbers as claims.

## Stage at 390×844 (~380 px at predict, ~470 px with Compare open)
1. **Rule line** (muted, 2 short lines): "Buyers want the best value minus price. Raise $1 on the smallest group (┅) too many want."
2. **Bipartite grid**, SVG `viewBox` 340 × 300:
   - Houses a, b, c are node discs (r 14) across the top, centred at x 130 / 210 / 290 (80 px apart). Each has a **price pill** under it ("$3").
   - Buyers x, y, z are node discs down the left, at y 120 / 190 / 260 (70 px apart).
   - Each of the 9 cells (68 × 58) is one buyer–house edge. A small muted line shows the sum ("12 − 3") and a big number shows the surplus ("9").
   - **Wants** = 2 px cell border plus a filled dot (●).
   - **Match** (once cleared) = filled cell (`--fg` with `--bg` ink) and a 3 px border.
   - **Too many want** = a dashed outline with a soft tint around the column or columns of the group (a set outline, §2.4).
   - That makes 3 cell states: plain, wants, gets. Fill and border carry each state, so colour is not the only cue.
3. **Legend** (one line): "● wants · ■ gets".
4. **Readout:** "Round 2". Once matched: "Round 3 · Total 23".
5. **Compare panel** (hidden until pressed): six pills in a 3 × 2 grid, for example "xa yc zb 23". Each pill is ≤ 12 characters, made of names and a number. The market's assignment is filled with a 3 px ring, matching the grid's "gets" style.
6. **Controls row** (4 buttons, 44 px).

**Why a grid and not node-link (for the design lead).** The learner must read value minus price on all 9 buyer–house pairs to check who wants what. As node-link, that means 9 edge pills, and at 340 px three edges meet at every node. The pills collide at either end, or the 9 values move into a separate table, which makes two representations on one phone. The grid *is* K3,3's adjacency with the edge values in place. Rows and columns are the two node sides, and "wants" and "gets" mark edges. Everything else in §2 still applies: 1-letter names in ≥ 13 px discs, pills ≤ 4 characters, ≤ 3 states, a set outline instead of a second colour, ≤ 300 ms transitions, no moving nodes. If the design lead rejects the grid, the fallback is node-link with only the "wants" edges drawn (≤ 5 per round) and surplus in a 3 × 3 table above it. I would argue against that fallback, because it is the two-places problem.

## Controls, in DOM order (4)
| # | Kind | Label | Behaviour |
|---|---|---|---|
| 1 | Control | "Restart" | Back to round 0 with prices $0. Hides Compare. Milestones already reached stay reached. Disabled at round 0 and in the reveal phase, so it can never empty the reveal's stage. First in DOM, so the QA path meets it disabled |
| 2 | Control | "Raise" | One round: the outlined houses' pills go up $1 (`--accent` ring for that round only), the surpluses and wants recompute, and the new group is outlined. If none is left, the match fills and the readout shows the total (milestone `cleared`). Disabled once cleared |
| 3 | Control | "Run" | Jumps to the cleared state, showing the remaining rounds at ≤ 100 ms each (≤ 300 ms, instant under reduced motion). The milestone fires on press. Disabled once cleared |
| 4 | Control | "Compare" | Enabled only once cleared. Opens the six totals with the market's 23 ringed (milestone `compared`). It opens once and then is disabled, so the reveal state cannot be hidden again |

All 4 controls render at first paint and are disabled while `locked`. No price chip is tappable: prices are display pills, so the learner cannot set a price the rule would not reach.

**QA path:**
1. Restart: disabled, not pressed.
2. Raise: round 1, (1,0,0). Column a still outlined, and y now wants a or b.
3. Run: round 3, (3,1,0). Match x–a, y–c, z–b, "Total 23". Milestone 1.
4. Compare: six totals with 23 ringed. Milestone 2.

**End state:** prices $3 / $1 / $0, the matched grid, "Round 3 · Total 23", and the Compare panel open. This is exactly what the reveal describes. Every press on the path changes the stage.

## States
- **Predict:** round 0. Prices $0, so each cell shows the raw value (for example "12 − 0" / "12"). Every buyer's dot is in column a, and column a is outlined. Readout "Round 0". **Neither $3 nor the match is visible.** The stage shows only the starting state the question describes.
- **Round 1:** a is $1. y's dots are in a and b (a tie). a is still outlined (x and z want only a).
- **Round 2:** a is $2. y wants b, z wants a and b. The outline widens to **a and b together**. This is the step where the learner sees that a group, not one house, can be over-wanted.
- **Round 3:** a $3, b $1, c $0. No outline. The match fills: x–a, y–c, z–b. z ends on b although it values a at 7, and c stays free yet goes to y. Nobody assigned this.
- **Compare open:** 21, **23**, 14, 17, 15, 16.
- **Reveal:** the stage pins to the cleared round-3 state with Compare open (or as the learner left it, if not reached). Example quote, only from reached states: "a's price stopped at $3 after three raises: (1,0,0), (2,0,0), (3,1,0). Then each buyer had a different favourite: x–a, z–b, y–c, total 23, the highest of the six totals you compared." Then the payoff (the lowest market-clearing prices, nobody needed every value) and the model caveat. If the learner used Run without Raise, the reveal quotes the start and the end, not "three raises you pressed".

Milestones (`minInteractions=2`): `cleared` (a round with no group wanted by too many, reached by Raise or Run) and `compared` (Compare opened).

## Shown, not told
The learner sees $3 appear on a's pill and the dashed group grow from {a} to {a, b}. The match then appears without anyone choosing it. The 23 in the reveal is the ringed pill they opened next to five smaller totals. The reveal names what they saw: prices rose only where demand exceeded supply, and the result was the best total.

## Stage words (numbers, $ amounts and 1-letter names not counted)
- Rule line: 15 (Buyers, want, the, best, value, minus, price, Raise, on, the, smallest, group, too, many, want)
- Legend: 2 (wants, gets)
- Readout: 2 (Round, Total)
- Controls: 4 (Restart, Raise, Run, Compare)
- Compare pills: 0 (names and numbers only)
- **Total: 23 of 25** at any moment. No "Hall", no "constricted set" (brief note).

## Colour and access
- Cells: `--bg` fill with `--line` borders. Wants: `--fg` 2 px plus ●. Gets: `--fg` fill, `--bg` ink, 3 px.
- The group outline is `--fg` dashed with a `--bg-2` tint. `--accent` is used only for price pills changed in the last round.
- Surpluses are integers. A negative surplus never occurs here (round 3's lowest is 2).
- The `aria-label` on the SVG states the reveal's counts, for example "Round 3: prices a 3, b 1, c 0; x gets a, y gets c, z gets b; total 23". Each cell has a text alternative in a visually hidden table (buyer, house, value, price, wants).
