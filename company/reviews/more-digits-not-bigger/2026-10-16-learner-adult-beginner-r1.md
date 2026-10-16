*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: more-digits-not-bigger
lesson version: v1
boundary: adult beginner from the lesson's own learner field. Knows place value for whole numbers (add-a-zero) and that 0.5 is a half; does not know how to compare decimals of different lengths, and half-believes that more digits means a bigger number.
Screenshots seen: yes (artifacts/walkthroughs/more-digits-not-bigger/sheet.png, recorded 2026-10-16T12:42:13Z, phone viewport, option 1 chosen)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

Brief: SO-10-3 run (batch=SO-10-3, tag [project:wave-j]). Walkthrough on the shared review server http://localhost:3591, built from bc0edc0ebf45440c75754a31a61c63a6f9bd10cb (BUILT_FROM and `git -C /home/user/s3c-qa rev-parse HEAD`, read at start and end). Ancestry test: the newest commit touching src/demos/<d>/more-digits-not-bigger/ is cce79e5, and `git merge-base --is-ancestor cce79e5 bc0edc0` passes; since the newest commit of any kind passes, the newest non-evidence commit (W-1313 reading) passes too. No diff between bc0edc0 and main on the lesson directory. Transcript read cut at the trust-sheet appendix (R1); no build notes in the brief.

1. **Where understanding first broke.** It did not break on the core idea. The one wobble is on the last build frame: 0.25's five hundredth-slivers render as five dark stripes and 0.125's thousandth as a single red line. The key says "sliver = 0.01 · hairline = 0.001", but at phone size the five slivers look like hairlines too, so for a second I could not tell which mark was which size. The labels next to each bar (0.2 then 0.25, 0.1 then 0.125) rescued me.

2. **What the prediction felt like.** A real choice for this mind. "0.125 has the most digits" pulled me, and "0.25 is a quarter, 0.3 is 3 of something" was a half-formed counter-thought. Nothing on the locked stage gives the answer away: the three bars are empty. I chose 0.125 and meant it.

3. **Whether the reveal answered the question I actually had.** Yes. My question after building was "why doesn't the 5 count for more?", and the reveal answers it in my own numbers: 0.25's five slivers added 0.05, less than the one more block it needed. The rule at the end, "compare from the first digit", is one I can repeat. Building digit by digit (first digit of each, then the rest) is what made it land: after step 3 I could already see 0.3 ahead with three blocks to 0.25's two, before any slivers.

Notes (do not block a first-time learner):
- The "Build the rest" button does all remaining digits at once, so I never see 0.25's 5 added separately from 0.125's 2 and 5. Fine for 60 seconds.
- I never saw the case that would challenge me hardest (0.3 vs 0.29, or 0.3 vs 0.30). Not needed for this lesson's question.

Verdict reason: no finding blocks a first-time learner; the sliver/hairline rendering at phone size is a note.

## After reading meta.json (misconception, objective, claims; build.md not read)

- Intent and experience match. The misconception ("longer is larger", 0.125 > 0.25 > 0.3) is the one I chose with, and the objective (compare from the first digit because each place is a tenth of the one before) is the reveal's last sentence, c4.
- c3 (the five slivers add 0.05, less than one more block) is the sentence that answered my question in finding 3.
- c5 (block/sliver/hairline legend) is accurate as text; my finding 1 is about how the slivers render at phone size, not about the claim.
- Verdict unchanged: launch.
