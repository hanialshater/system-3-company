*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: flat-rate-costs-nearly-double
lesson version: v2
boundary: adult beginner (borrowed mind). Knows: a loan charges interest and is repaid in monthly instalments (first-payment-mostly-interest). Does not know: that a flat rate charges interest on the original amount for the whole term, even after half of it has been repaid, so the true yearly rate on what you actually owe is nearly double. Phone viewport, chose option 1 at predict (the walkthrough's default).
Screenshots seen: yes (artifacts/walkthroughs/flat-rate-costs-nearly-double/sheet.png, recorded 2026-10-15T10:08:49.628Z, build c0cfd14 served on localhost:3590)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

1. Where understanding first broke: it did not break. The red bars staying at $83 while the owed line falls to half is the picture of the trick.
2. What the prediction felt like: 10% was my honest answer, which is what the quote is built to make you think. 14% and 18% are close enough that I had to think.
3. Whether the reveal answered my question: mostly. "As if you still owed $10,000" is the sentence. My next question was "if I owed about half on average, why is it 18.2% and not 20%?", and the lesson does not touch it. That is fine for a first pass. The reveal stage shows a 2-year term after I had moved the slider to 3. The numbers then match the text, but my last move was quietly undone.

Verdict reason: nothing blocks.

## After reading build.md / meta.json

- r10 said revise: the reveal's $5,449 owed contradicted a beginner's arithmetic, and the bars changed meaning. The reveal now says "about half" and the flat bars are labelled "flat: $83 a month" throughout. Addressed. My 18.2-vs-20% question is a note.
