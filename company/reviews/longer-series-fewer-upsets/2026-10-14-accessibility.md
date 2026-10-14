# Accessibility review: longer-series-fewer-upsets (2026-10-14)

**Verdict: pass** (lesson-level; every lesson also inherits the kit-level problems in the [published audit](../_accessibility/2026-10-13-published-audit.md), second batch section)

Reviewer: accessibility-reviewer. Method: `node tools/a11y-scan.mjs` at 390x844 against the built app on :3421 (dark and light, predict / explore / reveal, plus a reduced-motion pass). Not hand-checked; the verdict is the script's. Raw data: `artifacts/a11y/scan-2026-10-14.json` (not committed). Board W-149.

| Check | Result | Notes |
|---|---|---|
| Keyboard path predict → explore → reveal | ok | the scan completed the path with the keyboard alone; no lock-out found. Focus drop after commit is kit-level (K3) |
| Accessible names (controls, stage SVG) | ok | every control named; stage SVG has role=img and a label |
| Contrast (WCAG AA, dark and light) | ok | no own-stage finding |
| Tap targets at 390 px | ok | no lesson-styled control under 44 px; kit and app chrome are kit-level (K2) |
| Reduced motion | ok | no animation still running; preference applied |
| Meaning not by colour alone | manual | Stage uses semantic colour (warn) on 392 element(s) with no text, label, or dash pattern in their group: rect.OqGhZW_won:nth-of-type(1) (warn), rect.OqGhZW_won:nth-of-type(2) (warn), rect.OqGhZW_won:n |
| SVG label tracks state | manual | SVG aria-label did not change between predict and reveal ("Underdog won 392 of 1000 best-of-1 series"). The QA standard asks for a label describing what it show |
| Small text (< 9 px rendered) | ok | none |

## Findings in this lesson (route to the lesson builder)

### Manual

- **colour-alone** (1 item): Stage uses semantic colour (warn) on 392 element(s) with no text, label, or dash pattern in their group: rect.OqGhZW_won:nth-of-type(1) (warn), rect.OqGhZW_won:nth-of-type(2) (warn), rect.OqGhZW_won:nth-of-type(3) (warn). Check a non-colour cue exists.
- **svg-label** (1 item): SVG aria-label did not change between predict and reveal ("Underdog won 392 of 1000 best-of-1 series"). The QA standard asks for a label describing what it shows now; check the live caption/readout covers it.

## What this record does not show

- No screen reader was run. Names, roles and live regions are read from the DOM.
- Contrast is computed from painted colours; text over images or gradients is skipped. Dimmed states are counted.
- The colour-alone and SVG-label items are prompts for a human, not verdicts.
- 200% zoom, text-only zoom and landscape were not checked.

## Next

No lesson-level action. Kit-level items (K1-K8) go to the platform engineer. Unpublish or waive is the founder's decision (F-14); this record does not unpublish anything.
