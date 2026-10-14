# Build note: penalty-kick-mix

builder: demo-builder · 2026-10-14 · session 2 (NCM batch 1)

- Format: single card, slider drives a live 2x2 table and two bars. No spec. No randomness.
- Rule: p = (b-h)/((x-h)+(b-h)), q = (x-h)/((x-h)+(b-h)), h 0.5, b 0.9, x 0.90 to 1.00 step 0.02. Re-run in node with the lesson's mix(): p 0.500, 0.488, 0.476, 0.465, 0.455, 0.444; q 0.500 ... 0.556; score 0.700 ... 0.722; both indifference sides agree to 1e-16. Matches the brief.
- Answer not visible before predicting: the locked stage shows the 0.90 start (50/50, 0.700), which the question already states. The 1.00 state appears only after the slider or the "Perfect left shot" button.
- QA path: slider (two arrow presses reach 0.94), then the button reaches 1.00, which is the one milestone and the state the reveal quotes. The slider has no reset button so the stage at reveal time still shows 1.00.
- Stage words about 23; reveal about 85 words.
- Section unconfirmed: references ch. 6 §6.7 is from the brief ("§ unconfirmed"); the fetch of the book site failed then. Claim c4 carries the note. Fact-checker or a human should confirm against the free PDF.
- Claim 5 of the brief (Palacios-Huerta 2003, real penalty data) is omitted on purpose: recalled from memory, needs a human source check. c5 records the omission.
- meta owner.categoryManager is cm-economics (the check requires it).
- Known cosmetic: in the reveal phase the stage panel is a little taller than its box on a phone, so the top (scoring line, column headers) scrolls out of view; the quoted numbers (bars, 1.00 cell) stay visible.
- All claims unverified. Status review.
- QA: contract passes on phone and desktop (company/reviews/penalty-kick-mix/2026-10-14-qa.md). One earlier desktop run failed under parallel load alongside the feed specs and passed on rerun.
