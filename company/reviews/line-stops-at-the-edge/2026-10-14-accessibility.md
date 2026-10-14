# Accessibility review: line-stops-at-the-edge (2026-10-14)

**Verdict: fail** (lesson-level; every lesson also inherits the kit-level problems in the [published audit](../_accessibility/2026-10-13-published-audit.md), second batch section)

Reviewer: accessibility-reviewer. Method: `node tools/a11y-scan.mjs` at 390x844 against the built app on :3421 (dark and light, predict / explore / reveal, plus a reduced-motion pass). **Also checked by hand** (see below). Raw data: `artifacts/a11y/scan-2026-10-14.json` (not committed). Board W-149.

| Check | Result | Notes |
|---|---|---|
| Keyboard path predict → explore → reveal | ok | the scan completed the path with the keyboard alone; no lock-out found. Focus drop after commit is kit-level (K3) |
| Accessible names (controls, stage SVG) | ok | every control named; stage SVG has role=img and a label |
| Contrast (WCAG AA, dark and light) | FAIL | 2 failing item(s), worst: 2.09:1 (needs 4.5) light/explore: "fitted line" #c792ea on #eceff6 |
| Tap targets at 390 px | ok | no lesson-styled control under 44 px; kit and app chrome are kit-level (K2) |
| Reduced motion | ok | no animation still running; preference applied |
| Meaning not by colour alone | manual | Stage uses semantic colour (good) on 1 element(s) with no text, label, or dash pattern in their group: circle:nth-of-type(2) (good). Check a non-colour cue exists. |
| SVG label tracks state | manual | SVG aria-label did not change between predict and reveal ("Question point at x = 0.5"). The QA standard asks for a label describing what it shows now; check the |
| Small text (< 9 px rendered) | fix | 4 item(s), e.g. Text rendered at 6px (< 9px) in dark/reveal: "training data" |

## Findings in this lesson (route to the lesson builder)

### Fail

- **contrast** (2 items): 2.09:1 (needs 4.5) light/explore: "fitted line" #c792ea on #eceff6

### Fix

- **text-size** (4 items): Text rendered at 6px (< 9px) in dark/reveal: "training data" text.GV46-G_tiny:nth-of-type(5)

### Manual

- **colour-alone** (1 item): Stage uses semantic colour (good) on 1 element(s) with no text, label, or dash pattern in their group: circle:nth-of-type(2) (good). Check a non-colour cue exists.
- **svg-label** (1 item): SVG aria-label did not change between predict and reveal ("Question point at x = 0.5"). The QA standard asks for a label describing what it shows now; check the live caption/readout covers it.

## Hand check

Hand-checked (keyboard trace): SVG label does update in explore ('Question point at x = 0.5' -> 'x = 1'), so the scan's 'did not change between predict and reveal' item is a weak prompt here. The 'fitted line' and 'training data' labels are 6 px and, in light, 2.09:1. Focus drops to <body> after commit (K3).

## What this record does not show

- No screen reader was run. Names, roles and live regions are read from the DOM.
- Contrast is computed from painted colours; text over images or gradients is skipped. Dimmed states are counted.
- The colour-alone and SVG-label items are prompts for a human, not verdicts.
- 200% zoom, text-only zoom and landscape were not checked.

## Next

Builder of this lesson fixes the items above, then the accessibility reviewer re-runs `node tools/a11y-scan.mjs line-stops-at-the-edge`. Kit-level items (K1-K8) go to the platform engineer. Unpublish or waive is the founder's decision (F-14); this record does not unpublish anything.
