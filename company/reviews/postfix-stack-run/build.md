# Build note: postfix-stack-run (demo-builder, 2026-10-13)

- Design intent: the nine tokens 5 1 2 + 4 × + 3 − sit in a row of buttons. Only the next token is enabled, so the expression is read left to right. A pile of four slots shows the stack, with the top tinted. Each operation stays in a numbered log beside the pile (1 + 2 = 3, 3 × 4 = 12, 5 + 12 = 17, 17 − 3 = 14). The rule is on the stage in one line. ↺ (start again) comes first in the DOM, disabled at step 0, and is shown after the tokens.
- Key state: the first operator applied, then all nine tokens read with one number left. Milestones ["first-op", "done"], minInteractions 2. The QA path presses the tokens in DOM order, which is reading order, so it reaches the end. There is no auto-run: every step the reveal quotes is one the learner tapped, and the log is on the stage.
- Brief fix: the brief says "eight tokens"; the expression has nine. Built with nine.
- Numbers: the trace, 14 and tallest-pile 3 come from run() in Demo.tsx. Node re-run: [14], max height 3; 5+(1+2)*4-3 = 14.
- Retitled: "Arithmetic with no brackets". "Postfix" and "stack" are named only in the reveal; the stage says "pile".
- After screenshots: reads on phone. There is empty space above the pile at the final state (4 slots, 1 used); acceptable.
