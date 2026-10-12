# Reviews and the independence rules

protected (constitutional surface): changing these rules is an amendment.

Every lesson has a folder `company/reviews/<slug>/` holding its trail:

| File | Writer | Written before reading… |
|---|---|---|
| `design.md` | learning-designer | n/a |
| `build.md` | demo-builder | n/a; **evaluators do not read this until their findings are written** |
| `<date>-qa.md` | qa-tester (via `npm run company -- qa-record`) | n/a; it records what the browser saw |
| `<date>-learner-<boundary>.md` | learner-evaluator | meta.json, design.md and build.md |
| `<date>-pairwise.md` | pedagogy-critic | authorship and which branch is winning |
| `<date>-fact-check.md` | fact-checker | n/a; checks claims and the stage text |
| `<date>-a11y.md` | accessibility-reviewer | n/a |

## Rules

1. **Artifact before account.** Evaluators start from `npm run walkthrough -- <slug>`
   (`artifacts/walkthroughs/<slug>/transcript.md` and screenshots). They write their first
   findings, then they may read the brief to compare intent with experience, and they label that
   section "After reading the brief".
2. **Knowledge boundary, not theatre.** A learner review states the boundary it used: "knows X,
   Y; has never seen Z". Use the lesson's own boundary first. A second review may use a different
   boundary on purpose.
3. **No absolute scores.** Pairwise preferences with reasons, or specific findings.
4. **Problems, not tests.** "Learners lose track of which pile is which", not "add pile labels for +2".
5. **Fatal flaws block.** A specific fatal flaw (false claim, dead control, a misconception the
   lesson reinforces) blocks launch whatever other reviews say. It stays tied to the lesson until
   it is fixed or rejected with a reason.
6. **Simulated is labelled simulated.** Every learner review begins: *Simulated learner. This
   review finds problems; it is not evidence that anyone learned.*
7. **No self-review.** The builder of a lesson does not write any of its review records, and a
   claim's author never verifies it.
