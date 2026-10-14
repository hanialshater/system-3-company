# Build note: the-fast-ones-leave
- Intent (exploration, no slider): 60 MB speeds (seed 1, untuned); each histogram column is a button that lets its fastest molecule escape; thermometer = mean v² as share of start (no °C, since a 60-molecule sample would read absurd temperatures).
- Key state: 3 molecules removed from columns wholly above the starting mean. Reveal reports the coolest state reached, kept through reset.
- After screenshots: first reveal narrated the post-reset state (583 → 583 m/s); fixed. QA path gives 583 → 573 m/s, 94%; 'drop is huge' wording replaced.


## Revision v2

From the latest learner review and fact-check (batch 03).

- Hook no longer says "watch who leaves"; hint now says filled dots on the right are the fast ones, tap a filled column.
- The reveal gate already counted only fast-column taps (3 needed).

## Revision 2026-10-14 (wave D r5, demo-builder)

v3. Review: slow columns could escape and raised the average; reveal counted slow escapes; "filled" unclear; thermometer unreadable. Changes: only columns at or above 750 m/s (first column above the rms speed, 630 m/s) are buttons; slower columns are inert and labelled "too slow to escape"; threshold chosen so every escape lowers both mean speed and mean energy (checked in node, seed 1); pink/grey wording; % label under the thermometer; reveal counts fast escapes and flags a reset. New claims c8, c9.
