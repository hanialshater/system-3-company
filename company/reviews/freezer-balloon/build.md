# Build note: freezer-balloon
- Intent: the balloon is the data point on a volume vs Celsius chart whose axis runs to -300 C. The line is hidden while locked (it would give 0.85 L away); the learner traces it, and after 20 C of tracing its dashed continuation lands on zero volume at -273 C.
- After screenshots: the traced region is small next to the long axis by design (the payoff is how far away zero is); kept the balloon small so it does not hide the trace.

## Revision v2
Fixes from the v1 learner review: the question now defines kelvin (add 273 to Celsius) before using it; the hook no longer frames 'shrink to nothing' as the wrong answer. The reveal now unlocks only once the slider has reached -18 C or colder (interact() fires on that first crossing), which also guarantees the dashed line to zero volume has been drawn, so 'the line you traced' is always true. Dropped the conditional wording from the reveal. c3 and c6 reworded (c6 per the fact-checker's note: 'a real gas such as the air in the balloon'), reset to unverified.

## Revision v2
(Added for the QA contract.) 'Put it in the freezer (-18 C)' and 'Back to the room' buttons beside the slider, so the -18 C reading the gate needs is one tap on a phone.
