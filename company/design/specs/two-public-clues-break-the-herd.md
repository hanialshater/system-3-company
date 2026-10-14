# Spec: two-public-clues-break-the-herd

owner: interaction-designer (Rafael) · 2026-10-14 · status: draft, for design review · brief: `company/domains/briefs/probability.statistics.md`, "## Course: NCM (2026-10-14)" #1 · wireframe: `two-public-clues-break-the-herd.svg` · build after: two-said-blue

**Format: Before / after toggle.** There is one change, publishing two clues, and its effect is visible: the best choice flips from blue to red. The misconception is that 100 choices are 100 people's evidence. So the cause gets its own control, placed before the toggle. "Count the clues behind them" turns the 100 blue choices into the evidence they actually carry: two blue clue chips. The 98 followers stay blue (they did choose blue), but they fade and lose their clue marks. The "after" (published clues on the table, 33%) stays on screen into the reveal, with a log line that keeps the "before" figure (67%).

## Brief check (re-run in node, 2026-10-14)
Clues right with probability 2/3, prior 1/2, P(blue urn) = 1 / (1 + 2^(red − blue)).
- 2 blue clues only: 80%. Plus your red: **67%** (claim 3). Plus 2 published red: 2 blue vs 3 red, **33%** (claim 2). Own blue instead: 67% (brief's `ownBlue`). All match the brief.
- If the 100 choices were counted as 100 blue clues, blue would be ≈ 100% (the misconception's arithmetic). The stage never prints this number; it shows only "100 choices?" before the count.
- **The prediction survives design.** One wording risk: "two new private clues are published" could be read as two followers' clues. That does not change the maths, since every clue is independent, so the stage labels them "Published".

## Stage at 390×844 (~420 px at predict, ~500 px in explore)
1. **Rule line** (muted): "Clues are right 2 times in 3. From person 3 on, a lead of 2 outweighs any clue." (17 words). This is the cascade rule carried over from two-said-blue (claim 1).
2. **Crowd**: a 10 × 10 grid of 14 px rounded squares on a 20 px pitch (200 px wide), all filled blue = "chose blue". Caption under it: "Choices: 100 blue". After the count, people 1–2 keep a solid fill and get a white clue dot. People 3–100 fade to a light blue with a dashed outline. They still chose blue, so their colour stays, but they show no clue. The caption becomes "1–2: chose on a blue clue. 3–100: followed."
3. **Side column** (right of the grid): "Your clue" with a red chip, then "Published" with two chips that are dashed "?" until the toggle, then solid "red".
4. **Clue table**: two boxes side by side, "blue" and "red". Before the count the blue box says "100 choices?" and the red box is empty. After the count: blue holds chips "1", "2"; red holds "yours". With the toggle on, red also holds "pub", "pub".
5. **Readout**: "Chance the urn is blue: ?" until counted, then "67%" or "33%", with "Best: blue" or "Best: red" at the right (text plus colour). After the toggle has been on once, a muted log line stays: "Before publishing: 67% blue".
6. Controls, below.

Stage words at the busiest moment (reveal state): rule line 17 (numbers excluded, 14) + caption 6 + "Your clue" 2 + "Published" 1 + "blue/red" 2 + readout 5 + "Best: red" 2 + log 3 = 35. **This is over budget.** Fixes, in order: the rule line moves into the question area and the stage keeps a 6-word stub, "Person 3 on: a lead of 2 wins" (−11). The caption shortens to "1–2: clues. 3–100: followed." (−3). That makes 21. The wireframe shows the long version; the builder uses the short one.

## Controls, in DOM order (2)
| # | Kind | Label | Behaviour |
|---|---|---|---|
| 1 | Control | "Count the clues behind them" | animates the 98 followers fading (≤ 300 ms, instant under reduced motion). The "100 choices?" label is replaced by two blue chips, and your red chip moves into the red box. The readout reads "67%", "Best: blue". If the toggle is already on, the published chips go in too and the readout reads 33%. Disabled after use |
| 2 | Control toggle (`aria-pressed`) | "Publish two clues" ⇄ "Two clues published" | flips the two published chips between dashed "?" and solid "red". Once counted, adds them to or removes them from the red box and updates the readout (67% ⇄ 33%, "Best" flips). The first time it turns on after a count, it writes the log line "Before publishing: 67% blue" |

Both controls render at first paint, are disabled while `locked`, and use `.tap` (44 px), full width. There is no reset: toggling off is the "before".

QA path (each control once, in DOM order): Count the clues behind them (98 fade, 2 blue vs 1 red, 67%: milestone `counted`) · toggle (2 blue vs 3 red, 33%, "Best: red", log "Before publishing: 67%": milestone `published-after-count`). Both percentages and both counts are on screen at the end.

## States
- **Predict:** 100 solid blue squares, your red chip, two "?" chips, "100 choices?" in the blue box, readout "?". Nothing on the stage gives the answer. The solid wall of blue is meant to tempt option A.
- **On unlock:** nothing moves until a press. Exploration hint: "Count the clues behind the crowd, then publish the two clues."
- **Counted:** the grid becomes 2 solid + 98 faded squares. The blue box holds just 2 chips. 67% blue: inside the cascade, your red clue alone is outvoted, so following was sensible.
- **Published:** 3 red chips to 2 blue. 33%. "Best: red".
- **Toggle off again:** back to 67%. The learner can flip between them and see that only two chips move the answer.
- **Reveal:** the stage stays as left (published on). The reveal: "The 98 followers chose blue because of the first two choices, not their own clues, so the 100 blue choices held only 2 clues. With your red clue alone, blue stayed at 67%. Two published red clues plus yours make 3 red to 2 blue: blue falls to 33%, and red is the better choice. A herd built on two clues can be overturned by two more." Claims 1–3 carry every figure.

Milestones (`minInteractions=2`): `counted`, `published-after-count` (the toggle is on while counted; reachable in either order, because counting with the toggle already on reaches it too). The gate needs the state the reveal explains: the published clues on a table that holds only 2 crowd clues.

## Shown, not told
The learner presses one button and watches 98 of the 100 choices stop counting as evidence. Then two chips change the answer. The reveal's sentence "the crowd held only two clues" describes the two chips in the blue box.

## Colour and access
Blue and red are each paired with text ("blue", "red", "Best: red") and with shape: solid squares carry a clue dot, followers are faded with a dashed outline, unpublished chips are dashed with "?". The pair passes deuteranopia because each state also has a label; the visual designer checks the blue/red pair against `system.md`. `aria-live` on the readout. Stage `aria-label` at the end: "Clues on the table: 2 blue, 3 red. Chance the urn is blue: 33%."

## Claims this spec adds
None beyond the brief. The rule line is claim 1. The 80% shown nowhere is not a claim.

## Notes for others
- **Builder:** compute the readout from chip counts with the formula above, not from constants. The grid is 100 SVG rects; keep them as one `<g>`.
- **Brief owner (cm-probability-statistics):** brief unchanged. Build after two-said-blue, as the brief says.
- **Visual designer:** the 10 × 10 grid and side column fit 366 px. If the column feels cramped, the "Your clue / Published" chips can move to a row under the grid.
- No illustration needed.
