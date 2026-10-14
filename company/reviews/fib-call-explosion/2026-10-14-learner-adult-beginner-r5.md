*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r5): fib-call-explosion
lesson version: v2
boundary: adult who uses a phone daily, has never programmed
Screenshots seen: yes (artifacts/walkthroughs/fib-call-explosion/sheet.png, 4 frames)
Verdict: launch

## 1. From the artifact

- Predict: the recipe framing defines fib(n), base cases and "one call" in plain words. Options 5 / 9 / 15 (9 is the memoized count, a nice later echo). Locked stage: a dashed fib(5) node and CALLS 1. No leak.
- Explore: "Open every call" expands the full tree: CALLS 15, "Repeats: fib(3) ×2, fib(2) ×3", repeated subtrees coloured (tan for 3, red for 2), caption "Same number = same work, done again". Seeing the left fib(3) subtree drawn again on the right is the moment; I can count it. "Remember answers" redraws the tree as a single spine with dashed lookups: COMPUTED 6, 3 looked up.
- Small confusion: the repeats line counts only fib(3) and fib(2); fib(1) appears five times and fib(0) three times on the same tree and are not coloured. A beginner counting circles may wonder why those don't count as repeats (they are base cases, but that is not said on stage).
- Only the root is labelled "fib(5)"; children are bare "4", "3", "2". Readable after a moment.
- The gate unlocked from "Open every call" alone, so the panel's "Tap calls to open them" (one at a time) was not required; the walkthrough never built the tree by hand.
- Reveal: 15, ×2, ×3, 6 computed, 3 lookups all match the stage. "Memoization" first appears in the last line, unexplained beyond "never solving the same piece twice"; acceptable since the stage showed it.
- Chip says 75 s (over the 60 s target).

## 2. Earlier findings (r2 review, same version v2)

1. Panel says "Tap calls to open them" but one open-all button unlocks: **not fixed** (minor).
2. Child nodes show bare numbers: **not fixed** (minor).
3. Badge 75 s: **not fixed** (product-owner item).
4. Trust link "2/3 claims checked": **fixed** (now 3/3).
(r2's other items were already fixed and stay fixed: recipe wording, no hook leak, fib(30) removed, reveal fits.)

## 3. New findings

- Minor: base-case repeats (fib(1) ×5, fib(0) ×3) are uncoloured and unmentioned; one stage line ("1 and 0 are given, not worked out") would close the question.
- No FATAL. The repeated subtree is seen before it is named.
