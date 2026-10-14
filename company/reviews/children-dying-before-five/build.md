# Build notes: children-dying-before-five

v1 (2026-10-14, history-builder-1, branch history-build-1). Brief: company/domains/briefs/history.md #13. Numbers: history-cycle2-check.mjs section 13 (all checks pass).

- The gmu5 column for 1800-2020 (221 values) is copied into Demo.tsx unchanged. A node script confirmed the array equals the CSV. Every number on the stage and in the reveal is read from it or computed with the script's formulas.
- Stage: one line chart, per 1,000 born (0-500), years 1800-2020. Locked frame: the axes and the line from 1800 to 1900 only (the question gives 1900). After the commit, the line is drawn up to the latest year pressed. Each year preset adds a mark that stays ("1900: 411").
- Presets in DOM order: 1800, 1900 (milestone `y1900`), 1950, 2020 (milestone `y2020`), Out of 100 children (readout "1900: 41 in 100 · 2020: 4 in 100"). The brief lists `per100` as a milestone, but its gate is y1900 and y2020, so minInteractions = 2. There is no Reset button.
- Once 1900 and 2020 are both marked, a caption under the readout reads "1900 to 2020: 11 times fewer; 56% of that fall came after 1950". The reveal quotes these values, so they are on screen whichever path the learner took.
- The line shows the data's own bumps (the 1850s and 1918) unlabelled. The brief names no event, and none is named on the stage.
- Control row `foldAtReveal`; the readout and caption sit outside it. Held source sentence: the "Where it stops" clause (c6), with its fallback. Every claim is unverified.

## Pre-flight v1
1. **Title and hook.** "Four in ten" / "In 1900 four in ten children died before turning five. How fast did that change?" They give the 1900 level, which the question also gives, and nothing about 2020.
2. **Options.** "About 250" / "About 100" / "About 35". All are numbered at the same precision.
3. **Locked stage.** It shows the axes and the 1800-1900 line, with no marks and readout "?". Nothing after 1900 is drawn, so nothing matches "About 35".
4. **Reveal values.** 411 is data, marked when 1900 is pressed (`y1900`). 37 is data, marked by `y2020`. 11 is computed (411/37) and shown in the caption once both are marked. 430 is data, marked by the 1800 preset; it is not a milestone, but the 1800 start of the line is visible in every frame. 56% is computed and in the caption. 1950 is on the axis and marked by its preset.
5. **QA path.** Pressing the 5 presets in DOM order reaches y1900 (press 2) and y2020 (press 4). It ends in the per-100 view, with all four marks ("1800: 430", "1900: 411", "1950: 246", "2020: 37"), the readout and the caption visible.
6. **Reset.** There is no Reset button. Reveal from the run: "In 1900 about 411 of every 1,000 children died before age 5; in 2020, 37: about 11 times fewer. In the century before 1900 the figure barely moved, from 430. More than half of the fall since 1900, 56%, came after 1950. Where it stops: this is one source's world figure, and the further back it goes, the fewer places kept records to build it from."
7. **Phone fit.** tools/reveal-fit.mjs at 390x844: verdict fit, crop 0 px, hidden 0 px, namedHidden 0, phoneFit true, reveal 70 words with the verdict. The svg labels are 11 px in a 340-wide viewBox at about 330 px.
