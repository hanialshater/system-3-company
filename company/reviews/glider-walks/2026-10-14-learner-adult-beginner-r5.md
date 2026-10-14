*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (first learner review, r5 wave): glider-walks
lesson version: v2
boundary: adult beginner who knows a grid of cells (live or empty) and that a neighbour is one of the 8 touching cells; does not know that tiny local rules can make a travelling pattern (from meta.json learner field).
Screenshots seen: yes (artifacts/walkthroughs/glider-walks/sheet.png, 7 frames)
Verdict: launch

## 1. From the artifact

- Predict: the rules are in the stem and on stage, and the three options are real ("gone" is my honest guess, because the rules sound like they kill most cells). The locked stage shows gen 0 with neighbour counts on every cell. A patient learner could compute gen 1, which is good. The gen strip shows "?" for gens 1 to 4. Nothing leaks.
- Explore: each Gen tap shows the new live cells, red × on cells that died and green + on cells born, plus a caption "Gen N · 5 live". "5 live" every time kills "gone" and "grown to 10" by gen 1 or 2. The thumbnail strip lets me look back across gens 0 to 4, and gen 4's thumbnail is visibly gen 0's shape. With "Counts: off" the grid is clean.
- Where understanding first broke: the dashed outline. In gens 1 to 3, dashed cells appear where cells just died, so I read dashed as "died this step". In gen 4 the dashed cells are gen 0's outline, and the reveal relies on that ("one cell right and one down from its dashed outline"). The stage never says what the dashed outline is. The key "moved diagonally" comparison rests on a symbol whose meaning seemed to change. The thumbnails rescue it, but they are tiny (about 40 px).
- Density: with counts on, the grid carries numbers, black cells, dashed cells, × and + at once. That is heavy for a 60-second card, but the toggle helps.
- Reveal: it answers what happened and names the glider and Conway's Game of Life. "Can compute anything a computer can" is a big claim, told. It is fine as a coda.
- Not my lane: the card shows DRAFT and "0/5 claims checked".

## 2. Earlier findings

- None. This lesson has no earlier learner review (only a fact-check, 2026-10-14).

## 3. New findings

- Should fix: label the dashed outline on stage (for example "dashed: where gen 0 was"), and use a different mark for "just died" cells. As it stands, the dashed outline means two different things.
- Minor: enlarge the gen thumbnails, or overlay gen 0's outline on gen 4 by default, so "same shape, moved" can be read at phone size.
- Not my lane (fact-checker): the trust link shows 0/5 claims checked, and the status chip shows DRAFT.
- No FATAL. "5 live" at every step and the gen 0 / gen 4 thumbnails show on stage that the shape survives and travels.
