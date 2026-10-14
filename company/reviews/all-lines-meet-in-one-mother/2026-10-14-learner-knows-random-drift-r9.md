*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r9): all-lines-meet-in-one-mother
lesson version: v3 (meta.json version 3)
boundary: knows-random-drift (the lesson's own: knows everyone has one mother and knows random drift; does not know that tracing mothers back, all lines must merge into one woman after about 2N generations, and that she had many contemporaries). Same tag as r7/r8.
Screenshots seen: yes (artifacts/walkthroughs/all-lines-meet-in-one-mother/sheet.png, release build recorded 2026-10-14T15:20Z, 7 frames; 07-reveal.png opened at full size)
Verdict: launch

## Findings (written from the walkthrough, before build.md)

Path: chose "They never all meet"; slider to 2 (23 lines); Back 10 (12 back: 9 lines); Back to one line (99 back: 1 line, "common mother", "+ 49 others"); Run 1,000 families (all met, mean 96); 25 and 100 women (46 / 96 / 197); reveal.

1. **Where it first asks for an idea I don't have: "about 2N generations" in the reveal.** "N" is never named on the stage or in the reveal; I have to infer N = number of women from "double the women, roughly double the wait". The numbers next to it (46 / 96 / 197) carry the idea without the symbol, so this is minor. Before that, "√ scale" on the tree's axis (0, 5, 20, 50) is a term I do not have; I read the axis as "generations back, squeezed", which is enough.
2. **No answer before the commit: met.** Three plain sentences at the same precision; locked tree is empty.
3. **Shows the why: met.** Lines visibly join and never split (50 → 23 → 9 → 1); "1,000 runs: all met" answers "never all meet" directly; the three-size line shows the wait doubling with the women.
4. **The reveal shows the payoff: met, and r8's main finding is fixed.** In 07-reveal the whole tree is on screen with "common mother" and "+ 49 others" readable, plus the histogram with "yours" and the Mean wait line. Every number the reveal names (99, 96, 46, 197, 49) is on the stage at that moment. The page is about 795 CSS px tall (1082×2202 at ~2.77×), so stage top and last line both fit on 390×844.
5. **Budget: met.** Reveal 75 words (r8: ~93); the 2N(1 − 1/N) theory sentence is gone.
6. Minor: tree labels are still small (I estimate ~9 CSS px for "+ 49 others" and "common mother") but legible in both the explore frames and the reveal; r8 had them at ~4–5 px.
7. Minor: "their lines did not reach today" is told; the stage shows the 49 open circles but not their lines ending. A learner who knows drift will accept it.

Where understanding first broke: it did not on this path; the "2N" symbol is the closest it came.

## After reading build.md and r8

| r8 finding | Status |
|---|---|
| 3. Tree off screen at reveal; ~93 words | fixed: tree, "+ 49 others" on screen; 75 words |
| 4. Tree labels ~4 px | fixed enough: legible (minor 6) |
| 5. Theory-number sentence | fixed: cut |
| 6. Claims open | trust link reads 2/7 checked after v3 rewording: fact-checker's gate, not a learner finding |
