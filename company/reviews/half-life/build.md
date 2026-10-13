# Build note: half-life

(No v1 build note was written. This file starts at the revision.)

## v2 (revision)

Inputs: 2026-10-12-fact-check.md, 2026-10-12-learner-adult-beginner.md, 2026-10-12-qa.md.

Key state: one run watched through half-life 4, the question's step (about 25 survivors at the start of it). One milestone, `run-to-half-life-4`.

| Finding | What I did |
|---|---|
| Learner FATAL / 2 / 3: the reveal unlocked after one wait and narrated "Your run, step by step" over a reset stage | Gated on half-life 4 in one run. The reveal quotes that run ("Your run: 49%, 46%, 55%, 48% ... In the 4th, 12 of the 25 survivors went"). In the reveal phase the stage shows that same run at half-life 4, even if the learner pressed New run afterwards. The reveal never describes a run that is not on screen. |
| Learner 1: half-life is never defined | The question opens with "A half-life is the time in which about half of a pile of radioactive atoms decays." New claim c8. |
| Fact-check F1: up to 8 waits, where single steps hit 0% or 100% | Waits are capped at 4. At 4 the stage says "Few left now: start a new run." The caption says "Fewer atoms, more wobble." Each bar's label shows its denominator ("of 200", "of 102", ... "of 25"), so the shrinking sample is visible. |
| 4: 48% of 200 reads as "slightly under half" | Covered by the wobble caption and the denominators. The reveal says "With only 25 atoms the share wobbles by chance". |
| 5: "atoms do not age" is a bare statement | Partly done. The gated path now shows the long survivors decaying at about half ("They had already lasted 3 half-lives and still went at about the same rate"). Individual atoms are not tracked across runs: that would need a second view. |
| 6: the 25-survivor case is never run | It is now: the 4th wait starts from the run's survivors (25 in seed 0). |
| 7 / F2: "running out after two half-lives" is unset up, and "halves to a quarter, an eighth" is ambiguous | Replaced with "The count keeps halving: about a quarter left after two half-lives, an eighth after three." That is c3's wording, so c3 is unchanged. |
| 8: Carbon-14 is decorative | Kept. Now that half-life is defined, it gives a real-world scale in one line. Rejecting the cut: the cost is 10 words, and it is a verified claim. |
| F3: open the cited sources | Fact-checker's job, not mine. |

Claims: c7 reworded (unverified). c8 added (unverified).

QA-path trade-off: added "Wait to half-life 4" so that pressing each control once reaches the key state (Wait 1, then Wait to 4, then New run). A learner can still step one at a time. The jump shows all four bars at once, so the step-by-step comparison survives.
