*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r2): lifeguard-fastest-path
lesson version: v2
boundary: an adult with school maths; believes the straight line is fastest; has heard light "bends in water" but not why.
Screenshots seen: yes (artifacts/walkthroughs/lifeguard-fastest-path/sheet.png, plus a probe of the post-commit state and one slider step)
Verdict: launch

## 1. From the artifact

- Predict: locked stage shows the map to scale, the straight-line entry at 40 m, and "?" for run, swim and total. No marker for the best spot. The answer is not visible.
- Explore: after commit the 40 m straight line reads 8.1 + 18.9 = 26.9 s (probe). The slider moves in 8 m steps; 48 m gives 24.5 s and keeps the reveal locked; 56 m gives 23.4 s and unlocks it. A "Best so far" caption and green triangle track the best spot I have tried, not the true best, so the search is mine.
- Reveal: 26.9 s and 23.4 s were both on stage. "The fastest of the spots you could pick" is true, but on the walkthrough path (40 → 56) I never tried 64 m, so I take that on trust. The light/refraction paragraph is now plain ("light travels slower in water… that bend is called refraction"), though still told, with no light on stage. The sin(angle)/speed line is a footnote.

## 2. Earlier findings (2026-10-13-learner-adult-beginner.md)

1. "Fastest spot marked" triangle gave the optimum on the first move: **fixed** (marker now tracks best-so-far).
2. Reveal quoted 56 m / 23.4 s which the path never visited: **fixed** (gate requires 56 m; it was on screen).
3. Triangle unlabeled vs slider label mismatch: **fixed** (caption names the spot and time).
4. Map shrunk at the end with overlapping labels: **partly fixed** (readable; "40 m" tick still sits under the line).
5. Speeds hidden once exploring: **fixed** ("Runs 7 m/s on sand, swims 1.5 m/s" on the map).
6. Light jump abrupt / ambiguous: **partly fixed** (clearer wording; still told only).

## 3. New findings

- Minor: "fastest of the spots you could pick" is unverified on a path that stops at 56 m.
- No FATAL.
