*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r5): bisect-the-bad-commit
lesson version: v2
boundary: an adult who uses a phone and a laptop daily and has never programmed (comfortable with everyday apps and basic arithmetic).
Screenshots seen: yes (artifacts/walkthroughs/bisect-the-bad-commit/sheet.png, all 4 frames)
Verdict: launch

## 1. From the artifact (written before reading the earlier reviews)

- Predict: concrete and fair. Ten, 500 and 1,000 are all believable guesses for this learner, and the hook is neutral. The stage states the premise ("Once a version breaks, every later one stays broken") before the choice, which is right: the trick depends on it. The locked button "Test the middle: v500" hints at a strategy but not at the count, so the prediction is still a real guess.
- Explore: one tap on "Test the middle" turns 999 suspects into 500 (v501 to v1000), the bar shades the surviving half, and LAST TEST reads "v500 works". "Keep halving to the end" then runs the rest, but the whole chain "999 → 500 → 250 → 125 → 63 → 32 → 16 → 8 → 4 → 2 → 1" is printed on the stage with TESTS 10 and "First broken: v737". The learner can count ten arrows.
- Reveal: it quotes the chain and the 10 tests the learner just saw. "Whichever answer comes back" covers the one-sided path. The worst case is argued in words (9 halvings handle 512, 10 handle 1,024), not shown, but it follows from the chain on stage.
- Weak spots: "Test the next one" (the one-by-one baseline) was not used in this path, so "up to 998 tests" is told. After the run the bar is mostly white with thin tick marks near v737; the shrinking range is easier to read in the number chain than on the bar. "Commit" in the final sentence is never defined, but it only names the tool.

## 2. Earlier findings

From v1 (2026-10-13):
1. Hook leaked the answer: **fixed**.
2. Auto-run skipped the steps the reveal quotes: **fixed** (the chain is on stage).
3. 736 and powers of two unshown: **fixed** (736 gone; powers given in words).
4. Worst case argued from a single run: **not fixed**, acceptable; the argument is short and uses numbers on stage.

From r2 (2026-10-14):
- "Commit" undefined: **not fixed**, still minor.
- Trust link read 3/6 claims checked: **fixed** (now 6/6).

## 3. New findings

- Minor: the bar after the run is hard to read; a highlighted remaining range (or the last few suspects drawn larger) would help.
- Minor: one-by-one cost is told. A single tap of "Test the next one" in the gate would make 998 felt.
- No FATAL.
