*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r6, first learner review): groups-where-everyone-reaches-everyone
lesson version: v1
boundary: knows depth-first search (follow a road as far as you can, then back up) and that one-way edges can give an order (which-order-is-allowed); has never heard of strongly connected groups or Kosaraju's two passes (meta.json learner field).
Screenshots seen: yes (artifacts/walkthroughs/groups-where-everyone-reaches-everyone/sheet.png, 5 frames; plus my own probe on the same server pressing Pass 2 three times to reach the reveal, frames in the session scratchpad)
Verdict: revise

## 1. From the artifact (written before reading the brief)

- Walkthrough path: the standard walkthrough (each control pressed once, in DOM order) **never unlocks the reveal**. Pass 2 needs three presses ({7}, then {1, 2, 3}, then {4, 5, 6}) and the next control, "Start over", wipes the state. The QA contract follows the same once-each path, so QA will never see this reveal either. A real learner reading the panel ("run pass 2 until every town has a colour") will press it again, so this is a QA-reachability problem more than a learner one. The standard says a milestone must be reachable on the QA path or by a step button. Routed to qa-tester / demo-builder.
- Predict: the hook and the question agree. The locked stage shows the full map with arrows, so I can try to count by eye. I picked 2: two loops, and 7 "joins" the right loop because it has a road into 6. That is the misconception the lesson should catch, and the options make it a fair trap.
- Explore, pass 1: "Finished in order 6, 5, 4, 3, 2, 1, 7" with ordinal labels on every town. I know DFS, so I can follow this, but nothing on stage says *why* finish order matters. It is a procedure I press through.
- Reverse roads: every arrow flips, and "Start from 7, the last to finish" appears. Again a step with no reason given on stage.
- Pass 2, presses 1 to 3: "From 7: {7}", then "From 1: {1, 2, 3}", then "From 4: {4, 5, 6}; 3, 7 already coloured." GROUPS counts 1 → 2 → 3.
- **Top finding: two different groups share one colour.** At the end, town 7 and towns 1, 2, 3 are the same green, and 4, 5, 6 are yellow. The stage shows **two colours for three groups**, which is what my wrong answer of 2 looked like. Only the GROUPS readout and the text line say 3. A learner who trusts the picture over a small counter keeps the misconception. Each group needs its own colour.
- Reversed-arrow confusion: after reversal the stage draws an arrow from 4 to 3. The reveal then says "4 cannot reach back" to 3. On the stage I am looking at, 4 points at 3. The reveal means the original roads, but the picture on screen when I read it is the reversed one.
- Reveal (seen via probe): correct answer 3, quotes the pass-2 groups, explains "3 can reach 4 and 4 cannot reach back". The second paragraph gives the reason the passes work ("every reversed road leaving a new group led into a town already coloured (4 to 3, 6 to 7)"). The stage half supports this with "3, 7 already coloured", which is good. Then "Shrinking each group to a point leaves 7 → {4, 5, 6} ← {1, 2, 3}: no loops left. That is why the groups can be put in order." **Nothing on stage shrinks the groups or shows that order.** It is a told sentence.
- Reveal length: about 110 words, near the budget. The 75 s chip goes past the 60 s promise (product-owner item).

## 2. After reading the brief (meta.json learner, objective, misconception only)

No earlier learner review exists (company/reviews/groups-where-everyone-reaches-everyone/ holds only a fact-check, and I did not read build.md). The boundary above is the brief's.

Show the why you promised (decision 2026-10-14-told-vs-shown), item by item against doesNotKnow:
1. "A one-way graph splits into groups where everyone reaches everyone": shown by the colouring, but **undermined by the shared green** for {7} and {1, 2, 3}.
2. "Kosaraju's two passes": the procedure is shown and driven by the learner. Why it works is one told sentence plus the "already coloured" line, which is a fair stand-in. The objective asks only that the two passes "find them", so this passes.
3. "The groups themselves form an ordering": **told only.** The reveal's "shrinking each group to a point" has no stand-in on stage. Under the rule this is a revise on its own. One way that keeps one representation: after the last group, draw each group as one tinted blob and keep only the arrows between groups (7 → right, left → right).

Objective: "explain that a group needs reaching both ways ... even though 3 reaches 4." The stage never shows "4 cannot reach 3" in the original roads. The learner sees 3 → 4 and then a reversed 4 → 3. The reveal's sentence points at a direction the current picture contradicts.

## 3. Findings

1. **Revise (top):** {7} and {1, 2, 3} are coloured the same, so the finished stage shows two colours for three groups and backs up the wrong answer "2". Each group needs a distinct colour.
2. **Revise:** "the groups form an ordering" (a doesNotKnow item) is told only. Something on stage must stand for it.
3. **Revise:** "4 cannot reach back" is read against a stage that shows the roads reversed, with 4 → 3 drawn. Either restore the original roads at the end, or have the reveal point at the original direction explicitly.
4. Routed (qa-tester / demo-builder): on the once-per-control QA path the reveal is unreachable, because Pass 2 needs three presses and "Start over" follows it.
5. Minor: finish order and "start from the last to finish" are steps with no reason on stage until the reveal. Acceptable under the objective, but this is the "procedure, not payoff" risk.
6. Minor: 75 s chip.
7. No FATAL: the claims I checked against the stage (groups, finish order) are correct.
