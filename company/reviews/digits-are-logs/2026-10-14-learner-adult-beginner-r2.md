*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review r2: digits-are-logs
lesson version: 2
boundary: adult beginner (school arithmetic and place value; logarithms forgotten)
Screenshots seen: yes (sheet.png, 4 frames; plus one extra phone screenshot of the reveal, see below)
Verdict: launch

## Fresh pass (artifact first)
- Predict: the question now anchors with "ten doublings give 1024". 21 / 31 / 100 is a guess with a handle.
- Explore: slider, +10 (2^12 = 4096, 4 digits, "+3" tick at 10), Run to 100. Caption: "Times 1000 adds three zeros, so 3 more digits."
- The standard walkthrough caught "Run to 100" mid-animation (2^57, "Doubling...") and the reveal did not unlock within its 1.2 s wait. I re-drove the same path in a phone browser (Pixel 7 profile, same server), waited 10 s: the stage reached 2^100 = 31 digits with ten "+3" ticks, and the reveal unlocked. Screenshot at scratchpad digits.png (not kept in repo).
- Reveal: "on your strip each round added exactly 3 digits. Start at 1, add 3 ten times: 31." All on the stage. The log10 line (100 x 0.301) is told; 0.301 is never explained.

## Earlier findings (v1 review)
1. Prediction without an anchor: fixed (1024 in the question).
2. "x1000 means +3 digits" asserted: fixed ("adds three zeros").
3. Ticks unexplained: fixed (caption plus "+3" labels).
4. Digit strip noisy, counter small: not fixed, minor; the +3 labels now carry it.
5. Reveal not seen: now seen (manual re-drive).

## New findings
- For QA (not a lesson flaw): Run to 100 takes longer than the walkthrough's settle time, so the contract path never reaches the reveal. Either speed the run or the QA driver should wait for it.
- Minor: "0.301" in the reveal is unexplained.
