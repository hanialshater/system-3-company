*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r2): dog-bites-man-twice
lesson version: v1 per meta.json (the artifact has clearly changed since the v1 review; the version number may not have been bumped)
boundary: adult beginner; has heard "attention" and "vectors"; can't compute a dot product.
Screenshots seen: yes (artifacts/walkthroughs/dog-bites-man-twice/sheet.png)
Verdict: launch

## 1. From the artifact

- Predict: the stem now says "a blend of the word arrows, weighted by attention", with no "dot product". The locked readouts are "–" for both orders, so nothing leaks. The hook matches the question.
- Explore: after the swap, both readouts appear side by side: dog bites man (0.79, 0.79) and man bites dog (0.79, 0.79). With position tags on they read (1.30, 0.89) vs (1.62, 0.59), the words get #1/#2/#3 tags, the arrow swings and a ring marks the old summary. The contrast is direct.
- Reveal: quotes exactly those four values, all seen.

## 2. Earlier findings (v1 review)

1. Never saw both orders side by side: **fixed** (paired readouts).
2. Jargon in the stem: **fixed**.
3. Locked chart is a tiny thumbnail: **not fixed**, minor (still unreadable at predict; fine once unlocked).
4. Hollow circle unlabelled: **fixed** ("Rings: summaries you have seen").
5. Chart shrinks at reveal: **fixed** (legible).

## 3. New findings

- Minor: meta.json still says version 1. Flag for the builder/steward so review records track the right version.
- No FATAL.
