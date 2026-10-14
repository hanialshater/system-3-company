# Build notes: italy-poorer-in-1800

v1 (2026-10-14, history-builder-1, branch history-build-1). Brief: company/domains/briefs/history.md #18. Numbers: history-cycle2-check.mjs section 18 (all checks pass).

- The Maddison "GDP per capita" values for Entity Italy, 1310-1871 (562 values, none missing), are copied into Demo.tsx unchanged; a node script confirmed the array equals the CSV. The stage shows only an index, 1450 = 100, because the copy states no unit. The index axis starts at 0, so the 25% fall is not exaggerated.
- Locked frame: axes and the line from 1310 to 1450 only (the question gives 1450 = 100). After the commit, the line is drawn up to the furthest preset pressed. Marks for 1450 and 1800 stay once set.
- Presets in DOM order: 1450, 1800 (milestone `y1800`; readout "1800: 75 (−0.08% a year since 1450)"), 1310 to 1871, the whole line (readout 1310 89 · 1450 100 · 1800 75 · 1871 87), Change per year (a dashed constant-rate segment from 1450 to 1800, with readout "−0.08% a year: 100 → 75"). The gate is `y1800` only, as in the brief. The 0.08% the reveal names is already in the 1800 readout, so no extra milestone was needed. There is no Reset button. Control row `foldAtReveal`.
- Hook changed from my draft ("one rich region") to "Test north and central Italy", which carries no unclaimed adjective.
- No held source sentence. Malanima's title, an optional caption in the brief, is not used. Every claim is unverified.

## Pre-flight v1
1. **Title and hook.** "Richer by 1800?" / "Before industry, did people at least get slowly richer? Test north and central Italy." They ask a question and do not answer it.
2. **Options.** "About 75" / "About 100" / "About 150". All are numbered at the same precision.
3. **Locked stage.** It shows the axes (0-120), a dashed reference at 100 and the 1310-1450 line, with readout "?". Nothing is drawn after 1450, so nothing matches 75.
4. **Reveal values.** 75% is computed and gated by `y1800`, marked "1800: 75". 0.08% is computed and shown in the 1800 readout (gated by `y1800`) and in the rate view. 350 years is computed (1800 - 1450) and in the rate readout label. 1450 and 1800 are the presets.
5. **QA path.** Pressing the 4 presets in DOM order reaches y1800 (press 2). It ends in the rate view: whole line, both marks, the dashed segment and the readout "−0.08% a year: 100 → 75".
6. **Reset.** There is no Reset button. Reveal from the run: "On this series, a person in north and central Italy in 1800 had about 75% of the income of one in 1450: a fall of about 0.08% a year for 350 years. Income per person can shrink for centuries, not only grow. Where it stops: this is one reconstruction, it covers only the north and centre before 1871, and the copy we opened states no unit, so it is read as an index."
7. **Phone fit.** tools/reveal-fit.mjs at 390x844: verdict fit, crop 0 px, hidden 0 px, namedHidden 0, phoneFit true, reveal 76 words with the verdict. The svg labels are 11 px in a 340-wide viewBox at about 330 px.
