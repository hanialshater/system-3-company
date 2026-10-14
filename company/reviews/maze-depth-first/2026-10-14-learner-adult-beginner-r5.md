*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r5): maze-depth-first
lesson version: v2
boundary: an adult who uses a phone and a laptop daily and has never programmed (no idea what a variable, array, function or "algorithm" is; comfortable with everyday apps and basic arithmetic).
Screenshots seen: yes (artifacts/walkthroughs/maze-depth-first/sheet.png)
Verdict: launch

## 1. From the artifact

- Predict: a three-place triangle (S–A, S–G, A–G). The rules (go deep first, pick neighbours alphabetically) are given, and I am asked which path it returns: S,G / S,A,G / S,A,S,G. The locked stage draws the triangle with an empty stack. Nothing leaks. "S, G" is the natural wrong answer, because people expect a search to find the obvious route.
- Explore: Step shows "S → A, go deeper" with stack S A. Run to G gives "Reached G: S, A, G". Show shortest draws S–G dashed: "Shortest: S, G (1). Depth-first: 2." The bigger maze in one tap: stack S A C D G, B greyed with "B was a dead end", and the shortest S, E, G drawn dashed. The two-path comparison is clear in both maps.
- Reveal: every path and count in it was seen. Breadth-first is named as the alternative, a told sentence at the end, which is fine.
- Finding (minor): "only backs up at a dead end" and "B was a dead end" are told. The bigger maze jumps to its finished state, so the learner never watches the stack push B and pop it. Stepping the bigger maze (or animating the B detour) would show backtracking, which is half of what "depth-first" means.
- Finding (minor): the gate opens after the bigger maze. "Start over" then clears it, so in the reveal frame the map shows only S while the text describes S, A, C, D, G. Leaving the last run on the stage at reveal would help.
- Finding (minor): the chip says 3/5 claims checked.

## 2. Earlier findings (v1 review)

1. "Depth-first" and "stack" jargon: **fixed** ("goes as deep as it can before trying anything else"; "Path so far (the stack)").
2. The bigger maze was optional and never run, so 4 vs 2 links was told: **fixed** (the gate needs it; both paths are drawn with counts).
3. "Dead end" and "breadth-first" never shown: **partly fixed**. B is greyed with "B was a dead end", but the backtrack itself is not watched. Breadth-first is still a told closing line, which is acceptable.
4. A 3-place map makes "deeper first" look like an alphabet quirk: **fixed** (the bigger maze generalises it).
5. Reveal clipped: **fixed**.

## 3. New findings

- Minor: the bigger maze jumps to its result, and Start over blanks the stage before reveal.
- No FATAL.
