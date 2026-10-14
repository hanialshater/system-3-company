# Build note: proposers-get-the-best

builder: algo-pair-11 · 2026-10-14 · status draft · claims all unverified

Built from brief #38 and spec `company/design/specs/proposers-get-the-best.md`.

## Node checks
Students propose: Ann-X, Bea-Y (students' first choices). Hospitals propose: X-Bea, Y-Ann (hospitals' first choices). Both stable (no blocking pair). No offer is refused in either run, so the refusal drawing (struck dashed line with a cross) is built but not on the QA path and is untested by QA.

## Deviations from the spec
- Receivers get no "waits for offers" caption (word budget); they are dimmed and disabled.
- Log lines use the stage's own stability check (`isStable`), so "stable" is computed, not hard-coded.
- Layout order: rule line, students, toggle, offer-line strip, hospitals, log.

## Controls (DOM order): Ann, Bea, toggle, X, Y. Milestones: students-proposed, hospitals-proposed (either order).
A toggle press starts a fresh run in the other mode; finished runs stay in the log; the second run's log line replaces a repeat of the same mode.

## Known risks
- Claim c5 ("for this reason") needs a source check against Roth and Peranson 1999.
- Stage text exceeds 25 words once both log lines show; names and lists are data, but a reviewer may count them.
