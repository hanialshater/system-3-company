# Accessibility review: start-early-race (2026-10-14)

**Verdict: fail** (lesson-level; every lesson also inherits the kit-level problems in the [published audit](../_accessibility/2026-10-13-published-audit.md), second batch section)

Reviewer: accessibility-reviewer. Method: `node tools/a11y-scan.mjs` at 390x844 against the built app on :3421 (dark and light, predict / explore / reveal, plus a reduced-motion pass). **Also checked by hand** (see below). Raw data: `artifacts/a11y/scan-2026-10-14.json` (not committed). Board W-149.

| Check | Result | Notes |
|---|---|---|
| Keyboard path predict → explore → reveal | ok | the scan completed the path with the keyboard alone; no lock-out found. Focus drop after commit is kit-level (K3) |
| Accessible names (controls, stage SVG) | ok | every control named; stage SVG has role=img and a label |
| Contrast (WCAG AA, dark and light) | FAIL | 4 failing item(s), worst: 1.41:1 (needs 4.5) light/explore: "Ben" #f6c453 on #eceff6 |
| Tap targets at 390 px | ok | no lesson-styled control under 44 px; kit and app chrome are kit-level (K2) |
| Reduced motion | ok | no animation still running; preference applied |
| Meaning not by colour alone | ok | no colour-only cue detected |
| SVG label tracks state | manual | SVG aria-label did not change between predict and reveal ("Ana's and Ben's savings over 40 years"). The QA standard asks for a label describing what it shows no |
| Small text (< 9 px rendered) | fix | 26 item(s), e.g. Text rendered at 6.3px (< 9px) in dark/reveal: "$100k" |

## Findings in this lesson (route to the lesson builder)

### Fail

- **contrast** (4 items): 1.41:1 (needs 4.5) light/explore: "Ben" #f6c453 on #eceff6

### Fix

- **text-size** (26 items): Text rendered at 6.3px (< 9px) in dark/reveal: "$100k" text._9APYFa_axis

### Manual

- **svg-label** (1 item): SVG aria-label did not change between predict and reveal ("Ana's and Ben's savings over 40 years"). The QA standard asks for a label describing what it shows now; check the live caption/readout covers it.

## Hand check

Hand-checked (Tab order, keyboard predict -> explore, screenshots, light and dark): Tab reaches Ana / Ben / About equal, then the kit's 'Why trust this?'; the stage control is correctly skipped while disabled. After 'Lock it in' focus fell to <body> (K3) and the stage came before the question in the DOM (K4); both match the kit-level findings. The SVG label is the same in predict and explore ('Ana's and Ben's savings over 40 years'), but a visible readout ('Ben ahead by $…', IN/END figures) carries the state; the label itself is open for a human (K8). I did not reach the reveal by keyboard in my own trace; the scan did.

## What this record does not show

- No screen reader was run. Names, roles and live regions are read from the DOM.
- Contrast is computed from painted colours; text over images or gradients is skipped. Dimmed states are counted.
- The colour-alone and SVG-label items are prompts for a human, not verdicts.
- 200% zoom, text-only zoom and landscape were not checked.

## Next

Builder of this lesson fixes the items above, then the accessibility reviewer re-runs `node tools/a11y-scan.mjs start-early-race`. Kit-level items (K1-K8) go to the platform engineer. Unpublish or waive is the founder's decision (F-14); this record does not unpublish anything.
