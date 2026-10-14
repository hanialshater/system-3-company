*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r10): deleted-column-still-there
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows a model can inherit bias from its data; does not know that deleting the protected column does not stop a model learning from biased past decisions, because a correlated feature (here neighbourhood) carries the group, and the gap can grow)
Screenshots seen: yes (artifacts/walkthroughs/deleted-column-still-there/sheet.png, recorded 2026-10-14T18:52)
Verdict: revise

## Findings (written from the walkthrough before reading the brief or build.md)

Path walked: chose "Equal for A and B"; tapped Train without group, Mixed neighbourhoods, 90% together, Reset; opened reveal.

1. **"Equal" is a genuine beginner pick**, and the dot grids (circles A, squares B, N1 mostly circles) make "neighbourhood stands in for group" visible before any words.
2. **Where I first needed something I was not given: the model's rule.** Only after I lock in does the panel say "The model approves a whole neighbourhood if most past applicants there were approved." That rule is what makes the answer "as unequal or more". Before it, "Unequal, but less than before" is a reasonable answer: a model that copies each neighbourhood's past approval rate would approve about 67% of A and 53% of B, a narrower gap. So the "correct" option depends on a rule disclosed after the prediction. A learner who chose "less than before" is marked wrong for reasoning well.
3. **The 80% → 20% widening is shown clearly** in step 1 (N1 72% → approve, N2 48% → reject, B 20%). Seeing the gap grow from the lenders' 40 points to 60 is the striking moment.
4. **"Mixed neighbourhoods" may teach the wrong thing.** Both neighbourhoods hit 60% and the model approves 100% of everyone. The reveal calls this "approved both groups alike", which reads as "mixing fixes it", when the model has simply stopped discriminating between anyone. It also changes the world (where people live), not the model. A beginner could leave thinking the fix for proxy bias is the layout.
5. **Fit:** the reveal opens after Reset, so the grids are unfilled and "Model approves: –". The 80% and 20% it quotes survive only in the small Seen line.
6. Trust link "0/4 claims checked" (fact-checker's lane).

Fixes (for the builder):
- Put the model's rule in the question or on the locked stage ("it approves a neighbourhood if most past applicants there were approved").
- Reword the mixed case: "with neighbourhood no longer tracking group, it could not tell them apart (it approved everyone)".
- Keep the last run's filled grid on stage when the reveal opens.

Verdict reason: the graded answer hinges on a model rule revealed only after the prediction, so the prediction is not fair to a learner who reasons correctly about a different, ordinary model.

## After reading the brief (meta.json)

- doesNotKnow ends "and the gap can grow". That half is true only for the threshold rule; finding 2 is exactly where intent and experience part. The proxy half ("neighbourhood carries the group") is delivered well by the grids.
- Fix route: demo-builder (question wording, mixed-case wording).
