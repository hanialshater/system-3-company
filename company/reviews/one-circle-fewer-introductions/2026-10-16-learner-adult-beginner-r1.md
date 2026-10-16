*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: one-circle-fewer-introductions
lesson version: v1
boundary: adult beginner from the lesson's own learner field. Knows the at-least-once rule 1 - (1 - p)^k for independent tries; does not know that the rule needs independence, or that friends from one circle rise and fall together.
Screenshots seen: yes (artifacts/walkthroughs/one-circle-fewer-introductions/sheet.png, recorded 2026-10-16T12:42:45Z, phone viewport, option 1 chosen)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

Brief: SO-10-3 run (batch=SO-10-3, tag [project:wave-j]). Walkthrough on the shared review server http://localhost:3591, built from bc0edc0ebf45440c75754a31a61c63a6f9bd10cb (BUILT_FROM and `git -C /home/user/s3c-qa rev-parse HEAD`, read at start and end). Ancestry test: the newest commit touching src/demos/<d>/one-circle-fewer-introductions/ is cce79e5, and `git merge-base --is-ancestor cce79e5 bc0edc0` passes; since the newest commit of any kind passes, the newest non-evidence commit (W-1313 reading) passes too. No diff between bc0edc0 and main on the lesson directory. Transcript read cut at the trust-sheet appendix (R1); no build notes in the brief.

1. **Where understanding first broke.** At the line "Weeks the circle meets: 2 of 20 · then 100% each". At 50% of weeks it said "then 20% each", at 25% "then 40% each", and at 10% "then 100% each". I worked out that the per-meeting chance goes up so that each friend still averages 10% a week, but nothing says so, and "100% each" made me wonder for a moment whether all five introducing me at once counts five times. The reveal's "though each friend alone stayed at 10%" is what finally told me why those numbers were rising.

2. **What the prediction felt like.** A real choice, and one I could reason about with my known rule. Separate circles give 1 - 0.9^5, about 41%; for one circle I had no rule, and "one circle gives better odds" (friends reinforce each other) was tempting. The hook ("Does it matter if they all know each other?") hints that it matters, which takes "the same either way" mostly off the table. I chose separate circles.

3. **Whether the reveal answered the question I actually had.** Yes. My question was "why does meeting fewer weeks hurt if each friend is still 10%?", and the reveal answers it in one sentence I can repeat: in the weeks the circle stays home, all five fail at once. The falling bar (34%, 23%, 10%) against the dashed 41% line made it visible before the reveal said it. The closing line names the rule's hidden condition (independent tries), which is the thing I did not know.

Notes (do not block a first-time learner):
- The "then N% each" step is unexplained on the stage (finding 1).
- On the locked frame "Meets 100%" is pre-selected and the chance bar is empty; the 41% baseline first appears after the first tap. Fine.
- At 25% and 10% the tick labels above the bar (10%, 23%, 34%) crowd together at phone width.

Verdict reason: no finding blocks a first-time learner; the unexplained "then N% each" line is a note.

## After reading meta.json (misconception, objective, claims; build.md not read)

- c2 is the model behind "then N% each" (each friend's chance in a meeting week is 10%/q, so the weekly average stays 10%). The claim says "stated on the card"; from the walkthrough the card shows the numbers but not the reason, which is my finding 1. Not a fact dispute.
- The objective's numbers (41% separate, 34% at half the weeks, each friend still 10%) are all on screen and in the reveal.
- Verdict unchanged: launch.
