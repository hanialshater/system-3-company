*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: hamming-points-at-the-bug
lesson version: v1
boundary: adult beginner (knows what odd/even means and that a parity bit can flag an error; never heard of Hamming codes).
Screenshots seen: yes

## From the artifact
- First needed an idea I didn't have: reading set notation {1,3,5,7} in the question; workable. The question is solvable by finding the position in sets 2 and 3 but not 1; 7 is a fair trap (it is in both failing sets).
- Mismatch: the question names checks "1, 2, 3"; the stage labels the rows "+1, +2, +4". I had to work out that "check 3" is the "+4" row. That mapping is the whole trick (failing labels add to the position), but it arrives unannounced.
- Shown well: flipping bits 1 to 7 in turn, each turns its dotted cells red, the fail/ok badges change, and "FAILING CHECKS ADD TO" equals the position every time. Seven-for-seven is convincing.
- Told, not shown: "Flip that bit back and the word is repaired" has no stage action (no repair button). Why the checks were laid out this way (binary) is not mentioned, which is fine.
- Layout: dense but legible on phone; the "odd number of 1s" footnote wraps a lone "1s." onto a second line. Large empty space above the grid.

## Fix suggested
Name the checks in the question the same way as the stage ("checks +2 and +4 fail; +1 passes"), or label stage rows "check 1 (+1)" etc.

## After reading the brief
Learner field assumes the two-flips parity lesson; matches. Claims 6/6 checked.

Verdict: launch
