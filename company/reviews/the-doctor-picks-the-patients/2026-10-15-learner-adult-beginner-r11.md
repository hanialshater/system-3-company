*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: the-doctor-picks-the-patients
lesson version: v2
boundary: adult beginner (borrowed mind). Knows: confounding (hidden-third-cause); control groups (sixteen-of-twenty-got-better). Does not know: that letting a person choose who is treated builds their judgement into the result, and that a coin breaks that link. Phone viewport, chose option 1 at predict (the walkthrough's default).
Screenshots seen: yes (artifacts/walkthroughs/the-doctor-picks-the-patients/sheet.png, recorded 2026-10-15T10:06:50.259Z, build c0cfd14 served on localhost:3590)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

1. Where understanding first broke: it did not break. The coin rows and the doctor row sit on one strip, and the doctor's +6.2 lands far outside the 21 coin gaps (-2.0 to +1.6). Small gap: the picture shows darker dots in the drug box after "Doctor picks", but the lesson only says *why* she chose them ("she picked the fittest") in the reveal. During explore I was asking "why would a doctor give the drug to the fittest? Mine would give it to the sickest". The reveal answers that only for this doctor; it does not say the bias could run either way.
2. What the prediction felt like: the word "fair" in the question leans toward the coin, so the choice was not hard for this mind. I picked the doctor on purpose (she knows the patients); it was a believable wrong answer.
3. Whether the reveal answered my question: yes. The reveal quotes my own 21 coin gaps against the doctor's +6.2, and "a coin knows nothing about the patients" is the sentence I needed. "Less than 1 time in 100" is a number I could not have checked from the strip, but it fits what I saw.

Verdict reason: nothing blocks a first-time learner; optional note: one clause saying a doctor who picked the sickest would bias it the other way.

## After reading build.md / meta.json

- Earlier review r10 (2026-10-14) said `Verdict: block` (not a valid verdict word) for a dead control. On this build every control changes the stage: Coin picks, +20 coins (the gap range widens to -2.0..+1.6) and Doctor picks (+6.2 marked on the strip). I saw nothing that looked like that finding.
- meta.json learner knows confounding and control groups, which matches the mind I borrowed. The doesNotKnow item (choosing who is treated builds that person's judgement into the result) is what the reveal says.
