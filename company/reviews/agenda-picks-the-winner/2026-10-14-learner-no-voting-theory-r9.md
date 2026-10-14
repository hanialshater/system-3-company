*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r9): agenda-picks-the-winner
lesson version: v2 (meta.json version 2)
boundary: no-voting-theory (the lesson's own: knows a vote between two options goes to the one with more votes, and what a ranking is; does not know that majority preferences can go in a circle, so the order of the votes decides the winner). Same tag as earlier reviews.
Screenshots seen: yes (artifacts/walkthroughs/agenda-picks-the-winner/sheet.png, release build recorded 2026-10-14T15:21Z, 5 frames; 05-reveal.png opened at full size)
Verdict: revise (narrow: word budget only)

## Findings (written from the walkthrough, before build.md)

Chose option 1 ("A").

1. **Where it first asks for an idea I don't have: the question's unstated voting rule.** "Who wins?" needs "each voter votes for whichever of the two they rank higher". I would assume it, but the lesson only says so in the last clause of the reveal. Same as the final review; it does not break this path because the stage counts the votes for me ("A vs B: A 2–1").
2. **No answer before the commit: met for the answer.** A / B / C, same form; locked triangle has dashed, undirected edges and "Winner: ?". The title "Who sets the order wins" and hook give away that order matters, but not which letter wins.
3. **Shows the why: met.** Each agenda fills in arrows of the triangle; after three runs the loop A→B→C→A is drawn and "3 of 3 pairs seen". Three different winners are on stage across frames 02–04.
4. **The reveal shows the payoff: met.** At reveal the stage is pinned to "Your question: A vs B, then C", Vote 1 A 2–1, Vote 2 C 2–1, Winner: C, with the complete loop drawn; "the group's majorities loop: A beats B, B beats C, C beats A, each 2 to 1" points at the triangle, which is on screen. "The option held back to the last vote won every time" is read off three runs I made.
5. **Fit: met.** 05-reveal is about 795 CSS px tall (1082×2202 at ~2.77×): stage top and last line on one 390×844 screen.
6. **Budget: missed.** The reveal is 94 words (> 90), and the lesson is unpublished, so the budget binds. Candidates are told context: the restated agenda list "A vs B, then C elects C; B vs C, then A elects A; A vs C, then B elects B" repeats what three runs showed, and "Each voter's own ranking is consistent, yet" is told framing (category manager picks).
7. Minor (carried): "whoever sets the order of the votes picks the winner" reads as a general law; it is scoped only by "No option is the majority favourite".
8. Minor: large blank region under the triangle in explore frames 02–04 (layout only).

Where understanding first broke: it did not; the closest point is the unstated sincere-voting rule (finding 1).

## After reading build.md and the earlier reviews

The final review's verdict was launch with notes; its top note (assumption arrives last) is unchanged in v2. The only blocking item now is the 4-word overrun on an unpublished lesson. Trust line reads 5/5 claims checked.

| Earlier finding | Status |
|---|---|
| Reveal stage disagreed with headline (r2) | fixed (pinned "Your question") |
| Sincere-voting assumption only at the end (final) | not fixed (finding 1) |
| Title/hook give away "order matters" (final) | not fixed, not a rule failure (answer letter not leaked) |
| Empty stage region (final) | not fixed (minor 8) |
