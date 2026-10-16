*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: twenty-flips-run-of-five
lesson version: v2
boundary: adult beginner from the lesson's own learner field. Knows a fair coin is 50/50 and that flips are independent; does not know how long the longest run in a short random sequence usually is, or that each flip repeats the previous face half the time.
Screenshots seen: yes (artifacts/walkthroughs/twenty-flips-run-of-five/sheet.png, recorded 2026-10-16T12:42:58Z, phone viewport, option 1 chosen)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

Brief: SO-10-3 run (batch=SO-10-3, tag [project:wave-j]). Walkthrough on the shared review server http://localhost:3591, built from bc0edc0ebf45440c75754a31a61c63a6f9bd10cb (BUILT_FROM and `git -C /home/user/s3c-qa rev-parse HEAD`, read at start and end). Ancestry test: the newest commit touching src/demos/<d>/twenty-flips-run-of-five/ is d8a48ce, and `git merge-base --is-ancestor d8a48ce bc0edc0` passes; since the newest commit of any kind passes, the newest non-evidence commit (W-1313 reading) passes too. No diff between bc0edc0 and main on the lesson directory. Transcript read cut at the trust-sheet appendix (R1); no build notes in the brief.

1. **Where understanding first broke.** A small wobble, not a break, on the reveal's "The tallest bar is a longest run of 4". Next to "47.6% had a run of 5 or more", my first reading was "so the usual longest run is 4, and 5 is unusual", which is the opposite of the lesson. Then I noticed the yellow bars (5, 6, 7, 8+) together are about as big as the grey ones. Nothing on the stage says what yellow means; I inferred "run of 5 or more" from the bars that turned yellow and the readout. The real sequences themselves (TTTT HHHH ..., then HHHH TTTTT ...) did more for me than the histogram: two in a row with runs of 4 and 5.

2. **What the prediction felt like.** A real choice and a good trap for this mind. Five heads in a row "feels" like a 1-in-32 event, so 5% pulled me hard, and I chose it. 20% was the hedge. Nothing on the locked stage gives the answer: everything reads "none yet" / "-".

3. **Whether the reveal answered the question I actually had.** Yes for "how likely": 47.6% in my 1,001, 45.8% exact. My next question was "but why, if five heads is 1 in 32?", and the last line answers it: each flip repeats the last face half the time, so a run of 5 needs only 4 repeats, and there are many places in 20 flips to start one. The lesson says the first half of that, not the "many places to start" half, but I could get there.

Notes (do not block a first-time learner):
- The hook invites me to "write 20 coin flips that look random", and the H/T buttons let me, but the reveal never compares my fake taps with the real ones. A learner who taps 20 fakes (likely longest run 3) gets no payoff for it. The walkthrough tapped only H, T, then cleared.
- No legend for the yellow vs grey bars (finding 1).

Verdict reason: no finding blocks a first-time learner; the "tallest bar is 4" sentence and the unused fake-flip input are notes.

