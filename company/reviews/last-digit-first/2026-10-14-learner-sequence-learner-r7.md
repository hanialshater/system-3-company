*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (wave F r7): last-digit-first
lesson version: v5
boundary: sequence-learner (same as r6). Arrives from sorting-without-comparing, so knows sorting into buckets and that a stable sort keeps ties in order. Does not know that sorting by the least important digit first works, or that each later pass decides the order while stability keeps the earlier passes' work.
Screenshots seen: yes (artifacts/walkthroughs/last-digit-first/sheet.png, 8 frames, build 4 at localhost:3480)
Verdict: launch

## 1. From the artifact (written before reading r6)
- **Predict is clean.** Hook "Three passes, one digit each. Does the order of the passes matter?" is a question. Options "fully sorted / sorted by first digit only / scrambled" are the same kind of phrase, none numbered. The locked stage shows only the start row and empty buckets 0 to 9. The title "Sort by the last digit first?" names the procedure the question describes, not its outcome.
- **The why is on the stage.** Each pass deals into buckets, tints the digit in use and marks each neighbour pair < or > (red > for out of order). Last-first pass 3 outlines bucket 3 (329 above 355) with "Tie in bucket 3: kept the order earlier passes gave it". That is stability keeping the earlier passes' work, drawn. The first-first run ends "720 > 355 … 657 > 329", and both "ended" lines sit on the stage together. I can see the order matters without the reveal.
- **Reveal** quotes both endings exactly, points at the bucket-3 tie, and ends on the idea ("the first digit, dealt last, has the last word"). The closing line about any count of numbers is one sentence of told context.
- Minor (quotes what you saw): when the reveal opens, the stage is on the first-first pass 3 ("Tie in bucket 7") and scrolled so the buckets are cut off. The bucket-3 tie the reveal names is no longer drawn. The two "ended" lines are.
- Minor: the six pass buttons have their group label only on pass 1 ("Last first · Pass 1", "First first · Pass 1"). The two "Pass 2: middle digit" buttons are told apart only by position. On the locked frame the "First first" row is cut off at the bottom of the stage.
- Minor: stage density. Ten small buckets, a tinted row, two status lines and two "ended" lines take it well past 25 words, and the bucket digits are small on a phone. The < / > marks carry the meaning.
- No fatal flaw.

## 2. Earlier findings (r6), read after section 1
| r6 finding | Status |
|---|---|
| Stage density: six buttons, small buckets, over 25 words | not fixed (still minor) |
| Reveal frame crops the buckets | not fixed (still minor; the named bucket-3 tie is not visible at the reveal) |
| r5 items (first-first comparison, tie pointed at, title) | still fixed |

## 3. Against the brief
Version read from meta.json (version 5) after section 1. build.md not read.
