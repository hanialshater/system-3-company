# Constitution

The company may change almost anything about how it works. It may not let the thing being judged
quietly change what judges it. This page says what sits on the **constitutional surface**, who can
change it and how slowly. The nearer a change sits to the aims, the slower and more independent
its approval.

## Article 1: Aims

1. The aim is learners who can explain the idea and ask the next question (see `product/mission`
   and `product/surface-value.md`). Engagement is evidence about the aim, never the aim.
2. Surface Value is written down, decomposed, and owned by the founder. No component of the
   objective enters through an invisible override.

## Article 2: The constitutional surface

These are protected. The list of paths is `protected-paths.txt`, and both an agent hook
(`.claude/hooks/protect-constitution.mjs`) and CI (`.github/workflows/ci.yml`) enforce it.

| Surface | Why it is protected |
|---|---|
| This constitution and `protected-paths.txt` | It defines the rest |
| `tests/qa/**`: the computer-use QA contract | It judges every lesson |
| `tools/company.mjs`, which holds the gates (`launchGates`, `cmdCheck`) | They decide what can publish. Tooling that is not a gate belongs in other files under `tools/` |
| `company/reviews/README.md`: independence rules | Evaluators who share the builder's view are one witness |
| `company/product/surface-value.md` | It defines improvement |
| `src/kit/Lesson.tsx`: the predict-before-reveal contract and test ids | Scaffold, don't substitute |

Lesson code, prompts, roles' craft guidance, patterns, the feed and tools outside the gates are
**ordinary surface**: they change through normal work and review.

## Article 3: Amendments

1. Anyone may propose an amendment: `company/constitution/amendments/AMD-<n>-<slug>.md` from
   `rituals/templates/amendment.md`. It states what it removes as well as what it adds, the
   prediction it makes, the test that would show it wrong, and the rollback.
2. The **Evaluation Steward** prepares it. The **Constitutional Review Board** (founder, head of
   product, evaluation steward, plus one role the change affects) decides at its quarterly
   meeting, or at an emergency session for a defect that is letting bad lessons through.
3. **The judged do not amend the judge alone.** A role may not be the sole approver of an
   amendment that changes how its own work is judged.
4. Where possible, run old and new rules side by side for a cycle and study every disagreement
   before switching. Agreement with the incumbent is not the only measure of success.
5. A ratified amendment is applied in one commit that references its AMD file. The commit sets
   `S3_AMENDMENT=AMD-<n>` for the hook and adds `Amendment: AMD-<n>` to the commit message,
   which is what CI checks.

## Article 4: Authority and override

1. Gates bind everyone. The founder may override a gate in writing. The override is a decision
   record with an owner, the reason, and the objections attached.
2. An objection must be answered with what happened to it: new evidence, a revised claim,
   another experiment, a reason it does not apply, or a budget decision that leaves it open.
3. Disputes about evidence are settled by tests. Disputes about purpose go to the founder. The
   system must say which kind of dispute it is having.

## Article 5: Budgets

1. Each cycle reserves at least 20% of lesson slots for exploration: credible alternatives that
   make a testable prediction, funded far enough to reach their test.
2. The exploration budget may not be spent on the current leading format or lineage.

## Article 6: Learners

1. No dark patterns. No streak guilt, no fake scarcity, no infinite autoplay.
2. Anonymous by default. Progress stays on the learner's device.
3. A learner may always see what a lesson claims and what it rests on.
