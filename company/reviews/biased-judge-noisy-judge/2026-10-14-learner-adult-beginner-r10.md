*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r10): biased-judge-noisy-judge
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows being consistently off is an error; does not know that inconsistency is an error of the same size, and that squared error adds the two)
Screenshots seen: yes (artifacts/walkthroughs/biased-judge-noisy-judge/sheet.png, recorded 2026-10-14T18:51)
Verdict: revise

## Findings (written from the walkthrough before reading the brief or build.md)

Path walked: chose "Judge A's"; tapped Judge A, Judge B, Judge C; opened reveal.

1. **The prediction is genuine for the intuition** ("always too harsh" sounds worse than "right on average"), and the three options are fair.
2. **Where I first needed an idea I lack: "squared error", in the question itself.** My boundary has never seen it. The question asks me to compare a quantity I cannot compute, and the stage never shows how 4.0 comes out of the dots. For A I can guess (2 off, squared, 4). For B the dots sit at roughly −3, −2, −1, 0, +1, +2, +3; I cannot turn those into 4.0, and no dot is shown with its square.
3. **The result looks built into the wording.** "Scattering 2 years either way" is read by a beginner as "within 2 years" (which would give a smaller error than A) or "exactly 2 years off each time" (which makes "same" trivial). The lesson's 4.0 needs it to mean a typical (root-mean-square) miss of 2 years. So "They are the same" is true by the choice of words, not something I discovered, and a sceptical learner would say "you just set them equal". The reveal's "Holds up for the arithmetic" confirms this is an identity, which is fine, but the stage needs to show the arithmetic once.
4. **Judge C is the strongest moment.** 4 + 4 = 8 on the readout ("bias² 4 + noise² 4") makes "the two add" visible. That works even without the definition.
5. The "bias² + noise²" readout appears from the first tap with no gloss for "noise²". Readable as a label, not as a meaning.
6. The reveal fits: all three error numbers are on stage. *Noise* in italics is the only cue that this is a book; the Book Summaries domain tag carries it.
7. Trust link "0/7 claims checked" (fact-checker's lane).

Fixes (for the builder):
- On B's strip, label two or three dots with their square (−3 → 9, +1 → 1) and say "squared error = average of these".
- Reword B's scatter so the beginner reads it as a typical miss: e.g. "typically misses by 2 years, either way".

Verdict reason: the comparison rests on a measure the learner cannot compute from the stage, and the key "same size" result reads as stipulated by the wording.

## After reading the brief (meta.json)

- doesNotKnow includes "that squared error adds the two". Judge C delivers the adding. "Inconsistency is an error of the same size" is the half finding 3 questions: it is the same size only because B's spread was chosen to equal A's bias. The reveal could say so ("scatter of 2 counts as much as bias of 2"), which is the honest version of the claim.
- Fix route: demo-builder (stage labels, question wording).
