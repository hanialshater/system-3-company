# Accessibility review: why-seven-wins (2026-10-13)

**Verdict: fail** (lesson-level; every lesson also inherits the kit-level problems in the [published audit](../_accessibility/2026-10-13-published-audit.md))

Reviewer: accessibility-reviewer. Method: `node tools/a11y-scan.mjs` at 390x844 against the built app (dark and light, predict / explore / reveal, plus a reduced-motion pass); **also sampled by hand** (Tab order, reading order, colour-blind view) to calibrate the script. Raw data: `artifacts/a11y/scan-2026-10-13.json` (not committed). Scan build: `.next-wt5` (built 21:17Z, newer than every file in this lesson's folder except `meta.json`).

| Check | Result | Notes |
|---|---|---|
| Keyboard path predict → explore → reveal | ok | Tab reached every enabled control (11 controls in the lesson); 7 stage controls activated with Enter / arrow keys; reveal reached and opened by keyboard. |
| Accessible names (controls, stage SVG) | ok | every control named; stage SVG has role=img and a label |
| Contrast (WCAG AA, dark and light) | FAIL | 14 finding(s), below |
| Tap targets at 390 px | ok | no lesson-styled control under 44 px; kit controls are 35 px high (kit-level, see summary) |
| Reduced motion | ok | no animation still running; preference applied |
| Meaning not by colour alone | ok | no colour-only cue detected |
| Small text (< 9 px rendered) | ok | none |

## Findings in this lesson (route to the lesson builder)

### Fail

- **contrast**: dark theme, `text._4QS71W_tileTextLight`: 7 text item(s) fail (needs 4.5:1); worst 2.25:1, "5" #ffffff on #d1a747 (seen in reveal).
- **contrast**: light theme, `text._4QS71W_tileTextLight`: 7 text item(s) fail (needs 4.5:1); worst 2.25:1, "5" #ffffff on #d1a747 (seen in reveal).

## What this record does not show

- No screen reader (NVDA, VoiceOver, TalkBack) was run. Names, roles and live regions are read from the DOM.
- Contrast is computed from painted colours at the centre of each text run; text over images or gradients is skipped or marked unsure. Deliberately dimmed states (opacity) are counted, because they carry content.
- The script cannot judge whether a colour cue is the only cue; it flags semantic colours with no text, label or dash nearby for a person to look at.
- 200% zoom, text-only zoom and landscape were not checked.

## Next

Builder of this lesson fixes the items above, then the accessibility reviewer re-runs `node tools/a11y-scan.mjs why-seven-wins`. Unpublish or waive is the founder's decision; this record does not unpublish anything.
