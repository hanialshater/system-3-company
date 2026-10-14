*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r10): the-equals-sign-balances
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows adding whole numbers and the equals sign from school sums; does not know that "=" says the two sides are the same amount, not "the answer comes next")
Screenshots seen: yes (artifacts/walkthroughs/the-equals-sign-balances/sheet.png, recorded 2026-10-14T18:54)
Verdict: pass

## Findings (written from the walkthrough before reading build.md)

Path walked: chose "7"; tapped "Box = 12", "Box = 17", "Box = 7", Reset; opened reveal.

1. **The prediction may be too easy for an adult.** The "answer comes next" error (12) and "add everything" (17) are well-documented in children. An adult who reads the hook ("looks like a sum with a gap in it") will often spot the trap and answer 7, as the walked path did. The lesson still works, but for many adults it confirms rather than surprises. Hypothesis: the brief's boundary may fit a younger or weaker-maths learner better.
2. **The balance is a good picture.** Blocks (8 + 4 on the left; □ + 5 on the right) and a beam that tips down to the right at 12 (right 17) and further at 17 (right 22), then sits level at 7 ("left 12 · right 12 · level"). The "Tried" line keeps all three.
3. **The unknown state looks level.** On the locked stage and after Reset the beam "rests on its stops" and is drawn horizontal with "?" in the box. That is the same look as the level (correct) state, so at reveal (06-reveal, after Reset) the picture says "level" while the box is empty. The small stop triangles are the only difference.
4. **Where the idea I lack first appears: none that blocks.** The reveal ("both sides are the same amount, like a level beam. So 8 + 4 = 7 + 5 is true") is exactly the idea and is backed by the beam.
5. Trust link reads "0/3 claims checked" (fact-checker's lane).

Verdict reason: the meaning of "=" is shown by the beam and stated plainly; findings 1 and 3 are about surprise and a picture state, not falsehoods.

Fixes (hypotheses for the builder, not tested):
- Draw the unknown state visibly different from level (e.g. beam greyed or dashed, or locked at a tilt with a lock icon).
- Put the Box = 7 level state back on the stage when the reveal opens.

## After reading build.md (Pre-flight v1)

- "Beam resting on two stops" is the designed unknown state; the trace line protects the reveal's numbers after Reset. Finding 3 is that the rest state reads as "level" to a learner; the stops are small at phone size. Finding 1 (adult surprise) is for cm-math to weigh against the brief.
- Fix route: none required for launch.
