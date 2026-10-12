# Principles: the Zen of System 3, at work

Each line of the book's Zen, translated into a practice here, and the file where that practice lives.

| Principle | What we do | Where |
|---|---|---|
| Complexity over engineering. Emergence over design. | We do not design the perfect pipeline. The chief of staff chooses the next move from the state of the work. | `ops/operating-loop.md` |
| Conditions over commands. | We set gates, budgets and standards; roles decide how to meet them. | `constitution/`, `product/demo-standard.md` |
| Let the work change the architecture. | Every COE ends in a changed mechanism, not "be more careful". The org itself is regenerated from data. | `rituals/templates/coe.md`, `tools/org/roles.mjs` |
| Discovery before polish. Keep a strange branch alive long enough to test it. | 20% of every cycle's lesson slots are exploration, never given to the current leader. | `rituals/templates/op-planning.md` |
| System 1 proposes. System 2 deliberates. System 3 checks. | Builders propose, designers deliberate, quality checks, and the checks sit outside the builders' reach. | `org-chart.md` |
| Ground every claim. Trace every source. | Claims ledger in each lesson's `meta.json`; the "Why trust this?" sheet in the product. | `knowledge/README.md` |
| Trust is local. So is memory. A record outlives the clerk. | Every session ends with a handoff entry. Nothing important lives only in a context window. | `ops/progress.md` |
| Remembering is not knowing. | Spaced revisits in the feed; reviews of the evidence behind patterns. | `src/kit/progress.ts` |
| A feather is not a reason. | Ideas from elsewhere stand next to local evidence before they are ranked. | `knowledge/patterns/` |
| Five judges sharing one source are one witness. | Evaluators see the artifact first; different boundaries; pairwise, not scores. | `reviews/README.md` |
| Reality retains the right to be rude. | Computer-use QA presses every button. Real learners outrank simulated ones. | `qa/computer-use-testing.md` |
| An objection must be able to change what happens next. | Decision records carry objections with status and owner; a disputed claim blocks publishing. | `decisions/README.md` |
| Let knowledge accumulate. Let it be overthrown. Patterns over recipes. | Patterns carry context, cases, confidence and `would_be_wrong_if`. | `knowledge/patterns/` |
| Investigate the procedure too. | Experiments on our own process (EXP-001 plants a false claim). | `experiments/` |
| Self-reference is not self-improvement. The judged do not amend the judge alone. | Constitutional surface; protected paths enforced by a hook and CI. | `constitution/` |
| Let go of the path, not the boundary. The human stays in the loop that changes the loops. | Agents choose methods; the founder ratifies amendments and Surface Value. | `constitution/constitution.md` |
| A prompt is evidence, not the objective. Scaffold. Don't substitute. | Predict before reveal, enforced by the kit and QA. | `product/demo-standard.md` |
| Spend attention where it changes the result. | Attention tiers: what wakes the founder, what never should. | `ops/operating-loop.md` |
| Invisible by default. Legible on demand. | Provenance is one tap away on every card; every page has a trace in the repo. | `src/components/DemoCard.tsx` |
| A philosophy of emergence should be willing to lose an A/B test. | Experiments include a simpler baseline that is allowed to win. | `experiments/README.md` |
| Knowing what works does not settle who gets to decide. | Purpose disputes go to the founder, not to whichever evaluator scores higher. | `constitution/constitution.md` |
| Capacity creates possibilities. We still have to choose. | The OP is a written choice with its trade-offs, not a forecast. | `rituals/templates/op-planning.md` |
