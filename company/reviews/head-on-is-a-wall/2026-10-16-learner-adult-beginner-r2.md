*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: head-on-is-a-wall
lesson version: v2
boundary: adult beginner from the lesson's own learner field. Knows crashes are worse at higher speed, crumple zones and momentum; does not know that in a symmetric head-on crash the meeting point stays still (so each car stops from its own speed as against a wall), or that crash damage scales with speed squared.
Screenshots seen: yes (/tmp/claude-0/-home-user/3e472d64-8589-5167-8584-c47a01ab4321/scratchpad/wt/run-c0/artifacts/walkthroughs/head-on-is-a-wall/sheet.png, recorded 2026-10-16T14:43:41.094Z, phone viewport, --choose 0 = on-screen option 1 "25 km/h")
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

Brief: SO-10-3 run batch=SO-10-3, tag [project:catalog]. Shared review server http://localhost:3591, built from 987687acc1cc934b5eaa4f5510d2111712263532 (BUILT_FROM and s3c-qa HEAD read at start and end, unchanged). R3a: `check.sh 987687a… src/demos/physics/head-on-is-a-wall` exit 0 against origin and against local HEAD. Transcript read cut at the trust-sheet appendix.

The brief's question: **Does the locked "car A 50 km/h" readout give the answer away? No.** On the locked frame the readout under the road says "car A 50 km/h", next to cars A and B and an empty "car A crush energy" bar. That repeats the question's given ("both drive at 50 km/h"); it says nothing about what wall speed the crash is like. The wall-speed buttons (25/50/100) are greyed and unlabelled by any energy value, and the bar is empty. As this mind, the tempting wrong answer is 100 (closing speed 50+50) or 25 (two cars share it), and "car A 50 km/h" pushes against neither: it is one car's speed, which I already had. At most it is a faint cue that car A's own speed is what matters, which is the lesson's point, but a reader cannot get from it to "like a 50 km/h wall" without the meeting-point idea. The reveal-relevant readouts ("car A 50 → 0 km/h", "car 50: 145 kJ", "wall 50: 145 kJ") appear only after commit.

1. **Where understanding first broke.** Briefly, at step 1: the crush bar labels are small ("car A crush energy: 145 kJ", the "car 50: 145 kJ" tick label). They are legible on the phone frame but are the smallest text on the stage; QA may want to measure them against the 10 px floor. The idea itself did not break: "meeting point" with a dashed line that stays put between A and B, then the same spot becoming the wall, is the clearest move in the lesson.
2. **What the prediction felt like.** Honest. I genuinely did not know whether to add the speeds (100) or split them (25), and 50 felt like a cop-out. Three options, all plausible to this mind.
3. **Whether the reveal answered the question I actually had.** Yes. After the 100 km/h wall my question was "but two cars at 50 have twice the energy of one, so why isn't it worse?" The reveal answers exactly that: "Two cars at 50 carry twice one car's energy, and each crumple zone takes its own half." The 4× from 50 to 100 (145 → 579 kJ) is shown on the bar before it is said, and "Crush energy grows with speed squared" names it. The 25 km/h wall at 36 kJ (a quarter) is on screen but not mentioned in the reveal; a learner who chose 25 could be told directly that their crash would be a quarter of the real one.

Notes (do not block):
- Bar and tick labels are the smallest text on the stage (finding 1): a QA legibility check, not a learner block.
- The reveal could name the 25 km/h wall's 36 kJ for those who picked 25.

Verdict reason: no finding blocks a first-time learner; the locked readout repeats the question's given and does not cue the answer.

## After reading build.md / meta.json

- Not read in this run beyond meta.json `version` (2) and `learner`, for the stamp and the boundary. meta.json has another run's uncommitted edits in the main checkout, so this record is **not** linked in evidence.simulatedLearner by this run (listed in the run report for the single writer).
