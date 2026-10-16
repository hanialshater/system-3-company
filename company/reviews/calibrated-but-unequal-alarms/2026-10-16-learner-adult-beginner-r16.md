*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: calibrated-but-unequal-alarms
lesson version: v3
boundary: adult beginner: numerate, has heard of "risk scores" in the news; does not know calibration, false-positive rate, base rate or the impossibility results
Screenshots seen: yes (/tmp/claude-0/-home-user/3e472d64-8589-5167-8584-c47a01ab4321/scratchpad/wt/0dbb/artifacts/walkthroughs/calibrated-but-unequal-alarms/sheet.png, recorded 2026-10-16T15:56:04Z, phone, choice 1)
Server: http://localhost:3591, BUILT_FROM bf6fde86961edff82325289e54bb1e93d24c3c60 at start and at end (unchanged; contains 169e88d)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

1. Where understanding first broke: nowhere hard. The softest point is the vocabulary drift across one minute: the question says "non-reoffenders ... flagged", the stage says "false alarms" and "misses", the reveal says "A's innocent people were flagged". Each is readable, but a beginner has to translate three names for one quantity. Second soft point: B's readouts (4/68 = 6%, 16/32 = 50%) carry no row labels; I had to line them up with A's "false alarms" / "misses" rows by eye. Readable on the phone frame, but it costs a second look.
2. What the prediction felt like: a real choice. "Honest in both groups" makes "The same as B's" feel safe, which is the intended trap. The locked stage already shows "A: 50 ringed / B: 20 ringed", a fair hint for someone who thinks, not a giveaway.
3. Whether the reveal answered my question: yes. My question after Show outcomes was "how can A's innocents be flagged more if the score is equally honest?" The reveal's "A has more reoffenders, so more of A is ringed, guilty or not" answers it in one line, and the slider to 50 (both errors 20%) plus the memo "Earlier at 32: false alarms 6%, misses 50%" let me hold both cases at once. The closing sentence ("Otherwise no high/low score that makes mistakes is honest with matching errors") is dense; I understood it only because the 50 case came first. It is a generalisation beyond the toy that I took on trust.

Verdict reason: no finding blocks a first-time adult learner; notes 1 (three names for one quantity, unlabeled B readouts) and 3 (dense last sentence) are polish.

## After reading meta.json and the previous round (r15, v2)

- meta.json version is 3, matching the stamp. Objective: explain that a calibrated score with different base rates flags a larger share of the higher-base-rate group's innocents, and that errors match only when base rates match. The walk showed both halves on screen (32 vs 50). Whether a learner can explain it afterwards is for human learners to show.
- r15 note 1 (four words for "honest", "calibrated" untied): fixed in v3. "Calibrated" no longer appears; hook, question and reveal all say "honest". The drift I found (non-reoffenders / false alarms / innocent) is a different, smaller one, about the error, not the score.
- r15 note 3 (stale "B at 32" status line): fixed. It now reads "Earlier at 32: ...", and I used it as a memo without confusion.
- r15 note 2 (locked stage shows ring counts, tilting the prediction): unchanged; I agree it is a hint, not a giveaway.
- r15 note 5 (readout font size near 10 px in the reveal frame): not re-checked by me; still a qa-tester question.
- Verdict unchanged from r15 (launch).
