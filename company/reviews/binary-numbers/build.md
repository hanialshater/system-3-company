# Build notes: binary-numbers

## v2 (revision, 2026-10-13)
Inputs: 2026-10-12-fact-check.md, 2026-10-12-learner-adult-beginner.md, 2026-10-12-qa.md. No FATAL was raised.

Key states (milestones, `minInteractions` = 2): `all-on` (the number reaches 255) and `ripple` (a +1 from 127 or from 255, which flips all eight switches).

| Finding | What I did |
|---|---|
| L1 prediction is arithmetic on numbers it gives you | The question now asks how many different numbers eight switches can show, counting 0 (8 / 16 / 128 / 256). That puts the misconception (eight switches name about 8 or 16 numbers) on the line. The worth of each switch is still described, because the learner needs the rule. |
| L2 the doubling is never shown | A row of ×2 arcs above the switches shows that each switch is worth twice the one to its right. When the switches on make 2^k − 1 (3, 7, …, 255) the stage says "All N on = X: one less than the next switch, 2X." |
| L3 "+1 from 127" has no stated purpose | When +1 flips more than one switch the stage says "127 + 1 = 128: 8 switches flip, carrying left like 9 + 1 = 10." The reveal closes it ("That is why +1 from 127 flipped all eight"). |
| L4 binary string is a label the learner cannot read | The line now reads "pattern 00000101 = 5", next to the sum line ("4 + 1"), so the pattern and the number sit side by side. |
| L5 "Out of switches: back to 0" is unexplained | Now "255 + 1 = 256 needs a ninth switch, so all eight roll back to 0." The reveal names it when that is the ripple the learner saw. |
| L6 byte introduced cold | Now "A computer byte is 8 such switches (bits)". Kept it short and in the muted closing line. |
| L7 reveal too dense | Cut to one idea per paragraph: 256 numbers, the +1 that they saw, then the ninth switch. About 90 words. |
| FC F1 c6 needs another checker | c6 text changed to the new messages; still unverified. New claims c7 (carry like 9 + 1) and c8 (worth one more than all to its right; byte) are unverified. |

Trade-off for the QA contract: the contract presses the eight switches in order (which reaches 255) and then +1 (255 → 0, a full ripple), so both milestones are reachable on its path. A learner who only flips some switches cannot open the reveal until they reach 255 and do one full ripple. The "All off" button does not count toward anything.

Not changed: the hook ("How far can eight of them count?"), which already fits the new question.

## Revision v3 (wave C, learner review)

- Count of patterns never visible: with all eight on the stage says 'With 0, that is 256 numbers.' (c2).
- Told-only 512 and four billion removed from the reveal; claim c4 and c5 rewritten to what is shown.
- Bit, byte and binary now defined in the closing line (c5).
- Not changed: the carry from 127 is still optional (the QA path carries from 255); the reveal names whichever carry the learner saw.

All changed claims are unverified, awaiting a fact-checker.
