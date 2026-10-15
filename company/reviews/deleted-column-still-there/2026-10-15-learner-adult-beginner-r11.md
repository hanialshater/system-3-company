*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: deleted-column-still-there
lesson version: v2
boundary: adult beginner (borrowed mind). Knows: a model can inherit bias from its data (whose-cutoff-wins). Does not know: that deleting the protected column does not stop a model learning from biased past decisions, because a correlated feature (here neighbourhood) carries the group, and the gap can grow. Phone viewport, chose option 1 at predict (the walkthrough's default).
Screenshots seen: yes (artifacts/walkthroughs/deleted-column-still-there/sheet.png, recorded 2026-10-15T10:07:47.802Z, build c0cfd14 served on localhost:3590)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

1. Where understanding first broke: it did not break on the main path. "N1 past 72% -> approve, N2 past 48% -> reject" shows the mechanism in one line, and the model's 80% vs 20% is a wider gap than the lenders' 80/40, which surprised me.
2. What the prediction felt like: "Equal" is the believable wrong answer for someone who thinks deleting the column removes the bias. A real prediction.
3. Whether the reveal answered my question: yes. Note: the mixed layout gives A 100%, B 100%, which can read as "mixing neighbourhoods fixes fairness". The reveal says only that neighbourhood no longer tracked group. A learner could leave thinking equal approval of everyone is the fix, when it comes from this toy's majority rule.

Verdict reason: nothing blocks; optional note on the mixed case.

## After reading build.md / meta.json

- r10 said revise: the model rule was revealed only after the prediction. The question now states the rule ("approves a whole one if most past applicants there were approved") and the 4-in-5 layout. Addressed. My mixed-case note is new and non-blocking.
