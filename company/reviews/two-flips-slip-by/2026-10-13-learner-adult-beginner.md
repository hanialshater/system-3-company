*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: two-flips-slip-by
lesson version: v1
boundary: an adult who uses a phone and a laptop daily and has never programmed (no idea what a variable, array, function or "algorithm" is; comfortable with everyday apps and basic arithmetic).

## 1. From the artifact

- Prediction: "A message has an even-parity check bit. Two of its bits flip in transit. Does the receiver notice?" I do not know "even-parity", "bit" or "check bit"; the hook ("One extra bit lets the receiver spot a corrupted message. Does it spot every one?") sets up a yes/no and its "every one" phrasing hints the answer is no. The stage shows eight 1/0 boxes labelled "message" and "check", and the locked stage's counters ("1S RECEIVED", "MESSAGE") are unexplained. Always / only adjacent / can miss is a decent spread, but a beginner has no way to reason about parity before the stage.
- What was SHOWN: tapping a bit flips it and a big circle turns "ERROR" (red) for 1 flip and "OK" (green) for 2: I saw the surprising result myself: two flips and the receiver says OK while the message is marked "changed". The counters "1S RECEIVED 3/4/3/4" alternate odd/even beside it, so the pattern is visible if I look. "Undo flips" resets to "intact".
- Where understanding first broke: why the circle says OK. Nowhere on the stage does it say that the receiver checks whether the number of 1s is even; the "1S RECEIVED" counter is the clue, but unlabelled as the thing being checked. The word "parity" is defined only in the reveal ("The check bit makes the count of 1s even"). The check bit itself (the dashed box on the right) is never shown to be computed.
- Adjacent versus not: the explore panel asks me to flip one, then another, then three and four. My taps went in order (bits 1, 2, 3, ...), so every pair of flips I tried was adjacent bits, and the stage never showed two non-adjacent flips. The reveal says "two flips slip by, wherever they are": told, not shown, and it is exactly the claim that rules out option 2. The check bit itself was only flipped on the last tap.
- Reveal: "1 flip (caught), 2 flips (passed), 3 (caught) ... 8 (passed)" matches the transcript exactly. The explanation (every flip switches even/odd) is good and earned by the alternating pattern. "CRCs, built from many parity-style sums" is jargon, told.
- Reveal earned: yes that it can miss; "wherever they are" no.
- Problems: (1) parity and the checked count are not explained on the stage; (2) non-adjacent flips never demonstrated on the suggested path, so the middle option is not refuted by what was seen; (3) hook phrasing leaks; (4) CRC aside.
- No FATAL.

## 2. After reading the brief

- The brief's learner knows bits and even/odd numbers; my boundary has not met 'parity', and the brief's unknowns (how a check bit is chosen and tested) are precisely what the stage never explains. The objective (each flip switches even/odd; two flips pass 'wherever they are') is shown for adjacent flips only on my path; 'wherever they are' is told. The misconception (a check bit catches any corruption) is hit by 'Always' and the hook, which leaks it.
- Claims: not assessed here (fact-checker's job).

Verdict: revise
