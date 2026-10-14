# Accessibility review: tournament-second-best (2026-10-13)

**Verdict: fail** (lesson-level; every lesson also inherits the kit-level problems in the [published audit](../_accessibility/2026-10-13-published-audit.md))

Reviewer: accessibility-reviewer. Method: `node tools/a11y-scan.mjs` at 390x844 against the built app (dark and light, predict / explore / reveal, plus a reduced-motion pass). Raw data: `artifacts/a11y/scan-2026-10-13.json` (not committed). Scan build: `.next-wt5` (built 21:17Z, newer than every file in this lesson's folder except `meta.json`).

| Check | Result | Notes |
|---|---|---|
| Keyboard path predict → explore → reveal | ok | Tab reached every enabled control (15 controls in the lesson); 11 stage controls activated with Enter / arrow keys; reveal reached and opened by keyboard. |
| Accessible names (controls, stage SVG) | fix | 1 finding(s), below |
| Contrast (WCAG AA, dark and light) | FAIL | 5 finding(s), below |
| Tap targets at 390 px | ok | no lesson-styled control under 44 px; kit controls are 35 px high (kit-level, see summary) |
| Reduced motion | ok | no animation still running; preference applied |
| Meaning not by colour alone | ok | no colour-only cue detected |
| Small text (< 9 px rendered) | ok | none |

## Findings in this lesson (route to the lesson builder)

### Fail

- **contrast**: dark theme, `text.vzGmHa_name`: 2 text item(s) fail (needs 4.5:1); worst 1.69:1, "E" #eef1f7 on #4fd1a5 (seen in reveal).
- **contrast**: dark theme, `text.vzGmHa_str`: 1 text item(s) fail (needs 4.5:1); worst 1.33:1, "8" #9aa3b5 on #4fd1a5 (seen in reveal).
- **contrast**: light theme, `text.vzGmHa_str.vzGmHa_second`: 1 text item(s) fail (needs 4.5:1); worst 2.52:1, "7" #ff7a7a on #ffffff (seen in reveal).

### Fix

- **contrast**: light theme, `text.vzGmHa_str`: 1 text item(s) fail (needs 4.5:1); worst 3.06:1, "8" #5d6578 on #4fd1a5 (seen in reveal).
- **svg-label**: aria-label is the generic "Knockout bracket" and stays so while the bracket plays out (checked by hand). The winners are only SVG text inside role=img, which assistive tech skips; put the current result in the label or in a visible text readout.

## What this record does not show

- No screen reader (NVDA, VoiceOver, TalkBack) was run. Names, roles and live regions are read from the DOM.
- Contrast is computed from painted colours at the centre of each text run; text over images or gradients is skipped or marked unsure. Deliberately dimmed states (opacity) are counted, because they carry content.
- The script cannot judge whether a colour cue is the only cue; it flags semantic colours with no text, label or dash nearby for a person to look at.
- 200% zoom, text-only zoom and landscape were not checked.

## Next

Builder of this lesson fixes the items above, then the accessibility reviewer re-runs `node tools/a11y-scan.mjs tournament-second-best`. Unpublish or waive is the founder's decision; this record does not unpublish anything.
