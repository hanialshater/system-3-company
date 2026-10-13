# Build note: winner-word-evidence

- Brief 45 (naive-bayes-evidence). Title "The word 'winner': how spammy is it?" (no answer in it).
- Option C changed from the brief's "86%" to "About 90%": 86% is only reached at 50% spam, which the QA path does not visit, and it is not a number the learner would form from the question.
- Stage: one 10 × 10 grid of 100 emails (filled red = spam, hollow = real), sorted spam-with-word, spam, real-with-word, real. "Show emails with 'winner'" rings the word holders and fades the rest. Locked and before highlighting: readouts "–".
- Controls in DOM order: Show emails with 'winner' (toggle), spam share slider (10-50%, step 10, starts at 10). Readouts: with 'winner' (spam, real), chance it's spam.
- Key states (milestones): "highlight-at-question" (highlight on at 10%: 6 spam, 9 real, 40%) and "changed-share". QA path: highlight at 10%, slider 10 → 20 → 30 (60%, 72%).
- Node check: counts are integers at every step: 6/9 (40%), 12/8 (60%), 18/7 (72%), 24/6 (80%), 30/5 (85.7%).
- Fixed after first QA screenshot: ratio printed as 5.9999999 (float); now rounded.
- Deterministic.
