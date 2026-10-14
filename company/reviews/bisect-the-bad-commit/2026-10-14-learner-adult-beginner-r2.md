*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review r2: bisect-the-bad-commit
lesson version: 2
boundary: adult who uses a phone daily, has never programmed
Screenshots seen: yes (sheet.png, all 4 frames)
Verdict: launch

## Fresh pass (artifact first)
- Predict: concrete and fair; 10 / 500 / 1,000. Hook no longer hints.
- Explore: test v500 -> "999 -> 500"; keep halving -> "First broken: v737", full chain "999 -> 500 -> ... -> 1" printed on the stage, 10 tests, tick marks on the bar.
- Reveal: quotes the chain and 10 tests, both on stage. Ceiling argued in plain words (9 halvings handle 512, 10 handle 1,024), no 2^n notation.

## Earlier findings (v1 review)
1. Hook leaks the answer: fixed.
2. Auto-run skips the steps the reveal quotes: fixed (chain printed on the stage).
3. 736 and powers of two unshown: fixed (736 gone; powers in words). "Up to 998 tests" one by one is told; minor.
4. Worst case vs single run: not fixed, acceptable as argued.

## New findings
- Minor: "commit" in the last sentence is undefined; harmless as a closing name.
- Trust link reads "3/6 claims checked" (route to fact-checker).
