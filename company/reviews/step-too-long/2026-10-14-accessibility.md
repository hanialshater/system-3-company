# Accessibility review: step-too-long (2026-10-14)

**Verdict: pass with fixes** (lesson-level; every lesson also inherits the kit-level problems in the [published audit](../_accessibility/2026-10-13-published-audit.md), second batch section)

Reviewer: accessibility-reviewer. Method: `node tools/a11y-scan.mjs` at 390x844 against the built app on :3421 (dark and light, predict / explore / reveal, plus a reduced-motion pass). Not hand-checked; the verdict is the script's. Raw data: `artifacts/a11y/scan-2026-10-14.json` (not committed). Board W-149.

| Check | Result | Notes |
|---|---|---|
| Keyboard path predict → explore → reveal | ok | the scan completed the path with the keyboard alone; no lock-out found. Focus drop after commit is kit-level (K3) |
| Accessible names (controls, stage SVG) | ok | every control named; stage SVG has role=img and a label |
| Contrast (WCAG AA, dark and light) | ok | no own-stage finding |
| Tap targets at 390 px | ok | no lesson-styled control under 44 px; kit and app chrome are kit-level (K2) |
| Reduced motion | ok | no animation still running; preference applied |
| Meaning not by colour alone | ok | no colour-only cue detected |
| SVG label tracks state | manual | SVG aria-label did not change between predict and reveal ("Step size 0.1, after 0 steps"). The QA standard asks for a label describing what it shows now; check  |
| Small text (< 9 px rendered) | fix | 6 item(s), e.g. Text rendered at 8.5px (< 9px) in dark/predict: "bottom" |

## Findings in this lesson (route to the lesson builder)

### Fix

- **text-size** (6 items): Text rendered at 8.5px (< 9px) in dark/predict: "bottom" text.dXg58q_tiny:nth-of-type(1)

### Manual

- **svg-label** (1 item): SVG aria-label did not change between predict and reveal ("Step size 0.1, after 0 steps"). The QA standard asks for a label describing what it shows now; check the live caption/readout covers it.

## What this record does not show

- No screen reader was run. Names, roles and live regions are read from the DOM.
- Contrast is computed from painted colours; text over images or gradients is skipped. Dimmed states are counted.
- The colour-alone and SVG-label items are prompts for a human, not verdicts.
- 200% zoom, text-only zoom and landscape were not checked.

## Next

Builder of this lesson fixes the items above, then the accessibility reviewer re-runs `node tools/a11y-scan.mjs step-too-long`. Kit-level items (K1-K8) go to the platform engineer. Unpublish or waive is the founder's decision (F-14); this record does not unpublish anything.
