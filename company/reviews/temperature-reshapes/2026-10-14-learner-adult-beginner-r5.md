*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r5): temperature-reshapes
lesson version: v2
boundary: adult beginner; knows a language model gives each next word a chance, and percentages; thinks "hot" = "more creative".
Screenshots seen: yes (artifacts/walkthroughs/temperature-reshapes/sheet.png, 5 frames)
Verdict: revise

## 1. From the artifact

- Predict: scores 2 / 1 / 0, mat 66.5% at temperature 1, with the options 87% / 67% / 50%. The locked stage shows the temperature-1 bars, which is fine because the question already states 66.5%. "About 50%" is a real beginner guess.
- Explore: one tap on Cooler takes mat to 86.7%, sofa to 11.7% and moon to 1.6%, and the bars visibly sharpen. Hotter goes back to 1, the starting state. Draw 20 at 1 gives 12 · 6 · 2 with dots. The same three words appear in every frame, so "the menu never changed" is visible.
- Main finding: the hook asks about a **hot** model ("more creative, or just less picky?"), but nothing in the path takes me above temperature 1. "Show me why" lights up after a single Cooler tap (frame 02). So the reveal's "At 4 ... 41.9% for mat" and "it only spreads its choices, picking unlikely words more often" are told, not seen. The misconception being targeted is about heat, and the heat half is the half I never watched.
- Second: the panel says "Draw 20 words at each", but the gate lets me skip drawing at 0.5. I only drew at 1, so I never compared a cool draw with a warm one.
- Told: "Dividing the scores by 0.5 doubles the gaps". The stage shows score 2 / 1 / 0, never the divided 4 / 2 / 0.
- The cooling half works: I got "cooler means the top word wins more" from the bars alone.

## 2. Earlier findings (2026-10-14 review, also v2)

The version has not changed since that review.
1. Never saw temperature above 1; the hot half is told: **not fixed**.
2. Drew only at temperature 1: **not fixed**.
3. "Dividing by 0.5 doubles the gaps" told, divided scores not shown: **not fixed**.
4. Reveal's last line clipped on phone: **fixed** in this render (the rule line and "Real language models..." are fully visible).
5. "About 87%" oddly specific next to round options: unchanged, minor.

That review gave launch despite findings 1 and 2. I disagree: the hook and misconception are about heat, and a first-time learner can finish without ever seeing it.

## 3. New findings

- Gate: require a visit above 1 (e.g. 2 or 4) plus a draw there before "Show me why" unlocks. That is the smallest change that would let the reveal's hot sentences be seen rather than told.
- No FATAL.
