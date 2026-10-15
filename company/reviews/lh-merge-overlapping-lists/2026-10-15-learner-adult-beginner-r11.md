*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): lh-merge-overlapping-lists
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows basic addition, multiplication and division; that a model can declare hypothetical quantities; does not know: Use inclusion-exclusion for two overlapping resource lists.)
Screenshots seen: yes (artifacts/walkthroughs/lh-merge-overlapping-lists/sheet.png, recorded 2026-10-15T21:35, build f1832fa, phone viewport)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Added lengths"; tapped Test A, Test B; slid List-A 8 to 10; opened reveal.

1. **Where understanding first broke: the hook answers the question.** "Adding the list lengths overcounts" is printed above "which merged count is smaller?" with "Added lengths" and "Unique items" as options. The answer is in the subtitle.
2. **What the prediction felt like.** No stakes. Even without the hook, the question tells me three items are on both lists, so the unique count must be smaller. The real beginner mistake (writing 14 on the shopping list) is never something I commit to, because I am not asked for the count.
3. **The stage is clear.** (8+6) and ((8+6)-3) are readable; the slider keeps the gap at 3.
4. **Does the reveal answer my question?** Yes: count the overlap once; subtract the shared items. The note that each list must have no duplicates of its own is a useful edge.

Fixes (for the builder):
- Ask for the number: "How many different items do you need to buy?" (14, 11, 8).
- Rewrite the hook so it does not state the answer.

Verdict reason: the hook gives the answer and the question asks which is smaller rather than for the count, so the overcount is never at stake.

## After reading the brief (meta.json)

- Objective: use inclusion-exclusion for two lists. The subtraction is shown, but the learner is never asked to produce the merged count (finding 2).
- Fix route: demo-builder (numeric question, hook).
