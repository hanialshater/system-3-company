*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: biased-judge-noisy-judge
lesson version: v2
boundary: adult beginner (borrowed mind). Knows: being consistently off is an error. Does not know: that inconsistency is an error of the same size, and that squared error adds the two. Phone viewport, chose option 1 at predict (the walkthrough's default).
Screenshots seen: yes (artifacts/walkthroughs/biased-judge-noisy-judge/sheet.png, recorded 2026-10-15T10:07:29.079Z, build c0cfd14 served on localhost:3590)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

1. Where understanding first broke: at "a typical miss of 2 years either way". I read "typical miss" as the usual distance off. Judge B's dots sit at -3, -1, 0, +1, +3, so his average distance off is 1.6, not 2. The lesson's "typical miss" is the square-root-of-average-square kind, and it never says so. With my meaning, the claim that both score the same looks rigged.
2. What the prediction felt like: tense, and on purpose. But a learner who reasons "squaring punishes B's big 3-year misses, so B is bigger" uses exactly the idea the lesson wants and is still marked wrong, because "typical" was set so the two come out equal. The question sets the answer in its wording.
3. Whether the reveal answered my question: half. "Squared error is bias^2 plus noise^2, exactly" is clear, and Judge C at 8.0 is a good third case. It did not answer what I asked at Judge B's row: "why is his typical miss 2 when none of his misses is 2?" The reveal line "a scatter of 2 costs as much as a bias of 2" holds only for that meaning of scatter. The trust link reads "0/7 claims checked", which a learner sees.

Verdict reason: "typical miss of 2" is not defined, and B's visible misses average 1.6 years off, so the Judge B's-error reasoning (squaring punishes big misses) is marked wrong. Define the typical miss on the card (for example, "misses whose squares average 4") or show it in the B row.

## After reading build.md / meta.json

- r10 said revise: the comparison rests on a measure the learner cannot compute, and "same size" reads as set by the wording. Build v2 added the Misses^2 line (now on the stage) and changed the question to "typical miss of 2 years". The squared-error half is fixed: I could check 4.0 and 8.0 myself. The second half remains in a new form: "typical miss" is still undefined, and the visible misses average 1.6 years off. My finding 1 is the remaining piece of r10's second point, not a new objection.
- Books pilot (meta.json status draft): Books publishing is held for the founder's F1/F2 regardless of this verdict. The trust link shows 0/7 claims checked on this build, which is the fact-checker's lane.
