*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r5): undo-a-bad-push
lesson version: v2
boundary: an adult beginner who can read a small diagram of pipes; has never heard of network flow; would "just push water where it fits".
Screenshots seen: yes (artifacts/walkthroughs/undo-a-bad-push/sheet.png, 6 frames)
Verdict: revise

## 1. From the artifact

- Predict: the question fixes the rule "never taking water back", so "1: stuck" is the correct answer and the lesson then breaks that rule. The hook "You can still be one short" already says greedy falls short, which points straight at option 1. A learner who picks "2" (the true best flow) is told "Not quite" for knowing more. The prediction tests reading the question, not the misconception.
- Explore: s → a → b → t lights three pipes 1/1 and the caption says every forward route has a full pipe. s → a → t and s → b → t each fail with a named full pipe ("pipe s→a is full", "pipe b→t is full"). That is clean and seen: I can watch myself get stuck.
- The rescue is handed over: the step-1 caption already says "A route may go backwards along a loaded pipe", and a button is literally named "Route s → b → a → t (back along a–b)". The panel says "find a second unit", but there is nothing to find. Tapping it: a–b goes to 0/1 (brown dashed), s–b and a–t fill, Total 2, and a dashed "cut: 2 pipes leave s" curve appears. The before/after picture of the a–b pipe emptying is the best moment.
- Reveal: matches the stage (stuck at 1, back along a–b, total 2, both pipes out of s full). Then it adds the max-flow/min-cut bound ("No flow is bigger than the smallest cut"), Ford–Fulkerson by name, and "when no route is left, the flow equals the smallest cut". The cut is drawn, but the "no flow beats the smallest cut" idea is told and is a second lesson for this boundary.
- Trust link: 2/4 claims checked. Chip 70 s.

## 2. Earlier findings (v1 review, 2026-10-14)

1. Prediction asked the max-flow number, so the misconception was never committed to: **fixed**. The question now fixes the greedy procedure. Correction to my section 1 note: under the stated rule, "2" *is* the misconception answer (a greedy believer expects to find a second route), so the question works. What remains is the hook: "You can still be one short" tells the learner the greedy answer is short before they choose.
2. The fix is a pre-written whole-route button, not discovered: **not fixed**. The button is now even more explicit ("Route s → b → a → t (back along a–b)"), and the step-1 caption already says routes may go backwards. The key idea is told twice before the learner tries it.
3. "Cut" new word; min-cut bound told: **not fixed** (cut is drawn; the bound is told).
4. "Total 2" cropped on the reveal frame: still cropped on phone (graph top scrolls off). Minor.

## 3. New findings / what would move this to launch

- Top: let the learner find the undo. E.g. after the stuck state, make the a–b pipe tappable ("send this back?") instead of a named rescue route, and remove "A route may go backwards along a loaded pipe" from the step-1 caption.
- Make the hook neutral (e.g. "Push water down any open route until none is left. Is that the most?").
- Consider dropping the min-cut/Ford–Fulkerson paragraph or shrinking it to one line; it is a second idea.
- Trust link 2/4 claims checked (route to fact-checker).
- No FATAL.
