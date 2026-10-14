# Build note: sudden-skill-or-strict-score (demo-builder, builder-wavej-ai-1, 2026-10-14)

Brief: `company/domains/briefs/ai.md` item 61 (Wave J). Status draft, version 1. Claims c1-c3 unverified; c3 (Schaeffer et al. 2023; Wei et al. 2022) is the real-systems citation.

- Stage: caption under the chart "Toy: each token right or wrong independently" (moved there from a tag, which wrapped and cropped the stage top by 13 px); six columns XS-XXL on a 0-100% axis, a legend line above. "Score whole answers" fills p^10; "Score each token" fills p and keeps the whole-answer scores as dashed outlines with their values (the before/after pair); "Answers 1 token long" fills p (whole = token score). After Reset nothing is filled and the recorded sets stay as dashed outlines with values ("Dashed: scores you saw"). Readout line: "XL: 34.9% whole answers · 90% tokens" (recorded values; dashes until seen).
- Values above every column (one decimal), not only first and last as in the brief: the reveal quotes L's 10.7%, and the columns are 40 px apart enough for 5-character labels.
- Controls in DOM order: "Score whole answers", "Score each token", "Answers 1 token long", Reset (4). Active preset disabled; Reset disabled when nothing is filled; preset row folds at the reveal.
- Milestones: whole-scored, per-token-scored (gated). one-token-seen is not gated and the reveal does not quote it.
- Reveal: the brief draft, values from the recorded sets (0.1%, 10.7%, 59.9%; 50%, 95%).
