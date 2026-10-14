*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: temperature-reshapes
lesson version: 2
boundary: adult beginner; knows a language model gives each next word a chance, and percentages; thinks "hot" = "more creative".
Screenshots seen: yes (sheet.png, 5 frames, phone)

## 1. From the artifact

- Prediction: options 87% / 67% / 50%. "About 50%" (cooler = calmer = more even) is a real beginner guess, so the question works; "About 87%" is oddly specific next to the round alternatives, a mild tell.
- Shown well: same three words (mat, sofa, moon) at every setting; cooling to 0.5 makes mat 86.7% and moon 1.6%. "The menu never changed" is visible. "Draw 20" (12 · 6 · 2 with dots) turns percentages into picks.
- Gap: the hook asks about a "hot" model, but "Hotter" from 0.5 only returns to 1 (the start). I never saw a temperature above 1; the reveal's "At 4 ... 41.9% for mat" and "it only spreads its choices" are told. I also drew only at temperature 1, so the cool vs hot draws were never compared.
- Where I first needed an idea I didn't have: "Dividing the scores by 0.5 doubles the gaps". Told; scores are shown but not the divided scores.
- Layout: phone reveal clips the last line ("The rule: chance ∝ e^(score ÷ temperature). Real language models use the same setting..."). Not the main explanation, so noted only (W-135).
- Reveal earned: yes for cooling; the "hot" half is told.

## 2. After reading the brief

- doesNotKnow: what temperature does; softmax. The cooling half is shown; heating is not.

## Fix suggested
- Panel: "Go cooler to 0.5, then hotter to 2 or 4, drawing 20 at each"; show the divided scores under each bar.

Verdict: launch
