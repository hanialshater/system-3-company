*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: two-right-angles-never-meet
lesson version: v2
boundary: adult beginner from the lesson's own learner field. Knows a flat triangle's corners add to 180° and what a right angle is; has never met proof by contradiction as a method (assume the thing, follow it until it breaks).
Screenshots seen: yes (/tmp/claude-0/-home-user/3e472d64-8589-5167-8584-c47a01ab4321/scratchpad/wt/run-c0/artifacts/walkthroughs/two-right-angles-never-meet/sheet.png, recorded 2026-10-16T14:43:34.338Z, phone viewport, --choose 0 = on-screen option 1 "Yes, if it is tall enough")
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

Brief: SO-10-3 run batch=SO-10-3, tag [project:catalog]. Shared review server http://localhost:3591, built from 987687acc1cc934b5eaa4f5510d2111712263532 (BUILT_FROM and s3c-qa HEAD read at start and end, unchanged). R3a: `check.sh 987687a… src/demos/math/two-right-angles-never-meet` exit 0 against origin and against local HEAD. Transcript read cut at the trust-sheet appendix.

The brief's question: **Can the learner say which step was the assume? Yes.** The reveal now says it in so many words: "Setting 90° was that assumption, and the sides stood parallel and never met." I can map the three words of the closing line onto what I did: assume = I pressed "Set 90°" (both corners square); follow it = the sides went up parallel, the readout said "sides meet: never" and "top corner: 0°"; hit a wall = no triangle. The reveal also opens with "Assume a triangle had two right angles", so the word "assume" is attached to the stage action before the method is named.

1. **Where understanding first broke.** It did not break. The frames read cleanly: "1.88 bases up" and "57.3 bases up" are fully visible at the phone width (no clipping), the arrows "89° → 57.3 up" and "90° → never" stay on screen as a trail, and the slider and the two buttons agree.
2. **What the prediction felt like.** Easy for this mind, because I know the 180° rule. "Tall enough" is the tempting answer and the 89° frame (57.3 bases up, a 1° tip) rewards that temptation for a moment before 90° kills it. That is a good sequence: the near-miss makes "never" feel earned. The answer is not where I am tested; the method is.
3. **Whether the reveal answered the question I actually had.** Yes. My question was "is watching it fail at 90° a proof, or just a picture?" The reveal answers it with the 180° arithmetic (two 90s leave 0°) and then ties the picture to that assumption. One small leftover: the slider makes it look like a limit (closer and closer to never meeting), and the reveal's arithmetic is a different argument from the parallel-lines picture. A careful beginner might still ask which of the two is the contradiction. It does not block: the reveal says the assumption "leads to an impossible triangle" and both the arithmetic and the picture show that.

Notes (do not block):
- After the reveal, "Set 90°" shows greyed (already set). That reads as "done", which is fine.

Verdict reason: no finding blocks a first-time learner; the "which step was the assume" gap is closed by the reveal's explicit "Setting 90° was that assumption".

## After reading build.md / meta.json

- Not read in this run beyond meta.json `version` (2) and `learner`, for the stamp and the boundary.
