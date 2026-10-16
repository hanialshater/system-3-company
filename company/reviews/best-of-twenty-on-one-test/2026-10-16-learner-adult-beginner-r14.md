*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: best-of-twenty-on-one-test
lesson version: v1
boundary: adult beginner from the lesson's own learner field. Knows why a test set is held out and that a score is a sample that varies by luck; has never thought about what happens when many models are ranked on the same test, and does not know the word "seed".
Screenshots seen: yes (artifacts/walkthroughs/best-of-twenty-on-one-test/sheet.png, recorded 2026-10-16T11:19:15Z, phone viewport, option 1 chosen)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

Brief: SO-10-3 run (batch=SO-10-3, tag [project:wave-j]). Transcript read cut at the trust-sheet appendix (ruling R1); no build notes in the brief.

1. **Where understanding first broke.** Not in the core idea. The first wobble is the status line after "Fresh test": "Seen: seed 1, 20 models: winner 56, fresh 49.7%." "Seed" means nothing to me, and the line then stays frozen while I switch to 1, 5 and 100 models, so on the 100-model frame it still says "20 models: winner 56" above a chart that says "winner 59". I had to check which number belonged to which run. The second wobble is units: the shared score is "56 of 100" and the fresh score is "49.7%". Same thing, two formats, side by side in the readout cards.

2. **What the prediction felt like.** A real choice. I know each guesser averages 50%, and "the best of 20" makes me hesitate between 50 and 60. 75 is clearly a decoy. I picked 50% because "no model knows anything" pulled me there, which is exactly the intuition the lesson wants to catch. The prediction does not depend on knowing anything I lack.

3. **Whether the reveal answered the question I actually had.** Yes for the main question. After the dot plot my question was "is the winner actually better?", and the Fresh test button answered it before the reveal did (56 to 49.7%). The 1/5/20/100 buttons then showed the winner's score climbing with the field size (53, 54, 56, 59), and the reveal names that. The last line, "Using one test set to choose among many models quietly trains on it", is a jump for me: nobody trained anything on screen, I only picked. I can accept "choosing is a kind of fitting", but the lesson asserts it rather than shows it. It does not mislead me; it is the one sentence I would not be able to explain back.

Notes (do not block a first-time learner):
- The fresh test is only offered for the 20-model winner I first ran; after switching to 100 models the fresh card resets to "–". I would have liked to see the 100-model winner (59) fall too, and nothing prompts me to tap Fresh test again.
- With "1 model" the readout still says "winner 53". A winner of a race of one is odd wording, though it does show that luck alone moves one score off 50.

Verdict reason: no finding blocks a first-time learner; the "seed" status line and the "trains on it" leap are notes.

## After reading meta.json (claims and learner field; build.md not read)

- Intent and experience match on the objective's three parts: the winner is lucky (56 seen), the lead vanishes (49.7%), and a final test set is used once (told in the last line).
- c1 says the 20-model winner averages about 59 and the learner's seed-1 run is one sample (56). The predict answer "About 60%" is the average, but my own run showed 56, which is nearer 60 than 50 only by a little. A learner who picked 50% and then saw 56 may feel the "Not quite" is marginal. Not a defect in the claim; a note on how the reveal lands.
- c3's averages (50, 56, 59, 62 for 1, 5, 20, 100) are not on screen; I saw one run (53, 54, 56, 59). Fine, the reveal only quotes my run.
- c4 is the "quietly trains on it" sentence I flagged in finding 3. It is recorded as a claim; whether it is a fact or a framing is a question for the pedagogy critic, not for me.
- I did not read build.md. Verdict unchanged.
