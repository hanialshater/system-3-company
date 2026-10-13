# Build note: point-one-is-26-percent
- Key state: pH slid from 8.2 to 8.1 and the 100 reference dots became 126 (milestone 'down-0.1'). Slider starts at its max (8.2), so QA's two ArrowLeft presses reach 8.0 through 8.1.
- Dot counts and the 26% in the question come from ratio() = 10^(8.2 - pH); the dashed box holds the 100 dots of pH 8.2, new dots are red.
- Plain (not log) count axis as the brief asks; no other representation.

## v2 (claim fix 2026-10-13)

Wording note only: c1 source now cites IPCC SROCC ch.1 (pH down about 0.1 since the industrial era, high confidence, 26% acidity) and NOAA PMEL instead of the AR6 'virtually certain' rating, which applies to the roughly 40-year decline, not the 0.1 total. Claim text and status untouched.

## v3 (revision 2026-10-13)

- Review: path stopped at pH 8.0 while the reveal quotes 8.1. Fix: a 'Today: pH 8.1' button (first control) visits 8.1 exactly and gates the reveal on it; a persistent 'At pH 8.1: 126 dots, +26%' readout stays after sliding lower; title no longer gives the answer; pH direction defined in the question (new claim c5, unverified).
