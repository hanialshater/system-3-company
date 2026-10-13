*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: bad-hash-one-bucket
lesson version: v1
boundary: an adult who uses a phone and a laptop daily and has never programmed (no idea what a variable, array, function or "algorithm" is; comfortable with everyday apps and basic arithmetic).

## 1. From the artifact

- Prediction: the question is answerable only if I know "mod". It is defined in brackets ("the remainder after dividing by 10") but a non-programmer must do 10, 20, 30 ... 100 divided by 10 in their head, spot that every remainder is 0, and conclude "1 slot". That is a real guess for some and a trivial one for others. The hook gives the answer away: "why does it turn into one long queue?" tells me everything piles into one place, so "1" is the obvious pick. "Table", "slot", "key" are never explained (what is being stored, and why would anyone care).
- What was SHOWN: ten taps, each key dropping into slot 0 and the counters "SLOTS USED 1 of 10" and "LONGEST LIST" climbing to 10. That is vivid and I could watch the pile grow. Then "Switch rule to mod 7" redistributes the keys to 7 of 10 slots.
- Where understanding first broke: the mod 7 view. Slots 7, 8, 9 are greyed out and never used, and nobody says why a "mod 7" rule can only reach slots 0 to 6. Keys are coloured red or green with no legend (I guessed red means shared slot). "Longest list 2" after the "good" rule contradicts the idea that the rule fixed the problem: the stage never says that collisions of 2 are fine.
- Reveal: "9 slots stayed empty" and "7 slots" match the stage numbers. "Keys that land together are kept as a list in their slot, and finding one means walking that list" is told, not shown: the stage never searches for anything, so the cost of a long list is never felt. "A good hash breaks up the patterns real keys have" is an assertion; "hash" is a new word first appearing in the reveal. The reveal screenshot also cuts the second paragraph off at the card's edge (it may scroll; I could not read the end of it from the image).
- Reveal earned: the number part (1 slot, 7 slots) yes; the "why it matters" part no.
- Problems: (1) hook leaks the answer; (2) "table / key / slot / hash" never grounded in anything a non-programmer knows; (3) colour coding and greyed slots unexplained; (4) the payoff (slow lookup) is told, not shown; (5) reveal text clipped in the screenshot.
- No FATAL.

## 2. After reading the brief

- The brief assumes the learner has done hash-bucket-pileup and knows division with remainder; my boundary has neither, which is why 'table, key, slot, mod' read as unexplained. The objective's third clause (a pileup makes lookups walk one long list) has no stage element, so that part is told. The misconception (only table size matters) is hit by the hook, which also leaks the answer.
- Claims: not assessed here (fact-checker's job); my notes about claims are limited to wording a learner reads.

Verdict: revise
