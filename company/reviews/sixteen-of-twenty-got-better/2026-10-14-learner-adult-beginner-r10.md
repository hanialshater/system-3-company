*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r10): sixteen-of-twenty-got-better
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows percentages; does not know that many conditions improve with no treatment, so improvement after a treatment means nothing without a comparison group)
Screenshots seen: yes (artifacts/walkthroughs/sixteen-of-twenty-got-better/sheet.png, recorded 2026-10-14T18:52)
Verdict: pass

## Findings (written from the walkthrough before reading build.md)

Path walked: chose "More people taking the pill"; tapped "Day 3", "Day 7", "Show the no-pill group"; opened reveal.

1. **The prediction is real but soft.** "How many get better with no pill" reads as the sensible-sounding answer to many adults, so some will pick it on tone rather than understanding. "More people taking the pill" is a good trap (it is what "bigger study = better" suggests).
2. **The payoff is on the stage.** Two rows of 20 figures; at day 7 both read "better: 16 of 20". Seeing the empty "not shown yet" row fill in to the same count is the moment, and it is clear at phone size.
3. **Where the idea I lack first appears: "colds clear up by themselves" (reveal).** The stage shows it (the no-pill row recovers) but only at day 7; I never see the no-pill row at day 3, so "they were getting better anyway, at the same pace" is only half seen. Tapping "Day 3" after showing the group would show it, but the panel order ("step through the days, then show the no-pill group") sends me past it.
4. **I never see what a working pill would look like.** The only comparison on offer is equal. A beginner may leave with "a comparison group shows pills do nothing" rather than "a comparison group shows what the pill added". The reveal's last sentence ("what the pill added, and here it added nothing") helps.
5. Exploration is three taps with one fixed outcome: little to explore. Acceptable for this idea, but thin.
6. "Invented cold, invented pill." is said. Trust link reads "3/3 claims checked".

Verdict reason: the missing comparison and what it reveals are seen on the stage, and the reveal answers the question I had ("so did it work?").

Fixes (hypotheses for the builder, not tested):
- Reorder the prompt: show the no-pill group first, then step the days, so both rows move together.
- Optional preset "If the pill worked" (e.g. no-pill 10 of 20) so the comparison is seen doing work.

## After reading build.md (Pre-flight v1)

- Going back to Day 3 after the group is shown is supported and the caption keeps the day-7 counts, so finding 3 is about prompt order only. No "pill works" case exists by design (the brief's case is a null pill); finding 4 is a hypothesis for cm-probability, not a defect.
- Fix route: none required for launch.
