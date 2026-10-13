# Build note: binary-search

## v2 (revision)

demo-builder · 2026-10-13 · inputs: 2026-10-12-fact-check.md, 2026-10-12-learner-adult-beginner.md, 2026-10-12-qa.md.

Key state: one search finished (my number found). Gate: `useMilestones(["found"])`.

| Finding | What I did |
|---|---|
| Learner 1 (reveal with 0–1 guesses; "After 0 guesses…") | Gated on finishing a search. Added "Middles to the end", which plays middle guesses one at a time (0.38 s) from wherever the learner is, so the QA path finishes and a learner can watch the halving. Trade-off: it does the clever thing for them; their own guesses come first and stay on the line. Reveal opens with their own chain, e.g. "You found my number in 8 guesses: 1,000 → 499 → 249 → …". |
| Learner 2 ("prediction held" untested) | Fixed by the gate. |
| Learner 3 ("10" the only exact option) | Options now all exact: 10, 50, 100, 500. |
| Learner 4 (499 on screen vs 500 in text) | Reveal: "At worst … (sometimes one fewer: "lower than 500" leaves 499)". New claim c7 (unverified). Reveal also says "at least half" (fact-check F1). |
| Learner 5 (no payoff for finding it) | "Got it: N, in k guesses." plus the green dot was already there; now everyone reaches it. |
| Learner 6 ("Pick the middle" hands over the insight) | Kept: it is the scaffold. Messages now show what each guess bought, so a slider guess can be compared. |
| Learner 7 (no contrast with a bad guess) | Each answer now says "Higher than 100: 100 ruled out, 900 left." so a bad guess shows its cost on stage. |
| "Doubling adds one" only told | Not changed: showing 2,000 needs a second range on a phone (one representation). Recall's why carries it. |
| Fact-check F2 (c5, c6 need a second checker) | Routed by status; not mine to verify. |

QA: contract passes phone + desktop (local, 2026-10-13).
