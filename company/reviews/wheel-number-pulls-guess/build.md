# Build note: wheel-number-pulls-guess

builder: demo-builder (demo-builder-books-1) · 2026-10-14 · v1 draft · brief: company/domains/briefs/books.md #4 · format: single card (today; multi-card later per brief)

- Intent: a crowd of 30 dots on a 0–100% axis, one per lane. With the wheel shown, a red vertical line marks the wheel's number and each dot sits 60% of the way from it to that person's belief, with a faint trail back to the wheel line (the adjustment that stopped short). A dashed line marks the crowd's median. "Hide wheel" removes the line and the dots move to the beliefs (median 35). Dots slide (300 ms CSS transition on cx, off with reduced motion). The wheel line and the median line carry their own labels ("wheel 65", "median 35"). The first build also had a readout row (Wheel, Crowd's median guess); it repeated those labels and was cut for phone fit (crop 31 px). Chip: "Model: guesses go 60% from wheel to belief".
- Controls in DOM order: "Wheel lands on" slider (0–100, starts at 40; disabled while the wheel is hidden), "Wheel: 10", "Wheel: 65", "Hide wheel" / "Show wheel".
- Milestones (minInteractions 3): "lo" (wheel 10 shown: median 25 recorded), "hi" (wheel 65 shown: median 47 recorded), "hidden". Record line: "Wheel 10: median 25 · Wheel 65: median 47".
- Deviations from the brief: (a) options are "About 0 points apart" / "About 5 points apart" / "About 20 points apart" instead of "About the same / A few points apart / About 20 points apart", because demo-standard forbids the right option being the only one with an exact number; (b) the reveal adds one sentence with the published medians (25 and 45, brief claim 2), so the lesson's model crowd (47) is not mistaken for the study; (c) the toggle is preceded by two presets so the QA path lands on 10 and 65 exactly (pattern preset-buttons).
- Copyright: no quote; the wheel study is cited to the 1974 paper, the book only for naming the effect.

## Pre-flight v1

1. Title and hook: "A random number, then a guess" / "A wheel lands on a number, then you answer a factual question. Does the wheel matter?" Neither says how much.
2. Options: "About 0 points apart" / "About 5 points apart" / "About 20 points apart": same form, all numbered.
3. Locked stage: axis 0–100%, 30 grey dots in one column at 50% (not one of the options), the chip, the slider at 40. No wheel line, no median line, no record line.
4. Reveal values: 25 (milestone "lo", recorded; record line); 47 (milestone "hi", recorded; record line); 25 and 45 for the 1974 study (constants, claim c2).
5. QA path: slider 40 → 42, Wheel: 10 (lo), Wheel: 65 (hi), Hide wheel (hidden). All three by press 4; the record line shows both medians and the dots sit at the beliefs when the reveal opens.
6. Reset: no Reset control; "Hide wheel" is the last press and keeps the record line. Reveal reads "With the wheel at 10 the crowd's median was 25. At 65 it was 47. The number told them nothing, ... In the original 1974 study the medians were 25 and 45. ..."
7. Phone fit: see "Measurement" below.

## Measurement
