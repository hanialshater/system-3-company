# Accessibility review: duplicates-in-the-test (2026-10-13)

**Verdict: fail** (lesson-level; every lesson also inherits the kit-level problems in the [published audit](../_accessibility/2026-10-13-published-audit.md))

Reviewer: accessibility-reviewer. Method: `node tools/a11y-scan.mjs` at 390x844 against the built app (dark and light, predict / explore / reveal, plus a reduced-motion pass); **also sampled by hand** (Tab order, reading order, colour-blind view) to calibrate the script. Raw data: `artifacts/a11y/scan-2026-10-13.json` (not committed). Scan build: `.next-wt5` (built 21:17Z, newer than every file in this lesson's folder except `meta.json`).

| Check | Result | Notes |
|---|---|---|
| Keyboard path predict → explore → reveal | ok | Tab reached every enabled control (6 controls in the lesson); 2 stage controls activated with Enter / arrow keys; reveal reached and opened by keyboard. |
| Accessible names (controls, stage SVG) | ok | every control named; stage SVG has role=img and a label |
| Contrast (WCAG AA, dark and light) | FAIL | 11 finding(s), below |
| Tap targets at 390 px | ok | no lesson-styled control under 44 px; kit controls are 35 px high (kit-level, see summary) |
| Reduced motion | ok | no animation still running; preference applied |
| Meaning not by colour alone | ok | no colour-only cue detected |
| Small text (< 9 px rendered) | fix | 2 finding(s), below |

## Findings in this lesson (route to the lesson builder)

### Fail

- **contrast**: dark theme, `text.C4a1Ka_tiny`: 1 text item(s) fail (needs 4.5:1); worst 1.59:1, "copy" #514567 on #2a2b3c (seen in reveal).
- **contrast**: dark theme, `text.C4a1Ka_big`: 1 text item(s) fail (needs 4.5:1); worst 1.7:1, "✓" #335456 on #2a2b3c (seen in reveal).
- **contrast**: light theme, `text.C4a1Ka_tiny`: 2 text item(s) fail (needs 4.5:1); worst 1.18:1, "copy" #e1d3f2 on #eae9f5 (seen in explore, reveal).
- **contrast**: light theme, `text.C4a1Ka_big`: 3 text item(s) fail (needs 4.5:1); worst 1.13:1, "✓" #c3e3e1 on #eae9f5 (seen in reveal).

### Fix

- **contrast**: dark theme, `text.C4a1Ka_tiny`: 1 text item(s) fail (needs 4.5:1); worst 4:1, "copy" #c792ea on #49405f (seen in explore).
- **contrast**: light theme, `text.C4a1Ka_big`: 3 text item(s) fail (needs 3:1); worst 1.4:1, "✓" #4fd1a5 on #e3d8f3 (seen in explore).
- **text-size**: 2 text item(s) render below 9 px at phone width, e.g. 5.7px (< 9px) in dark/reveal: "copy" text.C4a1Ka_tiny:nth-of-type(1)

## What this record does not show

- No screen reader (NVDA, VoiceOver, TalkBack) was run. Names, roles and live regions are read from the DOM.
- Contrast is computed from painted colours at the centre of each text run; text over images or gradients is skipped or marked unsure. Deliberately dimmed states (opacity) are counted, because they carry content.
- The script cannot judge whether a colour cue is the only cue; it flags semantic colours with no text, label or dash nearby for a person to look at.
- 200% zoom, text-only zoom and landscape were not checked.

## Next

Builder of this lesson fixes the items above, then the accessibility reviewer re-runs `node tools/a11y-scan.mjs duplicates-in-the-test`. Unpublish or waive is the founder's decision; this record does not unpublish anything.
