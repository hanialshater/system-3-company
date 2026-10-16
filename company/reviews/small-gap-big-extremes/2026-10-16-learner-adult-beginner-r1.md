*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: small-gap-big-extremes
lesson version: v2
boundary: adult beginner from the lesson's own learner field. Knows averages and that values spread around them in a bell shape; does not know that a small difference in averages becomes a large ratio far out in the tails.
Screenshots seen: yes (artifacts/walkthroughs/small-gap-big-extremes/sheet.png, recorded 2026-10-16T12:42:53Z, phone viewport, option 1 chosen)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Brief: SO-10-3 run (batch=SO-10-3, tag [project:wave-j]). Walkthrough on the shared review server http://localhost:3591, built from bc0edc0ebf45440c75754a31a61c63a6f9bd10cb (BUILT_FROM and `git -C /home/user/s3c-qa rev-parse HEAD`, read at start and end). Ancestry test: the newest commit touching src/demos/<d>/small-gap-big-extremes/ is 112c602, and `git merge-base --is-ancestor 112c602 bc0edc0` passes; since the newest commit of any kind passes, the newest non-evidence commit (W-1313 reading) passes too. No diff between bc0edc0 and main on the lesson directory. Transcript read cut at the trust-sheet appendix (R1); no build notes in the brief.

1. **Where understanding first broke.** In the reveal's first sentence: "The two curves mostly overlap, sharing about 80% of their area ... But above 130 cm, B made up 82% of the plants". The answer I am told I missed is "About 80%", and the first number in the reveal is a different 80% (the overlap of the curves). For a mind new to tails, two 80%s in one sentence about two different things is exactly where the wrong idea ("they overlap 80%, so B is about 80%") can form, or where I stop knowing which number answered the question. The second snag: "A's curve falls away faster than B's" when the question told me both have the same spread. I had to think hard to see that it means "A is further out, so it is on a steeper part of its tail", and I am not sure I would have.

2. **What the prediction felt like.** A real choice: 50% (the averages barely differ) pulled me, and I chose it. One cue on the locked stage: the curves are already drawn with a cutoff at 120 cm and the yellow (B) shading visibly larger than the blue beyond it, so a careful looker can see before predicting that B dominates the tail. The share readout is hidden ("-"), but the shading is not.

3. **Whether the reveal answered the question I actually had.** Partly. The question asks about plants over 130 cm. The explore said "slide the cutoff to 130 cm, then to 140 cm", but "Show me why" unlocked after one move, and in this walkthrough the slider went straight to 140. So I saw 88% (7.3 to 1) and "per 100,000: A 3, B 23", and never saw the 130 value; the reveal then tells me 82% at 130. A small "130" marker on the share bar sits near the 82% boundary, but it is unlabelled and I did not read it as the answer. My actual question after the explore was "how can 5 cm make B nearly 9 in 10 of the tallest?", and the reveal's answer to that is the "falls away faster" sentence from finding 1, which did not explain it to me.

Verdict reason: revise for two specific findings: (a) the reveal's "sharing about 80% of their area" puts a second, unrelated 80% beside the correct answer "About 80%" (82% above 130 cm), inviting the very confusion the lesson should prevent; (b) the explore unlocks the reveal before the learner has set 130 cm, so the number that answers the question asked is read, not seen.

