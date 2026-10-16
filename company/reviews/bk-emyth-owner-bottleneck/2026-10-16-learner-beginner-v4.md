*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: bk-emyth-owner-bottleneck
lesson version: v4
boundary: Adult beginner; can compare percentages and do basic arithmetic, but is new to this mechanism.
Screenshots seen: yes (artifacts/books100-final-51c8a4ed-v1/walkthroughs/bk-emyth-owner-bottleneck/sheet.png, plus original-detail 01-predict.png, 03-step-2.png and 05-reveal.png, recorded 2026-10-16)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

These findings were first written in `company/reviews/books-100/2026-10-16-learner-final-two.md` before reading current metadata or accounts and are copied here without changing the first-look judgment. The inputs were this slug's private artifact-only transcript and the current images named above. No live operation, alternate path, source inspection, or book verification was performed.

1. **Question and prediction:** The question now says every job passes all three stations and asks explicitly for sustainable completed jobs per hour. With capacities 6, 5, and 10, I know what must be counted before being asked to predict. Guessing 6 is still plausible if I focus only on the owner's improvement. The stage's capacities and output remain `?` before prediction; there is no revealed-result leak.
2. **Inspectable cause:** A shows Owner 3, Handoff 10, Finish 10, emphasizing the owner and reporting 3 jobs/hour. B shows Owner 6, Handoff 5, Finish 10, emphasizing the handoff and reporting 5. The unexplained `1` and small mark before the handoff are absent in the inspected B frame. The remaining underline follows the emphasized station. The explore instruction names the question to inspect: which station limits completed jobs per hour.
3. **Reveal and transfer:** The reveal states that the owner can pass six, but the handoff handles only five, so more than five cannot finish. This answers why the owner's six is not the completed output in ordinary language. The portable idea is now available without prior bottleneck vocabulary: raising one station's capacity can leave another station limiting the whole sequence. The real-delegation and attribution limits remain readable.
4. **Residual visible issue:** Reset leaves A's large diagram visible above feedback saying the answer was 5.00. The retained comparison explicitly labels A: 3 and B: 5, and the prose names B, so I can reconcile them. Keeping B in view would reduce this small burden; it does not block the observed first encounter.

No specific learner-evaluator finding blocks draft progression on this observed path. This is a hypothesis about inspectability, not evidence that a person learned the constraint rule.

Verdict reason: No specific finding in the inspected current artifact path blocks this first-time learner from inspecting the stipulated mechanism; the recorded minor comparison and working-memory burdens remain hypotheses for human observation.

## After reading meta.json

- The current metadata reports version 4; objective: Calculate the new constraint after work is redistributed away from an owner.
- The stated objective is calculating the new constraint after work redistribution. The observed all-stations premise, highlighted handoff, and explicit six-versus-five explanation address that objective without requiring the earlier implicit throughput rule. The first-look eligibility stands.
- `Verdict: launch` is the required learner-gate vocabulary. It is not overall launch/deployment permission, fact-checking, source/build verification, or evidence of human learning.
- This run covers two current v4 lessons only. Five other content families retain their separate prior v3 reviews; they were not re-inspected here. The other 93 lessons remain unreviewed by this learner-evaluator. No 100-lesson conclusion follows.
- Supplied artifact identity: frozen source `51c8a4edaf8ee3cd7108b1b195dd43221eac9fcc`, `.next-books100-final-v1`, BUILD_ID `m_qL-Yfu8nt9w7mMZqVsQ`. This review has not independently verified the identity.
