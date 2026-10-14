# Build note: odds-average-the-bettors

builder: demo-builder (ncm-e00) · 2026-10-14 · brief: Course NCM #6

- Intent: one 100% pool bar split into money on A (bettor 1, bettor 2) and on B (bettor 1, bettor 2); the A/B boundary is a solid line labelled "odds 70%", and a dashed line marks the simple average of beliefs. Each segment's width is the money behind a belief, which is the stand-in for "wealth-weighted".
- Stage text and chip say each bettor splits ALL their money by belief (brief edit). No house cut.
- Milestones: "equal" (equal money: odds land on the simple average) and "richer2" (bettor 2 richer: odds slide toward 40%; preset gives 50%). Presets in DOM order: Equal money, Bettor 2 richer, Start values; then four sliders (money step $50, belief step 10%).
- Log-utility (Kelly) sentence told once in the muted model line, claimed as c4 (source, unverified).
- Not run here: build, tsc, QA. Watch on a phone: two rows of two sliders may wrap to four rows; check the stage height.
