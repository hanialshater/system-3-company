*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r5): list-doubling-copies
lesson version: v2
boundary: adult who knows a list with a fixed number of slots and how to double a number; doesn't know that growable lists copy on resize or why appending is cheap on average.
Screenshots seen: yes (artifacts/walkthroughs/list-doubling-copies/sheet.png)
Verdict: launch

## 1. From the artifact

- Predict: the question now defines a list ("a row of boxes"), an append, and the doubling-and-copy rule in plain words. The hook ("Is appending slow?") is a real question and doesn't presuppose an answer. 15 / 30 / 120 separate "it's the doubling sum" from "it's every item every time". The locked stage is one empty box with counters at 0. No leak.
- Explore: Append fills the box ("Full at 1. Grow to append more."). "Grow: copy 1 into 2" gives "Copies: 1 = 1". "Fill, then double" gives "Copied 2 items into room for 4", "Copies: 1 + 2 = 3", 1.50 copies per append. "Run to 16" ends at "Copies: 1 + 2 + 4 + 8 = 15", APPENDS 16, COPIES 15, COPIES PER APPEND 0.94. The running sum line is what made it click: each term is the size of the row being copied, and the per-append readout sits below one.
- Reveal: "less than one copy per append" matches the 0.94 I saw. I got "copies stay under one per append" from the stage. "Each big copy buys as many free appends as it cost" is told, not shown (see below).

## 2. Earlier findings (v1 review)

1. List / append / resize jargon: **fixed** (defined in the question).
2. Hook presupposed appending is fast: **fixed**.
3. Auto-run hid the doublings: **partly fixed**. Two doublings are now done by hand (1, then 2), but "Run to 16" still jumps over the 4 and 8 copies. The sum line shows them, so the pattern is readable.
4. PER APPEND undefined: **fixed** (now "COPIES PER APPEND").
5. Stage reset to empty beside the reveal: **not fixed** on this path. "Start over" is still enabled before "Show me why", so a learner who taps it reads the reveal next to an empty box.
6. ArrayList / 1.5x claim told: **fixed** (removed).

## 3. New findings

- Minor: green (1-8) vs dark (9-16) boxes in the 16-item frame aren't labelled. A key ("copied" / "appended free") would show "each copy buys as many free appends as it cost" instead of telling it.
- Minor: disable "Start over" once the run is complete, or keep the final state on stage at the reveal.
- No FATAL.
