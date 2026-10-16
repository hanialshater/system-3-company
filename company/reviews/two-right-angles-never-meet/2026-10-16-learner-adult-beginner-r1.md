*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: two-right-angles-never-meet
lesson version: v1
boundary: adult beginner from the lesson's own learner field. Knows a flat triangle's corners add to 180° and what a right angle is; has never met proof by contradiction as a method.
Screenshots seen: yes (artifacts/walkthroughs/two-right-angles-never-meet/sheet.png, recorded 2026-10-16T12:42:21Z, phone viewport, option 1 chosen)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

Brief: SO-10-3 run (batch=SO-10-3, tag [project:wave-j]). Walkthrough on the shared review server http://localhost:3591, built from bc0edc0ebf45440c75754a31a61c63a6f9bd10cb (BUILT_FROM and `git -C /home/user/s3c-qa rev-parse HEAD`, read at start and end). Ancestry test: the newest commit touching src/demos/<d>/two-right-angles-never-meet/ is cce79e5, and `git merge-base --is-ancestor cce79e5 bc0edc0` passes; since the newest commit of any kind passes, the newest non-evidence commit (W-1313 reading) passes too. No diff between bc0edc0 and main on the lesson directory. Transcript read cut at the trust-sheet appendix (R1); no build notes in the brief.

1. **Where understanding first broke.** Not on the idea. The first snag is visual: on the 62° and 89° frames the readout "1.88 bases up" / "57.3 bases up" is clipped at the stage's right edge (it reads "bases u"). The number is legible, the unit is not quite. At 89° the triangle's top runs off the stage and is shown as two arrows labelled "89° → 57.3 up", which I understood.

2. **What the prediction felt like.** Honest but easy for this mind. I know the corners add to 180°, so two 90s leave nothing, and the answer "No, never" is one line of arithmetic away. The option "Yes, if it is tall enough" is the tempting one only if I forget the 180° rule, and the hook ("What would the third corner have to look like?") nudges me to remember it. I picked "tall enough" because the picture of a very tall thin triangle is vivid, but I half knew it was wrong. The lesson's real target is the method, not the answer, so an easy answer is not a defect; it does mean the prediction is not where my mind is tested.

3. **Whether the reveal answered the question I actually had.** Mostly. My question after the 89°/90° steps was "so at exactly 90 the sides are parallel; is that the proof?" The reveal gives two arguments one after the other: the 180° arithmetic ("leaving 0° for the third"), then "you watched it happen" (parallel sides never meet). It then names proof by contradiction. I am left unsure which of the two was the proof by contradiction: the slider looked like a limit (getting closer and closer), not like "assume it and hit a wall". The last sentence ("assume it, follow it, hit a wall") is clear on its own, and I could repeat it, but I could not say which on-screen step was the "assume".

Notes (do not block a first-time learner):
- Clipped "bases up" label at 390 px on the 62° and 89° frames (layout, for QA/a11y to confirm).
- After "Set 90°" the right side turns dashed; nothing says why (I read it as "this side is now going nowhere").

Verdict reason: no finding blocks a first-time learner; the two-arguments-in-one-reveal ambiguity and the clipped label are notes.

