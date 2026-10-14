*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r9): each-element-pops-once
lesson version: v6
boundary: adult-beginner (from meta.json learner: knows a stack gives last-in-first-out; does not know that a stack of still-waiting values answers "next bigger to the right" in one pass)
Screenshots seen: yes (artifacts/walkthroughs/each-element-pops-once/sheet.png and 05-reveal.png; walkthrough re-run 2026-10-14T15:27 after the first attempt timed out)
Verdict: launch

## Findings (written from the walkthrough before reading build.md)

Path walked: chose "36"; tapped "Next number", "All the rest", then list "8 … 1 9"; opened reveal.

1. **The prediction asks me to simulate an algorithm from one sentence.** "Each new number pops the smaller ones on top, then is pushed" is clear, but to get 8 I must also count the comparison that *stops* a pop, which the question does not say counts. A learner who thinks "nothing pops, so 0 comparisons" has no option. That is the first point where I need an idea I do not have (what a comparison is in this algorithm). The stage's hollow "stop" tick answers it at once, so this is a hypothesis, not a block.
2. **The payoff is shown.** The two side-by-side panels (scan bars against stack ticks) and the summary chips "36 · 8" and "36 · 15" make "one pass" countable. On 8 … 1 9 the 9 popping all eight waiting numbers ("8 pops", solid ticks) is the picture of "each element pops once".
3. "The work grows like n, not n²" is told: I only saw n = 9 twice. It follows from "every comparison pops a number or ends a turn", which the ticks show. Acceptable as one sentence.
4. **The reveal fits with its picture.** In 05-reveal the stage caption, both runs' chips and the 8 … 1 9 ticks, including hollow stop ticks and the "8 pops" bar, are on screen with the last reveal line. 83 words.
5. Small: in 01-predict the bottom of the locked stage clips a half-visible row of buttons (the List toggle) under "Next number / All the rest". In 04-step-3 the screenshot catches the pop animation mid-way ("Stack: 11, 4 pops") while the chip still reads "? · ?". A learner who taps "Show me why" mid-animation might see a half-filled state. Neither changes the reveal.
6. The trust link reads "4/6 claims checked" (fact-checker's lane).

Verdict reason: the gap (one pass via waiting values) is staged and quoted. The counting convention is the only rough edge.
